"use server";

import crypto from "node:crypto";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import bcrypt from "bcryptjs";
import { sql } from "@/lib/db";
import { sendEmail } from "@/lib/mail";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ResetState = { error?: string; success?: string };

const hashToken = (t: string) =>
  crypto.createHash("sha256").update(t).digest("hex");

async function baseUrl() {
  const h = await headers();
  const host = h.get("host") ?? "agent-ai.sn";
  const proto = h.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

export async function requestPasswordReset(
  _prev: ResetState,
  formData: FormData
): Promise<ResetState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) return { error: "Email invalide." };

  const rows = (await sql`
    select id, email from admin_users where email = ${email} and status = 'active'
  `) as { id: string; email: string }[];
  const user = rows[0];

  if (user) {
    const token = crypto.randomBytes(32).toString("hex");
    await sql`
      insert into password_resets (user_id, token_hash, expires_at)
      values (${user.id}, ${hashToken(token)}, now() + interval '1 hour')
    `;
    const link = `${await baseUrl()}/admin/reset?token=${token}`;
    await sendEmail({
      to: user.email,
      subject: "Réinitialisation de votre mot de passe — Agent AI",
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:520px;margin:0 auto;color:#111">
          <h2 style="font-size:18px">Réinitialisation du mot de passe</h2>
          <p style="font-size:14px">Cliquez sur le lien ci-dessous pour choisir un nouveau mot de passe. Ce lien expire dans 1 heure.</p>
          <p><a href="${link}" style="display:inline-block;background:#24b7cc;color:#000;padding:10px 18px;border-radius:9999px;text-decoration:none;font-weight:600">Réinitialiser mon mot de passe</a></p>
          <p style="font-size:12px;color:#888">Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.</p>
        </div>`,
    });
  }

  // Generic response — never reveal whether the account exists.
  return {
    success:
      "Si un compte existe pour cet email, un lien de réinitialisation vient d'être envoyé.",
  };
}

export async function resetPassword(
  _prev: ResetState,
  formData: FormData
): Promise<ResetState> {
  const token = String(formData.get("token") ?? "");
  const password = String(formData.get("password") ?? "");
  if (!token) return { error: "Lien invalide." };
  if (password.length < 8)
    return { error: "Mot de passe : 8 caractères minimum." };

  const rows = (await sql`
    select id, user_id from password_resets
    where token_hash = ${hashToken(token)} and used = false and expires_at > now()
    limit 1
  `) as { id: string; user_id: string }[];
  const pr = rows[0];
  if (!pr)
    return { error: "Lien invalide ou expiré. Refaites une demande." };

  const hash = await bcrypt.hash(password, 12);
  await sql`update admin_users set password_hash = ${hash} where id = ${pr.user_id}`;
  // Consume this token and invalidate any other pending reset for the user.
  await sql`update password_resets set used = true where user_id = ${pr.user_id} and used = false`;

  redirect("/admin/login?reset=1");
}
