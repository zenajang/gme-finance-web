'use client';

import Image from 'next/image';
import { COMMON_COLORS } from "@/constants/colors";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { useTranslation } from 'react-i18next';

type NewsItem = {
  id: string;
  date: string;
  content: string;
  video: string;
  name: string;
  career: string;
};

const NEWS: NewsItem[] = [
  {
    id: 'gme-cricket-2025',
    date: '2025-06-27',
    content: "GME Finance was a lifesaver! Their team provided exceptional support and guidance as I navigated the loan process. The application was easy, the rates were competitive, and they quickly approved my loan. I can't recommend them enough for anyone seeking reliable financial assistance",
    video: '/images/introduction.jpg',
    career: 'Factory Worker',
    name: 'Chanta',
  },
  {
    id: 'anniv-gift',
    date: '2025-06-27',
    content: 'Thanks to GME Finance, a huge weight has been lifted off my financial burden. Their loan services were incredibly fast and affordable. Their terms and conditions were also very friendly! I am grateful to GME Finance for providing me with a solution during my time of need.',
    video: '/images/introduction.jpg',
    career: 'Factory Worker',
    name: 'M.Agus'
  },
  {
    id: 'raffle-draw',
    date: '2025-06-27',
    content: 'GME Finance has been a game-changer for my finances. Their loans are not only fast and convenient but also perfectly suited to my needs. I was impressed by their speedy approval and customizable repayment plans. GME Finance truly puts their customers first, and their service is top-notch. I wholeheartedly recommend them to anyone seeking financial support.',
    video: '/images/introduction.jpg',
    career: 'Factory Worker',
    name: 'Lolita Gomonid'
  },
];

function formatDate(d: string) {
  const dt = new Date(d);
  return `${dt.getFullYear()}.${String(dt.getMonth() + 1).padStart(2, '0')}.${String(dt.getDate()).padStart(2, '0')}`;
}

function FeedbackCard({ item }: { item: NewsItem }) {
  return (
    <article className="rounded-3xl bg-white flex flex-col min-h-[380px] md:min-h-[550px] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] overflow-hidden">
      <div className="p-6 md:p-8 flex flex-col flex-1">
        <header className="flex items-end justify-between mb-3">
          <div className="flex items-end gap-2">
            <Image src="/images/thumb.png" alt="Speaker" width={30} height={30} className="w-5 h-5 md:w-[30px] md:h-[30px]" />
            <p className="text-sm md:text-[1.1rem] lg:text-[1.1rem] font-medium leading-none">{item.name}</p>
            <p className="text-small text-gray-500 leading-none">{item.career}</p>
          </div>
          <div className="hidden md:block text-small text-gray-500 leading-none">
            {formatDate(item.date)}
          </div>
        </header>

        <p className="text-sm md:text-sm lg:text-[1rem] leading-snug line-clamp-6 md:line-clamp-8 mb-3">
          {item.content}
        </p>
      </div>
      <video className="relative w-full h-[200px] md:h-1/2 lg:h-1/2" controls>
        <source src="/testimonial.mp4" type="video/mp4" />
      </video>
    </article>
  );
}

export default function CustomerFeedbackSection() {
  const { t } = useTranslation()
  return (
    <section className="pt-8 md:pt-14 lg:pt-16 pb-12 md:pb-20 lg:pb-20 px-0 md:px-45 lg:px-45 bg-white bg-cover bg-center bg-no-repeat relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 md:w-140 h-12 md:h-55 rounded-full -mr-12 md:-mr-52 -mt-0 rotate-45 animate-oscillate" style={{ background: `radial-gradient(circle, ${COMMON_COLORS.accentRed1} 0%, ${COMMON_COLORS.accentRed3} 100%)` }} />
      <div className="absolute top-12 md:top-55 right-0 w-32 md:w-180 h-12 md:h-55 rounded-full -mr-16 md:-mr-75 -mt-0 rotate-45 animate-oscillate" style={{ backgroundColor: COMMON_COLORS.accentRed2 }} />
      <div className="absolute bottom-20 md:bottom-40 left-10 w-32 md:w-[500px] h-12 md:h-55 rounded-full -ml-24 md:-ml-38 mb-3 md:-mb-18 -rotate-145 animate-oscillate" style={{ background: `radial-gradient(circle, ${COMMON_COLORS.accentRed1} 0%, ${COMMON_COLORS.accentRed3} 100%)` }} />
      <div className="absolute bottom-32 md:bottom-90 left-0 w-40 md:w-[700px] h-12 md:h-55 rounded-full -ml-20 md:-ml-68 -mb-0 md:-mb-16 -rotate-145 animate-oscillate" style={{ backgroundColor: COMMON_COLORS.accentRed2 }} />
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
            {NEWS.map((item, index) => (
              <SwiperSlide key={item.id}>
                <div className={index === NEWS.length - 1 ? 'pr-5' : ''}>
                  <FeedbackCard item={item} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 데스크톱 버전 - Grid 레이아웃 */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mt-8 ">
          {NEWS.map((item) => (
            <FeedbackCard key={item.id} item={item} />
          ))}
        </div>
        <div className="text-center mt-0 md:mt-15 lg:mt-15">
          <button className="bg-white shadow-[0_0_15px_rgba(0,0,0,0.15)] text-md md:text-[1.35rem] lg:text-[1.35rem] text-red-500 cursor-pointer px-18 md:px-40 lg:px-40 py-2 md:py-6 lg:py-6 font-semibold hover:bg-red-50 transition-all">
            {t('button.seeMore')}
          </button>
        </div>
      </div>
    </section>
  );
}
