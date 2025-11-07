'use client';

import { useEffect, useState } from 'react';
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

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPosts(data || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // HTML에서 텍스트만 추출 (미리보기용)
  function getTextPreview(html: string, maxLength: number = 150): string {
    const div = document.createElement('div');
    div.innerHTML = html;
    const text = div.textContent || div.innerText || '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900">Blog</h1>
          <p className="mt-2 text-gray-600">
            Insights, stories, and updates from our team
          </p>
        </div>
      </header>

      {/* Blog Posts */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No blog posts yet.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <Link href={`/about/blog/${post.id}`} className="block">
                  <div className="p-8">
                    {/* Title */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-red-600 transition-colors">
                      {post.title}
                    </h2>

                    {/* Meta Info */}
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <span>{post.author_email}</span>
                      <span className="mx-2">•</span>
                      <time dateTime={post.created_at}>
                        {new Date(post.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </div>

                    {/* Preview */}
                    <p className="text-gray-600 leading-relaxed">
                      {getTextPreview(post.content)}
                    </p>

                    {/* Read More */}
                    <div className="mt-4">
                      <span className="text-red-600 font-medium hover:text-red-700 inline-flex items-center">
                        Read more
                        <svg
                          className="ml-2 w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}