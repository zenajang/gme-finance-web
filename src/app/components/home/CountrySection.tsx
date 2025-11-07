'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { COUNTRIES } from '@/constants/countries';

// Swiper 스타일 import
import 'swiper/css';
import 'swiper/css/navigation';

export default function CountrySection() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleAutoplay = () => {
    if (!swiperInstance) return;
    if (isPlaying) swiperInstance.autoplay.stop();
    else swiperInstance.autoplay.start();
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="pt-10 md:py-15 lg:py-15 px-4 md:px-40 lg:px-40 bg-white">
      <div className="px-0 md:px-3 lg:px-3">
        <h2 className="text-heading text-center mb-8 md:mb-10 lg:mb-10">
          Please select your country
        </h2>

        <div className="max-w-8xl mx-auto">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView="auto"
            speed={800}
            navigation={{
              prevEl: '.swiper-button-prev-custom',
              nextEl: '.swiper-button-next-custom',
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            loop={true}
            onSwiper={setSwiperInstance}
            className="country-swiper"
            breakpoints={{
              320: {
                slidesPerView: 3,
                spaceBetween: 20,
                centeredSlides: true,
              },
              640: {
                slidesPerView: 4,
                spaceBetween: 30,
                centeredSlides: true,
              },
              768: {
                slidesPerView: 5,
                spaceBetween: 30,
                centeredSlides: false,
              },
              1024: {
                slidesPerView: 7,
                spaceBetween: 40,
                centeredSlides: false,
              },
              1280: {
                slidesPerView: 9,
                spaceBetween: 40,
                centeredSlides: false,
              },
            }}
          >
            {COUNTRIES.map((country) => (
              <SwiperSlide key={country.code}>
                <Link
                  href={`/${country.name.toLowerCase()}`}
                  className="flex flex-col items-center p-2 md:hover:bg-gray-50 rounded-lg transition-colors w-full"
                >
                  {/* 바깥 래퍼: 모바일에서 active일 때 크게 확대 */}
                  <div className="w-28 h-28 rounded-full overflow-hidden relative flex items-center justify-center flag-ring">
                    {/* 안쪽 래퍼: country.scale 유지 */}
                    <div className={`relative w-full h-full ${country.scale}`}>
                      <Image
                        src={country.flag}
                        alt={country.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <span className="text-base font-medium whitespace-nowrap">{country.name}</span>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* 컨트롤 버튼들 - 데스크톱에서만 표시 */}
          <div className="hidden md:flex relative items-center justify-center mt-10">
            {/* 왼쪽 화살표 */}
            <button
              className="swiper-button-prev-custom absolute left-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer"
              aria-label="Previous"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* 재생/멈춤 버튼 - 가운데 */}
            <button
              onClick={toggleAutoplay}
              className="flex items-center gap-3 justify-center cursor-pointer transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <>
                  <Image src="/images/pause.png" alt="Pause" width={12} height={12} />
                  <Image src="/images/round.png" alt="round" width={11} height={11} />
                  <Image src="/images/rectangle.png" alt="rectangle" width={40} height={40} />
                </>
              ) : (
                <>
                  <Image src="/images/start.png" alt="Play" width={12} height={12} />
                  <Image src="/images/round.png" alt="round" width={11} height={11} />
                  <Image src="/images/rectangle.png" alt="rectangle" width={40} height={40} />
                </>
              )}
            </button>

            {/* 오른쪽 화살표 */}
            <button
              className="swiper-button-next-custom absolute right-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer"
              aria-label="Next"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
