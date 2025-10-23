'use client';

import Image from "next/image";
import { useState } from "react";
import { COMMON_COLORS } from "@/constants/colors";

interface CountryIntroductionSectionProps {
  imageSrc?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonTextColor?: string;
  buttonBgColor?: string;
  buttonHoverBgColor?: string;
}

export default function CountryIntroductionSection({
  imageSrc = "/images/introduction.jpg",
  title = "GME FINANCE",
  description = "Trusted & Legal Overseas Loans",
  buttonText = "Apply Now",
  buttonTextColor = COMMON_COLORS.primaryText,
  buttonBgColor = COMMON_COLORS.white,
  buttonHoverBgColor = COMMON_COLORS.primaryLight,
}: CountryIntroductionSectionProps) {
  const [isHovered, setIsHovered] = useState(false);
  return (
     <section className="relative h-[995px]">
        <div className="absolute inset-0">
          <Image
            src={imageSrc}
            alt="Building"
            fill
            className="object-cover"
            priority
            quality={85}
            sizes="100vw"
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 container h-full flex flex-col items-start justify-center text-white pt-30">
          <h1 className="text-7xl font-bold mb-4">{title}</h1>
          <p className="text-2xl mb-8">{description}</p>
          <div className="text-left mt-20">
            <button
              className="text-[1.6rem] rounded-full cursor-pointer px-30 py-4 font-medium transition-colors"
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