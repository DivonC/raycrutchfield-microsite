// app/posthog.client.tsx
'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

export default function PostHogClientProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only runs in the browser
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    });
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
