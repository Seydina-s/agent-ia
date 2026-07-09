"use client";

import { useActionState } from "react";
import { resetPassword, type ResetState } from "@/app/admin/reset-actions";
import { GlassButton } from "@/components/ui/glass-button";
import { Spinner } from "@/components/ui/spinner";
import { PasswordField } from "@/components/ui/password-field";

const initial: ResetState = {};

export function ResetForm({ token }: { token: string }) {
  const [state, action, pending] = useActionState(resetPassword, initial);

  return (
    <form action={action} className="flex flex-col gap-6" noValidate>
      <input type="hidden" name="token" value={token} />
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-body-sm text-muted">
          Nouveau mot de passe (8 caractères min.)
        </label>
        <PasswordField
          id="password"
          name="password"
          required
          autoComplete="new-password"
        />
      </div>

      {state.error && (
        <p className="text-body-sm text-danger" role="alert">
          {state.error}
        </p>
      )}

      <div className="pt-2">
        <GlassButton size="lg" type="submit" disabled={pending}>
          {pending ? (
            <span className="flex items-center gap-2">
              <Spinner /> Enregistrement…
            </span>
          ) : (
            "Définir le mot de passe"
          )}
        </GlassButton>
      </div>
    </form>
  );
}
