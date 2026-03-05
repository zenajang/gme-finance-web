export type BlogCategory = 'blog' | 'customer_feedback';

export type CountryKey =
  | 'bangladesh' | 'cambodia' | 'india' | 'indonesia' | 'mongolia'
  | 'myanmar' | 'nepal' | 'pakistan' | 'philippines' | 'russia'
  | 'srilanka' | 'thailand' | 'uzbekistan' | 'vietnam';

export interface CountryPost {
  id: string;
  slug?: string | null;
  title: string;
  content: string;
  country: CountryKey;
  author_id: string;
  author_email: string;
  author_name?: string | null;
  published: boolean;
  thumbnail_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  slug?: string | null;
  title: string;
  content: string;
  author_id: string;
  author_email: string;
  author_name?: string | null;
  published: boolean;
  category: BlogCategory;
  thumbnail_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface NoticePost {
  id: string;
  title: string;
  category: string | null;
  content?: string | null;
  table_columns: string[];
  table_rows: string[][];
  author_id: string;
  author_email: string;
  pinned: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

export type NoticeCategoryOption = Readonly<{
  value: string;
  label: string;
}>;
