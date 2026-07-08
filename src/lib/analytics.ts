import { sql } from "@/lib/db";

export type DayCount = { day: string; n: number };
export type LabelCount = { label: string; n: number };

export async function getTotals() {
  const rows = (await sql`
    select
      (select count(*) from page_views)::int as total,
      (select count(*) from page_views where created_at >= now() - interval '1 day')::int as today,
      (select count(*) from page_views where created_at >= now() - interval '7 days')::int as week,
      (select count(*) from page_views where created_at >= now() - interval '30 days')::int as month
  `) as { total: number; today: number; week: number; month: number }[];
  return rows[0];
}

export async function getDailySeries(): Promise<DayCount[]> {
  return (await sql`
    select to_char(d.day, 'YYYY-MM-DD') as day, coalesce(count(pv.id), 0)::int as n
    from generate_series(current_date - interval '13 days', current_date, interval '1 day') as d(day)
    left join page_views pv on date_trunc('day', pv.created_at) = d.day
    group by d.day
    order by d.day
  `) as DayCount[];
}

export async function getTopPages(): Promise<LabelCount[]> {
  return (await sql`
    select path as label, count(*)::int as n from page_views
    where created_at >= now() - interval '30 days'
    group by path order by n desc limit 8
  `) as LabelCount[];
}

export async function getDevices(): Promise<LabelCount[]> {
  return (await sql`
    select coalesce(device, 'inconnu') as label, count(*)::int as n from page_views
    where created_at >= now() - interval '30 days'
    group by device order by n desc
  `) as LabelCount[];
}

export async function getReferrers(): Promise<LabelCount[]> {
  return (await sql`
    select coalesce(nullif(referrer, ''), 'Direct') as label, count(*)::int as n from page_views
    where created_at >= now() - interval '30 days'
    group by referrer order by n desc limit 6
  `) as LabelCount[];
}
