import Link from "next/link";
import type { ArticleWithCategory } from "@/lib/types";
import CoverMedia from "@/components/CoverMedia";

const SOCIAL_LINKS = [
  { label: "Facebook", href: "#", icon: "f" },
  { label: "X", href: "#", icon: "𝕏" },
  { label: "Instagram", href: "#", icon: "◎" },
  { label: "YouTube", href: "#", icon: "▶" },
];

function SocialFollowBox() {
  return (
    <div className="overflow-hidden rounded-tr-3xl rounded-bl-3xl border border-electric-100 shadow-glow-sm">
      <div className="bg-electric-600 px-5 py-4 text-center">
        <p className="font-sans text-sm font-bold text-white">
          Síguenos en redes sociales
        </p>
      </div>
      <div className="flex justify-center gap-3 bg-white p-5">
        {SOCIAL_LINKS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            aria-label={s.label}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-electric-100 font-sans text-ink-800 transition-colors hover:bg-electric-50 hover:text-electric-600"
          >
            {s.icon}
          </a>
        ))}
      </div>
    </div>
  );
}

function ArticleList({
  title,
  articles,
  numbered,
}: {
  title: string;
  articles: ArticleWithCategory[];
  numbered?: boolean;
}) {
  if (articles.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-tr-3xl rounded-bl-3xl border border-electric-100 shadow-glow-sm">
      <div className="bg-electric-600 px-5 py-4">
        <p className="font-sans text-sm font-bold uppercase tracking-wide text-white">
          {title}
        </p>
      </div>
      <ul className="divide-y divide-electric-100 bg-white">
        {articles.map((a, i) => (
          <li key={a.id}>
            <Link
              href={`/articulo/${a.slug}`}
              className="group flex items-start gap-3 p-4 hover:bg-electric-50/60"
            >
              {numbered ? (
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-electric-600 font-sans text-xs font-bold text-white">
                  {i + 1}
                </span>
              ) : a.cover_image_url ? (
        <CoverMedia
          src={a.cover_image_url}
          className="h-14 w-14 shrink-0 rounded-lg object-cover"
          autoPlay={false}
        />
      ) : (
                <span className="h-14 w-14 shrink-0 rounded-lg bg-electric-50" />
              )}
              <span className="font-serif text-sm font-medium leading-snug text-ink-900 group-hover:text-electric-700">
                {a.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ArticleSidebar({
  popular,
  recent,
}: {
  popular: ArticleWithCategory[];
  recent: ArticleWithCategory[];
}) {
  return (
    <aside className="space-y-6">
      <SocialFollowBox />
      <ArticleList title="Entradas populares" articles={popular} numbered />
      <ArticleList title="Entradas recientes" articles={recent} />
    </aside>
  );
}
