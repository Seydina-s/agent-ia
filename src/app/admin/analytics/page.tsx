import Link from "next/link";
import { requireAdmin } from "@/lib/auth/session";
import {
  getTotals,
  getDailySeries,
  getTopPages,
  getDevices,
  getReferrers,
} from "@/lib/analytics";

export const dynamic = "force-dynamic";

function BarList({
  items,
  emptyLabel,
}: {
  items: { label: string; n: number }[];
  emptyLabel: string;
}) {
  const max = Math.max(1, ...items.map((i) => i.n));
  if (items.length === 0)
    return <p className="text-body-sm text-muted">{emptyLabel}</p>;
  return (
    <ul className="flex flex-col gap-3">
      {items.map((i) => (
        <li key={i.label} className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-4 text-body-sm">
            <span className="truncate text-foreground">{i.label}</span>
            <span className="tabular-nums text-muted">{i.n}</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-pill bg-hairline">
            <div
              className="accent-fill h-full rounded-pill"
              style={{ width: `${(i.n / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default async function AnalyticsPage() {
  await requireAdmin();
  const [totals, series, pages, devices, referrers] = await Promise.all([
    getTotals(),
    getDailySeries(),
    getTopPages(),
    getDevices(),
    getReferrers(),
  ]);

  const maxDay = Math.max(1, ...series.map((d) => d.n));
  const cards = [
    { label: "Total", value: totals.total },
    { label: "Aujourd'hui", value: totals.today },
    { label: "7 jours", value: totals.week },
    { label: "30 jours", value: totals.month },
  ];

  return (
    <main className="container-page py-10">
      <header className="border-b border-hairline pb-6">
        <Link
          href="/admin"
          className="text-body-sm text-muted transition-colors hover:text-foreground-strong"
        >
          ← Tableau de bord
        </Link>
        <h1 className="heading mt-2">Analytics</h1>
        <p className="mt-2 text-body-sm text-muted">
          Trafic du site — sans cookies ni données personnelles.
        </p>
      </header>

      <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-hairline lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-surface p-6">
            <div className="text-[length:var(--text-heading)] font-bold leading-none text-foreground-strong">
              {c.value}
            </div>
            <div className="mt-2 text-caption uppercase tracking-wide text-muted">
              {c.label}
            </div>
          </div>
        ))}
      </div>

      {/* 14-day chart */}
      <section className="mt-12">
        <h2 className="eyebrow">Vues · 14 derniers jours</h2>
        <div className="mt-5 flex h-40 items-end gap-1.5 border-b border-hairline pb-px">
          {series.map((d) => (
            <div
              key={d.day}
              className="group relative flex-1"
              title={`${d.day} — ${d.n} vue(s)`}
            >
              <div
                className="accent-fill w-full rounded-t-sm transition-all"
                style={{ height: `${Math.max(2, (d.n / maxDay) * 100)}%` }}
              />
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-caption text-muted">
          <span>{series[0]?.day.slice(5)}</span>
          <span>{series[series.length - 1]?.day.slice(5)}</span>
        </div>
      </section>

      <div className="mt-12 grid gap-10 lg:grid-cols-3">
        <section>
          <h2 className="eyebrow mb-5">Pages populaires (30j)</h2>
          <BarList items={pages} emptyLabel="Pas encore de données." />
        </section>
        <section>
          <h2 className="eyebrow mb-5">Appareils (30j)</h2>
          <BarList items={devices} emptyLabel="Pas encore de données." />
        </section>
        <section>
          <h2 className="eyebrow mb-5">Sources (30j)</h2>
          <BarList items={referrers} emptyLabel="Pas encore de données." />
        </section>
      </div>
    </main>
  );
}
