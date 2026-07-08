"use client";

import { m } from "motion/react";
import { Button } from "@/components/ui/button";
import { GlassButton } from "@/components/ui/glass-button";
import { SignatureOrb } from "@/components/visual/signature-orb";
import { HeroRobot } from "@/components/visual/hero-robot";
import { agentCount } from "@/lib/agents";
import { ease } from "@/lib/motion";

const rise = {
  hidden: { opacity: 0, y: 26 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: ease.soft, delay: 0.1 + i * 0.09 },
  }),
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Orb backdrop on mobile/tablet (robot replaces it on desktop) */}
      <div className="pointer-events-none absolute inset-0 lg:hidden">
        <SignatureOrb className="absolute right-[-22%] top-[8%] w-[85%] opacity-40 sm:right-[-6%] sm:top-1/2 sm:w-[46%] sm:-translate-y-1/2 sm:opacity-100" />
      </div>

      <div className="container-page relative grid items-center gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-12">
        <div>
          <m.p
          custom={0}
          variants={rise}
          initial="hidden"
          animate="visible"
          className="eyebrow max-w-md"
        >
          La première agence d&apos;agents IA autonomes au Sénégal
        </m.p>

        <m.h1
          custom={1}
          variants={rise}
          initial="hidden"
          animate="visible"
          className="display-xl mt-6 max-w-[9em] text-balance"
        >
          Une équipe qui ne dort{" "}
          <span className="accent-text">jamais.</span>
        </m.h1>

        <m.p
          custom={2}
          variants={rise}
          initial="hidden"
          animate="visible"
          className="mt-8 max-w-xl text-balance text-subheading leading-snug text-foreground"
        >
          {`${agentCount} agents IA autonomes qui répondent, vendent, publient et gèrent — pendant que vous vous concentrez sur l'essentiel.`}
        </m.p>

        <m.div
          custom={3}
          variants={rise}
          initial="hidden"
          animate="visible"
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <GlassButton href="/agents" size="lg">
            Rencontrer les agents
          </GlassButton>
          <Button href="/contact" variant="ghost" size="lg">
            Parler à un humain
          </Button>
        </m.div>
        </div>

        {/* Interactive 3D robot (desktop) — follows the cursor */}
        <div className="relative hidden h-[560px] lg:block">
          <HeroRobot className="absolute inset-0" />
        </div>
      </div>
    </section>
  );
}
