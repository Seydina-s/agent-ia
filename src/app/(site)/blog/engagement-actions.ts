"use server";

import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { sql } from "@/lib/db";
import { getRatingSummary, type RatingSummary } from "@/lib/engagement";

const VOTER_COOKIE = "voter_id";

async function voterKey(): Promise<string> {
  const store = await cookies();
  let key = store.get(VOTER_COOKIE)?.value;
  if (!key) {
    key = randomUUID();
    store.set(VOTER_COOKIE, key, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }
  return key;
}

export async function rateArticle(
  articleId: string,
  rating: number
): Promise<RatingSummary> {
  const r = Math.round(rating);
  if (!Number.isInteger(r) || r < 1 || r > 5) {
    return getRatingSummary(articleId);
  }
  const key = await voterKey();
  await sql`
    insert into article_ratings (article_id, voter_key, rating)
    values (${articleId}, ${key}, ${r})
    on conflict (article_id, voter_key)
    do update set rating = excluded.rating, updated_at = now()
  `;
  return getRatingSummary(articleId, key);
}

export type CommentState = { error?: string; success?: boolean };

export async function addComment(
  _prev: CommentState,
  formData: FormData
): Promise<CommentState> {
  // Honeypot
  if (String(formData.get("website") ?? "")) return { success: true };

  const articleId = String(formData.get("articleId") ?? "");
  const slug = String(formData.get("slug") ?? "");
  const name = String(formData.get("author_name") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();

  if (!articleId) return { error: "Article introuvable." };
  if (name.length < 2) return { error: "Indiquez votre nom." };
  if (body.length < 3) return { error: "Votre commentaire est trop court." };
  if (body.length > 2000) return { error: "Commentaire trop long (2000 max)." };

  await sql`
    insert into article_comments (article_id, author_name, body)
    values (${articleId}, ${name.slice(0, 80)}, ${body})
  `;

  if (slug) revalidatePath(`/blog/${slug}`);
  return { success: true };
}
