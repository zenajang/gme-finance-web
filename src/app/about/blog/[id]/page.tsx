import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchPostBySlugOrIdServer } from '@/lib/supabase/blog-server';
import BlogDetailClient from './BlogDetailClient';

export const dynamic = 'force-dynamic';

function extractFirstImage(html: string): string | null {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const post = await fetchPostBySlugOrIdServer(id);

  if (!post) return {};

  const description = stripHtml(post.content).substring(0, 160);
  const image = post.thumbnail_url || extractFirstImage(post.content) || 'https://gmefinance.com/images/logo.png';

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
      type: 'article',
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [image],
    },
  };
}

export default async function BlogDetailPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const post = await fetchPostBySlugOrIdServer(id);

  if (!post) notFound();

  return <BlogDetailClient initialPost={post} />;
}
