"use client";

import { SplineScene } from "./spline-scene";

// Interactive 3D robot that tracks the cursor. Public placeholder scene — swap
// `ROBOT_SCENE` for our own Spline export when ready (see docs/ASSETS.md).
const ROBOT_SCENE =
  "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

export function HeroRobot({ className }: { className?: string }) {
  return (
    <div className={className}>
      {/* cyan spotlight wash behind the robot for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 45% at 62% 38%, rgba(36,183,204,0.18) 0%, rgba(36,183,204,0) 70%)",
        }}
      />
      <SplineScene scene={ROBOT_SCENE} className="!h-full !w-full" />
    </div>
  );
}
