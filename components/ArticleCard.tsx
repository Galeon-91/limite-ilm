import Link from "next/link";
import CoverMedia from "@/components/CoverMedia";
import type { ArticleWithCategory } from "@/lib/types";

export default function ArticleCard({ article }: { article: ArticleWithCategory }) {
  return (
    <Link
      href={`/articulo/${article.slug}`}
      className="group block overflow-hidden rounded-tr-3xl rounded-bl-3xl border border-electric-100 bg-white shadow-glow-sm transition-shadow hover:shadow-glow-md"
    >
      {article.cover_image_url ? (
        <CoverMedia
          src={article.cover_image_url}
          className="aspect-[16/10] w-full object-cover"
        />
      ) : (
        <div className="aspect-[16/10] w-full bg-electric-radial bg-electric-50" />
      )}
      <div className="p-5">
        {article.category && (
          <p className="mb-1 font-sans text-xs font-bold uppercase tracking-wide text-electric-600">
            {article.category.name}
          </p>
        )}
        <h3 className="font-sans text-lg font-bold text-ink-900 group-hover:text-electric-700">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="mt-2 line-clamp-2 font-serif text-sm text-ink-800/80">
            {article.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
