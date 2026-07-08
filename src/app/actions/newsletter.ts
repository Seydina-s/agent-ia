"use server";

export type NewsletterState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribeNewsletter(
  _prev: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  // Honeypot
  if (String(formData.get("company") ?? "")) {
    return { status: "success", message: "Merci, c'est noté." };
  }

  const email = String(formData.get("email") ?? "").trim();
  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "Entrez un email valide." };
  }

  // Stocké en base (consultable dans /admin). Sync provider (Brevo…) : plus tard.
  const { sql } = await import("@/lib/db");
  await sql`
    insert into newsletter_subscribers (email)
    values (${email.toLowerCase()})
    on conflict (email) do nothing
  `;

  return {
    status: "success",
    message: "Inscrit. On vous écrit bientôt.",
  };
}
