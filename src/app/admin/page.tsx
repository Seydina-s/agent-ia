import Link from "next/link";
import { getSession } from "@/lib/auth/session";
import { sql } from "@/lib/db";
import { GlassButton } from "@/components/ui/glass-button";

export const dynamic = "force-dynamic";

async function getMetrics() {
  const [articles, published, messages, subs, views, viewsToday, admins] =
    await Promise.all([
      sql`select count(*)::int as n from articles`,
      sql`select count(*)::int as n from articles where status = 'published'`,
      sql`select count(*)::int as n from contact_messages`,
      sql`select count(*)::int as n from newsletter_subscribers`,
      sql`select count(*)::int as n from page_views`,
      sql`select count(*)::int as n from page_views where created_at >= now() - interval '1 day'`,
      sql`select count(*)::int as n from admin_users`,
    ]);
  const n = (r: unknown) => (r as { n: number }[])[0].n;
  return {
    articles: n(articles),
    published: n(published),
    messages: n(messages),
    subs: n(subs),
    views: n(views),
    viewsToday: n(viewsToday),
    admins: n(admins),
  };
}

export default async function AdminDashboard() {
  const session = await getSession();
  const m = await getMetrics();

  const metrics = [
    { label: "Visites (total)", value: m.views, href: "/admin/analytics" },
    { label: "Visites (24h)", value: m.viewsToday, href: "/admin/analytics" },
    { label: "Articles publiés", value: m.published, href: "/admin/articles" },
    { label: "Brouillons", value: m.articles - m.published, href: "/admin/articles" },
    { label: "Messages", value: m.messages, href: "/admin/messages" },
    { label: "Abonnés", value: m.subs, href: "/admin/subscribers" },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Bienvenue{session?.email ? "" : ""}</p>
          <h1 className="heading mt-2">Tableau de bord</h1>
        </div>
        <GlassButton href="/admin/articles/new">＋ Nouvel article</GlassButton>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-hairline sm:grid-cols-3 lg:grid-cols-6">
        {metrics.map((x) => (
          <Link
            key={x.label}
            href={x.href}
            className="bg-surface p-6 transition-colors hover:bg-hairline"
          >
            <div className="text-[length:var(--text-heading)] font-bold leading-none text-foreground-strong">
              {x.value}
            </div>
            <div className="mt-2 text-caption uppercase tracking-wide text-muted">
              {x.label}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <QuickCard
          href="/admin/articles/new"
          title="Écrire un article"
          desc="Rédigez, ajoutez une image, publiez — il apparaît aussitôt sur le blog."
        />
        <QuickCard
          href="/admin/messages"
          title="Voir les messages"
          desc="Les demandes reçues via le formulaire de contact."
        />
        {session?.role === "superadmin" && (
          <QuickCard
            href="/admin/users"
            title="Gérer les accès"
            desc="Ajouter, suspendre ou retirer des comptes administrateurs."
          />
        )}
      </div>
    </div>
  );
}

function QuickCard({
  href,
  title,
  desc,
}: {
  href: string;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-2 rounded-lg border border-hairline p-6 transition-colors hover:border-accent"
    >
      <div className="flex items-center justify-between">
        <span className="text-heading-sm font-medium text-foreground-strong">
          {title}
        </span>
        <span aria-hidden className="text-accent-ink transition-transform group-hover:translate-x-1">
          →
        </span>
      </div>
      <span className="text-body-sm text-muted">{desc}</span>
    </Link>
  );
}
