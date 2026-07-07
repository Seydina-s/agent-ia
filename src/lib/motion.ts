import type { Transition, Variants } from "motion/react";

// Shared motion language — premium, restrained, fluid.
// Easings mirror the CSS custom props in globals.css.
export const ease = {
  signal: [0.22, 1, 0.36, 1] as const, // confident settle
  soft: [0.16, 1, 0.3, 1] as const, // gentle out
  inOut: [0.65, 0, 0.35, 1] as const,
} as const;

export const duration = {
  fast: 0.2,
  base: 0.4,
  slow: 0.6,
  reveal: 0.8,
} as const;

export const spring = {
  soft: { type: "spring", stiffness: 140, damping: 20, mass: 1 } satisfies Transition,
  snappy: { type: "spring", stiffness: 320, damping: 30 } satisfies Transition,
} as const;

// Reveal-on-scroll: rise + fade. Use with whileInView + viewport once.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.soft },
  },
};

// Stagger container for lists/sections.
export const stagger = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: gap, delayChildren: delay },
  },
});

// Default viewport for whileInView reveals.
export const inView = { once: true, margin: "-12% 0px -12% 0px" } as const;
