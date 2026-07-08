import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";

const BASE = "https://agent-ai.sn";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/agents", "/services", "/blog", "/documentation", "/contact"].map(
    (path) => ({
      url: `${BASE}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })
  );

  const posts = articles.map((a) => ({
    url: `${BASE}/blog/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...pages, ...posts];
}
