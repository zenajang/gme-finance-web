'use client'

import IntroductionSection from "@/features/common/components/IntroductionSection";
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
        mobilePhone={COUNTRY_PHONES.russia?.mobile}
        hotlinePhone={COUNTRY_PHONES.russia?.hotline}
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
        </div>
      </section>
    </div>
  );
}