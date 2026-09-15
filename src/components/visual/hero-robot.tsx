"use client";

import { useEffect, useState } from "react";
import { SplineScene } from "./spline-scene";
import { SignatureOrb } from "./signature-orb";

// Interactive 3D robot that tracks the cursor. Public placeholder scene — swap
// `ROBOT_SCENE` for our own Spline export when ready (see docs/ASSETS.md).
const ROBOT_SCENE =
  "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

export function HeroRobot({ className }: { className?: string }) {
  const [showRobot, setShowRobot] = useState(false);

  useEffect(() => {
    // Desktop only — the hero hides this slot below lg; skip the heavy WebGL load on mobile.
    if (window.matchMedia("(min-width: 1024px)").matches) {
      setShowRobot(true);
    }
  }, []);

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
      {showRobot ? (
        <SplineScene scene={ROBOT_SCENE} className="!h-full !w-full" />
      ) : (
        <SignatureOrb className="absolute inset-0" />
      )}
    </div>
  );
}
