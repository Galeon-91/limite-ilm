import type { Metadata } from "next";
import { getArticlesByCategory } from "@/lib/queries";
import ArticleCard from "@/components/ArticleCard";
import ArticleSidebar from "@/components/ArticleSidebar";
import { getPopularArticles, getRecentArticles } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Astronomía | Límite ILM",
  description:
    "Artículos de Astronomía en Límite ILM: divulgación científica rigurosa y accesible.",
};

export default async function Page() {
  const [articles, popular, recent] = await Promise.all([
    getArticlesByCategory("ciencias-fisicas/astronomia"),
    getPopularArticles(5),
    getRecentArticles(5),
  ]);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
      <section>
        <header className="mb-8">
          <p className="font-sans text-sm font-bold uppercase tracking-wide text-electric-600">
            Categoría
          </p>
          <h1 className="mt-1 font-sans text-3xl font-extrabold text-ink-900 sm:text-4xl">
            Astronomía
          </h1>
        </header>

        {articles.length === 0 ? (
          <p className="rounded-tr-3xl rounded-bl-3xl border border-electric-100 bg-white/70 p-8 text-center font-serif text-ink-800/70 shadow-glow-sm">
            Todavía no hay artículos publicados en esta categoría. Vuelve
            pronto.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </section>

      <ArticleSidebar popular={popular} recent={recent} />
    </div>
  );
}
