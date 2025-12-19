'use client'

import { getColorScheme, getGradient } from "@/constants/colors";
import CountryIntroductionSection from "../components/home/CountryIntroductionSection";
import LoanTypesSection from "../components/home/LoanTypesSection";
import EMICalculatorSection from "../components/sections/EMICalculatorSection";
import LatestSocials, { SocialsItem } from "../components/sections/LatestSocials";
import LoanApplicationForm from "../components/sections/LoanApplicationForm";
import LoanDetailSection from "../components/sections/LoanDetailSection";
import ProcessStep from "../components/sections/ProcessStep";
import TeamSection, { Teams } from "../components/sections/TeamSection";
import GarlandDecoration from "../components/sections/GarlandDecoration";
import TeamVideoSection from "../components/sections/TeamVideoSection";
import { useTranslation } from "react-i18next";

const THAILAND_SOCIALS: SocialsItem[] = [
  {
    id: "fb-th",
    platform: "facebook",
    embedUrl: "https://www.facebook.com/gmethai.finance?locale=ko_KR",
    href: "https://www.facebook.com/gmethai.finance?locale=ko_KR",
    image: "/images/dummy.jpg",
    snsLogo: "/images/icons/facebook.svg",
    title: "GME Thailand Finance (Facebook)",
  },
  {
    id: "tt-th",
    platform: "tiktok",
    embedUrl: "https://www.tiktok.com/@gmefinancethailand",
    href: "https://www.tiktok.com/@gmefinancethailand",
    image: "/images/dummy.jpg",
    snsLogo: "/images/icons/tictok.svg",
    title: "GME Thailand Finance (TikTok)",
  },
];

const THAILAND_TEAMS: Teams[] = [
  {
    id: 'attaya',
    image: '/images/team.svg',
    name: 'ATTHAYA',
  }
];

export default function ThailandPage() {
  const colors = getColorScheme('thailand')
  const { t } = useTranslation()

  return (
    <div>
      <CountryIntroductionSection
        videoSrc="/images/thailand/background.webm"
        title={t('country.thailand')}
        description={t('countryPage.mainTitle')}
        buttonText={t('button.applyNow')}
      />
      <div
        className="bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ background: getGradient('thailand') }}
      >
        <section className="bg-no-repeat relative overflow-hidden">
          <LatestSocials
            socials={THAILAND_SOCIALS}
            titleColor={colors.title}
          />
          <TeamSection
            teams={THAILAND_TEAMS}
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
          <LoanApplicationForm country="thailand" />
        </section>
      </div>
    </div>
  );
}
