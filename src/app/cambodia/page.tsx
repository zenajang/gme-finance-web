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

export default function CambodiaPage() {
  const { t } = useTranslation();
  return (
    <div>
      <IntroductionSection
        videoSrc="/images/cambodia/background.mp4"
        title={t('country.cambodia')}
        description={t('countryPage.mainTitle')}
        buttonText={t('button.applyNow')}
        buttonHref="#apply-loan-online"
      />
      <div
        className="bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ background: getGradient('cambodia') }}
      >
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-no-repeat -top-450 bg-center w-full" style={{ backgroundImage: "url('/images/cambodia/pattern_w.svg')", backgroundSize: '100%', height: '180%', backgroundRepeat: 'no-repeat', zIndex: 0 }} />
          <div className="relative" style={{ zIndex: 10 }}>
            <LatestSocials
              socials={COUNTRY_SOCIALS.cambodia} />
            <CountryBlogSection country="cambodia" />
            <TeamSection
              teams={COUNTRY_TEAMS.cambodia}
              title='Cambodia'
            />
          </div>
        </section>
        <TeamVideoSection
          title={t('countryPage.introductionTitlekm')}
          videoUrl="https://www.youtube.com/embed/6Vv3F8utqbk"
          leftImageSrc="/images/cambodia/flower_l.svg"
          leftImageAlt="Left flower"
          leftImageWidth={200}
          leftImageHeight={200}
          leftImageStyle={{ left: '-200px', marginTop: '120px', zIndex: 1 }}
          rightImageSrc="/images/cambodia/flower_r.svg"
          rightImageAlt="Right flower"
          rightImageWidth={200}
          rightImageHeight={200}
          rightImageStyle={{ right: '-200px', marginTop: '120px', zIndex: 1 }}
        />
        <LoanTypesSection />
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-no-repeat -top-30 bg-center w-full pointer-events-none" style={{ backgroundImage: "url('/images/cambodia/pattern.svg')", backgroundSize: '90%', height: '240%', backgroundRepeat: 'no-repeat', zIndex: 0 }} />
          <div className="relative" style={{ zIndex: 10 }}>
            <ProcessStep />
          </div>
        </section>
      </div>
      <LoanDetailSection backgroundImage="/images/cambodia/loan_detail_bg.webp" country="cambodia" />
      <div style={{ background: getGradient('cambodia', true) }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <GarlandDecoration country="cambodia" />
          <EMICalculatorSection />
          <LoanApplicationForm  anchorId="apply-loan-online" />
        </section>
      </div>
    </div>
  );
}
