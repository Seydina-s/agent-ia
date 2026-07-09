"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { sql } from "@/lib/db";
import { createSession, clearSession } from "@/lib/auth/session";
import { getLock, recordFailure, resetAttempts } from "@/lib/auth/rate-limit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type AuthState = { error?: string };

export async function hasAdmin(): Promise<boolean> {
  const rows = (await sql`select count(*)::int as n from admin_users`) as {
    n: number;
  }[];
  return rows[0].n > 0;
}

export async function login(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!EMAIL_RE.test(email) || !password) {
    return { error: "Identifiants requis." };
  }

  const lock = await getLock(email);
  if (lock.locked) {
    return { error: `Trop d'essais. Réessayez dans ${lock.retryAfter}s.` };
  }

  const rows = (await sql`
    select id, email, password_hash, role, status from admin_users where email = ${email}
  `) as {
    id: string;
    email: string;
    password_hash: string;
    role: "superadmin" | "admin";
    status: string;
  }[];
  const user = rows[0];

  const ok = user
    ? await bcrypt.compare(password, user.password_hash)
    : false;

  if (!ok) {
    const f = await recordFailure(email);
    return {
      error: f.locked
        ? `Trop d'essais. Réessayez dans ${f.retryAfter}s.`
        : "Email ou mot de passe incorrect.",
    };
  }

  if (user.status !== "active") {
    return { error: "Ce compte est en attente de validation ou suspendu." };
  }

  await resetAttempts(email);
  await sql`update admin_users set last_login_at = now() where id = ${user.id}`;
  await createSession({ sub: user.id, email: user.email, role: user.role });
  redirect("/admin");
}

export async function setupFirstAdmin(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  if (await hasAdmin()) {
    return { error: "Un compte administrateur existe déjà." };
  }
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!EMAIL_RE.test(email)) return { error: "Email invalide." };
  if (password.length < 8)
    return { error: "Mot de passe : 8 caractères minimum." };

  const hash = await bcrypt.hash(password, 12);
  const rows = (await sql`
    insert into admin_users (email, password_hash, name, role, status)
    values (${email}, ${hash}, ${name || null}, 'superadmin', 'active')
    returning id, email
  `) as { id: string; email: string }[];

  await createSession({ sub: rows[0].id, email: rows[0].email, role: "superadmin" });
  redirect("/admin");
}

export async function logout() {
  await clearSession();
  redirect("/admin/login");
}
