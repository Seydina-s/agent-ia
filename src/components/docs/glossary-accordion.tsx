"use client";

import { useState } from "react";
import { m } from "motion/react";
import type { Term } from "@/lib/glossary";

function AccordionItem({ term, index }: { term: Term; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `glossary-panel-${index}`;
  const btnId = `glossary-btn-${index}`;

  return (
    <div className="border-t border-hairline">
      <h2>
        <button
          id={btnId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-foreground-strong"
        >
          <span className="flex flex-col gap-1">
            <span className="text-heading-sm font-medium text-foreground-strong">
              {term.term}
            </span>
            <span className="text-body-sm text-accent-ink">{term.short}</span>
          </span>
          <m.span
            aria-hidden
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0 text-3xl font-light leading-none text-muted"
          >
            +
          </m.span>
        </button>
      </h2>

      {/* grid-rows trick: content stays in the DOM (SEO) but animates open/closed */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pb-7 leading-relaxed text-foreground">
            {term.body}
          </p>
        </div>
      </div>
    </div>
  );
}

export function GlossaryAccordion({ terms }: { terms: Term[] }) {
  return (
    <div className="border-b border-hairline">
      {terms.map((t, i) => (
        <AccordionItem key={t.term} term={t} index={i} />
      ))}
    </div>
  );
}
