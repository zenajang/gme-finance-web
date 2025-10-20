'use client';

import Image from "next/image";

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
  buttonTextColor = "text-red-500",
  buttonBgColor = "bg-white",
  buttonHoverBgColor = "hover:bg-red-50",
}: CountryIntroductionSectionProps) {
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
              className={`text-[1.6rem] ${buttonTextColor.startsWith('#') ? '' : buttonTextColor} rounded-full cursor-pointer px-30 py-4 font-medium transition-colors ${buttonBgColor.startsWith('#') ? '' : buttonBgColor} ${!buttonHoverBgColor.startsWith('#') ? buttonHoverBgColor : ''}`}
              style={{
                ...(buttonBgColor.startsWith('#') ? { backgroundColor: buttonBgColor } : {}),
                ...(buttonTextColor.startsWith('#') ? { color: buttonTextColor } : {})
              }}
              onMouseEnter={(e) => {
                if (buttonHoverBgColor.startsWith('#')) {
                  e.currentTarget.style.backgroundColor = buttonHoverBgColor;
                }
              }}
              onMouseLeave={(e) => {
                if (buttonHoverBgColor.startsWith('#')) {
                  e.currentTarget.style.backgroundColor = buttonBgColor.startsWith('#') ? buttonBgColor : 'white';
                }
              }}
            >
              {buttonText}
            </button>
          </div>
        </div>

      </section>
  );
}