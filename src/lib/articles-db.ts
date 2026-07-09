import { sql } from "@/lib/db";

export type ArticleStatus = "draft" | "published";

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string; // paragraphs separated by blank lines
  cover_image_url: string | null;
  tag: string;
  author: string;
  reading_minutes: number;
  status: ArticleStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ArticleInput = {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  cover_image_url: string | null;
  tag: string;
  author: string;
  status: ArticleStatus;
};

// ---- Public reads (published only) ----
export async function listPublished(): Promise<Article[]> {
  return (await sql`
    select * from articles
    where status = 'published'
    order by published_at desc nulls last, created_at desc
  `) as Article[];
}

export async function getPublishedBySlug(slug: string): Promise<Article | null> {
  const rows = (await sql`
    select * from articles where slug = ${slug} and status = 'published' limit 1
  `) as Article[];
  return rows[0] ?? null;
}

// ---- Admin reads (all) ----
export async function listAllArticles(): Promise<Article[]> {
  return (await sql`select * from articles order by updated_at desc`) as Article[];
}

export async function getArticleById(id: string): Promise<Article | null> {
  const rows = (await sql`select * from articles where id = ${id} limit 1`) as Article[];
  return rows[0] ?? null;
}

// ---- Helpers ----
export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

export function stripHtml(html: string) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function estimateReadingMinutes(body: string) {
  const words = stripHtml(body).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function isHtml(body: string) {
  return /<\/?(p|h[1-6]|ul|ol|li|strong|em|a|img|blockquote|br)\b/i.test(body);
}

// Legacy plain-text bodies: split on blank lines into paragraphs.
export function bodyToParagraphs(body: string) {
  return body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

// Minimal safeguard for admin-authored HTML (strip scripts / inline handlers).
export function sanitizeHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "")
    .replace(/javascript:/gi, "");
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
