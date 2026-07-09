"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { sql } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/session";
import {
  slugify,
  estimateReadingMinutes,
  stripHtml,
  type ArticleStatus,
} from "@/lib/articles-db";

export type SaveState = { error?: string };

export async function saveArticle(
  _prev: SaveState,
  formData: FormData
): Promise<SaveState> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const tag = String(formData.get("tag") ?? "").trim() || "Article";
  const author = String(formData.get("author") ?? "").trim() || "Agent AI";
  const cover = String(formData.get("cover_image_url") ?? "").trim() || null;
  const status: ArticleStatus =
    String(formData.get("status") ?? "draft") === "published"
      ? "published"
      : "draft";
  let slug = String(formData.get("slug") ?? "").trim();
  slug = slug ? slugify(slug) : slugify(title);

  if (title.length < 3) return { error: "Le titre est requis." };
  if (stripHtml(body).length < 10) return { error: "Le contenu est trop court." };
  if (!slug) return { error: "Slug invalide." };

  const reading = estimateReadingMinutes(body);

  // slug must be unique (excluding the current article when editing)
  const clash = (await sql`
    select id from articles where slug = ${slug} and id <> ${id || "00000000-0000-0000-0000-000000000000"}
  `) as { id: string }[];
  if (clash.length) return { error: "Ce slug est déjà utilisé." };

  if (id) {
    await sql`
      update articles set
        title = ${title}, slug = ${slug}, excerpt = ${excerpt}, body = ${body},
        tag = ${tag}, author = ${author}, cover_image_url = ${cover},
        reading_minutes = ${reading}, status = ${status},
        published_at = case
          when ${status} = 'published' then coalesce(published_at, now())
          else null end,
        updated_at = now()
      where id = ${id}
    `;
  } else {
    await sql`
      insert into articles
        (title, slug, excerpt, body, tag, author, cover_image_url, reading_minutes, status, published_at)
      values
        (${title}, ${slug}, ${excerpt}, ${body}, ${tag}, ${author}, ${cover}, ${reading}, ${status},
         ${status === "published" ? new Date().toISOString() : null})
    `;
  }

  revalidatePath("/blog");
  redirect("/admin/articles");
}

export async function deleteArticle(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) await sql`delete from articles where id = ${id}`;
  revalidatePath("/blog");
  redirect("/admin/articles");
}

export async function togglePublish(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) {
    await sql`
      update articles set
        status = case when status = 'published' then 'draft' else 'published' end,
        published_at = case when status = 'published' then published_at else coalesce(published_at, now()) end,
        updated_at = now()
      where id = ${id}
    `;
  }
  revalidatePath("/blog");
  redirect("/admin/articles");
}
