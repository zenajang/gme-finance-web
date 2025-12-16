'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
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
  posterSrc = "/images/introduction.jpg",
  title = "GME FINANCE",
  description = "Trusted & Legal Overseas Loans",
  buttonText = "Apply Now",
  buttonTextColor = COMMON_COLORS.primaryText,
  buttonBgColor = COMMON_COLORS.white,
  buttonHoverBgColor = COMMON_COLORS.primaryLight,
}: CountryIntroductionSectionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
     <section className="relative h-[630px] md:h-[800px] lg:h-[995px]">
        <div className="absolute inset-0">
          {isMobile ? (
            <Image
              src={posterSrc}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <video
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster={posterSrc}
              className="w-full h-full object-cover"
            />
          )}
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