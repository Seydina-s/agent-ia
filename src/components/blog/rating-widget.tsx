"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { rateArticle } from "@/app/(site)/blog/engagement-actions";
import type { RatingSummary } from "@/lib/engagement";

export function RatingWidget({
  articleId,
  initial,
}: {
  articleId: string;
  initial: RatingSummary;
}) {
  const [summary, setSummary] = useState(initial);
  const [hover, setHover] = useState(0);
  const [pending, setPending] = useState(false);

  const active = hover || summary.mine || 0;

  async function vote(n: number) {
    if (pending) return;
    setPending(true);
    try {
      setSummary(await rateArticle(articleId, n));
    } finally {
      setPending(false);
    }
  }

  const avg = summary.average.toFixed(1).replace(".", ",");

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-hairline p-5">
      <p className="text-body-sm text-muted">
        {summary.mine ? "Votre note" : "Cet article vous a plu ?"}
      </p>
      <div className="flex items-center gap-3">
        <div
          className="flex items-center gap-1"
          onMouseLeave={() => setHover(0)}
          role="radiogroup"
          aria-label="Noter l'article sur 5"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              disabled={pending}
              onMouseEnter={() => setHover(n)}
              onClick={() => vote(n)}
              aria-label={`${n} étoile${n > 1 ? "s" : ""}`}
              aria-checked={summary.mine === n}
              role="radio"
              className="p-0.5 transition-transform hover:scale-110 disabled:opacity-60"
            >
              <Star
                size={24}
                className={
                  n <= active
                    ? "fill-accent text-accent"
                    : "fill-transparent text-muted"
                }
              />
            </button>
          ))}
        </div>
        <span className="text-body-sm text-muted">
          {summary.count > 0
            ? `${avg}/5 · ${summary.count} avis`
            : "Soyez le premier à noter"}
        </span>
      </div>
      {summary.mine ? (
        <p className="text-body-sm text-accent-ink">Merci pour votre note !</p>
      ) : null}
    </div>
  );
}
