'use client'

import { getGradient } from "@/constants/colors";
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

export default function MongoliaPage() {
  const { t } = useTranslation()

  return (
    <div>
      <IntroductionSection
        videoSrc="/images/mongolia/background.mp4"
        title={t('country.mongolia')}
        description={t('countryPage.mainTitle')}
        buttonText={t('button.applyNow')}
        buttonHref="#apply-loan-online"
      />
      <div
        className="bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ background: getGradient('mongolia') }}
      >
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute pointer-events-none bg-no-repeat -top-50 -left-75 w-full h-full opacity-50" style={{ backgroundImage: "url('/images/mongolia/pattern_r.svg')", backgroundSize: '32%', backgroundPosition: 'left top' }} />
          <LatestSocials
            socials={COUNTRY_SOCIALS.mongolia} />
          <CountryBlogSection country="mongolia" />
          <TeamSection
            teams={COUNTRY_TEAMS.mongolia}
            title='Mongolia'
          />
        </section>
        <TeamVideoSection
          title={t('countryPage.introductionTitlemn')}
          videoUrl="https://www.youtube.com/embed/tYjvAdzknLE"
          centerImageSrc="/images/mongolia/pattern.svg"
          centerImageAlt="Center pattern"
          centerImageWidth={3000}
          centerImageHeight={3000}
          centerImageStyle={{ opacity: 0.8, zIndex: 5, marginTop: '200px' }}
        />
        <LoanTypesSection />
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute pointer-events-none bg-no-repeat bg-right top-90 -right-40 w-full h-full" style={{ backgroundImage: "url('/images/mongolia/pattern_r.svg')", backgroundSize: '20%' }} />
          <ProcessStep />
        </section>
      </div>
      <LoanDetailSection backgroundImage="/images/mongolia/loan_detail_bg.webp" country="mongolia" />
      <div style={{ background: getGradient('mongolia') }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <GarlandDecoration country="mongolia" />
          <EMICalculatorSection />
          <LoanApplicationForm country="mongolia"  anchorId="apply-loan-online" />
        </section>
      </div>
    </div>
  );
}
