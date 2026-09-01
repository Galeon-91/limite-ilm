import { getAllCategories } from "@/lib/queries";
import ArticleForm from "@/components/admin/ArticleForm";
import { createArticle } from "@/app/admin/articulos/actions";

export const dynamic = "force-dynamic";

export default async function NewArticlePage() {
  const categories = await getAllCategories();

  return (
    <div className="space-y-6">
      <h1 className="font-sans text-2xl font-extrabold text-ink-900">
        Nuevo artículo
      </h1>
      <ArticleForm categories={categories} action={createArticle} />
    </div>
  );
}
