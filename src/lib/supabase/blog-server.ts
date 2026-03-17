import { createServer } from '@/lib/supabase/server';
import type { BlogPost } from './blog';

export async function fetchPostBySlugOrIdServer(identifier: string): Promise<BlogPost | null> {
  const supabase = await createServer();

  const { data: slugData, error: slugError } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', identifier)
    .eq('published', true)
    .single();

  if (!slugError && slugData) return slugData;

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', identifier)
    .eq('published', true)
    .single();

  if (error) return null;
  return data || null;
}
