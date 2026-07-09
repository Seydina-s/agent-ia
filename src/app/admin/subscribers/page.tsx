import { requireAdmin } from "@/lib/auth/session";
import { sql } from "@/lib/db";
import { formatDate } from "@/lib/articles-db";

export const dynamic = "force-dynamic";

type Sub = { id: string; email: string; created_at: string };

export default async function SubscribersPage() {
  await requireAdmin();
  const subs = (await sql`
    select * from newsletter_subscribers order by created_at desc limit 500
  `) as Sub[];

  return (
    <div className="mx-auto max-w-3xl">
      <header className="flex items-end justify-between gap-4 border-b border-hairline pb-6">
        <div>
          <h1 className="heading">Abonnés</h1>
          <p className="mt-2 text-body-sm text-muted">
            {subs.length} inscrit(s) à la newsletter.
          </p>
        </div>
        {subs.length > 0 && (
          <a
            href={`data:text/csv;charset=utf-8,${encodeURIComponent(
              "email,inscrit_le\n" +
                subs.map((s) => `${s.email},${s.created_at}`).join("\n")
            )}`}
            download="abonnes-agent-ai.csv"
            className="rounded-pill border border-hairline px-4 py-2 text-body-sm text-foreground transition-colors hover:border-accent hover:text-foreground-strong"
          >
            Exporter CSV
          </a>
        )}
      </header>

      {subs.length === 0 ? (
        <p className="mt-10 text-muted">Aucun abonné pour l&apos;instant.</p>
      ) : (
        <ul className="mt-6 overflow-hidden rounded-lg border border-hairline">
          {subs.map((s) => (
            <li
              key={s.id}
              className="flex items-center justify-between gap-4 border-b border-hairline bg-surface px-5 py-3.5 last:border-b-0"
            >
              <span className="truncate text-body-sm text-foreground-strong">
                {s.email}
              </span>
              <span className="shrink-0 text-caption text-muted">
                {formatDate(s.created_at)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
