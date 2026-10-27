'use client'

import IntroductionSection
  from "@/features/common/components/IntroductionSection";
import EMICalculatorSection from "@/features/common/components/EMICalculatorSection";
import LatestSocials from "@/features/common/components/LatestSocials";
import LoanDetailSection from "@/features/common/components/LoanDetailSection";
import ProcessStep from "@/features/common/components/ProcessStep";
import TeamSection from "@/features/common/components/TeamSection";
import CountryBlogSection from "@/features/common/components/CountryBlogSection";
import { getColorScheme, getGradient } from "@/constants/colors";
import GarlandDecoration from "@/features/common/components/GarlandDecoration";
import TeamVideoSection from "@/features/common/components/TeamVideoSection";
import { useTranslation } from "react-i18next";
import { COUNTRY_SOCIALS, COUNTRY_TEAMS, COUNTRY_PHONES } from "@/constants/countryPageData";

export default function MyanmarPage() {
  const colors = getColorScheme('myanmar')
  const { t } = useTranslation()
  return (
    <div>
      <IntroductionSection
        videoSrc="/images/myanmar/background.webm"
        title={t('country.myanmar')}
        description={t('countryPage.mainTitle')}
        buttonText={t('button.applyNow')}
        buttonBgColor={colors.primary}
        buttonHoverBgColor={colors.hover}
        buttonTextColor={colors.gradient1}
        buttonHref="#apply-loan-online"
        mobilePhone={COUNTRY_PHONES.myanmar?.mobile}
        hotlinePhone={COUNTRY_PHONES.myanmar?.hotline}
      />
      <div
        className="bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: "url('/images/myanmar/section_bg.svg')" }}
      >
        <section className="bg-no-repeat bg-cover bg-center relative overflow-hidden">
          <div className="absolute bg-no-repeat bg-cover bg-center top-0 w-full h-160 md:h-330" style={{ backgroundImage: "url('/images/myanmar/wave_t.svg')" }} />
          <LatestSocials
            socials={COUNTRY_SOCIALS.myanmar}
            buttonBgColor={colors.primary}
            buttonHoverBgColor={colors.hover}
          />
          <CountryBlogSection country="myanmar" />
          <TeamSection
            teams={COUNTRY_TEAMS.myanmar}
            title='Myanmar'
            nameBgColor={colors.primary}
          />
        </section>
        <div style={{ background: getGradient('myanmar') }}>
          <TeamVideoSection
            title={t('countryPage.introductionTitlemm')}
            subtitleColor={colors.primary}
            videoUrl="https://www.youtube.com/embed/Y7qp3bG9AwA"
            leftImageSrc="/images/myanmar/castle_l.svg"
            leftImageAlt="Left castle"
            leftImageOffsetX={10}
            leftImageWidth={380}
            leftImageHeight={380}
            leftImageStyle={{ width: '25vw', zIndex: 1 }}
            rightImageSrc="/images/myanmar/castle_r.svg"
            rightImageAlt="Right castle"
            rightImageOffsetX={-10}
            rightImageWidth={380}
            rightImageHeight={380}
            rightImageStyle={{ width: '25vw', zIndex: 1 }}
          />
          <section className="relative overflow-hidden">
            <div className="absolute bg-no-repeat bg-cover bg-center bottom-0 w-full h-200 md:h-280" style={{ backgroundImage: "url('/images/myanmar/wave_b.svg')" }} />
            <ProcessStep subtitleColor={colors.primary} />
          </section>
        </div>
      </div>
      <LoanDetailSection backgroundImage="/images/myanmar/loan_detail_bg.webp" country="myanmar" />
      <section className="bg-cover relative overflow-hidden" style={{ background: getGradient('myanmar') }}>
        <EMICalculatorSection buttonBgColor={colors.primary} buttonHoverBgColor={colors.hover} />
        <GarlandDecoration country="myanmar" />
      </section>
    </div>
  );
}
