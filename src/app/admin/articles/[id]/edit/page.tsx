import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth/session";
import { getArticleById } from "@/lib/articles-db";
import { ArticleEditor } from "@/components/admin/article-editor";

export const dynamic = "force-dynamic";

export default async function EditArticlePage(
  props: PageProps<"/admin/articles/[id]/edit">
) {
  await requireAdmin();
  const { id } = await props.params;
  const article = await getArticleById(id);
  if (!article) notFound();

  return (
    <main className="container-page max-w-3xl py-10">
      <Link
        href="/admin/articles"
        className="text-body-sm text-muted transition-colors hover:text-foreground-strong"
      >
        ← Articles
      </Link>
      <h1 className="heading mt-2 mb-8">Éditer l&apos;article</h1>
      <ArticleEditor article={article} />
    </main>
  );
}
