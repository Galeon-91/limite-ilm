import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Article, ArticleWithCategory, ContactMessage } from "@/lib/types";

const ARTICLE_SELECT =
  "*, category:categories(id, slug, name)";

export async function getArticlesByCategory(
  categorySlug: string,
  limit = 20
): Promise<ArticleWithCategory[]> {
  const supabase = await createClient();
  const { data: category } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", categorySlug)
    .single();

  if (!category) return [];

  const { data, error } = await supabase
    .from("articles")
    .select(ARTICLE_SELECT)
    .eq("category_id", category.id)
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("getArticlesByCategory", error);
    return [];
  }
  return (data ?? []) as unknown as ArticleWithCategory[];
}

export async function getArticleBySlug(
  slug: string
): Promise<ArticleWithCategory | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select(ARTICLE_SELECT)
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !data) return null;
  return data as unknown as ArticleWithCategory;
}

export async function getSitemapArticles(): Promise<
  Pick<Article, "slug" | "updated_at">[]
> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select("slug, updated_at")
    .eq("status", "published")
    .order("updated_at", { ascending: false });
  return (data ?? []) as Pick<Article, "slug" | "updated_at">[];
}

export async function getPopularArticles(
  limit = 5
): Promise<ArticleWithCategory[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select(ARTICLE_SELECT)
    .eq("status", "published")
    .order("views", { ascending: false })
    .limit(limit);
  return (data ?? []) as unknown as ArticleWithCategory[];
}

export async function getRecentArticles(
  limit = 5,
  excludeId?: string
): Promise<ArticleWithCategory[]> {
  const supabase = await createClient();
  let query = supabase
    .from("articles")
    .select(ARTICLE_SELECT)
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (excludeId) query = query.neq("id", excludeId);

  const { data } = await query;
  return (data ?? []) as unknown as ArticleWithCategory[];
}

export async function searchArticles(
  q: string,
  limit = 20
): Promise<ArticleWithCategory[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select(ARTICLE_SELECT)
    .eq("status", "published")
    .ilike("title", `%${q}%`)
    .order("published_at", { ascending: false })
    .limit(limit);
  return (data ?? []) as unknown as ArticleWithCategory[];
}

export async function incrementArticleViews(id: string) {
  const supabase = await createClient();
  await supabase.rpc("increment_article_views", { article_id: id });
}

// ---- Panel de administración ----

export async function getDashboardStats() {
  const supabase = await createClient();

  const [articles, drafts, unreadMessages, viewsLast7d] = await Promise.all([
    supabase.from("articles").select("id", { count: "exact", head: true }),
    supabase
      .from("articles")
      .select("id", { count: "exact", head: true })
      .eq("status", "draft"),
    supabase
      .from("messages")
      .select("id", { count: "exact", head: true })
      .eq("read", false),
    supabase
      .from("page_views")
      .select("id", { count: "exact", head: true })
      .gte(
        "created_at",
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      ),
  ]);

  return {
    totalArticles: articles.count ?? 0,
    draftArticles: drafts.count ?? 0,
    unreadMessages: unreadMessages.count ?? 0,
    viewsLast7d: viewsLast7d.count ?? 0,
  };
}

export async function getDailyViews(days = 14) {
  const supabase = await createClient();
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const { data } = await supabase
    .from("page_views")
    .select("created_at")
    .gte("created_at", since.toISOString());

  const counts = new Map<string, number>();
  for (let i = 0; i < days; i++) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    counts.set(d.toISOString().slice(0, 10), 0);
  }
  for (const row of data ?? []) {
    const day = (row.created_at as string).slice(0, 10);
    counts.set(day, (counts.get(day) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({ date, count }));
}

export async function getTopPaths(limit = 8) {
  const supabase = await createClient();
  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const { data } = await supabase
    .from("page_views")
    .select("path")
    .gte("created_at", since.toISOString());

  const counts = new Map<string, number>();
  for (const row of data ?? []) {
    counts.set(row.path, (counts.get(row.path) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([path, count]) => ({ path, count }));
}

export async function getAllMessages(): Promise<ContactMessage[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });
  return (data ?? []) as ContactMessage[];
}

export async function getAllArticlesForAdmin(): Promise<
  ArticleWithCategory[]
> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select(ARTICLE_SELECT)
    .order("updated_at", { ascending: false });
  return (data ?? []) as unknown as ArticleWithCategory[];
}

export async function getArticleByIdForAdmin(
  id: string
): Promise<ArticleWithCategory | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select(ARTICLE_SELECT)
    .eq("id", id)
    .single();
  return (data as unknown as ArticleWithCategory) ?? null;
}

export async function getAllCategories() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });
  return data ?? [];
}
