'use client'

import { getColorScheme, getGradient } from "@/constants/colors";
import IntroductionSection from "@/features/home/components/IntroductionSection";
import LoanTypesSection from "@/features/home/components/LoanTypesSection";
import EMICalculatorSection from "@/features/home/sections/EMICalculatorSection";
import LatestSocials from "@/features/home/sections/LatestSocials";
import LoanApplicationForm from "@/features/home/sections/LoanApplicationForm";
import LoanDetailSection from "@/features/home/sections/LoanDetailSection";
import ProcessStep from "@/features/home/sections/ProcessStep";
import TeamSection from "@/features/home/sections/TeamSection";
import CountryBlogSection from "@/features/home/sections/CountryBlogSection";
import GarlandDecoration from "@/features/home/sections/GarlandDecoration";
import TeamVideoSection from "@/features/home/sections/TeamVideoSection";
import { useTranslation } from "react-i18next";
import { COUNTRY_SOCIALS, COUNTRY_TEAMS } from "@/constants/countryPageData";

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
        <LoanTypesSection titleColor={colors.title} />
        <ProcessStep titleColor={colors.title} subtitleColor={colors.subtitle} />
      </div>
      <LoanDetailSection backgroundImage="/images/thailand/loan_detail_bg.webp" country="thailand" />
      <div style={{ background: colors.gradient2 }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-no-repeat top-90 bg-right -right-30 w-full h-250" style={{ backgroundImage: "url('/images/thailand/cloud_l.svg')", zIndex: 1, }} />
          <div className="absolute bg-no-repeat top-20 bg-left -left-40 w-full h-80" style={{ backgroundImage: "url('/images/thailand/cloud_r.svg')", zIndex: 1 }} />
          <GarlandDecoration country="thailand" />
          <EMICalculatorSection titleColor={colors.title} />
          <LoanApplicationForm country="thailand"  anchorId="apply-loan-online" />
        </section>
      </div>
    </div>
  );
}
