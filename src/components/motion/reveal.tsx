"use client";

import { m } from "motion/react";
import { fadeUp, inView } from "@/lib/motion";

// Reveal-on-scroll wrapper. Respects reduced-motion via the global MotionConfig.
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section";
}) {
  const Comp = m[as];
  return (
    <Comp
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      transition={{ delay }}
    >
      {children}
    </Comp>
  );
}
