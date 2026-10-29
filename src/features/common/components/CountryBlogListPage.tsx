'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { COMMON_COLORS } from '@/constants/colors';
import { createClient } from '@/lib/supabase/client';
import type { BlogPost } from '@/lib/supabase/blog';
import { useTranslation } from 'react-i18next';

const PAGE_SIZE = 9;

const DISPLAY_NAMES: Record<string, string> = {
  srilanka: 'Sri Lanka',
};

function extractFirstImage(html: string): string | null {
  const imgMatch = html.match(/<img[^>]+src="([^"]+)"/);
  return imgMatch ? imgMatch[1] : null;
}

function extractFirstVideo(html: string): string | null {
  if (typeof document === 'undefined') return null;
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

function getTextPreview(html: string, maxLength = 150): string {
  if (typeof document === 'undefined') {
    return html.replace(/<[^>]*>/g, '').slice(0, maxLength);
  }
  const div = document.createElement('div');
  div.innerHTML = html;
  const text = div.textContent || div.innerText || '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

interface HeroCardProps {
  post: BlogPost;
  href: string;
  locale: string;
}

function HeroCard({ post, href, locale }: HeroCardProps) {
  const thumbnail = post.thumbnail_url || extractFirstImage(post.content);
  return (
    <Link href={href}>
      <article className="group relative w-full h-[400px] md:h-[520px] rounded-3xl overflow-hidden cursor-pointer shadow-[0_20px_60px_-40px_rgba(0,0,0,0.6)] ring-1 ring-black/5">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-1200 group-hover:scale-110"
            sizes="(min-width: 1024px) 900px, 100vw"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-red-500 to-red-600" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 line-clamp-2">{post.title}</h2>
          <p className="text-white/80 text-sm md:text-base line-clamp-2 mb-4 max-w-2xl">
            {getTextPreview(post.content, 150)}
          </p>
          <time className="text-white/60 text-sm" dateTime={post.created_at}>
            {new Date(post.created_at).toLocaleDateString(locale, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
      </article>
    </Link>
  );
}

interface BrunchCardProps {
  post: BlogPost;
  href: string;
  locale: string;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  loadedVideos: Record<string, boolean>;
  onVideoLoaded: (id: string) => void;
}

function BrunchCard({ post, href, locale, isHovered, onMouseEnter, onMouseLeave, loadedVideos, onVideoLoaded }: BrunchCardProps) {
  const thumbnail = post.thumbnail_url || extractFirstImage(post.content);
  const videoSrc = extractFirstVideo(post.content);
  return (
    <Link href={href}>
      <article
        className="group cursor-pointer rounded-2xl bg-white/80 backdrop-blur-md p-4 ring-1 ring-black/5 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.6)] transition-transform duration-600 hover:-translate-y-2 hover:scale-[1.02]"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-gray-100">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-1200 group-hover:scale-110"
              sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
            />
          ) : videoSrc ? (
            <video
              className={`w-full h-full object-cover transition-opacity duration-500 ${loadedVideos[post.id] ? 'opacity-100' : 'opacity-0'}`}
              src={`${videoSrc}#t=0.5`}
              preload="metadata"
              muted
              playsInline
              onLoadedData={() => onVideoLoaded(post.id)}
              onError={() => onVideoLoaded(post.id)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center">
              <svg className="w-12 h-12 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          )}
        </div>
        <div>
          <h3
            className="text-lg md:text-xl font-bold mt-1 mb-2 line-clamp-2 transition-colors"
            style={{ color: isHovered ? COMMON_COLORS.primary : '#111827' }}
          >
            {post.title}
          </h3>
          <p className="text-gray-500 text-sm line-clamp-2 mb-3">{getTextPreview(post.content, 100)}</p>
          <time className="text-xs text-gray-400" dateTime={post.created_at}>
            {new Date(post.created_at).toLocaleDateString(locale, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
      </article>
    </Link>
  );
}

interface Props {
  country: string;
}

export default function CountryBlogListPage({ country }: Props) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language || 'en';
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [loadedVideos, setLoadedVideos] = useState<Record<string, boolean>>({});
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(PAGE_SIZE);

  const fetchPage = useCallback(async (from: number, to: number) => {
    const supabase = createClient();
    const { data } = await supabase
      .from('blog_posts')
      .select('id, slug, title, content, category, country, author_email, thumbnail_url, created_at, updated_at')
      .eq('category', 'country')
      .eq('country', country)
      .eq('published', true)
      .order('created_at', { ascending: false })
      .range(from, to);
    return (data ?? []) as BlogPost[];
  }, [country]);

  useEffect(() => {
    setIsLoading(true);
    setPosts([]);
    setOffset(PAGE_SIZE);
    fetchPage(0, PAGE_SIZE - 1).then(data => {
      setPosts(data);
      setHasMore(data.length === PAGE_SIZE);
      setIsLoading(false);
    });
  }, [country, fetchPage]);

  const loadMore = async () => {
    setIsLoadingMore(true);
    const data = await fetchPage(offset, offset + PAGE_SIZE - 1);
    setPosts(prev => [...prev, ...data]);
    setHasMore(data.length === PAGE_SIZE);
    setOffset(prev => prev + PAGE_SIZE);
    setIsLoadingMore(false);
  };

  const markVideoLoaded = (postId: string) => {
    setLoadedVideos(prev => (prev[postId] ? prev : { ...prev, [postId]: true }));
  };

  const displayName = DISPLAY_NAMES[country] ?? (country.charAt(0).toUpperCase() + country.slice(1));
  const getPostHref = (post: BlogPost) => `/about/blog/${post.slug || post.id}`;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
      </div>
    );
  }

  const heroPost = posts[0];
  const gridPosts = posts.slice(1);

  return (
    <div className="min-h-screen relative overflow-hidden blog-paper">
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#ffe1cf] blur-3xl opacity-70 animate-float-slow" />
      <div className="pointer-events-none absolute top-40 -left-16 h-64 w-64 rounded-full bg-[#ffd7c2] blur-3xl opacity-60 animate-float-slower" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-18 pb-10 md:pb-14 mt-12 md:mt-18 relative z-10">
        <nav className="flex items-center gap-2 text-base text-gray-500 mb-6">
          <Link href="/" className="hover:text-red-600 transition-colors font-medium">Home</Link>
          <span className="text-gray-300">/</span>
          <Link href={`/${country}`} className="hover:text-red-600 transition-colors font-medium">{displayName}</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-800 font-semibold">{t('blog.title')}</span>
        </nav>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 text-center tracking-tight">
          {displayName} {t('blog.title')}
        </h1>
      </div>

      <main className="max-w-6xl mx-auto px-4 pb-16 relative z-10">
        {posts.length === 0 ? (
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
            {heroPost && (
              <div className="mb-16 md:mb-20 animate-fade-up">
                <HeroCard post={heroPost} href={getPostHref(heroPost)} locale={locale} />
              </div>
            )}
            {gridPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {gridPosts.map((post: BlogPost, index: number) => (
                  <div
                    key={post.id}
                    className="animate-fade-up"
                    style={{ animationDelay: `${Math.min(index, 6) * 80}ms` }}
                  >
                    <BrunchCard
                      post={post}
                      href={getPostHref(post)}
                      locale={locale}
                      isHovered={hoveredId === post.id}
                      onMouseEnter={() => setHoveredId(post.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      loadedVideos={loadedVideos}
                      onVideoLoaded={markVideoLoaded}
                    />
                  </div>
                ))}
              </div>
            )}
            {hasMore && (
              <div className="text-center mt-12">
                <button
                  onClick={loadMore}
                  disabled={isLoadingMore}
                  className="px-8 py-3 text-base font-semibold rounded-full transition-all bg-white/80 text-gray-700 hover:bg-white shadow-sm ring-1 ring-black/5 disabled:opacity-50"
                >
                  {isLoadingMore ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
