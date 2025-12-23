'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import Image from 'next/image';
import { COMMON_COLORS } from '@/constants/colors';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
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
  const [hoveredId, setHoveredId] = useState<string | null>(null);

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

  // HTML에서 첫 번째 이미지 추출
  function extractFirstImage(html: string): string | null {
    const div = document.createElement('div');
    div.innerHTML = html;
    const img = div.querySelector('img');
    return img ? img.src : null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  const BlogCard = ({ post }: { post: BlogPost }) => {
    const thumbnail = extractFirstImage(post.content);

    return (
      <article
        className="
          rounded-3xl bg-white
          flex flex-col
          h-[360px] md:h-[600px]
          shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] overflow-hidden
          mb-10
        "
      >
        {/* Thumbnail Image */}
        <div className="relative w-full h-[180px] md:h-1/2 bg-gradient-to-br from-red-400 to-red-600">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg
                className="w-20 h-20 text-white opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex flex-col flex-1">
          <header className="mb-3 flex-1">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
              {post.title}
            </h3>

            {/* Meta Info */}
            <div className="flex items-center text-xs md:text-sm text-gray-500 mb-3">
              <span className="line-clamp-1">{post.author_email}</span>
              <span className="mx-2">•</span>
              <time dateTime={post.created_at}>
                {new Date(post.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </time>
            </div>

            {/* Preview */}
            <p className="text-sm md:text-base text-gray-600 line-clamp-3">
              {getTextPreview(post.content, 120)}
            </p>
          </header>

          {/* Read More Button */}
          <div className="mt-auto">
            <Link href={`/about/blog/${post.id}`}>
              <button
                className="text-sm md:text-base text-white py-2 md:py-3 transition-colors w-full rounded-lg md:rounded-xl font-medium"
                style={{
                  backgroundColor: hoveredId === post.id ? COMMON_COLORS.primaryHover : COMMON_COLORS.primary
                }}
                onMouseEnter={() => setHoveredId(post.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                Read More
              </button>
            </Link>
          </div>
        </div>
      </article>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mt-10 md:mt-20">Blog</h1>
        <p className="mt-2 text-gray-600 text-center">
          Insights, stories, and updates from our team
        </p>
      </div>

      {/* Blog Posts */}
      <main className="py-8 md:py-10 px-0 md:px-45 lg:px-20">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No blog posts yet.</p>
          </div>
        ) : (
          <div className="px-0 md:px-3 lg:px-3 relative z-10">
            {/* 모바일 버전 - Swiper 사용 */}
            <div className="block md:hidden mt-3 md:mt-8 lg:mt-8 py-4">
              <Swiper
                spaceBetween={20}
                slidesPerView={1.15}
                slidesOffsetBefore={20}
                slidesOffsetAfter={-10}
                centeredSlides={false}
                className="blog-posts-swiper"
              >
                {posts.map((post, index) => (
                  <SwiperSlide key={post.id}>
                    <div className={index === posts.length - 1 ? 'pr-5' : ''}>
                      <BlogCard post={post} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* 데스크톱 버전 - Grid 레이아웃 */}
            <div className="hidden md:grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 