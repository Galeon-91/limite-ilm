import type { MetadataRoute } from "next";
import { getSitemapArticles } from "@/lib/queries";
import { CATEGORIES } from "@/lib/categories";

const BASE_URL = "https://limiteilm.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getSitemapArticles();

  const staticUrls: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/buscar`, changeFrequency: "weekly", priority: 0.4 },
    { url: `${BASE_URL}/contacto`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const categoryUrls: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${BASE_URL}/${c.slug}`,
    changeFrequency: "weekly",
    priority: c.parentSlug ? 0.6 : 0.7,
  }));

  const articleUrls: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE_URL}/articulo/${a.slug}`,
    lastModified: new Date(a.updated_at),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticUrls, ...categoryUrls, ...articleUrls];
}
