import type { Metadata } from "next";
import { agents } from "@/lib/agents";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Agents",
  description:
    "Rencontrez les 10 agents IA autonomes d'Agent AI — un métier chacun, tous disponibles 24h/24.",
};

// Sprint 2 will bring the bubble-scroll experience + avatars. This is a
// functional, on-brand listing so the route is real from day one.
export default function AgentsPage() {
  return (
    <main className="pt-32 sm:pt-40">
      <section className="container-page pb-24 sm:pb-32">
        <p className="eyebrow">L&apos;équipe</p>
        <h1 className="display-xl mt-6">
          Les <span className="accent-text">agents.</span>
        </h1>
        <p className="mt-8 max-w-xl text-subheading leading-snug text-foreground">
          Un métier par agent. Tous autonomes, tous disponibles — à toute heure.
        </p>

        <div className="mt-16 grid gap-px overflow-hidden border border-hairline sm:grid-cols-2">
          {agents.map((agent, i) => (
            <Reveal
              key={agent.id}
              delay={(i % 2) * 0.06}
              className="flex min-h-56 flex-col justify-between bg-surface p-8"
            >
              <div id={agent.id} className="flex items-start justify-between gap-4 scroll-mt-28">
                <span className="text-heading-sm font-medium text-foreground-strong">
                  {agent.name}
                </span>
                <span className="rounded-pill border border-hairline px-3 py-1 text-caption uppercase tracking-wide text-muted">
                  {agent.domain}
                </span>
              </div>
              <div className="mt-6">
                <p className="text-body-sm uppercase tracking-wide text-accent">
                  {agent.role}
                </p>
                <p className="mt-3 text-foreground">{agent.summary}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
