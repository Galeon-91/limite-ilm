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

  const url = `https://limiteilm.com/articulo/${article.slug}`;
  const ogImage =
    article.cover_image_url && !isVideoUrl(article.cover_image_url)
      ? [article.cover_image_url]
      : undefined;

  return {
    title: article.title,
    description: article.excerpt ?? undefined,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt ?? undefined,
      url,
      publishedTime: article.published_at ?? undefined,
      modifiedTime: article.updated_at,
      images: ogImage,
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: article.title,
      description: article.excerpt ?? undefined,
      images: ogImage,
    },
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt ?? undefined,
    image:
      article.cover_image_url && !isVideoUrl(article.cover_image_url)
        ? [article.cover_image_url]
        : undefined,
    datePublished: article.published_at ?? article.created_at,
    dateModified: article.updated_at,
    author: { "@type": "Organization", name: "Límite ILM" },
    publisher: {
      "@type": "Organization",
      name: "Límite ILM",
      logo: {
        "@type": "ImageObject",
        url: "https://limiteilm.com/logo512.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://limiteilm.com/articulo/${article.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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

      {article.pdf_url && (
        <div className="mt-8 rounded-tr-3xl rounded-bl-3xl border border-electric-100 bg-white p-5 shadow-glow-sm">
          <div className="mb-3 flex items-center justify-between gap-4">
            <p className="font-sans text-sm font-semibold text-ink-900">
              Documento adjunto (PDF)
            </p>
            <a
              href={article.pdf_url}
              download
              className="rounded-tr-xl rounded-bl-xl bg-electric-600 px-4 py-2 font-sans text-xs font-bold text-white hover:bg-electric-700"
            >
              Descargar PDF
            </a>
          </div>
          <iframe
            src={article.pdf_url}
            className="h-[70vh] w-full rounded-tr-xl rounded-bl-xl border border-electric-100"
            title="Documento PDF adjunto"
          />
        </div>
      )}

      <ArticleSidebar popular={popular} recent={recent} />
    </div>
    </>
  );
}
