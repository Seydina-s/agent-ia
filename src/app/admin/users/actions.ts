"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { sql } from "@/lib/db";
import { requireSuperadmin } from "@/lib/auth/session";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type UserActionState = { error?: string; success?: string };

export async function createAdmin(
  _prev: UserActionState,
  formData: FormData
): Promise<UserActionState> {
  const me = await requireSuperadmin();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const role = String(formData.get("role") ?? "admin") === "superadmin" ? "superadmin" : "admin";
  const status = String(formData.get("status") ?? "active") === "pending" ? "pending" : "active";

  if (!EMAIL_RE.test(email)) return { error: "Email invalide." };
  if (password.length < 8) return { error: "Mot de passe : 8 caractères minimum." };

  const exists = (await sql`select id from admin_users where email = ${email}`) as {
    id: string;
  }[];
  if (exists.length) return { error: "Un compte avec cet email existe déjà." };

  const hash = await bcrypt.hash(password, 12);
  await sql`
    insert into admin_users (email, password_hash, name, role, status, created_by)
    values (${email}, ${hash}, ${name || null}, ${role}, ${status}, ${me.sub})
  `;
  revalidatePath("/admin/users");
  return { success: `Compte ${email} créé (${status === "active" ? "actif" : "en attente"}).` };
}

export async function setUserStatus(formData: FormData) {
  const me = await requireSuperadmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || id === me.sub) return; // can't change own status
  if (status !== "active" && status !== "pending") return;
  await sql`update admin_users set status = ${status} where id = ${id}`;
  revalidatePath("/admin/users");
}

export async function deleteUser(formData: FormData) {
  const me = await requireSuperadmin();
  const id = String(formData.get("id") ?? "");
  if (!id || id === me.sub) return; // can't delete yourself

  // Never remove the last superadmin.
  const target = (await sql`select role from admin_users where id = ${id}`) as {
    role: string;
  }[];
  if (target[0]?.role === "superadmin") {
    const supers = (await sql`select count(*)::int as n from admin_users where role = 'superadmin'`) as {
      n: number;
    }[];
    if (supers[0].n <= 1) return;
  }
  await sql`delete from admin_users where id = ${id}`;
  revalidatePath("/admin/users");
}
