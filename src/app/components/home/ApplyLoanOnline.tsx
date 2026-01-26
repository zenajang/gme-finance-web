"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function ApplyLoanOnline() {
  const { t } = useTranslation()
  const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.gmeremit.online.gmeremittance_native";
  const APP_STORE_URL = "https://apps.apple.com/us/app/gme-remit/id1439161261";

  return (
    <section id="apply-loan-online" className="relative bg-[#f9f9f9] m-4 md:m-20 rounded-2xl pt-8 md:pt-20 pb-10 md:pb-20 px-4 md:px-70 overflow-hidden">
      <h2 className="text-xl md:text-5xl lg:text-5xl font-bold text-center mb-6 md:mb-20">How to Apply Loan Online?</h2>
      <div className="max-w-screen-xl mx-auto px-2 md:px-6 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-20">
        {/* Left: App Preview Image */}
        <div className="flex flex-col items-center space-y-3 md:space-y-4">
          <Image
            src="/images/gme-logo-square.svg"
            alt="GME App"
            width={300}
            height={200}
            className="object-contain w-[150px] md:w-[240px]"
          />
          <Link href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" className="block" aria-label="Download from Google Play">
            <div className="relative rounded-xl overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 cursor-pointer">
              <Image
                src="/images/google.svg"
                alt="Google Play"
                width={300}
                height={300}
                className="object-contain w-[190px] md:w-[280px]"
              />
            </div>
          </Link>
          <Link href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="block" aria-label="Download from the App Store">
            <div className="relative rounded-xl overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 cursor-pointer">
              <Image
                src="/images/apple.svg"
                alt="App Store"
                width={300}
                height={300}
                className="object-contain w-[190px] md:w-[280px]"
              />
            </div>
          </Link>
        </div>

        {/* Right: Title & Text */}
        <div className="flex-1">
          <p className="text-base md:text-md lg:text-4xl leading-relaxed mb-2 md:mb-4 text-center md:text-left font-bold">
            Step1
          </p>
          <p className="text-xs md:text-md lg:text-2xl leading-relaxed mb-2 md:mb-8 text-center md:text-left font-medium">
            {t('home.applyLoanOnlineStep1')}<br />
            {t('home.applyLoanOnlineStep2')}<br />
            {t('home.applyLoanOnlineStep3')}<br />
            {t('home.applyLoanOnlineStep4')}<br />
          </p>
        </div>
      </div>
      <div className="flex justify-center md:justify-end mt-4 md:-mt-16">
        <Link href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" aria-label="Apply now on Google Play">
          <button className="bg-[#DF2121] shadow-[0_0_15px_rgba(0,0,0,0.15)] text-md md:text-[1.35rem] lg:text-[1.35rem] text-white cursor-pointer px-10 md:px-30 lg:px-30 py-2 md:py-4 lg:py-4 font-semibold hover:bg-red-500 transition-all">
            {t('button.applyNow')}
          </button>
        </Link>
      </div>
    </section>
  );
}
