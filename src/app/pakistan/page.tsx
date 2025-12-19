'use client'

import CountryIntroductionSection from "../components/home/CountryIntroductionSection";
import LoanTypesSection from "../components/home/LoanTypesSection";
import EMICalculatorSection from "../components/sections/EMICalculatorSection";
import LatestSocials, { SocialsItem } from "../components/sections/LatestSocials";
import LoanApplicationForm from "../components/sections/LoanApplicationForm";
import LoanDetailSection from "../components/sections/LoanDetailSection";
import ProcessStep from "../components/sections/ProcessStep";
import TeamSection, { Teams } from "../components/sections/TeamSection";
import { getColorScheme, getGradient } from "@/constants/colors";
import GarlandDecoration from "../components/sections/GarlandDecoration";
import TeamVideoSection from "../components/sections/TeamVideoSection";
import { useTranslation } from "react-i18next";

const PAKISTAN_SOCIALS: SocialsItem[] = [
  {
    id: "fb-pk",
    platform: "facebook",
    embedUrl: "https://www.facebook.com/GMEFinancePakistan?locale=ko_KR",
    href: "https://www.facebook.com/GMEFinancePakistan?locale=ko_KR",
    image: "/images/dummy.jpg",
    snsLogo: "/images/icons/facebook.svg",
    title: "GME Pakistan Finance (Facebook)",
  },
  {
    id: "tt-pk",
    platform: "tiktok",
    embedUrl: "https://www.tiktok.com/@gmefinancepakistan",
    href: "https://www.tiktok.com/@gmefinancepakistan",
    image: "/images/dummy.jpg",
    snsLogo: "/images/icons/tictok.svg",
    title: "GME Pakistan Finance (TikTok)",
  },
  {
    id: "is-pk",
    platform: "instagram_post",
    embedUrl: "https://www.instagram.com/reel/DSVB_4Pke3s/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    href: "https://www.instagram.com/gme_pakistan/",
    image: "/images/dummy.jpg",
    snsLogo: "/images/icons/instagram.svg",
    title: "GME Pakistan Finance (Instagram post)",
  },
];

const PAKISTAN_TEAMS: Teams[] = [
  {
    id: 'emma',
    image: '/images/india/team/emma.svg',
    name: 'EMMA',
  },
];

export default function PakistanPage() {
  const colors = getColorScheme('pakistan')
  const { t } = useTranslation()

  return (
    <div>
      <CountryIntroductionSection
        videoSrc="/images/pakistan/background.webm"
        title={t('country.pakistan')}
        description={t('countryPage.mainTitle')}
        buttonText={t('button.applyNow')}
        buttonTextColor={colors.primary}
        buttonHoverBgColor={colors.introHover}
      />
      <div
        className="bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ background: getGradient('pakistan') }}
      >
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-no-repeat bg-top -top-40 -left-200 w-full h-full" style={{ backgroundImage: "url('/images/pakistan/flower.svg')" }} />
          <LatestSocials
            socials={PAKISTAN_SOCIALS} buttonBgColor={colors.primary} buttonHoverBgColor={colors.hover} />
          <TeamSection
            teams={PAKISTAN_TEAMS}
            nameBgColor={colors.primary}
            title='pakistan'
          />
        </section>
        <TeamVideoSection
          title={t('countryPage.introductionTitlepk')}
          videoUrl="https://www.youtube.com/embed/8LYtzxvDWN4"
          leftImageSrc="/images/pakistan/castle_l.svg"
          leftImageAlt="Left castle"
          leftImageWidth={320}
          leftImageHeight={320}
          leftImageStyle={{ left: '-240px', marginTop: '-30px', zIndex: 1 }}
          rightImageSrc="/images/pakistan/castle_r.svg"
          rightImageAlt="Right castle"
          rightImageWidth={680}
          rightImageHeight={680}
          rightImageStyle={{ right: '-280px', marginTop: '40px', zIndex: 1 }}
        />
        <LoanTypesSection />
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-no-repeat bg-right -bottom-90 -right-50 w-full h-220" style={{ backgroundImage: "url('/images/pakistan/flower.svg')" }} />
          <ProcessStep subtitleColor={colors.primary} />
        </section>
      </div>
      <LoanDetailSection backgroundImage="/images/pakistan/loan_detail_bg.webp" country="pakistan" />
      <div className="relative" style={{ background: getGradient('pakistan') }}>
        <div className="absolute bg-repeat top-0 left-0 w-full h-full" style={{ backgroundImage: "url('/images/pakistan/pattern.svg')", backgroundSize: 'auto' }} />
        <section className="bg-no-repeat relative overflow-hidden">
          <GarlandDecoration country="pakistan" />
          <EMICalculatorSection buttonBgColor={colors.primary} buttonHoverBgColor={colors.hover} />
          <div className="mb-20">
            <LoanApplicationForm country="pakistan" buttonBgColor={colors.primary} subtitleColor={colors.primary} />
          </div>
        </section>
      </div>
    </div>
  );
}
