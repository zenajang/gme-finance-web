'use client'

import IntroductionSection from "@/features/home/components/IntroductionSection";
import LoanTypesSection from "@/features/home/components/LoanTypesSection";
import EMICalculatorSection from "@/features/home/sections/EMICalculatorSection";
import LatestSocials from "@/features/home/sections/LatestSocials";
import LoanApplicationForm from "@/features/home/sections/LoanApplicationForm";
import LoanDetailSection from "@/features/home/sections/LoanDetailSection";
import ProcessStep from "@/features/home/sections/ProcessStep";
import TeamSection from "@/features/home/sections/TeamSection";
import CountryBlogSection from "@/features/home/sections/CountryBlogSection";
import { getColorScheme, getGradient } from "@/constants/colors";
import GarlandDecoration from "@/features/home/sections/GarlandDecoration";
import TeamVideoSection from "@/features/home/sections/TeamVideoSection";
import { useTranslation } from "react-i18next";
import { COUNTRY_SOCIALS, COUNTRY_TEAMS, COUNTRY_PHONES } from "@/constants/countryPageData";

export default function PakistanPage() {
  const colors = getColorScheme('pakistan')
  const { t } = useTranslation()

  return (
    <div>
      <IntroductionSection
        videoSrc="/images/pakistan/background.webm"
        title={t('country.pakistan')}
        description={t('countryPage.mainTitle')}
        buttonText={t('button.applyNow')}
        buttonTextColor={colors.primary}
        buttonHoverBgColor={colors.introHover}
        buttonHref="#apply-loan-online"
        mobilePhone={COUNTRY_PHONES.pakistan?.mobile}
        hotlinePhone={COUNTRY_PHONES.pakistan?.hotline}
      />
      <div
        className="bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ background: getGradient('pakistan') }}
      >
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute pointer-events-none bg-no-repeat bg-top -top-40 -left-200 w-full h-full" style={{ backgroundImage: "url('/images/pakistan/flower.svg')" }} />
          <LatestSocials
            socials={COUNTRY_SOCIALS.pakistan} buttonBgColor={colors.primary} buttonHoverBgColor={colors.hover} />
          <CountryBlogSection country="pakistan" />
          <TeamSection
            teams={COUNTRY_TEAMS.pakistan}
            nameBgColor={colors.primary}
            title='pakistan'
          />
        </section>
        <TeamVideoSection
          title={t('countryPage.introductionTitlepk')}
          subtitleColor={colors.primary}
          videoUrl="https://www.youtube.com/embed/8LYtzxvDWN4"
          leftImageSrc="/images/pakistan/castle_l.svg"
          leftImageAlt="Left castle"
          leftImageWidth={320}
          leftImageHeight={320}
          leftImageStyle={{ width:'20vw',zIndex: 1 }}
          rightImageSrc="/images/pakistan/castle_r.svg"
          rightImageAlt="Right castle"
          rightImageWidth={680}
          rightImageHeight={680}
          rightImageOffsetX={-400}
          rightImageStyle={{ width:'40vw', zIndex: 1 }}
        />
        <LoanTypesSection />
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-no-repeat bg-right -bottom-90 -right-50 w-full h-220" style={{ backgroundImage: "url('/images/pakistan/flower.svg')" }} />
          <ProcessStep subtitleColor={colors.primary} />
        </section>
      </div>
      <LoanDetailSection backgroundImage="/images/pakistan/loan_detail_bg.webp" country="pakistan" />
      <div className="relative" style={{ background: getGradient('pakistan', true) }}>
        <div className="absolute pointer-events-none bg-repeat top-0 left-0 w-full h-full" style={{ backgroundImage: "url('/images/pakistan/pattern.svg')", backgroundSize: 'auto' }} />
        <section className="bg-no-repeat relative overflow-hidden">
          <GarlandDecoration country="pakistan" />
          <EMICalculatorSection buttonBgColor={colors.primary} buttonHoverBgColor={colors.hover} />
          <div className="mb-20">
            <LoanApplicationForm country="pakistan" buttonBgColor={colors.primary} subtitleColor={colors.primary}  anchorId="apply-loan-online" />
          </div>
        </section>
      </div>
    </div>
  );
}
