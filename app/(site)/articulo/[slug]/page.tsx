import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { generateHTML } from "@tiptap/html";
import {
  getArticleBySlug,
  getPopularArticles,
  getRecentArticles,
  incrementArticleViews,
} from "@/lib/queries";
import { tiptapExtensions } from "@/lib/tiptap-extensions";
import ArticleSidebar from "@/components/ArticleSidebar";
import CoverMedia from "@/components/CoverMedia";
import { isVideoUrl } from "@/lib/media";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt ?? undefined,
    openGraph:
      article.cover_image_url && !isVideoUrl(article.cover_image_url)
        ? { images: [article.cover_image_url] }
        : undefined,
  };
}

export default async function ArticuloPage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  incrementArticleViews(article.id).catch(() => {});

  const [popular, recent] = await Promise.all([
    getPopularArticles(5),
    getRecentArticles(5, article.id),
  ]);

  const html = generateHTML(article.content, tiptapExtensions);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
      <article>
        {article.category && (
          <p className="mb-2 font-sans text-sm font-bold uppercase tracking-wide text-electric-600">
            Categoría: {article.category.name}
          </p>
        )}
        <h1 className="font-sans text-3xl font-extrabold leading-tight text-ink-900 sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-3 font-serif text-sm text-ink-800/60">
          {article.published_at &&
            new Date(article.published_at).toLocaleDateString("es-ES", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
          · {article.views} lecturas
        </p>

        {article.cover_image_url && (
          <CoverMedia
            src={article.cover_image_url}
            className="mt-6 aspect-video w-full rounded-tr-4xl rounded-bl-4xl object-cover shadow-glow-md"
          />
        )}

        <div
          className="prose prose-lg mt-8 max-w-none font-serif prose-headings:font-sans prose-headings:text-ink-900 prose-a:text-electric-600"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>

      <ArticleSidebar popular={popular} recent={recent} />
    </div>
  );
}
