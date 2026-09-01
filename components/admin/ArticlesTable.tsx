"use client";

import Link from "next/link";
import { useTransition } from "react";
import { deleteArticle } from "@/app/admin/articulos/actions";
import type { ArticleWithCategory } from "@/lib/types";

export default function ArticlesTable({
  articles,
}: {
  articles: ArticleWithCategory[];
}) {
  const [pending, startTransition] = useTransition();

  function handleDelete(id: string, title: string) {
    if (!confirm(`¿Borrar "${title}"? Esta acción no se puede deshacer.`)) return;
    startTransition(() => deleteArticle(id));
  }

  if (articles.length === 0) {
    return (
      <p className="rounded-tr-3xl rounded-bl-3xl border border-electric-100 bg-white p-8 text-center font-serif text-ink-800/60 shadow-glow-sm">
        Todavía no hay artículos.{" "}
        <Link href="/admin/articulos/nuevo" className="font-semibold text-electric-600">
          Crea el primero
        </Link>
        .
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-tr-3xl rounded-bl-3xl border border-electric-100 bg-white shadow-glow-sm">
      <table className="w-full text-left">
        <thead className="border-b border-electric-100 bg-electric-50/50">
          <tr className="font-sans text-xs font-bold uppercase tracking-wide text-ink-800/60">
            <th className="px-5 py-3">Título</th>
            <th className="px-5 py-3">Categoría</th>
            <th className="px-5 py-3">Estado</th>
            <th className="px-5 py-3">Vistas</th>
            <th className="px-5 py-3">Actualizado</th>
            <th className="px-5 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-electric-100">
          {articles.map((a) => (
            <tr key={a.id} className="font-serif text-sm text-ink-800">
              <td className="px-5 py-3">
                <Link
                  href={`/admin/articulos/${a.id}/editar`}
                  className="font-semibold text-ink-900 hover:text-electric-600"
                >
                  {a.title}
                </Link>
              </td>
              <td className="px-5 py-3">{a.category?.name ?? "—"}</td>
              <td className="px-5 py-3">
                <span
                  className={`rounded-full px-2.5 py-1 font-sans text-xs font-bold ${
                    a.status === "published"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {a.status === "published" ? "Publicado" : "Borrador"}
                </span>
              </td>
              <td className="px-5 py-3">{a.views}</td>
              <td className="px-5 py-3 text-ink-800/60">
                {new Date(a.updated_at).toLocaleDateString("es-ES")}
              </td>
              <td className="px-5 py-3 text-right">
                <button
                  onClick={() => handleDelete(a.id, a.title)}
                  disabled={pending}
                  className="font-sans text-xs font-semibold text-red-600 hover:text-red-700 disabled:opacity-50"
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
