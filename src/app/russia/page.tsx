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
import { COUNTRY_SOCIALS, COUNTRY_TEAMS } from "@/constants/countryPageData";

export default function RussiaPage() {
  const colors = getColorScheme('russia')
  const { t } = useTranslation()

  return (
    <div>
      <IntroductionSection
        videoSrc="/images/russia/background.webm"
        title={t('country.russia')}
        description={t('countryPage.mainTitle')}
        buttonText={t('button.applyNow')}
        buttonTextColor={colors.primary}
        buttonHoverBgColor={colors.hover}
        buttonHref="#apply-loan-online"
      />
      <div
        className="bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ background: getGradient('russia') }}
      >
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-repeat bg-top top-0 w-full h-130" style={{ backgroundImage: "url('/images/russia/snow_bg_b.svg')" }} />
          <LatestSocials
            socials={COUNTRY_SOCIALS.russia}
            buttonBgColor={colors.primary}
            buttonHoverBgColor={colors.hover}
          />
          <CountryBlogSection country="russia" />
          <TeamSection
            teams={COUNTRY_TEAMS.russia}
            title={'cis'}
            nameBgColor={colors.primary}
          />
        </section>
        <TeamVideoSection
          title={t('countryPage.intrductionTitleru')}
          subtitleColor={colors.primary}
          videoUrl="https://www.youtube.com/embed/7P2VEM70KgA"
          leftImageSrc="/images/russia/castle_l.svg"
          leftImageAlt="Left castle"
          leftImageWidth={380}
          leftImageHeight={380}
          leftImageStyle={{ width:'20vw', zIndex: 1 }}
          rightImageSrc="/images/russia/castle_r.svg"
          rightImageAlt="Right castle"
          rightImageWidth={350}
          rightImageHeight={350}
          rightImageStyle={{  width:'20vw',  zIndex: 1 }}
        />
        <LoanTypesSection />
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-no-repeat bg-bottom bottom-0 w-full h-135" style={{ backgroundImage: "url('/images/russia/snow_bg.svg')" }} />
          <ProcessStep subtitleColor="#3A57B4" />
        </section>
      </div>
      <LoanDetailSection backgroundImage="/images/russia/loan_detail_bg.webp" country="russia" />
      <section className="bg-no-repeat relative overflow-hidden z-10 isolate">
        <GarlandDecoration country="russia" />
        <div className="relative z-10" style={{ background: '#DFE8FF' }}>
          <EMICalculatorSection buttonBgColor={colors.primary} buttonHoverBgColor={colors.hover} />
        </div>
        <div style={{ background: getGradient('russia', true) }}>
          <LoanApplicationForm subtitleColor={colors.primary} buttonBgColor={colors.primary} buttonHoverBgColor={colors.hover}  anchorId="apply-loan-online" />
        </div>
      </section>
    </div>
  );
}