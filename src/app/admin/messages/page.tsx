import { requireAdmin } from "@/lib/auth/session";
import { sql } from "@/lib/db";
import { formatDate } from "@/lib/articles-db";

export const dynamic = "force-dynamic";

type Msg = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  interest: string | null;
  message: string;
  created_at: string;
};

export default async function MessagesPage() {
  await requireAdmin();
  const messages = (await sql`
    select * from contact_messages order by created_at desc limit 200
  `) as Msg[];

  return (
    <div className="mx-auto max-w-4xl">
      <header className="border-b border-hairline pb-6">
        <h1 className="heading">Messages</h1>
        <p className="mt-2 text-body-sm text-muted">
          {messages.length} message(s) reçu(s) via le formulaire de contact.
        </p>
      </header>

      {messages.length === 0 ? (
        <p className="mt-10 text-muted">Aucun message pour l&apos;instant.</p>
      ) : (
        <ul className="mt-6 flex flex-col gap-4">
          {messages.map((m) => (
            <li key={m.id} className="rounded-lg border border-hairline p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-body-sm font-medium text-foreground-strong">
                    {m.name}
                  </span>
                  <a
                    href={`mailto:${m.email}`}
                    className="text-body-sm text-accent-ink hover:underline"
                  >
                    {m.email}
                  </a>
                  {m.company && (
                    <span className="text-body-sm text-muted">· {m.company}</span>
                  )}
                  {m.interest && (
                    <span className="rounded-pill border border-hairline px-2 py-0.5 text-caption uppercase tracking-wide text-muted">
                      {m.interest}
                    </span>
                  )}
                </div>
                <span className="text-caption text-muted">
                  {formatDate(m.created_at)}
                </span>
              </div>
              <p className="mt-3 whitespace-pre-wrap leading-relaxed text-foreground">
                {m.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
