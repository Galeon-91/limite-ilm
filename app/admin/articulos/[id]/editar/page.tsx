import { notFound } from "next/navigation";
import { getAllCategories, getArticleByIdForAdmin } from "@/lib/queries";
import ArticleForm from "@/components/admin/ArticleForm";
import { updateArticle } from "@/app/admin/articulos/actions";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;
  const [categories, article] = await Promise.all([
    getAllCategories(),
    getArticleByIdForAdmin(id),
  ]);

  if (!article) notFound();

  return (
    <div className="space-y-6">
      <h1 className="font-sans text-2xl font-extrabold text-ink-900">
        Editar artículo
      </h1>
      <ArticleForm categories={categories} article={article} action={updateArticle} />
    </div>
  );
}
