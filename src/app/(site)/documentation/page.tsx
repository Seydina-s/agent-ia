import type { Metadata } from "next";
import { glossary } from "@/lib/glossary";
import { Reveal } from "@/components/motion/reveal";
import { GlassButton } from "@/components/ui/glass-button";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Le glossaire d'Agent AI : tous les termes techniques de base (agent IA autonome, LLM, automatisation, API, RAG…) expliqués simplement.",
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function DocumentationPage() {
  return (
    <main>
      <section className="container-page pt-32 pb-14 sm:pt-40 sm:pb-20">
        <Reveal>
          <p className="eyebrow">Documentation</p>
          <h1 className="display-xl mt-6 max-w-[9em] text-balance">
            Les mots, <span className="accent-text">sans le jargon.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-balance text-subheading leading-snug text-foreground">
            Tout ce qu&apos;il faut comprendre sur les agents IA autonomes —
            expliqué simplement, sans prérequis technique.
          </p>
        </Reveal>
      </section>

      {/* Quick index */}
      <div className="container-page pb-10">
        <Reveal className="flex flex-wrap gap-2">
          {glossary.map((t) => (
            <a
              key={t.term}
              href={`#${slugify(t.term)}`}
              className="rounded-pill border border-hairline px-3 py-1.5 text-caption text-muted transition-colors hover:border-accent hover:text-foreground-strong"
            >
              {t.term}
            </a>
          ))}
        </Reveal>
      </div>

      <div className="container-page">
        {glossary.map((t) => (
          <Reveal
            key={t.term}
            as="section"
            className="grid gap-4 border-t border-hairline py-10 lg:grid-cols-[0.5fr_1fr] lg:gap-16"
          >
            <div id={slugify(t.term)} className="scroll-mt-28">
              <h2 className="text-heading-sm font-medium text-foreground-strong">
                {t.term}
              </h2>
              <p className="mt-2 text-body-sm text-accent">{t.short}</p>
            </div>
            <p className="max-w-2xl leading-relaxed text-foreground">{t.body}</p>
          </Reveal>
        ))}
      </div>

      <div className="container-page py-16">
        <Reveal className="flex flex-col items-start gap-5 border-t border-hairline pt-12">
          <p className="heading max-w-xl text-balance">
            Une question qui n&apos;est pas ici&nbsp;?
          </p>
          <GlassButton href="/contact" size="lg">
            Posez-la nous
          </GlassButton>
        </Reveal>
      </div>
    </main>
  );
}
