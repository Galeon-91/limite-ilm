export type ArticleStatus = "draft" | "published";

export type Category = {
  id: string;
  slug: string;
  name: string;
  parent_id: string | null;
  sort_order: number;
  is_premium: boolean;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: Record<string, unknown>; // TipTap JSON document
  cover_image_url: string | null;
  pdf_url: string | null;
  is_premium: boolean;
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

export type Subscriber = {
  id: string;
  user_id: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  status: string;
  current_period_end: string | null;
  created_at: string;
  updated_at: string;
};
