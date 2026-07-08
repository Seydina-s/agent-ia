import Link from "next/link";
import { getSession } from "@/lib/auth/session";
import { logout } from "@/lib/auth/actions";
import { sql } from "@/lib/db";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export const dynamic = "force-dynamic";

async function getMetrics() {
  const [articles, published, messages, subs, views, viewsToday] =
    await Promise.all([
      sql`select count(*)::int as n from articles`,
      sql`select count(*)::int as n from articles where status = 'published'`,
      sql`select count(*)::int as n from contact_messages`,
      sql`select count(*)::int as n from newsletter_subscribers`,
      sql`select count(*)::int as n from page_views`,
      sql`select count(*)::int as n from page_views where created_at >= now() - interval '1 day'`,
    ]);
  return {
    articles: (articles as { n: number }[])[0].n,
    published: (published as { n: number }[])[0].n,
    messages: (messages as { n: number }[])[0].n,
    subs: (subs as { n: number }[])[0].n,
    views: (views as { n: number }[])[0].n,
    viewsToday: (viewsToday as { n: number }[])[0].n,
  };
}

export default async function AdminDashboard() {
  const session = await getSession();
  const m = await getMetrics();

  const metrics = [
    { label: "Visites (total)", value: m.views },
    { label: "Visites (24h)", value: m.viewsToday },
    { label: "Articles publiés", value: m.published },
    { label: "Brouillons", value: m.articles - m.published },
    { label: "Messages", value: m.messages },
    { label: "Abonnés newsletter", value: m.subs },
  ];

  const sections = [
    { label: "Articles", desc: "Rédiger et publier", href: "/admin/articles" },
    { label: "Messages", desc: "Boîte de réception contact", soon: true },
    { label: "Abonnés", desc: "Liste newsletter", soon: true },
    { label: "Analytics", desc: "Trafic & pages", soon: true },
  ];

  return (
    <main className="container-page py-10">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline pb-6">
        <div>
          <p className="eyebrow">Backoffice</p>
          <h1 className="heading mt-2">Tableau de bord</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden text-body-sm text-muted sm:inline">
            {session?.email}
          </span>
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

      <section className="mt-10">
        <h2 className="eyebrow">Vue d&apos;ensemble</h2>
        <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden border border-hairline sm:grid-cols-3 lg:grid-cols-6">
          {metrics.map((x) => (
            <div key={x.label} className="bg-surface p-6">
              <div className="text-[length:var(--text-heading)] font-bold leading-none text-foreground-strong">
                {x.value}
              </div>
              <div className="mt-2 text-caption uppercase tracking-wide text-muted">
                {x.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="eyebrow">Gestion</h2>
        <div className="mt-5 grid gap-px overflow-hidden border border-hairline sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((s) => {
            const inner = (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-heading-sm font-medium text-foreground-strong">
                    {s.label}
                  </span>
                  {s.soon ? (
                    <span className="rounded-pill border border-hairline px-2 py-0.5 text-caption uppercase tracking-wide text-muted">
                      Bientôt
                    </span>
                  ) : (
                    <span aria-hidden className="text-accent-ink">
                      →
                    </span>
                  )}
                </div>
                <span className="text-body-sm text-muted">{s.desc}</span>
              </>
            );
            return s.href ? (
              <Link
                key={s.label}
                href={s.href}
                className="flex flex-col gap-2 bg-surface p-6 transition-colors hover:bg-hairline"
              >
                {inner}
              </Link>
            ) : (
              <div key={s.label} className="flex flex-col gap-2 bg-surface p-6">
                {inner}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
