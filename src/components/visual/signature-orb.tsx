"use client";

import { m } from "motion/react";

// The brand's signature visual — a dark obsidian sphere with a slow cyan
// rim-light sweep and a gentle breathing scale. CSS/motion only (no WebGL),
// so it stays light and fluid. A WebGL upgrade is tracked for Sprint 4.
export function SignatureOrb({ className }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none relative aspect-square ${className ?? ""}`}
      aria-hidden
    >
      {/* breathing wrapper */}
      <m.div
        className="absolute inset-0"
        animate={{ scale: [1, 1.035, 1] }}
        transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
      >
        {/* obsidian body */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(120% 120% at 32% 26%, #1b1b1b 0%, #0b0b0b 45%, #050505 100%)",
            boxShadow:
              "inset -30px -40px 90px rgba(0,0,0,0.9), inset 20px 24px 60px rgba(255,255,255,0.04)",
          }}
        />

        {/* rotating rim-light sweep (cyan → teal) */}
        <m.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(36,183,204,0.0) 60deg, rgba(36,183,204,0.55) 120deg, rgba(23,60,52,0.35) 180deg, transparent 240deg, transparent 360deg)",
            maskImage:
              "radial-gradient(closest-side, transparent 78%, #000 88%, #000 100%)",
            WebkitMaskImage:
              "radial-gradient(closest-side, transparent 78%, #000 88%, #000 100%)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 22, ease: "linear", repeat: Infinity }}
        />

        {/* soft cyan specular glow */}
        <m.div
          className="absolute rounded-full blur-2xl"
          style={{
            top: "16%",
            left: "20%",
            width: "42%",
            height: "42%",
            background:
              "radial-gradient(circle, rgba(70,202,221,0.35) 0%, rgba(70,202,221,0) 70%)",
          }}
          animate={{ opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
        />
      </m.div>
    </div>
  );
}
