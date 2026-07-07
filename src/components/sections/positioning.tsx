import { Reveal } from "@/components/motion/reveal";
import { agentCount } from "@/lib/agents";

const stats = [
  { value: "24/7", label: "Disponibles, sans une pause" },
  { value: `${agentCount}`, label: "Agents autonomes, un par métier" },
  { value: "1re", label: "Agence d'agents IA au Sénégal" },
];

export function Positioning() {
  return (
    <section className="border-t border-hairline py-24 sm:py-32">
      <div className="container-page grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
        <Reveal>
          <p className="eyebrow">Pourquoi Agent AI</p>
          <p className="heading mt-6 text-balance">
            Vous n&apos;engagez pas un logiciel de plus. Vous accueillez une
            équipe qui exécute — jour et nuit, sans relance, sans oubli.
          </p>
          <p className="mt-8 max-w-lg text-subheading leading-snug text-foreground">
            Chaque agent maîtrise son métier et travaille seul. Vous gardez la
            main sur la stratégie ; eux s&apos;occupent de tout le reste.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-px self-center overflow-hidden rounded-none border border-hairline sm:grid-cols-3 lg:grid-cols-1">
          {stats.map((s, i) => (
            <Reveal
              key={s.value}
              delay={i * 0.08}
              className="bg-surface p-8"
            >
              <div className="heading-lg text-[length:var(--text-heading)] leading-none accent-text">
                {s.value}
              </div>
              <div className="mt-3 text-body-sm text-foreground">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
