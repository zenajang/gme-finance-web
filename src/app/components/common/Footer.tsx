"use client";

import Image from "next/image";
import Link from "next/link";
import { COMMON_COLORS } from "@/constants/colors";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="py-4 md:py-10 lg:py-12" style={{ backgroundColor: COMMON_COLORS.grayLight }}>
      {/* 3단계 패딩: 모바일 / 태블릿 / 데스크톱 */}
      <div className="px-4 md:px-[45px] lg:px-[45px]">
        {/* 모바일: 세로, 태블릿/데스크톱: 가로 배치 */}
        <div className="flex flex-col md:flex-row lg:flex-row items-start gap-2 md:gap-6 lg:gap-6 mb-8">
          <Image
            src="/images/logo_g.png"
            alt="GME Finance Logo"
            width={120}
            height={60}
            className="object-contain w-[80px] h-[40px] md:w-[120px] md:h-[60px] lg:w-[120px] lg:h-[60px]"
          />
          <div className="text-[11px] md:text-sm lg:text-sm text-gray-500 font-semibold space-y-1">
            <p>{t('footer.companyName')}</p>
            <p>{t('footer.brandName')}</p>
            <p>{t('footer.registrationNo')}</p>
            <p>{t('footer.ceo')}</p>
            <p>{t('footer.businessNo')}</p>
            <p className="break-words">{t('footer.address')}</p>
            <p>{t('footer.phone')}</p>
          </div>
        </div>
        <hr className="border-t border-gray-300 mb-6 md:mb-8 lg:mb-8"/>
        <div className="space-y-4 text-[10px] md:text-xs lg:text-xs text-gray-500 mb-6">
          <p>
            <span>{t('footer.loanRate')}</span> {t('footer.loanRateValue')}<br/>
            <span>{t('footer.overdueRate')}</span> {t('footer.overdueRateValue')}<br/>
            <span>{t('footer.loanPeriod')}</span> {t('footer.loanPeriodValue')}
          </p>

          <p>
            {t('footer.noFees')}
          </p>

          <p>
            {t('footer.creditWarning')}
          </p>

          <p className="text-red-600 font-semibold">
            {t('footer.debtWarning')}
          </p>

          <p>
            {t('footer.illegalFees')}
          </p>
        </div>

        <div className="pt-6 text-[10px] md:text-xs lg:text-xs text-gray-600">
          {/* 모바일: 카피라이트와 링크 분리, 태블릿/데스크톱: 한 줄 */}
          <div className="mb-2 md:mb-2 lg:mb-2">
            <span className="font-semibold block md:inline lg:inline mb-3 md:mb-0 lg:mb-0">© 2025 GME Finance.</span>

            {/* 모바일: 그리드, 태블릿/데스크톱: 인라인 */}
            <div className="grid grid-cols-2 gap-2 mt-3 md:inline md:mt-0 lg:inline lg:mt-0">
              <span className="hidden md:inline lg:inline"> | </span>
              <Link href="/usage" className="underline md:ml-1 lg:ml-1">{t('footer.termsOfUse')}</Link>
              <span className="hidden md:inline lg:inline"> | </span>
              <Link href="/privacy" className="underline md:ml-1 lg:ml-1">{t('footer.lendingTerms')}</Link>
              <span className="hidden md:inline lg:inline"> | </span>
              <Link href="/marketing" className="underline md:ml-1 lg:ml-1">{t('footer.productChanges')}</Link>
              <span className="hidden md:inline lg:inline"> | </span>
              <Link href="/personal-info" className="underline md:ml-1 lg:ml-1">{t('footer.privacyPolicy')}</Link>
              <span className="hidden md:inline lg:inline"> | </span>
              <Link href="/credit-info" className="underline md:ml-1 lg:ml-1">{t('footer.creditInfoSystem')}</Link>
              <span className="hidden md:inline lg:inline"> | </span>
              <Link href="/guidelines" className="underline md:ml-1 lg:ml-1">{t('footer.customerRights')}</Link>
              <span className="hidden md:inline lg:inline"> | </span>
              <Link href="/restrictions" className="underline md:ml-1 lg:ml-1">{t('footer.thirdPartyDisclosure')}</Link>
              <span className="hidden md:inline lg:inline"> | </span>
              <Link href="/manual" className="underline md:ml-1 lg:ml-1">{t('footer.loanProductInfo')}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
