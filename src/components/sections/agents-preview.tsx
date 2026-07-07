"use client";

import Link from "next/link";
import { m } from "motion/react";
import { agents } from "@/lib/agents";
import { fadeUp, inView, stagger } from "@/lib/motion";
import { Button } from "@/components/ui/button";

export function AgentsPreview() {
  return (
    <section className="border-t border-hairline py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="eyebrow">L&apos;équipe</p>
            <h2 className="heading mt-4">
              Dix métiers. <span className="accent-text">Un seul réflexe :</span>{" "}
              agir.
            </h2>
          </div>
          <Button href="/agents" variant="outline" size="md">
            Voir tous les agents
          </Button>
        </div>

        <m.ul
          className="mt-14"
          variants={stagger(0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
        >
          {agents.map((agent, i) => (
            <m.li key={agent.id} variants={fadeUp}>
              <Link
                href={`/agents#${agent.id}`}
                className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-b border-hairline py-5 transition-colors hover:bg-surface sm:grid-cols-[3.5rem_minmax(0,10rem)_1fr_auto] sm:gap-6 sm:py-6"
              >
                <span className="text-body-sm tabular-nums text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-heading-sm font-medium text-foreground-strong">
                  {agent.name}
                </span>
                <span className="col-start-2 col-end-4 text-body-sm text-foreground sm:col-auto">
                  {agent.role}
                </span>
                <span className="hidden shrink-0 items-center gap-3 sm:flex">
                  <span className="rounded-pill border border-hairline px-3 py-1 text-caption uppercase tracking-wide text-muted">
                    {agent.domain}
                  </span>
                  <span
                    aria-hidden
                    className="text-accent transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            </m.li>
          ))}
        </m.ul>
      </div>
    </section>
  );
}
