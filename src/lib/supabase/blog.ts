'use client';

import { createClient } from '@/lib/supabase/client';

export interface BlogPost {
  id: string;
  slug?: string | null;
  title: string;
  content: string;
  category: 'blog' | 'customer_feedback';
  author_email: string;
  thumbnail_url?: string | null;
  created_at: string;
  updated_at: string;
}

export async function fetchPublishedPosts(options?: {
  category?: 'blog' | 'customer_feedback';
  limit?: number;
}): Promise<BlogPost[]> {
  const supabase = createClient();
  let query = supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (options?.category) {
    query = query.eq('category', options.category);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data || [];
}

export async function fetchPublishedPostById(id: string): Promise<BlogPost | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .eq('published', true)
    .single();

  if (error) {
    throw error;
  }

  return data || null;
}

export async function fetchPublishedPostBySlugOrId(identifier: string): Promise<BlogPost | null> {
  const supabase = createClient();

  const { data: slugData, error: slugError } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', identifier)
    .eq('published', true)
    .single();

  if (!slugError && slugData) {
    return slugData;
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', identifier)
    .eq('published', true)
    .single();

  if (error) {
    throw error;
  }

  return data || null;
}
