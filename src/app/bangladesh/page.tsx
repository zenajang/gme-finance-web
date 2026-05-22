'use client';

import { useTranslation } from 'react-i18next';
import IntroductionSection from "@/features/home/components/IntroductionSection";
import LoanTypesSection from "@/features/home/components/LoanTypesSection";
import EMICalculatorSection from "@/features/home/sections/EMICalculatorSection";
import LatestSocials from "@/features/home/sections/LatestSocials";
import LoanApplicationForm from "@/features/home/sections/LoanApplicationForm";
import LoanDetailSection from "@/features/home/sections/LoanDetailSection";
import ProcessStep from "@/features/home/sections/ProcessStep";
import TeamSection from "@/features/home/sections/TeamSection";
import CountryBlogSection from "@/features/home/sections/CountryBlogSection";
import { getColorScheme, getGradient } from "@/constants/colors";
import GarlandDecoration from "@/features/home/sections/GarlandDecoration";
import TeamVideoSection from "@/features/home/sections/TeamVideoSection";
import { COUNTRY_SOCIALS, COUNTRY_TEAMS, COUNTRY_PHONES } from "@/constants/countryPageData";

export default function BangladeshPage() {
  const { t } = useTranslation();
  const colors = getColorScheme('bangladesh');

  return (
    <div>
      <IntroductionSection
        videoSrc="/images/bangladesh/background.webm"
        title={t('country.bangladesh')}
        description={t('countryPage.mainTitle')}
        buttonText={t('button.applyNow')}
        buttonHoverBgColor={colors.introHover}
        buttonTextColor={colors.primary}
        buttonHref="#apply-loan-online"
        mobilePhone={COUNTRY_PHONES.bangladesh?.mobile}
        hotlinePhone={COUNTRY_PHONES.bangladesh?.hotline}
      />
      <div
        className="bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ background: getGradient('bangladesh') }}
      >
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-no-repeat bg-left top-0 -left-14 w-full h-65" style={{ backgroundImage: "url('/images/bangladesh/fireflake.svg')" }} />
          <LatestSocials
            socials={COUNTRY_SOCIALS.bangladesh}
            buttonBgColor={colors.primary}
            buttonHoverBgColor={colors.hover}
          />
          <div className="absolute bg-no-repeat top-210 bg-right -right-10 w-full h-65" style={{ backgroundImage: "url('/images/bangladesh/fireflake.svg')" }} />
          <CountryBlogSection country="bangladesh" />
          <TeamSection
            teams={COUNTRY_TEAMS.bangladesh}
            title='Bangladesh'
            nameBgColor={colors.primary}
          />
        </section>
        <TeamVideoSection
          title={t('countryPage.introductionTitlebd')}
          subtitleColor="green"
          videoUrl="https://www.youtube.com/embed/5qTiEUKbjLY"
          leftImageSrc="/images/bangladesh/castle_l.svg"
          leftImageAlt="Left castle"
          leftImageWidth={500}
          leftImageHeight={500}
          leftImageOffsetX={150}
          leftImageStyle={{ width: '35vw', zIndex: 1 }}
          rightImageSrc="/images/bangladesh/castle_r.svg"
          rightImageAlt="Right castle"
          rightImageWidth={500}
          rightImageHeight={500}
          rightImageOffsetX={-150}
          rightImageStyle={{ width: '35vw', zIndex: 1 }}
        />
        <LoanTypesSection />
        <ProcessStep subtitleColor={colors.primary} />
      </div>
      <LoanDetailSection backgroundImage="/images/bangladesh/loan_detail_bg.webp" country="bangladesh" />
      <div style={{ background: getGradient('bangladesh') }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <GarlandDecoration country="bangladesh" />
          <EMICalculatorSection buttonBgColor={colors.primary} buttonHoverBgColor={colors.hover} />
          <LoanApplicationForm country='bangladesh' buttonBgColor={colors.primary} buttonHoverBgColor={colors.hover} subtitleColor={colors.primary}  anchorId="apply-loan-online" />
        </section>
      </div>
    </div>
  );
}
