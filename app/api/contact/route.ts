// app/api/contact/route.ts
import 'server-only';
export const dynamic = 'force-dynamic';
export const revalidate = 0;      // Disable static generation for this route
import { NextResponse, NextRequest } from 'next/server';
import { get_secret_config } from '@/server/utilities/load_server_env_variables';
import { env } from "@/env.mjs";
import { PostHog } from 'posthog-node'
import { postHogServerCapture } from '@/lib/capture.server';
import { send_basic_email } from '@/server/utilities/email_service';
export const runtime = 'nodejs'; // ensure Node (SendGrid needs it)


const secretConfig = await get_secret_config();

type Payload = {
  name: string;
  email: string;
  company?: string;
  purpose?: string;
  budget?: string;
  message: string;
  _gotcha?: string;
};

function sanitize(s?: string) {
  return (s ?? '').toString().trim().slice(0, 2000);
}

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

async function sendWithSendGrid(payload: Payload) {
  const SENDGRID_API_KEY = env.SENDGRID_API_KEY!;
  const TO = env.CONTACT_TO!;
  const FROM = env.CONTACT_FROM!; // verified sender

  console.log(JSON.stringify({
    action: 'send_contact_email',
    to: TO,
    from: FROM,
    name: payload.name,
    email: payload.email,
    key: secretConfig.SENDGRID_API_KEY,
  }))

  const subject = `Contact form: ${payload.purpose || 'General inquiry'} — ${payload.name}`;

  const textLines = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Company: ${payload.company || '-'}`,
    `Purpose: ${payload.purpose || '-'}`,
    `Budget: ${payload.budget || '-'}`,
    '',
    'Message:',
    payload.message,
  ].join('\n');

  // Simple SendGrid REST call (no sdk)
//   const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${secretConfig.SENDGRID_API_KEY}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       personalizations: [{ to: [{ email: TO }] }],
//       from: { email: FROM, name: 'Website Contact' },
//       reply_to: { email: payload.email, name: payload.name },
//       subject,
//       content: [
//         { type: 'text/plain', value: textLines },
//       ],
//     }),
//   });

//   if (!res.ok) {
//     const body = await res.text().catch(() => '');
//     throw new Error(`SendGrid error ${res.status}: ${body}`);
//   }
  await send_basic_email(
    subject,
    textLines,
    'd-d4762ca7a9c4470089f42b3bf828d129',
  )
  await postHogServerCapture(
    payload.email,
    `contact_form_submitted`,
    {
        email: payload.email,
        // utm_source: body.utm_source,
        // utm_campaign: body.utm_campaign,
    },
  )
}

export async function POST(req: NextRequest) {
  // Accept both JSON and form POST
  const ctype = req.headers.get('content-type') || '';
  let data: Payload;
  try {
    if (ctype.includes('application/json')) {
      const j = await req.json();
      data = {
        name: sanitize(j.name),
        email: sanitize(j.email),
        company: sanitize(j.company),
        purpose: sanitize(j.purpose),
        budget: sanitize(j.budget),
        message: sanitize(j.message),
        _gotcha: sanitize(j._gotcha),
      };
    } else {
      const form = await req.formData();
      data = {
        name: sanitize(form.get('name') as string),
        email: sanitize(form.get('email') as string),
        company: sanitize(form.get('company') as string),
        purpose: sanitize(form.get('purpose') as string),
        budget: sanitize(form.get('budget') as string),
        message: sanitize(form.get('message') as string),
        _gotcha: sanitize(form.get('_gotcha') as string),
      };
    }
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }

  // Honeypot (spam)
  if (data._gotcha) {
    return NextResponse.json({ ok: true }); // silently accept spam
  }

  // Basic validation
  if (!data.name || !data.email || !isEmail(data.email) || !data.message) {
    return NextResponse.json({ ok: false, error: 'Missing or invalid fields' }, { status: 422 });
  }

  // (Optional) super-light rate limit by IP (best-effort; swap to KV/Upstash if needed)
  // const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';

  try {
    await sendWithSendGrid(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: 'Email failed' }, { status: 500 });
  }

  // Redirect to thank-you page for forms; return JSON for fetch()
  if (!ctype.includes('application/json')) {
    return NextResponse.redirect(new URL('/contact/sent', req.url), { status: 303 });
  }
  return NextResponse.json({ ok: true });
}
