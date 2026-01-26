'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { COMMON_COLORS } from '@/constants/colors';
import useSWR from 'swr';
import { fetchPublishedPosts, type BlogPost } from '@/lib/supabase/blog';

import 'swiper/css';
import { useTranslation } from 'react-i18next';

function formatDate(d: string) {
  const dt = new Date(d);
  return `${dt.getFullYear()}.${String(dt.getMonth() + 1).padStart(2, '0')}.${String(dt.getDate()).padStart(2, '0')}`;
}

// HTML에서 텍스트만 추출 (미리보기용)
function getTextPreview(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

// HTML에서 첫 번째 비디오 추출
function extractFirstVideo(html: string): string | null {
  const videoMatch = html.match(/<video[^>]*src="([^">]+)"/);
  if (videoMatch) return videoMatch[1];
  const sourceMatch = html.match(/<source[^>]*src="([^">]+)"/);
  return sourceMatch ? sourceMatch[1] : null;
}

function FeedbackCard({ post }: { post: BlogPost }) {
  const videoSrc = extractFirstVideo(post.content);
  const poster = post.thumbnail_url || undefined;
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(!videoSrc || !!poster);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoClick = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowControls(true);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
      // 재생 시작 후 잠시 후에 컨트롤 숨기기
      setTimeout(() => setShowControls(false), 1500);
    }
  };

  const handleMouseEnter = () => {
    if (isPlaying) setShowControls(true);
  };

  const handleMouseLeave = () => {
    if (isPlaying) setShowControls(false);
  };

  return (
    <article className="group rounded-3xl bg-white flex flex-col h-[380px] md:h-auto md:aspect-[4/5] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] overflow-hidden transition-transform duration-600 hover:-translate-y-2 hover:scale-[1.02]">
      <div className="p-6 md:p-10 flex flex-col flex-1">
        <header className="flex items-end justify-between mb-5">
          <div className="flex items-end gap-2">
            <Image src="/images/thumb.png" alt="Speaker" width={30} height={30} className="w-5 h-5 md:w-[30px] md:h-[30px]" />
            <p className="text-sm md:text-[1.1rem] lg:text-[1.2rem] font-bold md:font-medium leading-none">{post.title}</p>
          </div>
          <div className="hidden md:block text-small text-gray-500 leading-none">
            {formatDate(post.created_at)}
          </div>
        </header>

        <p className="text-sm md:text-sm lg:text-[1rem] leading-relaxed line-clamp-6 md:line-clamp-6 mt-2 mb-4">
          {getTextPreview(post.content)}
        </p>
      </div>
      {videoSrc ? (
        <div
          className="relative w-full h-[200px] md:h-1/2 lg:h-1/2 cursor-pointer overflow-hidden"
          onClick={handleVideoClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover transition-transform duration-1200 group-hover:scale-110"
            poster={poster}
            preload="metadata"
            playsInline
            crossOrigin="anonymous"
            src={`${videoSrc}#t=0.5`}
            onLoadedData={() => setIsVideoReady(true)}
            onError={() => setIsVideoReady(true)}
            onEnded={() => {
              setIsPlaying(false);
              setShowControls(true);
            }}
          />
          {/* 재생/일시정지 버튼 오버레이 */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors">
              {isPlaying ? (
                <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </div>
          </div>
          {!isVideoReady && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-10 h-10 rounded-full animate-spin"
                style={{ border: '4px solid #e5e7eb', borderTopColor: COMMON_COLORS.primary }}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="relative w-full h-[200px] md:h-1/2 lg:h-1/2 bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 transition-transform duration-1200 group-hover:scale-110" />
          <svg className="w-16 h-16 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
      )}
    </article>
  );
}

export default function CustomerFeedbackSection() {
  const { t } = useTranslation();
  const { data: posts = [], isLoading, error } = useSWR(
    ['blog_posts', { published: true, category: 'customer_feedback', limit: 3 }],
    () => fetchPublishedPosts({ category: 'customer_feedback', limit: 3 })
  );

  if (error) {
    console.error('Error fetching feedback posts:', error);
  }

  if (isLoading) {
    return (
      <section className="pt-8 md:pt-14 lg:pt-16 pb-12 md:pb-20 lg:pb-20 px-0 md:px-45 lg:px-45 bg-white relative overflow-hidden">
        <div className="relative z-10 flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="pt-8 md:pt-14 lg:pt-16 pb-16 md:pb-28 lg:pb-28 px-0 md:px-45 lg:px-45 bg-white bg-cover bg-center bg-no-repeat relative overflow-hidden">
      {/* 오른쪽 상단 장식 */}
      <div className="absolute top-0 right-0 w-24 md:w-140 h-13 md:h-55 rounded-full -mr-8 md:-mr-52 -mt-2 md:-mt-8 rotate-45 animate-oscillate" style={{ background: 'linear-gradient(to bottom, #fa775f, #ff7261)' }} />
      <div className="absolute top-12 md:top-55 right-0 w-32 md:w-180 h-13 md:h-55 rounded-full -mr-12 md:-mr-75 -mt-2 md:-mt-5 rotate-45 animate-oscillate" style={{ background: 'linear-gradient(to bottom, #FF6200, #EC3322)' }} />
      {/* 왼쪽 하단 장식 */}
      <div className="absolute bottom-22 md:bottom-48 left-0 w-28 md:w-[500px] h-13 md:h-55 rounded-full -ml-5 md:-ml-38 -rotate-145 animate-oscillate" style={{ background: 'linear-gradient(to right, #fa775f, #ff7261)' }} />
      <div className="absolute bottom-32 md:bottom-100 left-0 w-36 md:w-[700px] h-13 md:h-55 rounded-full -ml-12 md:-ml-68 -rotate-145 animate-oscillate" style={{ background: 'linear-gradient(to right, #FF6200, #EC3322)' }} />
      <div className="px-0 md:px-3 lg:px-3 relative z-10">
        <h2 className="text-heading text-black text-center md:px-0 md:mb-15">Customer Feedback</h2>

        {/* 모바일 버전 - Swiper 사용 */}
        <div className="block md:hidden py-5">
          <Swiper
            spaceBetween={20}
            slidesPerView={1.15}
            slidesOffsetBefore={20}
            slidesOffsetAfter={-10}
            centeredSlides={false}
            className="customer-feedback-swiper"
          >
            {posts.map((post, index) => (
              <SwiperSlide key={post.id}>
                <div className={index === posts.length - 1 ? 'pr-5' : ''}>
                  <FeedbackCard post={post} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 데스크톱 버전 - Grid 레이아웃 */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mt-8 ">
          {posts.map((post) => (
            <FeedbackCard key={post.id} post={post} />
          ))}
        </div>
        <div className="text-center mt-0 md:mt-15 lg:mt-15">
          <Link
            href="/about/blog?category=customer_feedback"
            aria-label="See more customer feedback posts"
            className="inline-block bg-white rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.15)] text-md md:text-[1.35rem] lg:text-[1.35rem] text-red-500 cursor-pointer px-18 md:px-40 lg:px-40 py-2 md:py-6 lg:py-6 font-semibold hover:bg-red-50 transition-all"
          >
            {t('button.seeMore')}
          </Link>
        </div>
      </div>
    </section>
  );
}
