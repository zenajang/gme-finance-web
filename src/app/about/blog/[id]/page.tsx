'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import '@/app/components/admin/TiptapEditor.css';

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/about/blog"
            className="inline-flex items-center text-red-600 hover:text-red-700 font-medium mb-4"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center text-gray-500 mb-8 pb-8 border-b">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                {post.author_email.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-gray-900">{post.author_email}</p>
                <div className="flex items-center text-sm">
                  <time dateTime={post.created_at}>
                    {new Date(post.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  {post.updated_at && post.updated_at !== post.created_at && (
                    <>
                      <span className="mx-2">•</span>
                      <span className="text-blue-600">
                        Updated {new Date(post.updated_at).toLocaleDateString('en-US', {
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
        <div className="mt-8 text-center">
          <Link
            href="/about/blog"
            className="inline-block px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            View All Posts
          </Link>
        </div>
      </article>
    </div>
  );
}