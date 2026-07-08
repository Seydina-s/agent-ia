import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Dites-nous ce qui vous ralentit. On revient vers vous avec l'agent IA autonome qu'il vous faut.",
};

export default function ContactPage() {
  return (
    <main className="pt-32 sm:pt-40">
      <section className="container-page pb-28 sm:pb-40">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* Pitch */}
          <div>
            <Reveal>
              <p className="eyebrow">Contact · Dakar</p>
              <h1 className="display-xl mt-6 max-w-[9em] text-balance">
                Parlons de <span className="accent-text">vous.</span>
              </h1>
              <p className="mt-8 max-w-md text-balance text-subheading leading-snug text-foreground">
                Décrivez ce qui vous ralentit. On revient vers vous avec
                l&apos;agent qu&apos;il vous faut — sous 24h.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-12 flex flex-col gap-4">
              <a
                href="mailto:bonjour@agent-ai.sn"
                className="text-heading-sm text-foreground-strong underline-offset-4 transition-colors hover:text-accent-ink hover:underline"
              >
                bonjour@agent-ai.sn
              </a>
              <span className="text-body-sm text-muted">
                Ou remplissez le formulaire — c&apos;est plus rapide.
              </span>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.15} className="lg:pt-4">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
