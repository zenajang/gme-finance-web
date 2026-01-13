'use client'

import IntroductionSection from "../components/home/IntroductionSection";
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

const RUSSIA_SOCIALS: SocialsItem[] = [
  {
    id: "fb-rus",
    platform: "facebook",
    embedUrl: "https://www.facebook.com/gmefinancerussia?locale=ko_KR",
    href: "https://www.facebook.com/gmefinancerussia?locale=ko_KR",
    image: "/images/dummy.jpg",
    snsLogo: "/images/icons/facebook.svg",
    title: "GME Russia Finance (Facebook)",
  },
  {
    id: "tt-rus",
    platform: "tiktok",
    embedUrl: "https://www.tiktok.com/@gmefinancerus",
    href: "https://www.tiktok.com/@gmefinancerus",
    image: "/images/dummy.jpg",
    snsLogo: "/images/icons/tictok.svg",
    title: "GME Russia Finance (TikTok)",
  },
  {
    id: "is-rus",
    platform: "instagram_post",
    embedUrl: "https://www.instagram.com/p/DSHJ7ocEiq_/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    href: "https://www.instagram.com/gmefinancecis/",
    image: "/images/dummy.jpg",
    snsLogo: "/images/icons/instagram.svg",
    title: "GME Russia Finance (Instagram post)",
  },
];

const RUSSIA_TEAMS: Teams[] = [
  {
    id: 'hamid',
    image: '/images/uzbekistan/team/hamid.jpg',
    name: 'HAMID',
  },
  {
    id: 'zed',
    image: '/images/uzbekistan/team/zed.jpg',
    name: 'ZED',

  },
  {
    id: 'mark',
    image: '/images/uzbekistan/team/mark.jpg',
    name: 'MARK',
  },
  {
    id: 'mikhail',
    image: '/images/uzbekistan/team/mikhail.jpg',
    name: 'MIKHAIL',
  },
  {
    id: 'ruby',
    image: '/images/uzbekistan/team/ruby.jpg',
    name: 'RUBY',

  },
  {
    id: 'ziyoda',
    image: '/images/uzbekistan/team/ziyoda.jpg',
    name: 'ZIYODA',
  },
  {
    id: 'zoda',
    image: '/images/uzbekistan/team/zoda.jpg',
    name: 'ZODA',

  },
  {
    id: 'abror',
    image: '/images/team.svg',
    name: 'ABROR',
  },
];

export default function RussiaPage() {
  const colors = getColorScheme('russia')
  const { t } = useTranslation()

  return (
    <div>
      <IntroductionSection
        videoSrc="/images/russia/background.webm"
        title={t('country.russia')}
        description={t('countryPage.mainTitle')}
        buttonText={t('button.applyNow')}
        buttonTextColor={colors.primary}
        buttonHoverBgColor={colors.hover}
        buttonHref="#apply-loan-online"
      />
      <div
        className="bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ background: getGradient('russia') }}
      >
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-repeat bg-top top-0 w-full h-130" style={{ backgroundImage: "url('/images/russia/snow_bg_b.svg')" }} />
          <LatestSocials
            socials={RUSSIA_SOCIALS}
            buttonBgColor={colors.primary}
            buttonHoverBgColor={colors.hover}
          />
          <TeamSection
            teams={RUSSIA_TEAMS}
            title={'cis'}
            nameBgColor={colors.primary}
          />
        </section>
        <TeamVideoSection
          title={t('countryPage.intrductionTitleru')}
          subtitleColor={colors.primary}
          videoUrl="https://www.youtube.com/embed/7P2VEM70KgA"
          leftImageSrc="/images/russia/castle_l.svg"
          leftImageAlt="Left castle"
          leftImageWidth={380}
          leftImageHeight={380}
          leftImageStyle={{ width:'20vw', zIndex: 1 }}
          rightImageSrc="/images/russia/castle_r.svg"
          rightImageAlt="Right castle"
          rightImageWidth={350}
          rightImageHeight={350}
          rightImageStyle={{  width:'20vw',  zIndex: 1 }}
        />
        <LoanTypesSection />
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-no-repeat bg-bottom bottom-0 w-full h-135" style={{ backgroundImage: "url('/images/russia/snow_bg.svg')" }} />
          <ProcessStep subtitleColor="#3A57B4" />
        </section>
      </div>
      <LoanDetailSection backgroundImage="/images/russia/loan_detail_bg.webp" country="russia" />
      <section className="bg-no-repeat relative overflow-hidden z-10 isolate">
        <GarlandDecoration country="russia" />
        <div className="relative z-10" style={{ background: '#DFE8FF' }}>
          <EMICalculatorSection buttonBgColor={colors.primary} buttonHoverBgColor={colors.hover} />
        </div>
        <div style={{ background: getGradient('russia', true) }}>
          <LoanApplicationForm subtitleColor={colors.primary} buttonBgColor={colors.primary} buttonHoverBgColor={colors.hover}  anchorId="apply-loan-online" />
        </div>
      </section>
    </div>
  );
}
