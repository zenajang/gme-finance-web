'use client'

import { getColorScheme } from "@/constants/colors";
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

export default function UzbekistanPage() {
  const colors = getColorScheme('uzbekistan')
  const { t } = useTranslation()

  return (
    <div>
      <IntroductionSection
        videoSrc="/images/uzbekistan/background.mp4"
        title={t('country.uzbekistan')}
        description={t('countryPage.mainTitle')}
        buttonText={t('button.applyNow')}
        buttonTextColor={colors.primary}
        buttonHoverBgColor={colors.introHover}
        buttonHref="#apply-loan-online"
      />
      <div
        className="bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ background: colors.gradient1 }}
      >
        <section className="bg-no-repeat relative overflow-hidden">
          <LatestSocials
            socials={COUNTRY_SOCIALS.uzbekistan}
            buttonBgColor={colors.primary}
            buttonHoverBgColor={colors.hover}
          />
          {/* 모바일용 flower - 작은 크기 */}
          <div className="absolute bg-no-repeat bg-left block md:hidden -top-20 -left-10 w-[50vw] h-[50vw]" style={{ backgroundImage: "url('/images/uzbekistan/flower_lg.svg')", backgroundSize: 'contain' }} />
          {/* 데스크톱용 flower */}
          <div className="absolute pointer-events-none bg-no-repeat bg-left hidden md:block -top-170 -left-30 w-full h-full" style={{ backgroundImage: "url('/images/uzbekistan/flower_lg.svg')" }} />
          <CountryBlogSection country="uzbekistan" />
          <TeamSection
            teams={COUNTRY_TEAMS.uzbekistan}
            title='Uzbekistan'
            nameBgColor={colors.primary}
          />
        </section>
        <TeamVideoSection
          title="Meet Our Uzbekistan Team"
          titleColor={colors.title}
          subtitleColor="#0094AE"
          videoUrl="https://www.youtube.com/embed/7P2VEM70KgA"
          centerImageSrc="/images/uzbekistan/pattern.svg"
          centerImageAlt="Center pattern"
          centerImageWidth={3000}
          centerImageHeight={3000}
          centerImageStyle={{ opacity: 0.8, zIndex: 5, maxHeight: '30vh' }}
        />
        <LoanTypesSection />
        <section className="bg-no-repeat relative overflow-hidden">
          {/* 모바일용 flower - 작은 크기 */}
          <div className="absolute bg-no-repeat bg-right block md:hidden -bottom-10 -right-10 w-[50vw] h-[50vw]" style={{ backgroundImage: "url('/images/uzbekistan/flower_lg.svg')", backgroundSize: 'contain' }} />
          {/* 데스크톱용 flower */}
          <div className="absolute pointer-events-none bg-no-repeat bg-right hidden md:block -bottom-80 -right-50 w-full h-full" style={{ backgroundImage: "url('/images/uzbekistan/flower_lg.svg')" }} />
          <ProcessStep subtitleColor={colors.primary} />
        </section>
      </div>

      <LoanDetailSection backgroundImage="/images/uzbekistan/loan_detail_bg.webp" country="uzbekistan" />
      <section className="bg-no-repeat relative overflow-hidden">
        <GarlandDecoration country="uzbekistan" />
        <div className="relative z-10" style={{ background: colors.gradient1 }}>
          <EMICalculatorSection buttonBgColor={colors.primary} buttonHoverBgColor={colors.hover} />
        </div>
        <div style={{ background: colors.gradient1 }}>
          <LoanApplicationForm subtitleColor={colors.primary} buttonBgColor={colors.primary}  anchorId="apply-loan-online" />
        </div>
      </section>
    </div>
  );
}
