"use client";

import { useActionState, useId } from "react";
import { m } from "motion/react";
import {
  subscribeNewsletter,
  type NewsletterState,
} from "@/app/actions/newsletter";
import { ease } from "@/lib/motion";

const initial: NewsletterState = { status: "idle" };

export function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribeNewsletter, initial);
  const id = useId();
  const errored = state.status === "error";

  return (
    <div className="max-w-sm">
      <p className="text-body-sm font-medium text-foreground-strong">
        Newsletter
      </p>
      <p className="mt-2 text-body-sm text-muted">
        Les avancées de nos agents et nos actualités, une fois par mois.
      </p>

      {state.status === "success" ? (
        <m.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: ease.soft }}
          className="mt-4 text-body-sm text-accent"
          role="status"
        >
          {state.message}
        </m.p>
      ) : (
        <form action={action} className="mt-4">
          {/* honeypot */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />
          <div className="flex items-end gap-3 border-b border-hairline focus-within:border-accent">
            <label htmlFor={`${id}-email`} className="sr-only">
              Votre email
            </label>
            <input
              id={`${id}-email`}
              type="email"
              name="email"
              required
              placeholder="vous@entreprise.sn"
              aria-invalid={errored || undefined}
              className="w-full bg-transparent py-2.5 text-foreground-strong placeholder:text-muted focus:outline-none"
            />
            <button
              type="submit"
              disabled={pending}
              className="shrink-0 pb-2.5 text-body-sm font-medium uppercase tracking-wide text-accent transition-opacity hover:opacity-80 disabled:opacity-50"
            >
              {pending ? "…" : "S'inscrire"}
            </button>
          </div>
          {errored && (
            <p className="mt-2 text-caption text-danger" role="status">
              {state.message}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
