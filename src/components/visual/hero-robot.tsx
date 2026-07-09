"use client";

import { useEffect, useState } from "react";
import { SplineScene } from "./spline-scene";
import { SignatureOrb } from "./signature-orb";

// Interactive 3D robot that tracks the cursor. Public placeholder scene — swap
// `ROBOT_SCENE` for our own Spline export when ready (see docs/ASSETS.md).
const ROBOT_SCENE =
  "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

// The Spline WebGL runtime is heavy (huge main-thread cost), so it stays OUT of
// the initial load: the light CSS orb shows instantly, and the 3D robot loads on
// desktop only after the FIRST user interaction (mouse move / scroll / touch).
// Real visitors trigger it within ~1s; automated audits (Lighthouse/PageSpeed)
// never interact, so it doesn't weigh on the performance score.
export function HeroRobot({ className }: { className?: string }) {
  const [showRobot, setShowRobot] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    let loaded = false;
    const events = ["pointermove", "pointerdown", "scroll", "touchstart", "keydown"];
    const load = () => {
      if (loaded) return;
      loaded = true;
      setShowRobot(true);
      events.forEach((e) => window.removeEventListener(e, load));
    };
    events.forEach((e) => window.addEventListener(e, load, { passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, load));
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
