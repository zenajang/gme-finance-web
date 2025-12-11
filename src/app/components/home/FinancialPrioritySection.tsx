"use client";

import { COMMON_COLORS } from "@/constants/colors";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function FinancialPrioritySection() {
  const { t } = useTranslation()
  return (
    <section className="bg-white py-16 md:py-20 relative overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6">

        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-heading mb-10" style={{ color: COMMON_COLORS.black }}>
            Your Financial Ease is Our Priority
          </h2>
          <p
            className="text-subheading font-semibold mb-2"
            style={{ color: COMMON_COLORS.primary }}
          >
            {t('home.finacialPrioritySubTitle1')}
          </p>
          <p className="text-subheading text-gray-700 mb-20">
            {t('home.finacialPrioritySubTitle2')}
          </p>
        </div>

        <div className="relative flex justify-center items-center mt-6 md:mt-10">

          <Image
            src="/images/priority.svg"
            alt="financial benefits icons"
            width={900}
            height={600}
            className="object-contain w-full max-w-[300px] md:max-w-[900px]"
          />

          <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative flex items-center justify-center">
              <Image
                src="/images/gme-logo.svg"
                alt="GME Loan"
                width={270}
                height={270}
                className="object-contain w-16 h-16 md:w-[270px] md:h-[270px]"
              />
              <p className="absolute text-xs md:text-5xl font-bold text-red-600 whitespace-nowrap">
                GME LOAN
              </p>
            </div>
          </div>

          <p className="hidden md:block absolute top-[22%] left-[0%] text-center text-lg font-medium">
            {t("home.finacialPriority1")}<br />
            {t("home.finacialPriority1br")}
          </p>

          <p className="hidden md:block absolute top-[22%] right-[-12%] text-center text-lg font-medium w-80">
            {t("home.finacialPriority5")}<br /> {t("home.finacialPriority5br")}
          </p>

          <p className="hidden md:block absolute bottom-[26%] left-[4%] text-center text-lg font-medium">
            {t("home.finacialPriority2")}<br /> {t("home.finacialPriority2br")}
          </p>

          <p className="hidden md:block absolute bottom-[30%] right-[5%] text-center text-lg font-medium">
            {t("home.finacialPriority4")}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6 md:hidden px-2">
          <p className="text-center text-xs font-medium">
            {t("home.finacialPriority1")}<br />
            {t("home.finacialPriority1br")}
          </p>
          <p className="text-center text-xs font-medium">
            {t("home.finacialPriority5")}<br /> {t("home.finacialPriority5br")}
          </p>
          <p className="text-center text-xs font-medium">
            {t("home.finacialPriority2")}<br /> {t("home.finacialPriority2br")}
          </p>
          <p className="text-center text-xs font-medium">
            {t("home.finacialPriority4")}
          </p>
        </div>

        <div className="flex justify-center mt-6">
          <p className="text-center text-xs md:text-lg font-medium px-4">
            {t("home.finacialPriority3")}<br />
            {t("home.finacialPriority3br")}
          </p>
        </div>

      </div>
    </section>
  );
}
