import { requireSuperadmin } from "@/lib/auth/session";
import { sql } from "@/lib/db";
import { CreateAdminForm } from "@/components/admin/create-admin-form";
import { setUserStatus, deleteUser } from "./actions";

export const dynamic = "force-dynamic";

type Row = {
  id: string;
  email: string;
  name: string | null;
  role: "superadmin" | "admin";
  status: string;
  last_login_at: string | null;
};

export default async function UsersPage() {
  const me = await requireSuperadmin();
  const users = (await sql`
    select id, email, name, role, status, last_login_at
    from admin_users order by created_at
  `) as Row[];

  return (
    <div className="mx-auto max-w-5xl">
      <header className="flex items-end justify-between gap-4 border-b border-hairline pb-6">
        <div>
          <h1 className="heading">Utilisateurs</h1>
          <p className="mt-2 text-body-sm text-muted">
            {users.length} compte(s) administrateur(s).
          </p>
        </div>
      </header>

      <ul className="mt-6 overflow-hidden rounded-lg border border-hairline">
        {users.map((u) => (
          <li
            key={u.id}
            className="flex flex-col gap-3 border-b border-hairline bg-surface p-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="truncate text-body-sm font-medium text-foreground-strong">
                  {u.name ? `${u.name} · ` : ""}{u.email}
                </span>
                <span
                  className={`rounded-pill border px-2 py-0.5 text-caption uppercase tracking-wide ${
                    u.role === "superadmin" ? "border-accent text-accent-ink" : "border-hairline text-muted"
                  }`}
                >
                  {u.role === "superadmin" ? "Super admin" : "Admin"}
                </span>
                <span
                  className={`rounded-pill border px-2 py-0.5 text-caption uppercase tracking-wide ${
                    u.status === "active" ? "border-hairline text-foreground" : "border-danger text-danger"
                  }`}
                >
                  {u.status === "active" ? "Actif" : "En attente"}
                </span>
                {u.id === me.sub && (
                  <span className="text-caption text-muted">(vous)</span>
                )}
              </div>
            </div>

            {u.id !== me.sub && (
              <div className="flex shrink-0 items-center gap-2">
                <form action={setUserStatus}>
                  <input type="hidden" name="id" value={u.id} />
                  <input
                    type="hidden"
                    name="status"
                    value={u.status === "active" ? "pending" : "active"}
                  />
                  <button className="rounded-pill border border-hairline px-4 py-2 text-body-sm text-foreground transition-colors hover:border-accent hover:text-foreground-strong">
                    {u.status === "active" ? "Suspendre" : "Valider"}
                  </button>
                </form>
                <form action={deleteUser}>
                  <input type="hidden" name="id" value={u.id} />
                  <button className="rounded-pill border border-hairline px-4 py-2 text-body-sm text-danger transition-colors hover:border-danger">
                    Supprimer
                  </button>
                </form>
              </div>
            )}
          </li>
        ))}
      </ul>

      <section className="mt-12">
        <h2 className="eyebrow mb-5">Ajouter un compte</h2>
        <CreateAdminForm />
      </section>
    </div>
  );
}
