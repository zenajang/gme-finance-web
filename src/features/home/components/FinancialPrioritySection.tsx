"use client";

import { COMMON_COLORS } from "@/constants/colors";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function FinancialPrioritySection() {
  const { t } = useTranslation()
  return (
    <section className="bg-white py-10 md:py-20 relative overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6">

        {/* Title */}
        <div className="text-center mb-6 lg:mb-12">
          <h2 className="text-heading mb-5 lg:mb-10" style={{ color: COMMON_COLORS.black }}>
            Your Financial Ease is Our Priority
          </h2>
          <p
            className="text-subheading font-semibold mb-2"
            style={{ color: COMMON_COLORS.primary }}
          >
            {t('home.finacialPrioritySubTitle1')}
          </p>
          <p className="text-subheading text-gray-700 lg:mb-20">
            {t('home.finacialPrioritySubTitle2')}
          </p>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-7">
          <div className="flex items-center gap-4">
            <Image src="/images/icons/paper_work.svg" alt="icon" width={60} height={60} />
            <p className="text-sm font-medium">
              {t("home.finacialPriority1")} {t("home.finacialPriority1br")}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Image src="/images/icons/wait.svg" alt="icon" width={60} height={60} />
            <p className="text-sm font-medium">
              {t("home.finacialPriority2")} {t("home.finacialPriority2br")}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Image src="/images/icons/locker.svg" alt="icon" width={60} height={60} />
            <p className="text-sm font-medium">
              {t("home.finacialPriority3")} {t("home.finacialPriority3br")}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Image src="/images/icons/borrowing.svg" alt="icon" width={60} height={60} />
            <p className="text-sm font-medium">
              {t("home.finacialPriority4")}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Image src="/images/icons/day_night.svg" alt="icon" width={60} height={60} />
            <p className="text-sm font-medium">
              {t("home.finacialPriority5")} {t("home.finacialPriority5br")}
            </p>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block relative">
          <div className="flex justify-center items-center">
            <Image
              src="/images/priority.svg"
              alt="financial benefits icons"
              width={900}
              height={600}
              className="object-contain w-full max-w-[900px]"
            />

            <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="relative flex items-center justify-center">
                <Image
                  src="/images/gme-logo.svg"
                  alt="GME Loan"
                  width={270}
                  height={270}
                  className="object-contain w-[270px] h-[270px]"
                />
                <p className="absolute text-5xl font-bold text-red-600 whitespace-nowrap">
                  GME LOAN
                </p>
              </div>
            </div>

            {/* 왼쪽 상단 */}
            <p className="absolute z-20 top-[22%] left-[0%] text-center text-lg font-medium">
              {t("home.finacialPriority1")}<br />
              {t("home.finacialPriority1br")}
            </p>

            {/* 오른쪽 상단 */}
            <p className="absolute z-20 top-[22%] right-[-12%] text-center text-lg font-medium w-80">
              {t("home.finacialPriority5")}<br /> {t("home.finacialPriority5br")}
            </p>

            {/* 왼쪽 하단 */}
            <p className="absolute z-20 bottom-[26%] left-[4%] text-center text-lg font-medium">
              {t("home.finacialPriority2")}<br /> {t("home.finacialPriority2br")}
            </p>

            {/* 오른쪽 하단 */}
            <p className="absolute z-20 bottom-[30%] right-[5%] text-center text-lg font-medium">
              {t("home.finacialPriority4")}
            </p>
          </div>

          <div className="flex justify-center mt-6">
            <p className="text-center text-lg font-medium">
              {t("home.finacialPriority3")}<br />
              {t("home.finacialPriority3br")}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
