import { Reveal } from "@/components/motion/reveal";
import { GlassButton } from "@/components/ui/glass-button";

export function ClosingCta() {
  return (
    <section className="border-t border-hairline py-28 sm:py-40">
      <div className="container-page">
        <Reveal className="flex flex-col items-start gap-10">
          <h2 className="heading-lg max-w-4xl text-balance">
            Confiez le travail. <span className="accent-text">Gardez le cap.</span>
          </h2>
          <p className="max-w-xl text-subheading leading-snug text-foreground">
            Dites-nous ce qui vous ralentit. On vous montre quel agent s&apos;en
            charge — dès aujourd&apos;hui.
          </p>
          <GlassButton href="/contact" size="lg">
            Démarrer la conversation
          </GlassButton>
        </Reveal>
      </div>
    </section>
  );
}
