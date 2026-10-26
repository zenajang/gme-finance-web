'use client'

import { getColorScheme, getGradient } from "@/constants/colors";
import IntroductionSection from "@/features/common/components/IntroductionSection";
import LoanTypesSection from "@/features/common/components/LoanTypesSection";
import EMICalculatorSection from "@/features/common/components/EMICalculatorSection";
import LatestSocials from "@/features/common/components/LatestSocials";
import LoanDetailSection from "@/features/common/components/LoanDetailSection";
import ProcessStep from "@/features/common/components/ProcessStep";
import TeamSection from "@/features/common/components/TeamSection";
import CountryBlogSection from "@/features/common/components/CountryBlogSection";
import GarlandDecoration from "@/features/common/components/GarlandDecoration";
import TeamVideoSection from "@/features/common/components/TeamVideoSection";
import { useTranslation } from "react-i18next";
import { COUNTRY_SOCIALS, COUNTRY_TEAMS, COUNTRY_PHONES } from "@/constants/countryPageData";

export default function ThailandPage() {
  const colors = getColorScheme('thailand')
  const { t } = useTranslation()

  return (
    <div>
      <IntroductionSection
        videoSrc="/images/thailand/background.mp4"
        title={t('country.thailand')}
        description={t('countryPage.mainTitle')}
        buttonText={t('button.applyNow')}
        buttonHref="#apply-loan-online"
        mobilePhone={COUNTRY_PHONES.thailand?.mobile}
        hotlinePhone={COUNTRY_PHONES.thailand?.hotline}
      />
      <div
        className="bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ background: getGradient('thailand') }}
      >
        <section className="bg-no-repeat relative overflow-hidden">
          <LatestSocials
            socials={COUNTRY_SOCIALS.thailand}
            titleColor={colors.title}
          />
          <CountryBlogSection country="thailand" />
          <TeamSection
            teams={COUNTRY_TEAMS.thailand}
            title='thailand'
            titleColor={colors.title}
          />
        </section>
        <TeamVideoSection
          title={t('countryPage.introductionTitleth')}
          titleColor={colors.title}
          videoUrl="https://www.youtube.com/embed/bi37MciUwP8"
          centerImageSrc="/images/thailand/pattern.svg"
          centerImageAlt="Center pattern"
          centerImageWidth={2000}
          centerImageHeight={2000}
          centerImageStyle={{ opacity: 0.8, zIndex: 5, marginTop: '200px' }}
        />
        {/* <LoanTypesSection titleColor={colors.title} /> */}
        <ProcessStep titleColor={colors.title} subtitleColor={colors.subtitle} />
      </div>
      <LoanDetailSection backgroundImage="/images/thailand/loan_detail_bg.webp" country="thailand" />
      <div style={{ background: colors.gradient2 }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-no-repeat top-90 bg-right -right-30 w-full h-250" style={{ backgroundImage: "url('/images/thailand/cloud_l.svg')", zIndex: 1, }} />
          <div className="absolute bg-no-repeat top-20 bg-left -left-40 w-full h-80" style={{ backgroundImage: "url('/images/thailand/cloud_r.svg')", zIndex: 1 }} />
          <GarlandDecoration country="thailand" />
          <EMICalculatorSection titleColor={colors.title} />
        </section>
      </div>
    </div>
  );
}
