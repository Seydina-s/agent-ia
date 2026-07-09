"use client";

import Link from "next/link";
import { useActionState } from "react";
import { requestPasswordReset, type ResetState } from "@/app/admin/reset-actions";
import { GlassButton } from "@/components/ui/glass-button";
import { Spinner } from "@/components/ui/spinner";

const initial: ResetState = {};
const field =
  "w-full bg-transparent border-0 border-b border-hairline py-3 text-foreground-strong placeholder:text-muted focus:border-accent focus:outline-none transition-colors";

export function ForgotForm() {
  const [state, action, pending] = useActionState(requestPasswordReset, initial);

  if (state.success) {
    return (
      <div className="flex flex-col gap-6">
        <p className="text-body-sm text-accent-ink" role="status">
          {state.success}
        </p>
        <Link
          href="/admin/login"
          className="text-body-sm text-muted underline-offset-4 hover:text-foreground-strong hover:underline"
        >
          ← Retour à la connexion
        </Link>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-6" noValidate>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-body-sm text-muted">
          Votre email
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" className={field} />
      </div>

      {state.error && (
        <p className="text-body-sm text-danger" role="alert">
          {state.error}
        </p>
      )}

      <div className="flex items-center gap-4 pt-2">
        <GlassButton size="lg" type="submit" disabled={pending}>
          {pending ? (
            <span className="flex items-center gap-2">
              <Spinner /> Envoi…
            </span>
          ) : (
            "Envoyer le lien"
          )}
        </GlassButton>
        <Link
          href="/admin/login"
          className="text-body-sm text-muted underline-offset-4 hover:text-foreground-strong hover:underline"
        >
          Annuler
        </Link>
      </div>
    </form>
  );
}
