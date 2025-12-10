'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { COMMON_COLORS } from '@/constants/colors';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import 'swiper/css';
import { useTranslation } from 'react-i18next';

export type SocialsItem = {
  id?: string;
  image: string;
  snsLogo: string;
  title: string;
  likes: string;
  followers: string;
  tags: string[];
  href?: string;
};

interface LatestSocialsProps {
  socials: SocialsItem[];
  buttonBgColor?: string;
  buttonHoverBgColor?: string;
  titleColor?: string;
}

function SocialCard({ item, buttonBgColor, buttonHoverBgColor, hoveredId, setHoveredId, router }: {
  item: SocialsItem;
  buttonBgColor: string;
  buttonHoverBgColor: string;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  router: AppRouterInstance;
}) {
  const { t } = useTranslation();
  return (
    <article
      className="
        rounded-3xl bg-white
        flex flex-col
        h-[360px] md:h-[600px]
        shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] overflow-hidden
        mb-10
      "
    >
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
      <div className="p-8 flex flex-col flex-1">
        <header className="mb-3 flex items-start gap-4">
          <Image src={item.snsLogo} alt="snsLogo" width={60} height={60} className='w-[40px] h-[40px] md:w-[60px] md:h-[60px]' />
          <div className="flex-1 mt-2">
            <div className="flex items-center gap-2">
              <h3 className="text-label leading-snug line-clamp-3 mb-3 font-medium">
                {item.title}
              </h3>
            </div>
            <div className="flex items-center gap-5">
              <p className="text-tag">{item.likes} likes </p>
              <p className="text-tag">{item.followers} followers</p>
            </div>
            <span className="left-3 top-3 inline-flex items-centerpx-8 text-tag">
              {item.tags.map((tag, index) => (
                <span className='mr-2' key={index}>#{tag}</span>
              ))}
            </span>
          </div>
        </header>

        <div className="mt-auto px-0 md:px-30">
          <button
            onClick={() => {
              if (item.href) {
                router.push(item.href);
              }
            }}
            className="text-button text-white py-2 transition-colors w-full"
            style={{
              backgroundColor: hoveredId === item.id ? buttonHoverBgColor : buttonBgColor
            }}
            onMouseEnter={() => setHoveredId(item.id ?? null)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {t('button.visit')}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function LatestSocials({
  socials,
  buttonBgColor = COMMON_COLORS.primary,
  buttonHoverBgColor = COMMON_COLORS.primaryHover,
  titleColor = COMMON_COLORS.black,
}: LatestSocialsProps) {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { t } = useTranslation();

  return (
    <section className="py-8 md:py-16 px-0 md:px-45 lg:px-45">
      <div className="px-0 md:px-3 lg:px-3 relative z-10">
        <h2 className="text-heading text-center mb-0 md:mb-20" style={{ color: titleColor }}>{t('countryPage.latestSocialTitle')}</h2>
        {/* 모바일 버전 - Swiper 사용 */}
        <div className="block md:hidden mt-3 md:mt-8 lg:mt-8 py-4">
          <Swiper
            spaceBetween={20}
            slidesPerView={1.15}
            slidesOffsetBefore={20}
            slidesOffsetAfter={-10}
            centeredSlides={false}
            className="latest-socials-swiper"
          >
            {socials.map((item, index) => (
              <SwiperSlide key={item.id}>
                <div className={index === socials.length - 1 ? 'pr-5' : ''}>
                  <SocialCard
                    item={item}
                    buttonBgColor={buttonBgColor}
                    buttonHoverBgColor={buttonHoverBgColor}
                    hoveredId={hoveredId}
                    setHoveredId={setHoveredId}
                    router={router}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 데스크톱 버전 - Grid 레이아웃 */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mt-8">
          {socials.map((item) => (
            <SocialCard
              key={item.id}
              item={item}
              buttonBgColor={buttonBgColor}
              buttonHoverBgColor={buttonHoverBgColor}
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
              router={router}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
