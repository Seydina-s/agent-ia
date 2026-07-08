"use client";

import { useActionState, useId, useState } from "react";
import { m } from "motion/react";
import { submitContact, type ContactState } from "@/app/contact/actions";
import { GlassButton } from "@/components/ui/glass-button";
import { agents } from "@/lib/agents";
import { ease } from "@/lib/motion";

const initial: ContactState = { status: "idle" };
const interests = Array.from(new Set(agents.map((a) => a.domain)));

const fieldBase =
  "w-full bg-transparent border-0 border-b border-hairline py-3 text-foreground-strong placeholder:text-muted focus:border-accent focus:outline-none transition-colors";

export function ContactForm() {
  // Bumping the key remounts the inner form to reset its action state.
  const [key, setKey] = useState(0);
  return <FormInner key={key} onReset={() => setKey((k) => k + 1)} />;
}

function FormInner({ onReset }: { onReset: () => void }) {
  const [state, action, pending] = useActionState(submitContact, initial);
  const uid = useId();
  const v = state.values;
  const err = state.errors;

  if (state.status === "success") {
    return (
      <m.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: ease.soft }}
        className="flex flex-col items-start gap-6 border-l-2 border-accent pl-6"
      >
        <span className="accent-text text-heading-sm font-bold">✳</span>
        <p className="heading">Message reçu.</p>
        <p className="max-w-md text-subheading leading-snug text-foreground">
          {state.message ?? "On revient vers vous très vite."}
        </p>
        <button
          type="button"
          onClick={onReset}
          className="text-body-sm text-muted underline-offset-4 transition-colors hover:text-foreground-strong hover:underline"
        >
          Envoyer un autre message
        </button>
      </m.div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-8" noValidate>
      {/* honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-8 sm:grid-cols-2">
        <Field
          id={`${uid}-name`}
          name="name"
          label="Nom complet"
          defaultValue={v?.name}
          error={err?.name}
          autoComplete="name"
          required
        />
        <Field
          id={`${uid}-email`}
          name="email"
          type="email"
          label="Email"
          defaultValue={v?.email}
          error={err?.email}
          autoComplete="email"
          required
        />
        <Field
          id={`${uid}-company`}
          name="company"
          label="Entreprise (optionnel)"
          defaultValue={v?.company}
          autoComplete="organization"
        />
        <div className="flex flex-col gap-2">
          <label
            htmlFor={`${uid}-interest`}
            className="text-body-sm text-muted"
          >
            Ce qui vous intéresse
          </label>
          <select
            id={`${uid}-interest`}
            name="interest"
            defaultValue={v?.interest ?? ""}
            className={`${fieldBase} appearance-none`}
          >
            <option value="">Je ne sais pas encore</option>
            {interests.map((d) => (
              <option key={d} value={d} className="bg-background text-foreground-strong">
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Field
        id={`${uid}-message`}
        name="message"
        label="Votre message"
        as="textarea"
        defaultValue={v?.message}
        error={err?.message}
        required
      />

      <div className="flex flex-wrap items-center gap-5 pt-2">
        <GlassButton size="lg" type="submit" disabled={pending}>
          {pending ? "Envoi…" : "Envoyer le message"}
        </GlassButton>
        {state.status === "error" && (
          <span role="status" className="text-body-sm text-danger">
            Vérifiez les champs indiqués.
          </span>
        )}
      </div>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  error,
  as = "input",
  type = "text",
  defaultValue,
  autoComplete,
  required,
}: {
  id: string;
  name: string;
  label: string;
  error?: string;
  as?: "input" | "textarea";
  type?: string;
  defaultValue?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  const errorId = `${id}-error`;
  const common = {
    id,
    name,
    defaultValue,
    autoComplete,
    required,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: `${fieldBase} ${error ? "border-danger" : ""}`,
  } as const;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-body-sm text-muted">
        {label}
      </label>
      {as === "textarea" ? (
        <textarea {...common} rows={5} className={`${common.className} resize-none`} />
      ) : (
        <input {...common} type={type} />
      )}
      {error && (
        <p id={errorId} className="text-caption text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
