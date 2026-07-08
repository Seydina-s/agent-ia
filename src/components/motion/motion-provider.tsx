"use client";

import { LazyMotion, domMax, MotionConfig } from "motion/react";

// Wraps the app once: lazy-loads the DOM animation feature bundle (domMax so
// layout animations like the navbar "lamp" layoutId work) and makes motion
// respect the OS "reduce motion" setting everywhere.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
