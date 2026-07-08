"use client";

import { useActionState } from "react";
import {
  login,
  setupFirstAdmin,
  type AuthState,
} from "@/lib/auth/actions";
import { GlassButton } from "@/components/ui/glass-button";

const initial: AuthState = {};
const field =
  "w-full bg-transparent border-0 border-b border-hairline py-3 text-foreground-strong placeholder:text-muted focus:border-accent focus:outline-none transition-colors";

export function AuthForm({ setup }: { setup: boolean }) {
  const [state, action, pending] = useActionState(
    setup ? setupFirstAdmin : login,
    initial
  );

  return (
    <form action={action} className="flex flex-col gap-6" noValidate>
      {setup && (
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-body-sm text-muted">
            Votre nom
          </label>
          <input id="name" name="name" autoComplete="name" className={field} />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-body-sm text-muted">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className={field}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-body-sm text-muted">
          Mot de passe {setup && "(8 caractères min.)"}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete={setup ? "new-password" : "current-password"}
          className={field}
        />
      </div>

      {state.error && (
        <p className="text-body-sm text-danger" role="alert">
          {state.error}
        </p>
      )}

      <div className="pt-2">
        <GlassButton size="lg" type="submit" disabled={pending}>
          {pending
            ? "…"
            : setup
              ? "Créer le compte"
              : "Se connecter"}
        </GlassButton>
      </div>
    </form>
  );
}
