"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import {
  login,
  setupFirstAdmin,
  type AuthState,
} from "@/lib/auth/actions";
import { GlassButton } from "@/components/ui/glass-button";
import { Spinner } from "@/components/ui/spinner";

const initial: AuthState = {};
const field =
  "w-full bg-transparent border-0 border-b border-hairline py-3 text-foreground-strong placeholder:text-muted focus:border-accent focus:outline-none transition-colors";

// Live lockout countdown. Remounted (via key) on each locked response, so it
// starts fresh from the server's remaining seconds and ticks down to zero.
function Countdown({ seconds }: { seconds: number }) {
  const [remaining, setRemaining] = useState(seconds);
  useEffect(() => {
    const iv = setInterval(
      () => setRemaining((r) => (r <= 1 ? 0 : r - 1)),
      1000
    );
    return () => clearInterval(iv);
  }, []);
  if (remaining <= 0) return null;
  return (
    <p className="text-body-sm text-danger" role="alert" aria-live="polite">
      Trop d&apos;essais. Réessayez dans{" "}
      <span className="tabular-nums font-medium">{remaining}s</span>.
    </p>
  );
}

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
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-body-sm text-muted">
            Mot de passe {setup && "(8 caractères min.)"}
          </label>
          {!setup && (
            <Link
              href="/admin/forgot"
              className="text-body-sm text-muted underline-offset-4 transition-colors hover:text-accent-ink hover:underline"
            >
              Mot de passe oublié ?
            </Link>
          )}
        </div>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete={setup ? "new-password" : "current-password"}
          className={field}
        />
      </div>

      {state.retryAfter ? (
        <Countdown key={state.nonce} seconds={state.retryAfter} />
      ) : (
        state.error && (
          <p className="text-body-sm text-danger" role="alert">
            {state.error}
          </p>
        )
      )}

      <div className="pt-2">
        <GlassButton size="lg" type="submit" disabled={pending}>
          {pending ? (
            <span className="flex items-center gap-2">
              <Spinner />
              {setup ? "Création…" : "Connexion…"}
            </span>
          ) : setup ? (
            "Créer le compte"
          ) : (
            "Se connecter"
          )}
        </GlassButton>
      </div>
    </form>
  );
}
