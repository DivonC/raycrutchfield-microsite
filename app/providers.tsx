'use client';
import PostHogProvider from '@/components/providers/posthog';

export default function Providers({ children }: { children: React.ReactNode }) {

  return <PostHogProvider>{children}</PostHogProvider>;
}
