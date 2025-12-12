'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { COUNTRIES } from '@/constants/countries';

export default function CountrySection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const duplicatedCountries = [...COUNTRIES, ...COUNTRIES, ...COUNTRIES];
  const singleSetWidth = COUNTRIES.length * 180;
  const mobileItemWidth = 140;

  // 윈도우 너비 감지
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 모바일에서 각 아이템의 scale 계산
  const getItemScale = useCallback((index: number) => {
    if (windowWidth >= 768) return 1; // 데스크톱은 scale 안 함

    const centerX = windowWidth / 2;
    const itemCenterX = (index * mobileItemWidth) + (mobileItemWidth / 2) - scrollPosition;
    const distance = Math.abs(centerX - itemCenterX);
    const maxDistance = windowWidth / 2;

    // 거리에 따라 1.0 ~ 1.3 사이의 scale 계산
    const scale = 1 + (0.3 * Math.max(0, 1 - distance / maxDistance));
    return Math.min(1.3, Math.max(1, scale));
  }, [windowWidth, scrollPosition, mobileItemWidth]);

  // 현재 스크롤 위치에 따른 구간 계산 (0, 1, 2)
  const currentSection = useMemo(() => {
    const sectionWidth = singleSetWidth / 3; // 각 구간의 너비 (4개 국가)
    return Math.floor((scrollPosition % singleSetWidth) / sectionWidth);
  }, [scrollPosition, singleSetWidth]);

  useEffect(() => {
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
  }, [isPlaying, singleSetWidth]);

  const toggleAutoplay = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrev = () => {
    setScrollPosition((prev) => {
      const newPos = prev - 180;
      return newPos < 0 ? singleSetWidth + newPos : newPos;
    });
  };

  const handleNext = () => {
    setScrollPosition((prev) => {
      const newPos = prev + 180;
      return newPos >= singleSetWidth ? newPos - singleSetWidth : newPos;
    });
  };

  // 특정 구간으로 이동
  const goToSection = (section: number) => {
    const sectionWidth = singleSetWidth / 3;
    setScrollPosition(section * sectionWidth);
  };

  return (
    <section className="pt-10 md:py-15 lg:py-15 bg-white">
      <div className="px-0 md:px-3 lg:px-3">
        <h2 className="text-heading text-center mb-8 md:mb-10 lg:mb-10">
          Please select your country
        </h2>

        <div className="max-w-8xl mx-auto overflow-hidden pt-1 pb-6 md:pb-0">
          <div
            ref={containerRef}
            className="flex transition-none"
            style={{
              transform: `translateX(-${scrollPosition}px)`,
              willChange: 'transform',
            }}
          >
            {duplicatedCountries.map((country, index) => {
              const scale = getItemScale(index);
              return (
                <div
                  key={`${country.code}-${index}`}
                  className="flex-shrink-0 w-[140px] md:w-[160px] lg:w-[180px]"
                  style={{
                    transform: windowWidth < 768 ? `scale(${scale})` : undefined,
                    transition: 'transform 0.15s ease-out',
                  }}
                >
                  <Link
                    href={`/${country.name.toLowerCase()}`}
                    className="flex flex-col items-center p-2 md:hover:bg-gray-50 rounded-lg transition-colors w-full"
                  >
                    <div className="w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 overflow-visible relative flex items-center justify-center flag-ring">
                      <div className={`relative w-full h-full ${country.scale}`}>
                        <Image
                          src={country.flag}
                          alt={country.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <span className="text-sm md:text-base font-medium whitespace-nowrap">{country.name}</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

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