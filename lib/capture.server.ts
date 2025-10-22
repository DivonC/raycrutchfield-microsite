import { env } from '@/env.mjs';
import { PostHog } from 'posthog-node';



const ph = new PostHog(env.POSTHOG_KEY!, {
    host: 'https://us.i.posthog.com', //env.POSTHOG_API_HOST ?? 
    // optional: flushAt: 1, flushInterval: 0
  });


export async function postHogServerCapture(
  distinctId: string,
  name: string,
  props?: Record<string, any>
) {

  try {
    ph.capture({ distinctId, event: name, properties: { env: env.APP_ENV ?? 'prod', ...props } });
    await ph.flush();
  }
  catch(e:any) {
  }
    
}