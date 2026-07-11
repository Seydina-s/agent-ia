import Link from "next/link";
import { requireAdmin } from "@/lib/auth/session";
import { listAllComments } from "@/lib/engagement";
import { formatDate } from "@/lib/articles-db";
import { deleteComment } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminCommentsPage() {
  await requireAdmin();
  const comments = await listAllComments();

  return (
    <div className="mx-auto max-w-4xl">
      <header className="border-b border-hairline pb-6">
        <h1 className="heading">Commentaires</h1>
        <p className="mt-2 text-body-sm text-muted">
          {comments.length} commentaire(s) sur les articles.
        </p>
      </header>

      {comments.length === 0 ? (
        <p className="mt-10 text-muted">Aucun commentaire pour l&apos;instant.</p>
      ) : (
        <ul className="mt-6 flex flex-col gap-4">
          {comments.map((c) => (
            <li key={c.id} className="rounded-lg border border-hairline p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2 text-body-sm">
                  <span className="font-medium text-foreground-strong">
                    {c.author_name}
                  </span>
                  <span className="text-muted">sur</span>
                  <Link
                    href={`/blog/${c.article_slug}`}
                    className="text-accent-ink hover:underline"
                  >
                    {c.article_title}
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-caption text-muted">
                    {formatDate(c.created_at)}
                  </span>
                  <form action={deleteComment}>
                    <input type="hidden" name="id" value={c.id} />
                    <button
                      type="submit"
                      className="rounded-pill border border-hairline px-3 py-1.5 text-caption text-danger transition-colors hover:border-danger"
                    >
                      Supprimer
                    </button>
                  </form>
                </div>
              </div>
              <p className="mt-3 whitespace-pre-wrap leading-relaxed text-foreground">
                {c.body}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
