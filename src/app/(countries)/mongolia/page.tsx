'use client'

import { getGradient } from "@/constants/colors";
import IntroductionSection from "@/features/common/components/IntroductionSection";
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
        mobilePhone={COUNTRY_PHONES.mongolia?.mobile}
        hotlinePhone={COUNTRY_PHONES.mongolia?.hotline}
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
        </section>
      </div>
    </div>
  );
}
