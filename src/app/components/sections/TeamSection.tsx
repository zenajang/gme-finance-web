'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { COMMON_COLORS } from "@/constants/colors";

import 'swiper/css';
import 'swiper/css/navigation';

export type Teams = {
  id?: string;
  image: string;
  name: string;
};

interface TeamsProps {
  teams: Teams[];
  title: string;
  nameBgColor?: string;
  titleColor?: string;
}

export default function TeamSection({
    teams,
    title='',
    nameBgColor=COMMON_COLORS.primary,
    titleColor=COMMON_COLORS.black
}:TeamsProps) {
  const showNavigation = teams.length > 4;
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const handlePrev = () => {
    swiperInstance?.slidePrev();
  };

  const handleNext = () => {
    swiperInstance?.slideNext();
  };

  return (
    <section className="px-0 md:py-20 lg:py-20 md:px-20 lg:px-30">
      <div className="px-3  relative z-20">
        <h2 className="text-heading text-center mb-0 md:mb-10" style={{ color: titleColor }}>{title} Team</h2>
        <div className="max-w-8xl mx-auto relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={teams.length <= 3 ? teams.length : 4}
            onSwiper={setSwiperInstance}
            loop={showNavigation}
            className="country-swiper"
            style={teams.length <= 3 ? { justifyContent: 'center' } : {}}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 5,
              },
              640: {
                slidesPerView: teams.length <= 2 ? teams.length : 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: teams.length <= 3 ? teams.length : 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: teams.length <= 3 ? teams.length : 4,
                spaceBetween: 20,
              },
            }}
          >
            {teams.map((team, index) => (
              <SwiperSlide className="!overflow-visible py-10 px-2" key={team.id || index}>
                <div className="rounded-3xl bg-white overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] flex flex-col w-full h-[250px] md:h-[300px] lg:h-[480px]">
                  {/* 이미지 영역 - 75% */}
                  <div className="relative w-full h-[84%]">
                    <Image
                        src={team.image}
                        alt={team.name}
                        fill
                        className="object-cover"
                        sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, (min-width:640px) 50vw, 100vw"
                        priority={false}
                    />
                  </div>
                  
                  {/* 이름 영역 - 25% */}
                  <div className="w-full h-[16%] flex items-center justify-center" style={{ backgroundColor: nameBgColor }}>
                    <span className='text-label text-white text-center'>{team.name}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {showNavigation && (
            <>
              {/* 왼쪽 화살표 */}
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7 md:w-13 md:h-13 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer z-10"
                aria-label="Previous"
              >
                <svg className="w-3 h-3 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* 오른쪽 화살표 */}
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-7 h-7 md:w-13 md:h-13 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer z-10"
                aria-label="Next"
              >
                <svg className="w-3 h-3 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}