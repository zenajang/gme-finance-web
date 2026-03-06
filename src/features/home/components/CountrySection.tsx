'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef, useMemo } from 'react';
import { COUNTRIES } from '@/constants/countries';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';

export default function CountrySection() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const duplicatedCountries = [...COUNTRIES, ...COUNTRIES, ...COUNTRIES];
  const singleSetWidth = COUNTRIES.length * 170;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const currentSection = useMemo(() => {
    const sectionWidth = singleSetWidth / 3;
    return Math.floor((scrollPosition % singleSetWidth) / sectionWidth);
  }, [scrollPosition, singleSetWidth]);

  useEffect(() => {
    if (isMobile) return;

    const animate = (currentTime: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = currentTime;
      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      if (isPlaying) {
        setScrollPosition((prev) => {
          const newPos = prev + (deltaTime * 0.03);
          if (newPos >= singleSetWidth) {
            return newPos - singleSetWidth;
          }
          return newPos;
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, singleSetWidth, isMobile]);

  const toggleAutoplay = () => {
    setIsPlaying(!isPlaying);
    if (swiperRef.current) {
      if (isPlaying) {
        swiperRef.current.autoplay.stop();
      } else {
        swiperRef.current.autoplay.start();
      }
    }
  };

  const handlePrev = () => {
    if (isMobile && swiperRef.current) {
      swiperRef.current.slidePrev();
    } else {
      setScrollPosition((prev) => {
        const newPos = prev - 170;
        return newPos < 0 ? singleSetWidth + newPos : newPos;
      });
    }
  };

  const handleNext = () => {
    if (isMobile && swiperRef.current) {
      swiperRef.current.slideNext();
    } else {
      setScrollPosition((prev) => {
        const newPos = prev + 170;
        return newPos >= singleSetWidth ? newPos - singleSetWidth : newPos;
      });
    }
  };

  const goToSection = (section: number) => {
    const sectionWidth = singleSetWidth / 3;
    setScrollPosition(section * sectionWidth);
  };

  const canClickSlide = () => {
    const swiper = swiperRef.current as (SwiperType & { allowClick?: boolean }) | null;
    return swiper?.allowClick ?? true;
  };

  return (
    <section className="pt-10 md:py-15 lg:py-15 bg-white overflow-x-hidden">
      <div className="px-0 md:px-3 lg:px-3">
        <h2 className="text-heading text-center mb-8 md:mb-10 lg:mb-10">
          Choose a country
        </h2>

        {/* 모바일: Swiper 사용 */}
        {isMobile ? (
          <div className="country-swiper pb-6">
            <Swiper
              modules={[Autoplay]}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              slidesPerView={3}
              centeredSlides={true}
              spaceBetween={10}
              loop={true}
              speed={300}
              preventClicks={false}
              preventClicksPropagation={false}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              className="!overflow-visible"
            >
              {COUNTRIES.map((country, index) => (
                <SwiperSlide key={`${country.code}-${index}`}>
                  {({ isActive, isPrev, isNext }) => (
                    <div
                      className="flex flex-col items-center transition-transform duration-300"
                      style={{
                        transform: `scale(${isActive ? 1.1 : isPrev || isNext ? 0.95 : 0.85})`,
                      }}
                    >
                      <div
                        onClick={() => {
                          if (canClickSlide()) {
                            router.push(`/${country.name.toLowerCase()}`);
                          }
                        }}
                        className="flex flex-col items-center p-2 rounded-lg transition-colors w-full cursor-pointer"
                      >
                        <div
                          className="w-24 h-24 overflow-hidden relative flex items-center justify-center flag-ring rounded-full"
                          style={{ boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)' }}
                        >
                          <Image
                            src={country.flag}
                            alt={country.name}
                            fill
                            className="object-cover"
                            loading="lazy"
                            unoptimized
                          />
                        </div>
                        <span className="text-sm font-medium whitespace-nowrap mt-4">
                          {country.name}
                        </span>
                      </div>
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          /* 데스크탑: 기존 무한 스크롤 */
          <div className="max-w-8xl mx-auto overflow-hidden pt-1 pb-0">
            <div
              ref={containerRef}
              className="flex transition-none"
              style={{
                transform: `translateX(-${scrollPosition}px)`,
                willChange: 'transform',
              }}
            >
              {duplicatedCountries.map((country, index) => (
                <div
                  key={`${country.code}-${index}`}
                  className="flex-shrink-0 w-[170px]"
                >
                  <Link
                    href={`/${country.name.toLowerCase()}`}
                    className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg transition-colors w-full"
                  >
                    <div
                      className="w-32 h-32 overflow-hidden relative flex items-center justify-center flag-ring rounded-full"
                      style={{ boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)' }}
                    >
                      <Image
                        src={country.flag}
                        alt={country.name}
                        fill
                        className="object-cover"
                        loading="lazy"
                        unoptimized
                      />
                    </div>
                    <span className="text-base font-medium whitespace-nowrap mt-4">
                      {country.name}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="hidden md:flex items-center justify-center gap-4 mt-10">
          <button
            onClick={handlePrev}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
            aria-label="Previous"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={toggleAutoplay}
            className="flex items-center justify-center cursor-pointer transition-colors"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Image src="/images/pause.png" alt="Pause" width={12} height={12} />
            ) : (
              <Image src="/images/start.png" alt="Play" width={12} height={12} />
            )}
          </button>

          <div className="flex items-center gap-3">
            {/* 첫 번째 indicator */}
            <button
              onClick={() => goToSection(0)}
              className="cursor-pointer hover:opacity-70 transition-opacity"
              aria-label="Go to section 1"
            >
              <Image
                src={currentSection === 0 ? "/images/rectangle.png" : "/images/round.png"}
                alt="indicator"
                width={currentSection === 0 ? 40 : 11}
                height={currentSection === 0 ? 11 : 11}
              />
            </button>
            {/* 두 번째 indicator */}
            <button
              onClick={() => goToSection(1)}
              className="cursor-pointer hover:opacity-70 transition-opacity"
              aria-label="Go to section 2"
            >
              <Image
                src={currentSection === 1 ? "/images/rectangle.png" : "/images/round.png"}
                alt="indicator"
                width={currentSection === 1 ? 40 : 11}
                height={currentSection === 1 ? 11 : 11}
              />
            </button>
            {/* 세 번째 indicator */}
            <button
              onClick={() => goToSection(2)}
              className="cursor-pointer hover:opacity-70 transition-opacity"
              aria-label="Go to section 3"
            >
              <Image
                src={currentSection === 2 ? "/images/rectangle.png" : "/images/round.png"}
                alt="indicator"
                width={currentSection === 2 ? 40 : 11}
                height={currentSection === 2 ? 11 : 11}
              />
            </button>
          </div>

          <button
            onClick={handleNext}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
            aria-label="Next"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
