import type { Agent } from "@/lib/agents";

// Placeholder avatar — an obsidian "bubble" with a cyan rim and the agent's
// monogram, echoing the hero orb. Swapped for the real avatar images later,
// so the shape/size stays stable when they arrive.
export function AgentAvatar({
  agent,
  className,
}: {
  agent: Agent;
  className?: string;
}) {
  const initial = agent.name.charAt(0).toUpperCase();
  return (
    <div
      className={`relative aspect-square overflow-hidden rounded-full ${className ?? ""}`}
      aria-hidden
      style={{
        background:
          "radial-gradient(120% 120% at 32% 26%, #1b1b1b 0%, #0b0b0b 48%, #050505 100%)",
        boxShadow:
          "inset -18px -22px 60px rgba(0,0,0,0.85), inset 12px 14px 40px rgba(255,255,255,0.04)",
      }}
    >
      {/* cyan rim */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 210deg, transparent 0deg, rgba(36,183,204,0.55) 90deg, rgba(23,60,52,0.3) 170deg, transparent 260deg)",
          maskImage:
            "radial-gradient(closest-side, transparent 82%, #000 90%)",
          WebkitMaskImage:
            "radial-gradient(closest-side, transparent 82%, #000 90%)",
        }}
      />
      {/* monogram */}
      <div className="absolute inset-0 grid place-items-center">
        <span className="accent-text text-[clamp(2.5rem,10vw,5rem)] font-bold leading-none">
          {initial}
        </span>
      </div>
    </div>
  );
}
