import Link from "next/link";
import { logout } from "@/lib/auth/actions";
import type { SessionPayload } from "@/lib/auth/session";
import { AdminNav } from "@/components/admin/admin-nav";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function AdminShell({
  session,
  children,
}: {
  session: SessionPayload;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="border-b border-hairline lg:sticky lg:top-0 lg:h-dvh lg:w-64 lg:shrink-0 lg:overflow-y-auto lg:border-b-0 lg:border-r">
        <Link
          href="/admin"
          className="flex items-center gap-2.5 px-5 py-5 lg:py-6"
        >
          <span className="grid size-8 place-items-center rounded-lg accent-fill text-black">
            <span className="text-body-sm font-bold">A</span>
          </span>
          <span className="text-body-sm font-medium text-foreground-strong">
            Agent AI · Admin
          </span>
        </Link>
        <AdminNav role={session.role} />
      </aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-hairline bg-background/85 px-5 py-3 backdrop-blur-lg">
          <div className="flex items-center gap-2 text-body-sm">
            <span className="text-muted">{session.email}</span>
            <span
              className={`rounded-pill border px-2 py-0.5 text-caption uppercase tracking-wide ${
                session.role === "superadmin"
                  ? "border-accent text-accent-ink"
                  : "border-hairline text-muted"
              }`}
            >
              {session.role === "superadmin" ? "Super admin" : "Admin"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <form action={logout}>
              <button
                type="submit"
                className="rounded-pill border border-hairline px-4 py-2 text-body-sm text-foreground transition-colors hover:border-accent hover:text-foreground-strong"
              >
                Déconnexion
              </button>
            </form>
          </div>
        </header>

        <div className="min-w-0 flex-1 px-5 py-8 sm:px-8">{children}</div>
      </div>
    </div>
  );
}
