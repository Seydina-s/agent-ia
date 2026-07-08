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

  // TODO: brancher le provider (Mailchimp/Brevo/…) — voir docs/ASSETS.md.
  console.log("[newsletter] nouvel abonné", email);

  return {
    status: "success",
    message: "Inscrit. On vous écrit bientôt.",
  };
}
