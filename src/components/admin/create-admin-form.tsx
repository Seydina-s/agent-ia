"use client";

import { useActionState } from "react";
import { createAdmin, type UserActionState } from "@/app/admin/users/actions";
import { GlassButton } from "@/components/ui/glass-button";

const initial: UserActionState = {};
const field =
  "w-full bg-transparent border-0 border-b border-hairline py-2.5 text-foreground-strong placeholder:text-muted focus:border-accent focus:outline-none transition-colors";

export function CreateAdminForm() {
  const [state, action, pending] = useActionState(createAdmin, initial);

  return (
    <form action={action} className="flex flex-col gap-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="u-name" className="text-body-sm text-muted">Nom</label>
          <input id="u-name" name="name" className={field} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="u-email" className="text-body-sm text-muted">Email</label>
          <input id="u-email" name="email" type="email" required className={field} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="u-password" className="text-body-sm text-muted">
            Mot de passe (8 car. min.)
          </label>
          <input id="u-password" name="password" type="password" required className={field} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="u-role" className="text-body-sm text-muted">Rôle</label>
            <select id="u-role" name="role" defaultValue="admin" className={`${field} appearance-none`}>
              <option value="admin" className="bg-background">Admin</option>
              <option value="superadmin" className="bg-background">Super admin</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="u-status" className="text-body-sm text-muted">Statut</label>
            <select id="u-status" name="status" defaultValue="active" className={`${field} appearance-none`}>
              <option value="active" className="bg-background">Actif</option>
              <option value="pending" className="bg-background">En attente</option>
            </select>
          </div>
        </div>
      </div>

      {state.error && <p className="text-body-sm text-danger" role="alert">{state.error}</p>}
      {state.success && <p className="text-body-sm text-accent-ink" role="status">{state.success}</p>}

      <div>
        <GlassButton type="submit" disabled={pending}>
          {pending ? "Création…" : "Créer le compte"}
        </GlassButton>
      </div>
    </form>
  );
}
