import type { Metadata } from "next";
import { agents } from "@/lib/agents";
import { Reveal } from "@/components/motion/reveal";
import { GlassButton } from "@/components/ui/glass-button";
import { Button } from "@/components/ui/button";
import { ClosingCta } from "@/components/sections/closing-cta";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Deux façons de travailler avec Agent AI : des agents IA autonomes prêts à l'emploi pour vos tâches répétitives, ou un agent sur mesure conçu pour votre besoin précis.",
};

export default function ServicesPage() {
  return (
    <main>
      <section className="container-page pt-32 pb-16 sm:pt-40 sm:pb-24">
        <Reveal>
          <p className="eyebrow">Services</p>
          <h1 className="display-xl mt-6 max-w-[11em] text-balance">
            Deux façons de <span className="accent-text">déléguer.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-balance text-subheading leading-snug text-foreground">
            Nous concevons des agents IA autonomes à 100% pour les entreprises.
            Prenez les nôtres, prêts à travailler — ou faites-en fabriquer un,
            taillé pour votre métier.
          </p>
        </Reveal>
      </section>

      {/* Offer 1 — ready-made agents */}
      <Reveal
        as="section"
        className="container-page grid gap-8 border-t border-hairline py-14 sm:py-16 lg:grid-cols-[0.55fr_1fr] lg:gap-16"
      >
        <div>
          <span className="text-body-sm tabular-nums text-muted">01</span>
          <h2 className="heading mt-3">Des agents prêts à travailler</h2>
          <p className="mt-4 max-w-md text-foreground">
            Dix agents autonomes qui prennent en charge vos tâches répétitives —
            de la relation client à la data. Vous choisissez, on déploie en
            quelques jours.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <GlassButton href="/agents">Rencontrer les agents</GlassButton>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px self-start overflow-hidden rounded-lg border border-hairline sm:grid-cols-2">
          {agents.map((a) => (
            <div key={a.id} className="bg-surface p-5">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-body-sm font-medium text-foreground-strong">
                  {a.name}
                </span>
                <span className="text-caption uppercase tracking-wide text-muted">
                  {a.domain}
                </span>
              </div>
              <p className="mt-1 text-body-sm text-muted">{a.role}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Offer 2 — bespoke agent */}
      <Reveal
        as="section"
        className="container-page grid gap-8 border-t border-hairline py-14 sm:py-16 lg:grid-cols-[0.55fr_1fr] lg:gap-16"
      >
        <div>
          <span className="text-body-sm tabular-nums text-muted">02</span>
          <h2 className="heading mt-3">
            Un agent <span className="accent-text">taillé pour vous</span>
          </h2>
          <p className="mt-4 max-w-md text-foreground">
            Un besoin que nos agents ne couvrent pas encore ? On conçoit un agent
            sur mesure, pensé autour de votre processus, branché à vos outils.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <GlassButton href="/contact" size="lg">
              Commander un agent sur mesure
            </GlassButton>
          </div>
        </div>

        <ul className="flex flex-col gap-4 self-start">
          {[
            [
              "On part de votre problème",
              "Un échange pour cerner la tâche à automatiser et le résultat attendu.",
            ],
            [
              "On conçoit l'agent",
              "Rôle, compétences, garde-fous et connexions à vos outils (WhatsApp, Notion, votre site…).",
            ],
            [
              "On déploie et on ajuste",
              "L'agent travaille, vous gardez la main. On affine jusqu'à ce que ce soit parfait.",
            ],
          ].map(([t, d], i) => (
            <li
              key={t}
              className="flex gap-4 rounded-lg border border-hairline p-5"
            >
              <span className="accent-text text-heading-sm font-bold">
                {i + 1}
              </span>
              <div>
                <p className="text-body-sm font-medium text-foreground-strong">
                  {t}
                </p>
                <p className="mt-1 text-body-sm text-muted">{d}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Offer 3 — integration & orchestration */}
      <Reveal
        as="section"
        className="container-page grid gap-8 border-t border-hairline py-14 sm:py-16 lg:grid-cols-[0.55fr_1fr] lg:gap-16"
      >
        <div>
          <span className="text-body-sm tabular-nums text-muted">03</span>
          <h2 className="heading mt-3">Intégration & orchestration</h2>
          <p className="mt-4 max-w-md text-foreground">
            Plusieurs agents, un seul chef d&apos;orchestre. On les connecte à
            votre stack et on les fait travailler ensemble — pour que
            l&apos;automatisation couvre tout un flux, pas juste une tâche.
          </p>
          <div className="mt-8">
            <Button href="/contact" variant="ghost">
              En discuter
            </Button>
          </div>
        </div>
        <ul className="flex flex-col gap-3 self-start">
          {[
            "Connexion à vos outils (CRM, WhatsApp, Slack, Notion, votre site…)",
            "Coordination de plusieurs agents sur un même processus",
            "Tableau de bord unique pour tout piloter et mesurer",
          ].map((o) => (
            <li key={o} className="flex items-start gap-3 text-foreground">
              <span
                aria-hidden
                className="mt-2 size-1.5 shrink-0 rounded-pill bg-accent"
              />
              {o}
            </li>
          ))}
        </ul>
      </Reveal>

      <ClosingCta />
    </main>
  );
}
