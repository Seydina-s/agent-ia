import Link from "next/link";
import { requireAdmin } from "@/lib/auth/session";
import { listAllArticles, formatDate } from "@/lib/articles-db";
import { GlassButton } from "@/components/ui/glass-button";
import { deleteArticle, togglePublish } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminArticlesPage() {
  await requireAdmin();
  const articles = await listAllArticles();

  return (
    <main className="container-page py-10">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline pb-6">
        <div>
          <Link
            href="/admin"
            className="text-body-sm text-muted transition-colors hover:text-foreground-strong"
          >
            ← Tableau de bord
          </Link>
          <h1 className="heading mt-2">Articles</h1>
        </div>
        <GlassButton href="/admin/articles/new">Nouvel article</GlassButton>
      </header>

      {articles.length === 0 ? (
        <p className="mt-10 text-muted">Aucun article. Créez le premier.</p>
      ) : (
        <ul className="mt-8 border-t border-hairline">
          {articles.map((a) => (
            <li
              key={a.id}
              className="flex flex-col gap-3 border-b border-hairline py-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-pill border px-2.5 py-0.5 text-caption uppercase tracking-wide ${
                      a.status === "published"
                        ? "border-accent text-accent-ink"
                        : "border-hairline text-muted"
                    }`}
                  >
                    {a.status === "published" ? "Publié" : "Brouillon"}
                  </span>
                  <span className="text-body-sm text-muted">
                    {a.tag} · maj {formatDate(a.updated_at)}
                  </span>
                </div>
                <p className="mt-2 truncate text-heading-sm font-medium text-foreground-strong">
                  {a.title}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/admin/articles/${a.id}/edit`}
                  className="rounded-pill border border-hairline px-4 py-2 text-body-sm text-foreground transition-colors hover:border-accent hover:text-foreground-strong"
                >
                  Éditer
                </Link>
                <form action={togglePublish}>
                  <input type="hidden" name="id" value={a.id} />
                  <button
                    type="submit"
                    className="rounded-pill border border-hairline px-4 py-2 text-body-sm text-foreground transition-colors hover:border-accent hover:text-foreground-strong"
                  >
                    {a.status === "published" ? "Dépublier" : "Publier"}
                  </button>
                </form>
                <form action={deleteArticle}>
                  <input type="hidden" name="id" value={a.id} />
                  <button
                    type="submit"
                    className="rounded-pill border border-hairline px-4 py-2 text-body-sm text-danger transition-colors hover:border-danger"
                  >
                    Supprimer
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
