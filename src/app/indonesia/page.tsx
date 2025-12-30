'use client'


import { getColorScheme, getGradient } from "@/constants/colors";
import IntroductionSection from "../components/home/IntroductionSection";
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

const INDONESIA_SOCIALS: SocialsItem[] = [
  {
    id: "fb-in",
    platform: "facebook",
    embedUrl: "https://www.facebook.com/gmefinanceindonesia?locale=ko_KR",
    href: "https://www.facebook.com/gmefinanceindonesia?locale=ko_KR",
    image: "/images/dummy.jpg",
    snsLogo: "/images/icons/facebook.svg",
    title: "GME Indonesia Finance (Facebook)",
  },
  {
    id: "tt-in",
    platform: "tiktok",
    embedUrl: "https://www.tiktok.com/@gmefinanceindonesia",
    href: "https://www.tiktok.com/@gmefinanceindonesia",
    image: "/images/dummy.jpg",
    snsLogo: "/images/icons/tictok.svg",
    title: "GME Indonesia Finance (TikTok)",
  },
  {
    id: "is-in",
    platform: "instagram_post",
    embedUrl: "https://www.instagram.com/reel/DQwfSNtjxr5/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    href: "https://www.instagram.com/gmefinance.indonesia/",
    image: "/images/dummy.jpg",
    snsLogo: "/images/icons/instagram.svg",
    title: "GME Indonesia Finance (Instagram post)",
  },
];

const INDONESIA_TEAMS: Teams[] = [
  {
    id: 'ferry',
    image: '/images/indonesia/team/ferry.jpg',
    name: 'FERRY',
  },
  {
    id: 'livi',
    image: '/images/indonesia/team/livi.jpg',
    name: 'LIVI',

  },
  {
    id: 'adiba',
    image: '/images/team.svg',
    name: 'ADIBA',
  },
  {
    id: 'winda',
    image: '/images/team.svg',
    name: 'WINDA',
  },
  {
    id: 'sandi',
    image: '/images/team.svg',
    name: 'SANDI',

  },
  {
    id: 'widi',
    image: '/images/team.svg',
    name: 'WIDI',
  },
];

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
      />
      <div
        className="bg-cover bg-center bg-no-repeat"
        style={{ background: getGradient('indonesia') }}
      >
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-repeat bg-top top-0 w-full h-300" style={{ backgroundImage: "url('/images/indonesia/garland_d.svg')", transform: 'rotate(180deg)' }} />
          <LatestSocials
            socials={INDONESIA_SOCIALS} />
          <TeamSection
            teams={INDONESIA_TEAMS}
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
          <div className="absolute bg-repeat bg-bottom bottom-0 right-0 w-full h-full" style={{ backgroundImage: "url('/images/indonesia/garland_u.svg')", transform: 'rotate(180deg)' }} />
        </section>
      </div>
      <LoanDetailSection backgroundImage="/images/indonesia/loan_detail_bg.webp" country="indonesia" />
      <div style={{ background: getGradient('indonesia', true) }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <GarlandDecoration country="indonesia" />
          <EMICalculatorSection />
          <LoanApplicationForm country="indonesia" />
        </section>
      </div>
    </div>
  );
}
