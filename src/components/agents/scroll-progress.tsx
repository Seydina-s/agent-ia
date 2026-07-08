"use client";

import { m, useScroll, useSpring } from "motion/react";

// Thin accent bar under the header that tracks page scroll — reinforces the
// "scroll through the agents" experience.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.4,
  });

  return (
    <m.div
      aria-hidden
      style={{ scaleX }}
      className="accent-fill fixed inset-x-0 top-18 z-40 h-0.5 origin-left"
    />
  );
}
