import type { MetadataRoute } from "next";
import { listPublished } from "@/lib/articles-db";

const BASE = "https://agent-ai.sn";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/agents", "/services", "/blog", "/documentation", "/contact"].map(
    (path) => ({
      url: `${BASE}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })
  );

  const articles = await listPublished().catch(() => []);
  const posts = articles.map((a) => ({
    url: `${BASE}/blog/${a.slug}`,
    lastModified: new Date(a.updated_at),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...pages, ...posts];
}
