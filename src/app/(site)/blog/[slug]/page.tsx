import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPublishedBySlug,
  bodyToParagraphs,
  isHtml,
  sanitizeHtml,
  formatDate,
} from "@/lib/articles-db";
import { Reveal } from "@/components/motion/reveal";
import { GlassButton } from "@/components/ui/glass-button";

export const dynamic = "force-dynamic";

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const article = await getPublishedBySlug(slug);
  if (!article) return { title: "Article introuvable" };
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const article = await getPublishedBySlug(slug);
  if (!article) notFound();

  return (
    <main className="pt-32 sm:pt-40">
      <article className="container-page pb-24 sm:pb-32">
        <Reveal>
          <Link
            href="/blog"
            className="text-body-sm text-muted transition-colors hover:text-foreground-strong"
          >
            ← Tous les articles
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-body-sm text-muted">
            <span className="uppercase tracking-wide text-accent-ink">
              {article.tag}
            </span>
            {article.published_at && (
              <>
                <span aria-hidden>·</span>
                <span>{formatDate(article.published_at)}</span>
              </>
            )}
            <span aria-hidden>·</span>
            <span>{article.reading_minutes} min</span>
          </div>

          <h1 className="heading-lg mt-5 max-w-4xl text-balance normal-case">
            {article.title}
          </h1>
          <p className="mt-4 text-body-sm text-muted">Par {article.author}</p>
        </Reveal>

        {article.cover_image_url && (
          <Reveal delay={0.05} className="mt-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.cover_image_url}
              alt={article.title}
              className="w-full rounded-none border border-hairline object-cover"
            />
          </Reveal>
        )}

        <Reveal delay={0.1} className="mt-12 max-w-2xl">
          {isHtml(article.body) ? (
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.body) }}
            />
          ) : (
            <div className="flex flex-col gap-6">
              {bodyToParagraphs(article.body).map((p, i) => (
                <p key={i} className="text-lg leading-relaxed text-foreground">
                  {p}
                </p>
              ))}
            </div>
          )}
        </Reveal>

        <Reveal className="mt-16 flex flex-col items-start gap-5 border-t border-hairline pt-12">
          <p className="heading max-w-xl text-balance">
            Envie de mettre un agent au travail&nbsp;?
          </p>
          <GlassButton href="/contact" size="lg">
            Parlons-en
          </GlassButton>
        </Reveal>
      </article>
    </main>
  );
}
