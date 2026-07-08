import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

// Returns false during SSR and the first client render, true once hydrated.
// Canonical hydration-safe pattern (no setState-in-effect).
export function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true, // client snapshot
    () => false // server snapshot
  );
}
