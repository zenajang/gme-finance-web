'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import Image from 'next/image';
import { COMMON_COLORS } from '@/constants/colors';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: 'blog' | 'customer_feedback';
  author_email: string;
  created_at: string;
  updated_at: string;
}

type FilterCategory = 'all' | 'blog' | 'customer_feedback';

export default function BlogPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(9);

  // URL 쿼리에서 초기 카테고리 설정
  const initialCategory = (searchParams.get('category') as FilterCategory) || 'all';
  const [filterCategory, setFilterCategory] = useState<FilterCategory>(initialCategory);

  // 필터 변경 시 URL도 업데이트
  const handleFilterChange = (category: FilterCategory) => {
    setFilterCategory(category);
    setVisibleCount(9); // 필터 변경 시 초기화
    if (category === 'all') {
      router.push('/about/blog', { scroll: false });
    } else {
      router.push(`/about/blog?category=${category}`, { scroll: false });
    }
  };

  // 더 보기 버튼 핸들러
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 9);
  };

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

  // URL 쿼리 변경 시 필터 업데이트
  useEffect(() => {
    const category = searchParams.get('category') as FilterCategory;
    if (category && ['all', 'blog', 'customer_feedback'].includes(category)) {
      setFilterCategory(category);
    }
  }, [searchParams]);

  // 필터된 포스트
  const filteredPosts = filterCategory === 'all'
    ? posts
    : posts.filter(post => post.category === filterCategory);

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

  // HTML에서 첫 번째 비디오 추출
  function extractFirstVideo(html: string): string | null {
    const div = document.createElement('div');
    div.innerHTML = html;
    const video = div.querySelector('video');
    if (video) {
      const src = video.getAttribute('src');
      if (src) return src;
      const source = video.querySelector('source');
      if (source) return source.getAttribute('src');
    }
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  // 브런치 스타일 - 히어로 카드 (첫 번째 글)
  const HeroCard = ({ post }: { post: BlogPost }) => {
    const thumbnail = extractFirstImage(post.content);

    return (
      <Link href={`/about/blog/${post.id}`}>
        <article
          className="group relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden cursor-pointer"
          onMouseEnter={() => setHoveredId(post.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* 배경 이미지 */}
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 1024px) 900px, 100vw"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-red-500 to-red-600" />
          )}

          {/* 그라데이션 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* 콘텐츠 */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-white/20 backdrop-blur-sm rounded-full mb-4">
              {post.category === 'blog' ? 'Latest News' : 'Customer Feedback'}
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 line-clamp-2">
              {post.title}
            </h2>
            <p className="text-white/80 text-sm md:text-base line-clamp-2 mb-4 max-w-2xl">
              {getTextPreview(post.content, 150)}
            </p>
            <time className="text-white/60 text-sm" dateTime={post.created_at}>
              {new Date(post.created_at).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
        </article>
      </Link>
    );
  };

  // 브런치 스타일 - 일반 카드
  const BrunchCard = ({ post }: { post: BlogPost }) => {
    const thumbnail = extractFirstImage(post.content);
    const videoSrc = extractFirstVideo(post.content);

    return (
      <Link href={`/about/blog/${post.id}`}>
        <article
          className="group cursor-pointer"
          onMouseEnter={() => setHoveredId(post.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* 썸네일 */}
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-gray-100">
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
              />
            ) : videoSrc ? (
              <div className="relative w-full h-full">
                <video
                  className="w-full h-full object-cover"
                  src={`${videoSrc}#t=0.5`}
                  preload="metadata"
                  muted
                  playsInline
                />
                {/* 재생 아이콘 오버레이 */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                  <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center">
                <svg className="w-12 h-12 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
            )}
          </div>

          {/* 콘텐츠 */}
          <div>
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              {post.category === 'blog' ? 'News' : 'Feedback'}
            </span>
            <h3
              className="text-lg md:text-xl font-bold mt-1 mb-2 line-clamp-2 transition-colors"
              style={{ color: hoveredId === post.id ? COMMON_COLORS.primary : '#111827' }}
            >
              {post.title}
            </h3>
            <p className="text-gray-500 text-sm line-clamp-2 mb-3">
              {getTextPreview(post.content, 100)}
            </p>
            <time className="text-xs text-gray-400" dateTime={post.created_at}>
              {new Date(post.created_at).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
        </article>
      </Link>
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

        {/* Category Filter Tabs */}
        <div className="flex justify-center gap-2 mt-8">
          <button
            onClick={() => handleFilterChange('all')}
            className={`px-4 md:px-6 py-2 text-sm md:text-base font-medium rounded-full transition-all ${filterCategory === 'all'
                ? 'text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            style={filterCategory === 'all' ? { backgroundColor: COMMON_COLORS.primary } : {}}
          >
            All
            <span className={`ml-1.5 px-1.5 py-0.5 text-xs rounded-full ${filterCategory === 'all' ? 'bg-white/20' : 'bg-gray-200'
              }`}>
              {posts.length}
            </span>
          </button>
          <button
            onClick={() => handleFilterChange('blog')}
            className={`px-4 md:px-6 py-2 text-sm md:text-base font-medium rounded-full transition-all ${filterCategory === 'blog'
                ? 'text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            style={filterCategory === 'blog' ? { backgroundColor: COMMON_COLORS.primary } : {}}
          >
            Latest News
            <span className={`ml-1.5 px-1.5 py-0.5 text-xs rounded-full ${filterCategory === 'blog' ? 'bg-white/20' : 'bg-gray-200'
              }`}>
              {posts.filter(p => p.category === 'blog').length}
            </span>
          </button>
          <button
            onClick={() => handleFilterChange('customer_feedback')}
            className={`px-4 md:px-6 py-2 text-sm md:text-base font-medium rounded-full transition-all ${filterCategory === 'customer_feedback'
                ? 'text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            style={filterCategory === 'customer_feedback' ? { backgroundColor: COMMON_COLORS.primary } : {}}
          >
            Customer Feedback
            <span className={`ml-1.5 px-1.5 py-0.5 text-xs rounded-full ${filterCategory === 'customer_feedback' ? 'bg-white/20' : 'bg-gray-200'
              }`}>
              {posts.filter(p => p.category === 'customer_feedback').length}
            </span>
          </button>
        </div>
      </div>

      {/* Blog Posts - 브런치 스타일 */}
      <main className="max-w-6xl mx-auto px-4 pb-16">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No posts yet.</p>
          </div>
        ) : (
          <div>
            {/* 히어로 카드 - blog 카테고리만 (All일 때도 blog만, Customer Feedback 필터는 제외) */}
            {filterCategory !== 'customer_feedback' && (() => {
              const heroPost = filterCategory === 'all'
                ? filteredPosts.find(p => p.category === 'blog')
                : filteredPosts[0];
              return heroPost ? (
                <div className="mb-16 md:mb-20">
                  <HeroCard post={heroPost} />
                </div>
              ) : null;
            })()}

            {/* 나머지 포스트 그리드 */}
            {(() => {
              const heroPostId = filterCategory === 'all'
                ? filteredPosts.find(p => p.category === 'blog')?.id
                : filterCategory !== 'customer_feedback' ? filteredPosts[0]?.id : null;

              const allGridPosts = filterCategory === 'customer_feedback'
                ? filteredPosts
                : filteredPosts.filter(p => p.id !== heroPostId);

              const visibleGridPosts = allGridPosts.slice(0, visibleCount);
              const hasMore = allGridPosts.length > visibleCount;

              return allGridPosts.length > 0 ? (
                <div>
                  {filterCategory !== 'customer_feedback' && (
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-8">More Stories</h3>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {visibleGridPosts.map((post) => (
                      <BrunchCard key={post.id} post={post} />
                    ))}
                  </div>

                  {hasMore && (
                    <div className="text-center mt-12">
                      <button
                        onClick={handleLoadMore}
                        className="px-8 py-3 text-base font-medium rounded-full transition-all bg-gray-100 text-gray-700 hover:bg-gray-200"
                      >
                        Load More
                      </button>
                    </div>
                  )}
                </div>
              ) : null;
            })()}
          </div>
        )}
      </main>
    </div>
  );
} 