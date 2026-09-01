// Genera app/(site)/<slug>/page.tsx para cada categoría de lib/categories.ts.
// Cada página es un Server Component que consulta Supabase en vivo — no hay
// contenido hardcodeado. Ejecutar con: node scripts/gen-category-pages.mjs

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const CATEGORIES = [
  { slug: "ciencia-y-fe", name: "Ciencia y Fe", parentSlug: null },
  { slug: "ciencia-y-fe/milagros-del-coran", name: "Milagros del Corán", parentSlug: "ciencia-y-fe" },
  { slug: "ciencia-y-fe/historia", name: "Historia", parentSlug: "ciencia-y-fe" },

  { slug: "ciencias-fisicas", name: "Ciencias Físicas", parentSlug: null },
  { slug: "ciencias-fisicas/fisica", name: "Física", parentSlug: "ciencias-fisicas" },
  { slug: "ciencias-fisicas/astronomia", name: "Astronomía", parentSlug: "ciencias-fisicas" },
  { slug: "ciencias-fisicas/cosmologia", name: "Cosmología", parentSlug: "ciencias-fisicas" },

  { slug: "ciencias-naturales", name: "Ciencias Naturales", parentSlug: null },
  { slug: "ciencias-naturales/biologia", name: "Biología", parentSlug: "ciencias-naturales" },
  { slug: "ciencias-naturales/zoologia", name: "Zoología", parentSlug: "ciencias-naturales" },
  { slug: "ciencias-naturales/embriologia", name: "Embriología", parentSlug: "ciencias-naturales" },
  { slug: "ciencias-naturales/fisiologia", name: "Fisiología", parentSlug: "ciencias-naturales" },

  { slug: "tierra-y-materia", name: "Tierra y Materia", parentSlug: null },
  { slug: "tierra-y-materia/quimica", name: "Química", parentSlug: "tierra-y-materia" },
  { slug: "tierra-y-materia/geologia", name: "Geología", parentSlug: "tierra-y-materia" },
  { slug: "tierra-y-materia/meteorologia", name: "Meteorología", parentSlug: "tierra-y-materia" },

  { slug: "matematicas", name: "Matemáticas", parentSlug: null },

  { slug: "secciones", name: "Secciones", parentSlug: null },
  { slug: "secciones/respuestas", name: "Respuestas", parentSlug: "secciones" },
  { slug: "secciones/videos", name: "Vídeos", parentSlug: "secciones" },
  { slug: "secciones/patranas", name: "Patrañas", parentSlug: "secciones" },
];

function template(cat) {
  return `import type { Metadata } from "next";
import { getArticlesByCategory } from "@/lib/queries";
import ArticleCard from "@/components/ArticleCard";
import ArticleSidebar from "@/components/ArticleSidebar";
import { getPopularArticles, getRecentArticles } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "${cat.name} | Límite ILM",
  description:
    "Artículos de ${cat.name} en Límite ILM: divulgación científica rigurosa y accesible.",
};

export default async function Page() {
  const [articles, popular, recent] = await Promise.all([
    getArticlesByCategory("${cat.slug}"),
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
            ${cat.name}
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
`;
}

const appDir = join(process.cwd(), "app", "(site)");
for (const cat of CATEGORIES) {
  const dir = join(appDir, ...cat.slug.split("/"));
  mkdirSync(dir, { recursive: true });
  const file = join(dir, "page.tsx");
  writeFileSync(file, template(cat), "utf8");
  console.log("✓", file.replace(process.cwd() + "/", ""));
}
console.log(`\nGeneradas ${CATEGORIES.length} páginas de categoría.`);
