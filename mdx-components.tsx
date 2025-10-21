// Server-safe: do NOT add 'use client' here.
export function useMDXComponents<T extends Record<string, any> = {}>(components: T): T {
  // Just return what MDX passed in; no context/provider, no client code.
  return components;
}