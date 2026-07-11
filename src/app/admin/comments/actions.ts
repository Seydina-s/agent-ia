"use server";

import { revalidatePath } from "next/cache";
import { sql } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/session";

export async function deleteComment(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) await sql`delete from article_comments where id = ${id}`;
  revalidatePath("/admin/comments");
}
