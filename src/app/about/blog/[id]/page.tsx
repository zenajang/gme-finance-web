'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import '@/app/components/admin/TiptapEditor.css';
import { useTranslation } from 'react-i18next';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author_email: string;
  created_at: string;
  updated_at: string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', params.id)
          .eq('published', true)
          .single();

        if (error) throw error;
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
        // 글을 찾을 수 없으면 목록으로 이동
        router.push('/about/blog');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  const locale = i18n.language || 'en';

  return (
    <div className="min-h-screen blog-paper mt-20 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#ffe1cf] blur-3xl opacity-70 animate-float-slow" />
      <div className="pointer-events-none absolute top-40 -left-16 h-64 w-64 rounded-full bg-[#ffd7c2] blur-3xl opacity-60 animate-float-slower" />
      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-[0_20px_60px_-40px_rgba(0,0,0,0.6)] ring-1 ring-black/5 p-8 md:p-12 animate-fade-up">
          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            {post.title}
          </h1>
          {/* Meta Info */}
          <div className="flex items-center text-gray-500 mb-8 pb-8 border-b border-black/5">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                {post.author_email.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-gray-900">{post.author_email}</p>
                <div className="flex items-center text-sm">
                  <time dateTime={post.created_at}>
                    {new Date(post.created_at).toLocaleDateString(locale, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  {post.updated_at && post.updated_at !== post.created_at && (
                    <>
                      <span className="mx-2">•</span>
                      <span className="text-blue-600">
                        {t('blog.detail.updatedLabel')}{' '}
                        {new Date(post.updated_at).toLocaleDateString(locale, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Content */}
          <div
            className="tiptap-editor prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
        {/* Navigation */}
        <div className="mt-8 text-center animate-fade-up">
          <Link
            href="/about/blog"
            className="inline-block px-6 py-3 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 transition-colors"
          >
            {t('blog.button.viewAll')}
          </Link>
        </div>
      </article>
    </div>
  );
} 
