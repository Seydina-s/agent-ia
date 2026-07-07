"use client";

import { LazyMotion, domAnimation, MotionConfig } from "motion/react";

// Wraps the app once: lazy-loads the DOM animation feature bundle and
// makes motion respect the OS "reduce motion" setting everywhere.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
