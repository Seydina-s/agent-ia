import Link from "next/link";
import { requireAdmin } from "@/lib/auth/session";
import { ArticleEditor } from "@/components/admin/article-editor";

export const dynamic = "force-dynamic";

export default async function NewArticlePage() {
  await requireAdmin();
  return (
    <main className="container-page max-w-3xl py-10">
      <Link
        href="/admin/articles"
        className="text-body-sm text-muted transition-colors hover:text-foreground-strong"
      >
        ← Articles
      </Link>
      <h1 className="heading mt-2 mb-8">Nouvel article</h1>
      <ArticleEditor />
    </main>
  );
}
