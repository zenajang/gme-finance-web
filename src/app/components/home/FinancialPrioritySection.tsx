"use client";

import { COMMON_COLORS } from "@/constants/colors";
import Image from "next/image";

export default function FinancialPrioritySection() {
  return (
    <section className="bg-white py-16 md:py-20 relative overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6">

        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-heading mb-10" style={{ color: COMMON_COLORS.black }}>
            Your Financial Ease is Our Priority
          </h2>
          <p
            className="text-subheading font-semibold mb-5"
            style={{ color: COMMON_COLORS.primary }}
          >
            Skip the paperwork!
          </p>
          <p className="text-subheading text-gray-700 mb-20">
            Apply for your foreigner loan online in minutes with GME
          </p>
        </div>

        {/* ICON GROUP IMAGE + CENTRAL LOGO */}
        <div className="relative flex justify-center items-center mt-10">
          
          {/* 아이콘 4개 + 반원 구조가 포함된 하나의 이미지 */}
          <Image
            src="/images/priority.svg"   // 아이콘 통합 이미지 경로
            alt="financial benefits icons"
            width={900}
            height={600}
            className="object-contain"
          />

          {/* 중앙 GME LOGO */}
          <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative flex items-center justify-center">
              <Image
                src="/images/gme-logo.svg"
                alt="GME Loan"
                width={270}
                height={270}
                className="object-contain w-20 h-20 md:w-[270px] md:h-[270px]"
              />
              <p className="absolute text-sm md:text-5xl font-bold text-red-600 whitespace-nowrap">
                GME LOAN
              </p>
            </div>
          </div>

          {/* 텍스트 4개 (Absolute position 위 아래 좌우 정렬) */}
          <p className="absolute top-[20%] right-[88%] text-center text-md md:text-lg font-medium">
            No paperwork, no hassle.
          </p>

          <p className="absolute top-[20%] left-[88%] text-center text-md md:text-lg font-medium w-80">
            Get the cash you need,<br/> 24 hours a day, 7 days a week.
          </p>


          <p className="absolute bottom-[30%] right-[78%] text-center text-md md:text-lg font-medium">
            Skip the long waits, get your loan instantly.
          </p>

          <p className="absolute bottom-[30%] left-[80%] text-center text-md md:text-lg font-medium">
            Stress-Free Borrowing.
          </p>
        </div>

        {/* Bottom center text */}
        <div className="flex justify-center mt-10">
          <p className= "text-center text-sm md:text-lg font-medium">
            Peace of mind, guaranteed:<br/>
            We prioritize data privacy so you can focus on your goals.
          </p>
        </div>

      </div>
    </section>
  );
}
