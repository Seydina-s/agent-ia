"use client";

import { m } from "motion/react";
import type { Agent } from "@/lib/agents";
import { AgentAvatar } from "./agent-avatar";
import { ease, inView } from "@/lib/motion";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

// Avatar reveals first (the "bubble"), like it pops into place.
const bubble = {
  hidden: { opacity: 0, scale: 0.82, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: ease.soft },
  },
};

// Then the text beats reveal in sequence.
const beat = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.soft } },
};

export function AgentAct({
  agent,
  index,
  total,
}: {
  agent: Agent;
  index: number;
  total: number;
}) {
  const flip = index % 2 === 1;

  return (
    <m.section
      id={agent.id}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      className="flex min-h-[78vh] scroll-mt-24 items-center border-b border-hairline py-16 sm:min-h-[80vh]"
    >
      <div
        className={`grid w-full items-center gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-20 ${
          flip ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Bubble */}
        <m.div variants={bubble} className="flex justify-center lg:justify-start">
          <AgentAvatar
            agent={agent}
            className="w-[min(62vw,20rem)] lg:w-[min(28vw,24rem)]"
          />
        </m.div>

        {/* Text */}
        <div>
          <m.div
            variants={beat}
            className="flex items-center gap-4 text-body-sm text-muted"
          >
            <span className="tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-px w-10 bg-hairline" />
            <span className="uppercase tracking-wide">
              {String(total).padStart(2, "0")}
            </span>
          </m.div>

          <m.h2 variants={beat} className="heading mt-5">
            {agent.name}
          </m.h2>

          <m.p
            variants={beat}
            className="mt-3 text-body-sm uppercase tracking-wide text-accent-ink"
          >
            {agent.role}
          </m.p>

          <m.p
            variants={beat}
            className="mt-6 max-w-md text-subheading leading-snug text-foreground"
          >
            {agent.summary}
          </m.p>

          <m.div variants={beat} className="mt-8">
            <span className="rounded-pill border border-hairline px-4 py-1.5 text-caption uppercase tracking-wide text-muted">
              {agent.domain}
            </span>
          </m.div>
        </div>
      </div>
    </m.section>
  );
}
