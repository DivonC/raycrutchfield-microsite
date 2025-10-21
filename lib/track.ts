'use client';
import posthog from 'posthog-js';
let initialized = false;
export function initPosthog() {
  if (typeof window === 'undefined' || initialized) return;
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || '', {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    capture_pageview: true
  });
  initialized = true;
}
export function capture(name: string, props?: Record<string, any>) {
  try { posthog.capture(name, props); } catch {}
}