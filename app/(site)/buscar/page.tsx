import type { Metadata } from "next";
import { searchArticles } from "@/lib/queries";
import ArticleCard from "@/components/ArticleCard";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Resultados para "${q}" | Límite ILM` : "Buscar | Límite ILM",
  };
}

export default async function BuscarPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const articles = query ? await searchArticles(query) : [];

  return (
    <div className="py-6">
      <header className="mb-8">
        <p className="font-sans text-sm font-bold uppercase tracking-wide text-electric-600">
          Buscador
        </p>
        <h1 className="mt-1 font-sans text-3xl font-extrabold text-ink-900 sm:text-4xl">
          {query ? `Resultados para "${query}"` : "Buscar artículos"}
        </h1>

        <form action="/buscar" method="get" className="mt-6 max-w-xl">
          <div className="flex gap-2">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="¿Qué quieres leer hoy?"
              className="w-full rounded-tr-xl rounded-bl-xl border border-electric-100 bg-white px-4 py-2.5 font-serif text-sm text-ink-900 outline-none transition-shadow focus:shadow-glow-sm"
            />
            <button
              type="submit"
              className="shrink-0 rounded-tr-xl rounded-bl-xl bg-electric-600 px-5 py-2.5 font-sans text-sm font-bold text-white shadow-glow-sm transition-opacity hover:opacity-90"
            >
              Buscar
            </button>
          </div>
        </form>
      </header>

      {query && articles.length === 0 && (
        <p className="rounded-tr-3xl rounded-bl-3xl border border-electric-100 bg-white/70 p-8 text-center font-serif text-ink-800/70 shadow-glow-sm">
          No hemos encontrado artículos que coincidan con “{query}”.
        </p>
      )}

      {articles.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
