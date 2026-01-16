'use client'

import { getGradient } from "@/constants/colors";
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

const CAMBODIA_SOCIALS: SocialsItem[] = [
  {
    id: "fb-cb",
    platform: "facebook",
    embedUrl: "https://www.facebook.com/profile.php?id=61568524845755&locale=ko_KR",
    href: "https://www.facebook.com/profile.php?id=61568524845755&locale=ko_KR",
    image: "/images/dummy.jpg",
    snsLogo: "/images/icons/facebook.svg",
    title: "GME Cambodia Finance (Facebook)",
  },
  {
    id: "tt-cb",
    platform: "tiktok",
    embedUrl: "https://www.tiktok.com/@gmefinancecambodia",
    href: "https://www.tiktok.com/@gmefinancecambodia",
    image: "/images/dummy.jpg",
    snsLogo: "/images/icons/tictok.svg",
    title: "GME Cambodia Finance (TikTok)",
  }
];

const CAMBODIA_TEAMS: Teams[] = [
  {
    id: 'tabitha',
    image: '/images/cambodia/team/tabitha.jpg',
    name: 'TABITHA',
  },
  {
    id: 'viny',
    image: '/images/cambodia/team/viny.jpg',
    name: 'VINY',

  },
  {
    id: 'kanha',
    image: '/images/team.svg',
    name: 'KANHA',
  },
  {
    id: 'sophea',
    image: '/images/team.svg',
    name: 'SOPHEA',
  },
  {
    id: 'chhea',
    image: '/images/team.svg',
    name: 'CHHEA',
  },
];

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
              socials={CAMBODIA_SOCIALS} />
            <TeamSection
              teams={CAMBODIA_TEAMS}
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
