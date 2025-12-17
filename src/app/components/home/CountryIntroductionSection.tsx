'use client';

import { useState, useEffect, useRef } from "react";
import { COMMON_COLORS } from "@/constants/colors";

interface CountryIntroductionSectionProps {
  videoSrc?: string;
  posterSrc?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonTextColor?: string;
  buttonBgColor?: string;
  buttonHoverBgColor?: string;
}

export default function CountryIntroductionSection({
  videoSrc = "/videos/introduction.mp4",
  posterSrc,
  title = "GME FINANCE",
  description = "Trusted & Legal Overseas Loans",
  buttonText = "Apply Now",
  buttonTextColor = COMMON_COLORS.primaryText,
  buttonBgColor = COMMON_COLORS.white,
  buttonHoverBgColor = COMMON_COLORS.primaryLight,
}: CountryIntroductionSectionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleCanPlay = () => setIsVideoLoaded(true);
      video.addEventListener('canplay', handleCanPlay);
      return () => video.removeEventListener('canplay', handleCanPlay);
    }
  }, []);

  // 포스터 이미지 경로 자동 생성 (videoSrc에서 .webm을 .webp로 변경)
  const defaultPoster = posterSrc || videoSrc?.replace('.webm', '.webp').replace('.mp4', '.webp');

  return (
     <section className="relative h-[630px] md:h-[800px] lg:h-[995px]">
        <div className="absolute inset-0">
          {/* 동영상 로딩 전 이미지 표시 */}
          {defaultPoster && (
            <img
              src={defaultPoster}
              alt=""
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isVideoLoaded ? 'opacity-0' : 'opacity-100'
              }`}
            />
          )}
          {/* 동영상 - 로드 완료 후 표시 */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload={isMobile ? "metadata" : "auto"}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src={videoSrc} type="video/webm" />
          </video>
        </div>
        <div className="absolute inset-0 bg-black/40"/>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-start justify-center text-white pt-60 md:pt-30">
          <h1 className="text-5xl md:text-7xl lg:text-7xl font-bold mb-4">{title}</h1>
          <p className="text-md md:text-2xl lg:text-2xl mb-8">{description}</p>
          <div className="w-full text-center md:text-left mt-0 md:mt-20">
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
          </div>
        </div>
      </section>
  );
}