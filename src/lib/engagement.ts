import { sql } from "@/lib/db";
import type { Article } from "@/lib/articles-db";

export type RatingSummary = {
  average: number;
  count: number;
  mine: number | null;
};

export type Comment = {
  id: string;
  author_name: string;
  body: string;
  created_at: string;
};

export async function getRatingSummary(
  articleId: string,
  voterKey?: string
): Promise<RatingSummary> {
  const agg = (await sql`
    select coalesce(avg(rating), 0)::float as average, count(*)::int as count
    from article_ratings where article_id = ${articleId}
  `) as { average: number; count: number }[];

  let mine: number | null = null;
  if (voterKey) {
    const m = (await sql`
      select rating from article_ratings
      where article_id = ${articleId} and voter_key = ${voterKey}
    `) as { rating: number }[];
    mine = m[0]?.rating ?? null;
  }
  return { average: agg[0].average, count: agg[0].count, mine };
}

export async function listComments(articleId: string): Promise<Comment[]> {
  return (await sql`
    select id, author_name, body, created_at from article_comments
    where article_id = ${articleId} and status = 'visible'
    order by created_at desc
  `) as Comment[];
}

export async function getRelated(
  articleId: string,
  tag: string,
  limit = 3
): Promise<Article[]> {
  return (await sql`
    select * from articles
    where status = 'published' and id <> ${articleId}
    order by (tag = ${tag}) desc, published_at desc nulls last
    limit ${limit}
  `) as Article[];
}

// ---- Admin moderation ----
export type AdminComment = Comment & {
  status: string;
  article_title: string;
  article_slug: string;
};

export async function listAllComments(): Promise<AdminComment[]> {
  return (await sql`
    select c.id, c.author_name, c.body, c.status, c.created_at,
           a.title as article_title, a.slug as article_slug
    from article_comments c join articles a on a.id = c.article_id
    order by c.created_at desc limit 300
  `) as AdminComment[];
}
