import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import {
  getPublishedBySlug,
  bodyToParagraphs,
  isHtml,
  sanitizeHtml,
  formatDate,
} from "@/lib/articles-db";
import { getRatingSummary, listComments, getRelated } from "@/lib/engagement";
import { Reveal } from "@/components/motion/reveal";
import { GlassButton } from "@/components/ui/glass-button";
import { RatingWidget } from "@/components/blog/rating-widget";
import { CommentForm } from "@/components/blog/comment-form";

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

  const voter = (await cookies()).get("voter_id")?.value;
  const [rating, comments, related] = await Promise.all([
    getRatingSummary(article.id, voter),
    listComments(article.id),
    getRelated(article.id, article.tag, 3),
  ]);

  return (
    <main className="pt-32 sm:pt-40">
      <article className="container-page pb-16">
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
              loading="lazy"
              decoding="async"
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

        {/* Rating */}
        <div className="mt-14 max-w-2xl">
          <RatingWidget articleId={article.id} initial={rating} />
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-hairline py-16">
          <div className="container-page">
            <h2 className="eyebrow">À lire ensuite</h2>
            <ul className="mt-8 grid gap-px overflow-hidden rounded-lg border border-hairline sm:grid-cols-3">
              {related.map((r) => (
                <li key={r.id}>
                  <Link
                    href={`/blog/${r.slug}`}
                    className="group flex h-full flex-col gap-3 bg-surface p-6 transition-colors hover:bg-hairline"
                  >
                    <span className="text-caption uppercase tracking-wide text-accent-ink">
                      {r.tag}
                    </span>
                    <span className="text-heading-sm font-medium text-foreground-strong transition-colors group-hover:text-accent-ink">
                      {r.title}
                    </span>
                    <span className="mt-auto line-clamp-2 text-body-sm text-muted">
                      {r.excerpt}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Comments */}
      <section className="border-t border-hairline py-16">
        <div className="container-page max-w-2xl">
          <h2 className="heading">
            Commentaires{" "}
            <span className="text-muted">({comments.length})</span>
          </h2>

          <div className="mt-8">
            <CommentForm articleId={article.id} slug={article.slug} />
          </div>

          {comments.length > 0 && (
            <ul className="mt-12 flex flex-col gap-8">
              {comments.map((c) => (
                <li key={c.id} className="border-t border-hairline pt-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-body-sm font-medium text-foreground-strong">
                      {c.author_name}
                    </span>
                    <span className="text-caption text-muted">
                      {formatDate(c.created_at)}
                    </span>
                  </div>
                  <p className="mt-2 whitespace-pre-wrap leading-relaxed text-foreground">
                    {c.body}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-hairline py-16">
        <Reveal className="container-page flex flex-col items-start gap-5">
          <p className="heading max-w-xl text-balance">
            Envie de mettre un agent au travail&nbsp;?
          </p>
          <GlassButton href="/contact" size="lg">
            Parlons-en
          </GlassButton>
        </Reveal>
      </section>
    </main>
  );
}
