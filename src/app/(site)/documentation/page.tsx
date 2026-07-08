import type { Metadata } from "next";
import { glossary } from "@/lib/glossary";
import { Reveal } from "@/components/motion/reveal";
import { GlassButton } from "@/components/ui/glass-button";
import { GlossaryAccordion } from "@/components/docs/glossary-accordion";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Le glossaire d'Agent AI : tous les termes techniques de base (agent IA autonome, LLM, automatisation, API, RAG…) expliqués simplement.",
};

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
            cliquez sur un terme pour dérouler l&apos;explication complète.
          </p>
        </Reveal>
      </section>

      <div className="container-page">
        <Reveal>
          <GlossaryAccordion terms={glossary} />
        </Reveal>
      </div>

      <div className="container-page py-16">
        <Reveal className="flex flex-col items-start gap-5 pt-8">
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
