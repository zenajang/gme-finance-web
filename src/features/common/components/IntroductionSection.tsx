'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { COMMON_COLORS } from "@/constants/colors";

interface IntroductionSectionProps {
  videoSrc?: string;
  posterSrc?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonTextColor?: string;
  buttonBgColor?: string;
  buttonHoverBgColor?: string;
  buttonHref?: string;
  mobilePhone?: string;
  hotlinePhone?: string;
}

export default function IntroductionSection({
  videoSrc = "/videos/introduction.mp4",
  posterSrc,
  title = "GME FINANCE",
  description = "Trusted & Legal Overseas Loans",
  buttonText = "Apply Now",
  buttonTextColor = COMMON_COLORS.primaryText,
  buttonBgColor = COMMON_COLORS.white,
  buttonHoverBgColor = COMMON_COLORS.primaryLight,
  buttonHref,
  mobilePhone,
  hotlinePhone,
}: IntroductionSectionProps) {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // canplaythrough: 끊김 없이 끝까지 재생 가능할 때 발생
      const handleReady = () => setIsVideoReady(true);
      video.addEventListener('canplaythrough', handleReady);

      // 이미 로드된 경우 처리
      if (video.readyState >= 4) {
        setIsVideoReady(true);
      }

      return () => video.removeEventListener('canplaythrough', handleReady);
    }
  }, []);

  // 포스터 이미지 경로 자동 생성 (videoSrc에서 .webm을 .webp로 변경)
  const defaultPoster = posterSrc || videoSrc?.replace('.webm', '.webp').replace('.mp4', '.webp');

  const toTelHref = (phone: string) => `tel:${phone.replace(/[^0-9+]/g, '')}`;

  return (
    <section className="relative h-screen">
      <div className="absolute inset-0">
        {defaultPoster && (
          <Image
            src={defaultPoster}
            alt=""
            fill
            sizes="100vw"
            className={`object-cover transition-opacity duration-700 ${isVideoReady ? 'opacity-0' : 'opacity-100'}`}
            priority
          />
        )}
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className={`w-full h-full object-cover transition-opacity duration-700 ${isVideoReady ? 'opacity-100' : 'opacity-0'
            }`}
        />
      </div>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-start justify-center text-white pt-60 md:pt-30">
        <h1 className="text-5xl md:text-7xl lg:text-7xl font-bold mb-4">{title}</h1>
        <p className="text-md md:text-2xl lg:text-2xl mb-8">{description}</p>
        <div className="w-full text-center md:text-left mt-0 md:mt-20">
          {buttonHref ? (
            buttonHref.startsWith('http') ? (
              <a
                href={buttonHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl inline-block text-md md:text-[1.6rem] lg:text-[1.6rem] px-10 md:px-30 py-2 md:py-4 font-medium transition-colors"
                style={{
                  backgroundColor: isHovered ? buttonHoverBgColor : buttonBgColor,
                  color: buttonTextColor
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {buttonText}
              </a>
            ) : buttonHref.startsWith('#') ? (
              <button
                onClick={() => {
                  const element = document.querySelector(buttonHref);
                  if (!element) {
                    return;
                  }
                  if (buttonHref === '#apply-loan-online') {
                    const applyForm = document.querySelector('[data-apply-form]') as HTMLElement | null;
                    const target = applyForm ?? element;
                    const top = target.getBoundingClientRect().top + window.scrollY - 32;
                    window.scrollTo({ top, behavior: 'smooth' });
                    return;
                  }
                  element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="rounded-xl inline-block text-md md:text-[1.6rem] lg:text-[1.6rem] px-10 md:px-30 py-2 md:py-4 font-medium transition-colors"
                style={{
                  backgroundColor: isHovered ? buttonHoverBgColor : buttonBgColor,
                  color: buttonTextColor
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {buttonText}
              </button>
            ) : (
              <Link
                href={buttonHref}
                className="inline-block text-md md:text-[1.6rem] lg:text-[1.6rem] px-10 md:px-30 py-2 md:py-4 font-medium transition-colors"
                style={{
                  backgroundColor: isHovered ? buttonHoverBgColor : buttonBgColor,
                  color: buttonTextColor
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {buttonText}
              </Link>
            )
          ) : (
            <button
              className="text-md md:text-[1.6rem] lg:text-[1.6rem] px-10 md:px-30 py-2 md:py-4 font-medium transition-colors"
              style={{
                backgroundColor: isHovered ? buttonHoverBgColor : buttonBgColor,
                color: buttonTextColor
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {buttonText}
            </button>
          )}
          {(mobilePhone || hotlinePhone) && (
            <div className="mt-4 md:mt-6 flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center md:justify-start md:gap-3">
              {hotlinePhone && (
                <a
                  href={toTelHref(hotlinePhone)}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-2 md:w-auto md:px-5 md:py-2.5 md:justify-start text-sm md:text-base text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-black"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 md:h-5 md:w-5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.97.37 1.92.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.89.35 1.84.59 2.81.72A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span className="font-medium opacity-80 group-hover:opacity-100">{t('button.hotline')}</span>
                  <span className="font-semibold">{hotlinePhone}</span>
                </a>
              )}
              {mobilePhone && (
                <a
                  href={toTelHref(mobilePhone)}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-2 md:w-auto md:px-5 md:py-2.5 md:justify-start text-sm md:text-base text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-black"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 md:h-5 md:w-5">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                    <line x1="12" y1="18" x2="12" y2="18" />
                  </svg>
                  <span className="font-medium opacity-80 group-hover:opacity-100">{t('button.mobile')}</span>
                  <span className="font-semibold">{mobilePhone}</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
