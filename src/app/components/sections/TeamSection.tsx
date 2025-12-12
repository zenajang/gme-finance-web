'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { COMMON_COLORS } from "@/constants/colors";
import { useTranslation } from 'react-i18next';
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
  title = '',
  nameBgColor = COMMON_COLORS.primary,
  titleColor = COMMON_COLORS.black
}: TeamsProps) {
  const showNavigation = teams.length > 4;
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const handlePrev = () => {
    swiperInstance?.slidePrev();
  };

  const handleNext = () => {
    swiperInstance?.slideNext();
  };
  const { t } = useTranslation();
  const countryKey = `country.${title.toLowerCase()}`;
  const countryName = t(countryKey);
  const headingText = t('countryPage.teamTitle', { country: countryName });

  const TeamCard = ({ team }: { team: Teams }) => (
    <div className="w-[160px] md:w-[260px] lg:w-[320px] flex-shrink-0">
      <div className="rounded-3xl relative h-[200px] md:h-[320px] lg:h-[420px] shadow-[0_0_20px_rgba(0,0,0,0.2)]" style={{ overflow: 'hidden' }}>
        <Image
          src={team.image}
          alt={team.name}
          fill
          className="object-cover"
          sizes="(min-width:1024px) 280px, (min-width:768px) 200px, 140px"
          priority={false}
        />
        <div
          className="absolute bottom-0 left-0 right-0 py-3 md:py-4 lg:py-5 flex items-center justify-center rounded-b-3xl"
          style={{ backgroundColor: nameBgColor }}
        >
          <span className='text-label text-white text-center'>{team.name}</span>
        </div>
      </div>
    </div>
  );

  return (
    <section className="px-0 md:py-20 lg:py-20 md:px-20 lg:px-30">
      <div className="px-3 relative z-20">
        <h2 className="text-heading text-center mb-0 md:mb-10" style={{ color: titleColor }}>{headingText}</h2>
        <div className="max-w-8xl mx-auto relative">
          {teams.length <= 4 ? (
            <>
              {/* 모바일 - Swiper */}
              <div className="block md:hidden py-4">
                <Swiper
                  spaceBetween={10}
                  slidesPerView={2.5}
                  slidesOffsetBefore={10}
                  slidesOffsetAfter={10}
                  centeredSlides={false}
                  className="team-swiper"
                >
                  {teams.map((team, index) => (
                    <SwiperSlide key={team.id || index}>
                      <TeamCard team={team} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              {/* 데스크톱 - Grid */}
              <div className="hidden md:flex justify-center gap-3 md:gap-5 lg:gap-6 py-10 flex-wrap">
                {teams.map((team, index) => (
                  <TeamCard key={team.id || index} team={team} />
                ))}
              </div>
            </>
          ) : (
            <>
              {/* 모바일 - Swiper (화살표 없음) */}
              <div className="block md:hidden py-2">
                <Swiper
                  spaceBetween={15}
                  slidesPerView={2.5}
                  slidesOffsetBefore={10}
                  slidesOffsetAfter={10}
                  centeredSlides={false}
                  className="team-swiper"
                >
                  {teams.map((team, index) => (
                    <SwiperSlide key={team.id || index}>
                      <div className="rounded-xl relative h-[150px] shadow-[0_0_20px_rgba(0,0,0,0.2)]" style={{ overflow: 'hidden', marginTop: '15px' }}>
                        <Image
                          src={team.image}
                          alt={team.name}
                          fill
                          className="object-cover"
                          sizes="50vw"
                          priority={false}
                        />
                        <div
                          className="absolute bottom-0 left-0 right-0 py-1 flex items-center justify-center rounded-b-xl"
                          style={{ backgroundColor: nameBgColor }}
                        >
                          <span className='text-label text-white text-center'>{team.name}</span>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* 데스크톱 - Swiper with Navigation */}
              <div className="hidden md:block">
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={20}
                  slidesPerView={4}
                  onSwiper={setSwiperInstance}
                  loop={showNavigation}
                  className="country-swiper"
                  breakpoints={{
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                    1024: {
                      slidesPerView: 4,
                      spaceBetween: 20,
                    },
                  }}
                >
                  {teams.map((team, index) => (
                    <SwiperSlide className="py-10" key={team.id || index}>
                      <div className="mx-15 rounded-3xl relative h-[300px] lg:h-[400px] shadow-[0_0_20px_rgba(0,0,0,0.2)]" style={{ overflow: 'hidden' }}>
                        <Image
                          src={team.image}
                          alt={team.name}
                          fill
                          className="object-cover"
                          sizes="(min-width:1024px) 25vw, 33vw"
                          priority={false}
                        />
                        <div
                          className="absolute bottom-0 left-0 right-0 py-4 lg:py-5 flex items-center justify-center rounded-b-3xl"
                          style={{ backgroundColor: nameBgColor }}
                        >
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
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-13 h-13 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors z-10"
                      aria-label="Previous"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    {/* 오른쪽 화살표 */}
                    <button
                      onClick={handleNext}
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-13 h-13 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors z-10"
                      aria-label="Next"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}