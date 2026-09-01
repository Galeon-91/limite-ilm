export type ArticleStatus = "draft" | "published";

export type Category = {
  id: string;
  slug: string;
  name: string;
  parent_id: string | null;
  sort_order: number;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: Record<string, unknown>; // TipTap JSON document
  cover_image_url: string | null;
  category_id: string | null;
  status: ArticleStatus;
  views: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ArticleWithCategory = Article & {
  category: Pick<Category, "id" | "slug" | "name"> | null;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read: boolean;
  created_at: string;
};

export type PageView = {
  id: number;
  path: string;
  referrer: string | null;
  visitor_id: string | null;
  created_at: string;
};
