//@ts-ignore
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    REGION: z.string().default('us-east-2'),
    AWS_REGION: z.string().default('us-east-2'),
    APP_ENV: z.string().default('development'),
    FRONTEND_SECRET_NAME: z.string(),
    POSTHOG_KEY: z.string(),
    POSTHOG_API_HOST:z.string(),
    IN_CLOUD: z.string().optional(),
    CONTACT_TO: z.email(),
    CONTACT_FROM_EMAIL: z.email(),
    CONTACT_FROM_NAME: z.string(),
    
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
    NEXT_PUBLIC_VERSION: z.string(),
    NEXT_PUBLIC_WEBSITE_URL: z.string().url(),
    NEXT_PUBLIC_POSTHOG_KEY: z.string(),
    NEXT_PUBLIC_POSTHOG_UI_HOST: z.string(),
    NEXT_PUBLIC_POSTHOG_API_HOST: z.string(),
    //NEXTAUTH_URL: z.string().url(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    // DATABASE_URL: process.env.DATABASE_URL,
    // DATABASE_REPLICA_URL: process.env.DATABASE_REPLICA_URL,
    NODE_ENV: process.env.NODE_ENV,
    APP_ENV: process.env.APP_ENV || 'development',
    REGION: process.env.REGION || 'us-east-2',
    AWS_REGION: process.env.AWS_REGION || 'us-east-2',
    IN_CLOUD: process.env.IN_CLOUD,
    FRONTEND_SECRET_NAME: process.env.FRONTEND_SECRET_NAME,
    CONTACT_TO: process.env.CONTACT_TO || 'ray@iterloop.com',
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL || 'ray@raycrutchfield.com', // verified sender sender
    CONTACT_FROM_NAME: process.env.CONTACT_FROM_NAME || 'Contact Form Submission', 

    NEXT_PUBLIC_VERSION: process.env.NEXT_PUBLIC_VERSION,
    NEXT_PUBLIC_WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL || 'http://localhost:3000',
    POSTHOG_KEY: process.env.POSTHOG_KEY || 'phc_pqP35O0N9A5T4j2IQHo95iVWi8VEeIIw4vFBuR2s4Th',
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY || 'phc_pqP35O0N9A5T4j2IQHo95iVWi8VEeIIw4vFBuR2s4Th',
    NEXT_PUBLIC_POSTHOG_UI_HOST: process.env.NEXT_PUBLIC_POSTHOG_UI_HOST || 'https://us.i.posthog.com',
    POSTHOG_API_HOST: process.env.POSTHOG_API_HOST || '/7tiLnIfx',

    NEXT_PUBLIC_POSTHOG_API_HOST: process.env.NEXT_PUBLIC_POSTHOG_API_HOST || '/7tiLnIfx',
    
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true
});


