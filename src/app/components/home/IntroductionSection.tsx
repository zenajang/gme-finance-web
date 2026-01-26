'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
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
}: IntroductionSectionProps) {
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

  return (
    <section className="relative h-screen">
      <div className="absolute inset-0"> 
        <img
          src={defaultPoster}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isVideoReady ? 'opacity-0' : 'opacity-100'
            }`}
        />
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
        </div>
      </div>
    </section>
  );
}
