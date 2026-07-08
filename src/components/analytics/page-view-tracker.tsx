"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Fires a lightweight beacon on each (client or hard) navigation.
export function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname, referrer: document.referrer }),
      keepalive: true,
      signal: controller.signal,
    }).catch(() => {});
    return () => controller.abort();
  }, [pathname]);

  return null;
}
