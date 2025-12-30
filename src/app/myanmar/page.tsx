'use client'

import IntroductionSection
  from "../components/home/IntroductionSection";
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

const MYANMAR_SOCIALS: SocialsItem[] = [
  {
    id: "fb-in",
    platform: "facebook",
    embedUrl: "https://www.facebook.com/profile.php?id=61574808429892&locale=ko_KR",
    href: "https://www.facebook.com/profile.php?id=61574808429892&locale=ko_KR",
    image: "/images/dummy.jpg",
    snsLogo: "/images/icons/facebook.svg",
    title: "GME Myanmar Finance (Facebook)",
  },
  {
    id: "tt-in",
    platform: "tiktok",
    embedUrl: "https://www.tiktok.com/@gmefinancemyanmar",
    href: "https://www.tiktok.com/@gmefinancemyanmar",
    image: "/images/dummy.jpg",
    snsLogo: "/images/icons/tictok.svg",
    title: "GME Myanmar Finance (TikTok)",
  },
  {
    id: "is-in",
    platform: "instagram_post",
    embedUrl: "https://www.instagram.com/p/DHzkAyFuID_/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    href: "https://www.instagram.com/gmefinancemyanmar/",
    image: "/images/dummy.jpg",
    snsLogo: "/images/icons/instagram.svg",
    title: "GME Myanmar Finance (Instagram post)",
  },
];

const MYANMAR_TEAMS: Teams[] = [
  {
    id: 'min',
    image: '/images/myanmar/team/min.jpg',
    name: 'MIN',
  },
  {
    id: 'suzan',
    image: '/images/myanmar/team/suzan.jpg',
    name: 'SUZAN',

  },
  {
    id: 'crystal',
    image: '/images/myanmar/team/crystal.jpg',
    name: 'CRYSTAL',
  },
  {
    id: 'eaindra',
    image: '/images/myanmar/team/eaindra.jpg',
    name: 'EAINDRA',
  },
  {
    id: 'hanna',
    image: '/images/team.svg',
    name: 'HANNA',

  },
  {
    id: 'thazin',
    image: '/images/team.svg',
    name: 'THAZIN',
  },
  {
    id: 'puhe',
    image: '/images/team.svg',
    name: 'PUHE',
  },
];

export default function MyanmarPage() {
  const colors = getColorScheme('myanmar')
  const { t } = useTranslation()
  return (
    <div>
      <IntroductionSection
        videoSrc="/images/myanmar/background.webm"
        title={t('country.myanmar')}
        description={t('countryPage.mainTitle')}
        buttonText={t('button.applyNow')}
        buttonBgColor={colors.primary}
        buttonHoverBgColor={colors.hover}
        buttonTextColor={colors.gradient1}
      />
      <div
        className="bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: "url('/images/myanmar/section_bg.svg')" }}
      >
        <section className="bg-no-repeat bg-cover bg-center relative overflow-hidden">
          <div className="absolute bg-no-repeat bg-cover bg-center top-0 w-full h-160 md:h-330" style={{ backgroundImage: "url('/images/myanmar/wave_t.svg')" }} />
          <LatestSocials
            socials={MYANMAR_SOCIALS}
            buttonBgColor={colors.primary}
            buttonHoverBgColor={colors.hover}
          />
          <TeamSection
            teams={MYANMAR_TEAMS}
            title='Myanmar'
            nameBgColor={colors.primary}
          />
        </section>
        <div style={{ background: getGradient('myanmar') }}>
          <TeamVideoSection
            title={t('countryPage.introductionTitlemm')}
            subtitleColor={colors.primary}
            videoUrl="https://www.youtube.com/embed/Y7qp3bG9AwA"
            leftImageSrc="/images/myanmar/castle_l.svg"
            leftImageAlt="Left castle"
            leftImageWidth={380}
            leftImageHeight={380}
            leftImageStyle={{ width: '23vw', zIndex: 1 }}
            rightImageSrc="/images/myanmar/castle_r.svg"
            rightImageAlt="Right castle"
            rightImageWidth={380}
            rightImageHeight={380}
            rightImageStyle={{ width: '23vw', zIndex: 1 }}
          />
          <LoanTypesSection />
          <section className="relative overflow-hidden">
            <div className="absolute bg-no-repeat bg-cover bg-center bottom-0 w-full h-200 md:h-280" style={{ backgroundImage: "url('/images/myanmar/wave_b.svg')" }} />
            <ProcessStep subtitleColor={colors.primary} />
          </section>
        </div>
      </div>
      <LoanDetailSection backgroundImage="/images/myanmar/loan_detail_bg.webp" country="myanmar" />
      <section className="bg-cover relative overflow-hidden" style={{ background: getGradient('myanmar') }}>
        <EMICalculatorSection buttonBgColor={colors.primary} buttonHoverBgColor={colors.hover} />
        <GarlandDecoration country="myanmar" />
        <LoanApplicationForm buttonBgColor={colors.primary} subtitleColor={colors.primary} />
      </section>
    </div>
  );
}
