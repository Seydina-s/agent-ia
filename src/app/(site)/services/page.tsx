import type { Metadata } from "next";
import { services } from "@/lib/services";
import { agents } from "@/lib/agents";
import { Reveal } from "@/components/motion/reveal";
import { GlassButton } from "@/components/ui/glass-button";
import { ClosingCta } from "@/components/sections/closing-cta";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Agent AI conçoit des agents IA autonomes à 100% pour automatiser les métiers des entreprises : relation client, marketing, vente, back-office, data.",
};

const nameOf = (id: string) => agents.find((a) => a.id === id)?.name ?? id;

export default function ServicesPage() {
  return (
    <main>
      <section className="container-page pt-32 pb-16 sm:pt-40 sm:pb-24">
        <Reveal>
          <p className="eyebrow">Services</p>
          <h1 className="display-xl mt-6 max-w-[10em] text-balance">
            Des agents pour <span className="accent-text">chaque métier.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-balance text-subheading leading-snug text-foreground">
            Nous concevons des agents IA autonomes à 100% pour les entreprises —
            pensés sur mesure pour vos besoins d&apos;automatisation. Voici ce
            qu&apos;ils prennent en charge, dès aujourd&apos;hui.
          </p>
        </Reveal>
      </section>

      <div className="container-page">
        {services.map((s, i) => (
          <Reveal
            key={s.id}
            as="section"
            className="grid gap-8 border-t border-hairline py-14 sm:py-16 lg:grid-cols-[0.5fr_1fr] lg:gap-16"
          >
            <div>
              <span className="text-body-sm tabular-nums text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="heading mt-3">{s.title}</h2>
              <p className="mt-3 text-body-sm text-muted">
                {s.agentIds.map(nameOf).join(" · ")}
              </p>
            </div>
            <div>
              <p className="max-w-xl text-subheading leading-snug text-foreground-strong">
                {s.promise}
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {s.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-3 text-foreground">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-pill bg-accent" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="container-page py-16">
        <Reveal className="flex flex-wrap items-center gap-4">
          <GlassButton href="/agents" size="lg">
            Voir les agents
          </GlassButton>
          <GlassButton href="/contact" size="lg">
            Discuter de votre besoin
          </GlassButton>
        </Reveal>
      </div>

      <ClosingCta />
    </main>
  );
}
