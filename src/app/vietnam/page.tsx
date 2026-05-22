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

export default function VietnamPage() {
  const { t } = useTranslation()

  return (
    <div>
      <IntroductionSection
        videoSrc="/images/vietnam/background.mp4"
        title={t('country.vietnam')}
        description={t('countryPage.mainTitle')}
        buttonText={t('button.applyNow')}
        buttonHref="#apply-loan-online"
        mobilePhone={COUNTRY_PHONES.vietnam?.mobile}
        hotlinePhone={COUNTRY_PHONES.vietnam?.hotline}
      />
      <div
        className="bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ background: getGradient('vietnam') }}
      >
        <section className="bg-no-repeat relative overflow-hidden">
          <LatestSocials
            socials={COUNTRY_SOCIALS.vietnam} />
          <div className="absolute pointer-events-none bg-no-repeat -top-170 bg-left -left-30 w-full h-full" style={{ backgroundImage: "url('/images/vietnam/pattern_y.svg')", backgroundSize: '25% auto' }} />
          <CountryBlogSection country="vietnam" />
          <TeamSection
            teams={COUNTRY_TEAMS.vietnam}
            title='vietnam'
          />
        </section>
        <TeamVideoSection
          title="Meet Our Vietnam Team"
          videoUrl="https://www.youtube.com/embed/oyHViqUxhhA"
          leftImageSrc="/images/vietnam/castle_l.svg"
          leftImageAlt="Left castle"
          leftImageWidth={530}
          leftImageHeight={530}
          leftImageStyle={{width:'25vw', zIndex: 1 }}
          rightImageSrc="/images/vietnam/castle_r.svg"
          rightImageAlt="Right castle"
          rightImageWidth={1000}
          rightImageHeight={1000}
          rightImageOffsetX={-270}
          rightImageStyle={{ width:'48vw', zIndex: 1 }}
        />
        <LoanTypesSection />
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute pointer-events-none bg-no-repeat bg-right -bottom-80 -right-50 w-full h-full" style={{ backgroundImage: "url('/images/vietnam/pattern_r.svg')", backgroundSize: '20% auto' }} />
          <ProcessStep />
        </section>
      </div>
      <LoanDetailSection backgroundImage="/images/vietnam/loan_detail_bg.webp" country="vietnam" />
      <div style={{ background: getGradient('vietnam') }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <GarlandDecoration country="vietnam" />
          <EMICalculatorSection />
          <LoanApplicationForm country="vietnam"  anchorId="apply-loan-online" />
        </section>
      </div>
    </div>
  );
}
