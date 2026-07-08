import type { Metadata } from "next";
import { agents } from "@/lib/agents";
import { AgentAct } from "@/components/agents/agent-act";
import { ScrollProgress } from "@/components/agents/scroll-progress";
import { ClosingCta } from "@/components/sections/closing-cta";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Agents",
  description:
    "Rencontrez les 10 agents IA autonomes d'Agent AI — un métier chacun, tous disponibles 24h/24.",
};

export default function AgentsPage() {
  return (
    <main>
      <ScrollProgress />

      {/* Intro */}
      <section className="container-page pt-32 pb-16 sm:pt-40 sm:pb-24">
        <Reveal>
          <p className="eyebrow">L&apos;équipe · {agents.length} agents</p>
          <h1 className="display-xl mt-6 max-w-[9em] text-balance">
            Faites <span className="accent-text">connaissance.</span>
          </h1>
          <p className="mt-8 max-w-xl text-balance text-subheading leading-snug text-foreground">
            Un métier par agent. Tous autonomes, tous disponibles — à toute
            heure. Faites défiler pour les rencontrer, un par un.
          </p>
        </Reveal>
      </section>

      {/* Scroll-through acts */}
      <div className="container-page">
        {agents.map((agent, i) => (
          <AgentAct
            key={agent.id}
            agent={agent}
            index={i}
            total={agents.length}
          />
        ))}
      </div>

      <ClosingCta />
    </main>
  );
}
