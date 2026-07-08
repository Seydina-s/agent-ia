"use server";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "message", string>>;
  values?: { name: string; email: string; company: string; interest: string; message: string };
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const interest = String(formData.get("interest") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const values = { name, email, company, interest, message };

  // Honeypot — bots fill hidden fields; humans don't.
  if (String(formData.get("website") ?? "")) {
    return { status: "success", values };
  }

  const errors: ContactState["errors"] = {};
  if (name.length < 2) errors.name = "Indiquez votre nom.";
  if (!EMAIL_RE.test(email)) errors.email = "Entrez un email valide.";
  if (message.length < 10)
    errors.message = "Quelques mots de plus nous aideront à mieux vous répondre.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  // Stocké en base (consultable dans /admin). Notification email : à brancher
  // après connexion du domaine/Resend (voir docs/ASSETS.md).
  const { sql } = await import("@/lib/db");
  await sql`
    insert into contact_messages (name, email, company, interest, message)
    values (${name}, ${email}, ${company || null}, ${interest || null}, ${message})
  `;

  return {
    status: "success",
    message: "Message reçu. On vous répond très vite.",
    values,
  };
}
