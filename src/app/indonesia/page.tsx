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

export default function IndonesiaPage() {
  const { t } = useTranslation();
  const colors = getColorScheme('indonesia')
  return (
    <div>
      <IntroductionSection
        videoSrc="/images/indonesia/background.webm"
        title={t('country.indonesia')}
        description={t('countryPage.mainTitle')}
        buttonText={t('button.applyNow')}
        buttonHref="#apply-loan-online"
      />
      <div
        className="bg-cover bg-center bg-no-repeat"
        style={{ background: getGradient('indonesia') }}
      >
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-repeat bg-top top-0 w-full h-300" style={{ backgroundImage: "url('/images/indonesia/garland_d.svg')", transform: 'rotate(180deg)' }} />
          <LatestSocials
            socials={COUNTRY_SOCIALS.indonesia} />
          <CountryBlogSection country="indonesia" />
          <TeamSection
            teams={COUNTRY_TEAMS.indonesia}
            title='Indonesia'
          />
        </section>
        <TeamVideoSection
          title={t('countryPage.introductionTitleid')}
          subtitleColor={colors.primary}
          videoUrl="https://www.youtube.com/embed/Q-AGuNjVNMU"
        />
        <LoanTypesSection />
        <section className="bg-no-repeat relative overflow-hidden">
          <ProcessStep />
          <div className="absolute pointer-events-none bg-repeat bg-bottom bottom-0 right-0 w-full h-full" style={{ backgroundImage: "url('/images/indonesia/garland_u.svg')", transform: 'rotate(180deg)' }} />
        </section>
      </div>
      <LoanDetailSection backgroundImage="/images/indonesia/loan_detail_bg.webp" country="indonesia" />
      <div style={{ background: getGradient('indonesia', true) }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <GarlandDecoration country="indonesia" />
          <EMICalculatorSection />
          <LoanApplicationForm country="indonesia"  anchorId="apply-loan-online" />
        </section>
      </div>
    </div>
  );
}
