import Link from "next/link";
import { getAllArticlesForAdmin } from "@/lib/queries";
import ArticlesTable from "@/components/admin/ArticlesTable";

export const dynamic = "force-dynamic";

export default async function ArticlesAdminPage() {
  const articles = await getAllArticlesForAdmin();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-sans text-2xl font-extrabold text-ink-900">Artículos</h1>
          <p className="mt-1 font-serif text-ink-800">
            {articles.length} artículo{articles.length === 1 ? "" : "s"} en total.
          </p>
        </div>
        <Link
          href="/admin/articulos/nuevo"
          className="rounded-tr-2xl rounded-bl-2xl bg-electric-600 px-5 py-2.5 font-sans text-sm font-bold text-white shadow-glow-sm transition-colors hover:bg-electric-700"
        >
          + Nuevo artículo
        </Link>
      </div>

      <ArticlesTable articles={articles} />
    </div>
  );
}
