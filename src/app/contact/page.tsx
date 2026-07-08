import type { Metadata } from "next";
import { GlassButton } from "@/components/ui/glass-button";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Parlez-nous de ce qui vous ralentit. On vous montre quel agent IA autonome s'en charge.",
};

// Sprint 3 brings the full hairline-input form + submission. On-brand stub for now.
export default function ContactPage() {
  return (
    <main className="pt-32 sm:pt-40">
      <section className="container-page pb-28 sm:pb-40">
        <p className="eyebrow">Contact</p>
        <h1 className="display-xl mt-6">
          Parlons.<span className="accent-text"> Ici.</span>
        </h1>
        <p className="mt-8 max-w-xl text-subheading leading-snug text-foreground">
          Dites-nous ce qui vous ralentit. On revient vers vous avec l&apos;agent
          qu&apos;il vous faut.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-6">
          <GlassButton href="mailto:bonjour@agent-ai.sn" size="lg">
            bonjour@agent-ai.sn
          </GlassButton>
          <span className="text-body-sm text-muted">
            Formulaire complet — bientôt disponible.
          </span>
        </div>
      </section>
    </main>
  );
}
