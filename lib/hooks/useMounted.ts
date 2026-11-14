"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * True on the client after hydration, false during SSR / the hydration pass.
 * Uses useSyncExternalStore so no setState-in-effect is needed.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
