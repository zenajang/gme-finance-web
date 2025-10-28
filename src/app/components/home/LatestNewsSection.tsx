'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

// Swiper 스타일 import
import 'swiper/css';

type NewsItem = {
  id: string;
  tags: string[];
  date: string;
  title: string;
  image: string;
  href?: string;
};

const NEWS: NewsItem[] = [
  {
    id: 'gme-cricket-2025',
    tags: ['News', 'Collaboration', 'Restaurant'],
    date: '2025-06-27',
    title: 'GME Finance is collaborating with the Warcop restaurant in Ansan',
    image: '/images/introduction.jpg',
    href: '/news/gme',
  },
  {
    id: 'anniv-gift',
    tags: ['Event', 'Anniversary', 'Gift'],
    date: '2025-06-27',
    title: 'GME Finance 6th Anniversary Gift Event',
    image: '/images/introduction.jpg',
    href: '/news/anniv-gift',
  },
  {
    id: 'raffle-draw',
    tags: ['Event', 'Anniversary', 'Travel'],
    date: '2025-06-27',
    title: 'GME Finance 6th Anniversary Travel Raffle Draw Event',
    image: '/images/introduction.jpg',
    href: '/news/raffle-draw',
  },
];

function formatDate(d: string) {
  const dt = new Date(d);
  return `${dt.getFullYear()}.${String(dt.getMonth() + 1).padStart(2, '0')}.${String(dt.getDate()).padStart(2, '0')}`;
}

// 카드 컴포넌트를 별도로 분리
function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className=" rounded-3xl bg-white flex flex-col min-h-[400px] md:min-h-[600px] shadow-sm overflow-hidden">
      <div className="p-6 md:p-8 flex flex-col flex-1">
        <header className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-2">
            <Image src="/images/speaker.png" alt="Speaker" width={25} height={25} className="w-5 h-5 md:w-[25px] md:h-[25px]" />
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
              <p className="text-sm md:text-[1.1em]">{item.tags[0]}</p>
              <p className="text-xs md:text-sm text-gray-500 md:mt-0.5">{formatDate(item.date)}</p>
            </div>
          </div>
          <button className="text-gray-500 hover:text-gray-700" aria-label="more">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <circle cx="10" cy="4" r="1.5" />
              <circle cx="10" cy="10" r="1.5" />
              <circle cx="10" cy="16" r="1.5" />
            </svg>
          </button>
        </header>

        {/* 제목 */}
        <h3 className="text-lg md:text-[1.85rem] leading-snug line-clamp-3 mb-3 font-medium">
          {item.title}
        </h3>
      </div>
      <div className="px-6 md:px-8 py-1 flex flex-wrap gap-2 text-xs md:text-[1rem] text-gray-500">
        {item.tags.map((tag, index) => (
          <span key={index}>#{tag}</span>
        ))}
      </div>
      <div className="relative w-full h-[180px] md:h-1/2">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
          priority={false}
        />
      </div>
    </article>
  );
}

export default function LatestNewsSection() {
  return (
    <section
      className="py-12 md:py-14 lg:py-16 px-0 md:px-45 lg:px-45 bg-white bg-cover bg-center bg-no-repeat relative overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/latestNew_bg.png)',
          transform: 'rotate(180deg)'
        }}
      />
      <div className="px-0 md:px-3 lg:px-3 relative z-10">
        <h2 className="text-heading text-white text-center px-4 md:px-0">Latest News</h2>

        {/* 모바일 버전 - Swiper 사용 */}
        <div className="block md:hidden mt-3 md:mt-8 lg:mt-8 py-4">
          <Swiper
            spaceBetween={20}
            slidesPerView={1.15}
            slidesOffsetBefore={20}
            slidesOffsetAfter={-10}
            centeredSlides={false}
            className="latest-news-swiper"
          >
            {NEWS.map((item, index) => (
              <SwiperSlide key={item.id}>
                <div className={index === NEWS.length - 1 ? 'pr-5' : ''}>
                  <NewsCard item={item} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 데스크톱 버전 - Grid 레이아웃 */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mt-8">
          {NEWS.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>

        <div className="text-center mt-2 md:mt-15 lg:mt-15">
          <button className="bg-white border-1 border-red-500 text-lg md:text-[1.35rem] lg:text-[1.35rem] text-red-500 rounded-full cursor-pointer px-18 md:px-40 lg:px-40 py-2 md:py-6 lg:py-6  font-medium hover:bg-red-50 transition-colors">
            See More
          </button>
        </div>
      </div>
    </section>
  );
}
