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
import { getGradient } from "@/constants/colors";
import GarlandDecoration from "@/features/home/sections/GarlandDecoration";
import TeamVideoSection from "@/features/home/sections/TeamVideoSection";
import { useTranslation } from "react-i18next";
import { COUNTRY_SOCIALS, COUNTRY_TEAMS, COUNTRY_PHONES } from "@/constants/countryPageData";

export default function NepalPage() {
  const { t } = useTranslation()

  return (
    <div>
      <IntroductionSection
        videoSrc="/images/nepal/background.webm"
        title={t('country.nepal')}
        description={t('countryPage.mainTitle')}
        buttonText={t('button.applyNow')}
        buttonHref="#apply-loan-online"
        mobilePhone={COUNTRY_PHONES.nepal?.mobile}
        hotlinePhone={COUNTRY_PHONES.nepal?.hotline}
      />
      <div
        className="bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ background: getGradient('nepal') }}
      >
        <section className="bg-no-repeat relative overflow-hidden">
          <LatestSocials socials={COUNTRY_SOCIALS.nepal} />
          <CountryBlogSection country="nepal" />
          <TeamSection teams={COUNTRY_TEAMS.nepal} title='Nepal' />
        </section>
        <TeamVideoSection
          title={t('countryPage.introductionTitlenp')}
          videoUrl="https://www.youtube.com/embed/afbejvZ8a8k"
          leftImageSrc="/images/nepal/castle_l.svg"
          leftImageAlt="Left castle"
          leftImageWidth={300}
          leftImageHeight={300}
          leftImageOffsetX={5}
          leftImageStyle={{ width: '20vw',zIndex: 1 }}
          rightImageSrc="/images/nepal/castle_r.svg"
          rightImageAlt="Right castle"
          rightImageWidth={350}
          rightImageHeight={350}
          rightImageOffsetX={-40}
          rightImageStyle={{ width: '22vw',marginTop:'1.4vw', zIndex: 1 }}
        />
        <LoanTypesSection />
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-no-repeat bg-right -bottom-6 -right-10 w-full h-65" style={{ backgroundImage: "url('/images/nepal/cow.svg')" }} />
          <div className="absolute bg-no-repeat bg-left bottom-0 -left-14 w-full h-65" style={{ backgroundImage: "url('/images/nepal/castle.svg')" }} />
          <ProcessStep />
        </section>
      </div>
      <LoanDetailSection backgroundImage="/images/nepal/loan_detail_bg.webp" country="nepal" />
      <div style={{ background: getGradient('nepal') }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <GarlandDecoration country="nepal" />
          <EMICalculatorSection />
          <LoanApplicationForm country="nepal"  anchorId="apply-loan-online" />
        </section>
      </div>
    </div>
  );
}
