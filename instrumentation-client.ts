"use client"
import posthog from "posthog-js"
//@ts-ignore
import {env} from "@/env.mjs";

posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY as string, {
    api_host: env.NEXT_PUBLIC_POSTHOG_API_HOST,
    ui_host: env.NEXT_PUBLIC_POSTHOG_UI_HOST,
    person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
    defaults: '2025-05-24',
    capture_exceptions: true, // This enables capturing exceptions using Error Tracking, set to false if you don't want this
    //debug: process.env.NODE_ENV === "development",
  });   
