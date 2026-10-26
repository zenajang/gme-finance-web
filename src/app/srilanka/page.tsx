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

export default function SrilankaPage() {
  const { t } = useTranslation()
  const colors = getColorScheme('srilanka')

  return (
    <div>
      <IntroductionSection
        videoSrc="/images/srilanka/background.mp4"
        title={t('country.sri lanka')}
        description={t('countryPage.mainTitle')}
        buttonText={t('button.applyNow')}
        buttonHref="#apply-loan-online"
        mobilePhone={COUNTRY_PHONES.srilanka?.mobile}
        hotlinePhone={COUNTRY_PHONES.srilanka?.hotline}
      />
      <div
        className="bg-cover bg-center bg-no-repeat"
        style={{ background: getGradient('srilanka') }}
      >
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-no-repeat bg-left -top-30 left-0 w-full h-100 md:h-220" style={{ backgroundImage: "url('/images/srilanka/garland_u.svg')", backgroundSize: 'contain' }} />
          <LatestSocials
            socials={COUNTRY_SOCIALS.srilanka} />
          <CountryBlogSection country="srilanka" />
          <TeamSection
            teams={COUNTRY_TEAMS.srilanka}
            title='Sri lanka'
          />
          <TeamVideoSection
            title={t('countryPage.introductionTitlelk')}
            subtitleColor={colors.primary}
            videoUrl="https://www.youtube.com/embed/FJhRx5fyf64"
            leftImageSrc="/images/srilanka/flower.svg"
            leftImageAlt="Left flower"
            leftImageWidth={800}
            leftImageHeight={800}
            leftImageStyle={{ width: '40vw', marginTop:'120px',zIndex: 1 }}
            leftImageOffsetX={200}
            rightImageSrc="/images/srilanka/flower.svg"
            rightImageAlt="Right flower"
            rightImageWidth={700}
            rightImageHeight={700}
            rightImageStyle={{ width: '40vw', marginTop:'120px',zIndex: 1 }}
            rightImageOffsetX={-200}
          />
          {/* <LoanTypesSection /> */}
          <ProcessStep />
          <div className="absolute bg-no-repeat bg-right -bottom-10 right-0 w-full h-80 md:h-220" style={{ backgroundImage: "url('/images/srilanka/garland_d.svg')", backgroundSize: 'contain' }} />
        </section>
      </div>
      <LoanDetailSection backgroundImage="/images/srilanka/loan_detail_bg.webp" country="srilanka" />
      <div style={{ background: getGradient('srilanka', true) }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <GarlandDecoration country="srilanka" />
          <EMICalculatorSection />
        </section>
      </div>
    </div>
  );
}
