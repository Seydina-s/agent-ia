// Email via Resend REST API. Activates automatically once RESEND_API_KEY,
// MAIL_FROM and MAIL_TO are set in the environment; until then every call is a
// silent no-op so nothing breaks before mail is configured.

type MailArgs = {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
};

export function isMailConfigured() {
  return !!(
    process.env.RESEND_API_KEY &&
    process.env.MAIL_FROM &&
    process.env.MAIL_TO
  );
}

export async function sendEmail(args: MailArgs): Promise<boolean> {
  if (!process.env.RESEND_API_KEY || !process.env.MAIL_FROM) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.MAIL_FROM,
        to: args.to,
        subject: args.subject,
        html: args.html,
        reply_to: args.replyTo,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) {
      console.error("[mail] Resend a répondu", res.status);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[mail] échec d'envoi", err);
    return false;
  }
}

const esc = (s: string) =>
  s.replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string
  );

const wrap = (title: string, bodyHtml: string) => `
  <div style="font-family:system-ui,Segoe UI,Roboto,sans-serif;max-width:560px;margin:0 auto;color:#111">
    <h2 style="font-size:18px;margin:0 0 16px">${esc(title)}</h2>
    ${bodyHtml}
    <p style="color:#888;font-size:12px;margin-top:24px">Notification automatique · Agent AI</p>
  </div>`;

// ---- Event notifications (best-effort; never throw to the caller) ----
export async function notifyNewContact(msg: {
  name: string;
  email: string;
  company?: string | null;
  interest?: string | null;
  message: string;
}) {
  const to = process.env.MAIL_TO;
  if (!isMailConfigured() || !to) return;
  const rows = [
    ["Nom", msg.name],
    ["Email", msg.email],
    ["Entreprise", msg.company || "—"],
    ["Intérêt", msg.interest || "—"],
  ]
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#888">${k}</td><td>${esc(String(v))}</td></tr>`
    )
    .join("");
  await sendEmail({
    to,
    replyTo: msg.email,
    subject: `Nouveau message de ${msg.name}`,
    html: wrap(
      "Nouveau message de contact",
      `<table style="font-size:14px;margin-bottom:16px">${rows}</table>
       <div style="font-size:14px;white-space:pre-wrap;border-left:3px solid #24b7cc;padding-left:12px">${esc(
         msg.message
       )}</div>`
    ),
  });
}

export async function notifyNewSubscriber(email: string) {
  const to = process.env.MAIL_TO;
  if (!isMailConfigured() || !to) return;
  await sendEmail({
    to,
    subject: "Nouvel abonné à la newsletter",
    html: wrap(
      "Nouvel abonné",
      `<p style="font-size:14px">${esc(email)} vient de s'inscrire à la newsletter.</p>`
    ),
  });
}
