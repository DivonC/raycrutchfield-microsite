
import { useEffect } from "react"
import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
//@ts-ignore
import {env} from "@/env.mjs";

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY as string, {
      api_host: env.NEXT_PUBLIC_POSTHOG_API_HOST,
      ui_host: env.NEXT_PUBLIC_POSTHOG_UI_HOST,
      person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
      defaults: '2025-05-24'
    });

    // if (!ClientSide_isProduction) {
    //     posthog.featureFlags.overrideFeatureFlags({
    //         flags: { 
    //           [NEWSLETTER_POPUP_EXP_KEY]: 'rewrite-1-with-image',
    //           [HOMEPAGE_EXP_KEY]: 'variant2',
    //         },
    //     });
    //     posthog.reloadFeatureFlags?.(); // or refresh the page
    //     console.log("PostHogProvider: Overriding feature flags for non-production environment");
    // }
  }, [])
  

  return (
    <PHProvider client={posthog}>
      {children}
    </PHProvider>
  )
}