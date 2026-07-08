import type { Metadata } from "next";
import Link from "next/link";
import { listPublished, formatDate } from "@/lib/articles-db";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Actualités, analyses et cas d'usage sur les agents IA autonomes et l'automatisation des entreprises au Sénégal.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const articles = await listPublished();

  return (
    <main>
      <section className="container-page pt-32 pb-14 sm:pt-40 sm:pb-20">
        <Reveal>
          <p className="eyebrow">Blog</p>
          <h1 className="display-xl mt-6 max-w-[9em] text-balance">
            Idées & <span className="accent-text">actualités.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-balance text-subheading leading-snug text-foreground">
            Ce qu&apos;on apprend en déployant des agents autonomes, et où va
            l&apos;automatisation des entreprises.
          </p>
        </Reveal>
      </section>

      <div className="container-page pb-24 sm:pb-32">
        {articles.length === 0 ? (
          <p className="border-t border-hairline py-16 text-muted">
            Les premiers articles arrivent bientôt.
          </p>
        ) : (
          <ul>
            {articles.map((a, i) => (
              <Reveal as="li" key={a.id} delay={(i % 2) * 0.05}>
                <Link
                  href={`/blog/${a.slug}`}
                  className="group grid gap-4 border-t border-hairline py-10 transition-colors hover:bg-surface sm:grid-cols-[0.4fr_1fr] sm:gap-12 sm:py-12"
                >
                  <div className="flex flex-col gap-2 text-body-sm text-muted">
                    <span className="uppercase tracking-wide text-accent-ink">
                      {a.tag}
                    </span>
                    {a.published_at && <span>{formatDate(a.published_at)}</span>}
                    <span>{a.reading_minutes} min de lecture</span>
                  </div>
                  <div>
                    <h2 className="heading text-balance transition-colors group-hover:text-accent-ink">
                      {a.title}
                    </h2>
                    <p className="mt-4 max-w-2xl leading-relaxed text-foreground">
                      {a.excerpt}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-body-sm text-foreground-strong">
                      Lire l&apos;article
                      <span
                        aria-hidden
                        className="text-accent-ink transition-transform duration-200 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
