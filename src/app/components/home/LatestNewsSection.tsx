'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRouter } from 'next/navigation';
import { COMMON_COLORS } from '@/constants/colors';
import useSWR from 'swr';
import { fetchPublishedPosts, type BlogPost } from '@/lib/supabase/blog';

// Swiper 스타일 import
import 'swiper/css';
import { useTranslation } from 'react-i18next';

function formatDate(d: string) {
  const dt = new Date(d);
  return `${dt.getFullYear()}.${String(dt.getMonth() + 1).padStart(2, '0')}.${String(dt.getDate()).padStart(2, '0')}`;
}

// HTML에서 첫 번째 이미지 추출
function extractFirstImage(html: string): string | null {
  const imgMatch = html.match(/<img[^>]+src="([^">]+)"/);
  return imgMatch ? imgMatch[1] : null;
}

// HTML에서 텍스트만 추출 (미리보기용)
function getTextPreview(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

function NewsCard({ post, onClick }: { post: BlogPost; onClick: () => void }) {
  const thumbnail = extractFirstImage(post.content);
  const [isImageReady, setIsImageReady] = useState(!thumbnail);

  return (
    <article
      onClick={onClick}
      className="group rounded-2xl bg-white flex flex-col h-[380px] md:h-auto md:aspect-[4/5] shadow-sm overflow-hidden cursor-pointer hover:shadow-lg transition-transform duration-600 hover:-translate-y-2 hover:scale-[1.02]"
    >
      <div className="p-6 md:p-10 flex flex-col flex-1">
        <header className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-2">
            <Image src="/images/speaker.png" alt="Speaker" width={25} height={25} className="w-5 h-5 md:w-[25px] md:h-[25px]" />
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
              <p className="text-sm md:text-[1.1em]">News</p>
              <p className="text-xs md:text-sm text-gray-500 md:mt-0.5">{formatDate(post.created_at)}</p>
            </div>
          </div>
        </header>

        {/* 제목 */}
        <h3 className="text-sm md:text-[1.85rem] leading-snug line-clamp-3 mb-3 font-bold md:font-medium">
          {post.title}
        </h3>

        {/* 미리보기 */}
        <p className="text-sm md:text-sm lg:text-[1rem] text-gray-600 line-clamp-6 md:line-clamp-3">
          {getTextPreview(post.content)}
        </p>
      </div>
      <div className="relative w-full h-[180px] md:h-3/5">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-1200 group-hover:scale-110"
            sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
            priority={false}
            onLoadingComplete={() => setIsImageReady(true)}
            onError={() => setIsImageReady(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-white opacity-50"
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
        {!isImageReady && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-10 h-10 rounded-full animate-spin"
              style={{ border: '4px solid #e5e7eb', borderTopColor: COMMON_COLORS.primary }}
            />
          </div>
        )}
      </div>
    </article>
  );
}

export default function LatestNewsSection() {
  const { t } = useTranslation();
  const router = useRouter();
  const { data: posts = [], isLoading, error } = useSWR(
    ['blog_posts', { published: true, category: 'blog', limit: 3 }],
    () => fetchPublishedPosts({ category: 'blog', limit: 3 })
  );

  if (error) {
    console.error('Error fetching posts:', error);
  }

  if (isLoading) {
    return (
      <section className="py-8 md:py-14 lg:py-16 px-0 md:px-45 lg:px-45 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, #9F0920 0%, #D81313 33%, #E6271E 60%, #F97B3F 100%)'
          }}
        />
        <div className="relative z-10 flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <section
      className="py-8 md:py-14 lg:py-16 px-0 md:px-45 lg:px-45 bg-white bg-cover bg-center bg-no-repeat relative overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, #9F0920 0%, #D81313 33%, #E6271E 60%, #F97B3F 100%)'
        }}
      />
      <div className="px-0 md:px-3 lg:px-3 relative z-10">
        <h2 className="text-heading text-white text-center md:px-0 md:mb-15">Latest News</h2>

        {/* 모바일 버전 - Swiper 사용 */}
        <div className="block md:hidden mt-0 py-6">
          <Swiper
            spaceBetween={20}
            slidesPerView={1.15}
            slidesOffsetBefore={20}
            slidesOffsetAfter={-10}
            centeredSlides={false}
          >
            {posts.map((post, index) => (
              <SwiperSlide key={post.id}>
                <div className={index === posts.length - 1 ? 'pr-5' : ''}>
                  <NewsCard post={post} onClick={() => router.push(`/about/blog/${post.id}`)} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 데스크톱 버전 - Grid 레이아웃 */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mt-8">
          {posts.map((post) => (
            <NewsCard key={post.id} post={post} onClick={() => router.push(`/about/blog/${post.id}`)} />
          ))}
        </div>

        <div className="text-center mt-0 md:mt-15 lg:mt-15">
          <Link
            href="/about/blog?category=blog"
            className="inline-block bg-white text-md md:text-[1.35rem] rounded-xl shadow-sm lg:text-[1.35rem] text-red-500 cursor-pointer px-18 md:px-40 lg:px-40 py-2 md:py-6 lg:py-6 font-semibold hover:bg-red-50 transition-colors"
          >
            {t('button.seeMore')}
          </Link>
        </div>
      </div>
    </section>
  );
}
