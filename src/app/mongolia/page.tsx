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

const MONGOLIA_SOCIALS: SocialsItem[] = [
  {
    id: "fb-mo",
    platform: "facebook",
    embedUrl: "https://www.facebook.com/GmeFinanceMongolia?locale=ko_KR",
    href: "https://www.facebook.com/GmeFinanceMongolia?locale=ko_KR",
    image: "/images/dummy.jpg",
    snsLogo: "/images/icons/facebook.svg",
    title: "GME Mongolia Finance (Facebook)",
  },
  {
    id: "tt-mo",
    platform: "tiktok",
    embedUrl: "https://www.tiktok.com/@gmefinancemongolia",
    href: "https://www.tiktok.com/@gmefinancemongolia",
    image: "/images/dummy.jpg",
    snsLogo: "/images/icons/tictok.svg",
    title: "GME Mongolia Finance (TikTok)",
  },
  {
    id: "is-mo",
    platform: "instagram_post",
    embedUrl: "https://www.instagram.com/p/DM2SaOBOIRN/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    href: "https://www.instagram.com/gmefinancemongolia/",
    image: "/images/dummy.jpg",
    snsLogo: "/images/icons/instagram.svg",
    title: "GME Mongolia Finance (Instagram post)",
  },
];

const MONGOLIA_TEAMS: Teams[] = [
  {
    id: 'uuree',
    image: '/images/mongolia/team/uuree.jpg',
    name: 'UUREE',
  },
  {
    id: 'eba',
    image: '/images/mongolia/team/eba.jpg',
    name: 'EBA',

  },
  {
    id: 'migga',
    image: '/images/mongolia/team/migga.jpg',
    name: 'MIGGA',
  },
  {
    id: 'zulaa',
    image: '/images/team.svg',
    name: 'ZULAA',
  },
  {
    id: 'khanda',
    image: '/images/team.svg',
    name: 'KHANDAA',

  },
];

export default function MongoliaPage() {
  const { t } = useTranslation()

  return (
    <div>
      <IntroductionSection
        videoSrc="/images/mongolia/background.webm"
        title={t('country.mongolia')}
        description={t('countryPage.mainTitle')}
        buttonText={t('button.applyNow')}
        buttonHref="#apply-loan-online"
      />
      <div
        className="bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ background: getGradient('mongolia') }}
      >
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-no-repeat -top-50 -left-75 w-full h-full opacity-50" style={{ backgroundImage: "url('/images/mongolia/pattern_r.svg')", backgroundSize: '32%', backgroundPosition: 'left top' }} />
          <LatestSocials
            socials={MONGOLIA_SOCIALS} />
          <TeamSection
            teams={MONGOLIA_TEAMS}
            title='Mongolia'
          />
        </section>
        <TeamVideoSection
          title={t('countryPage.introductionTitlemn')}
          videoUrl="https://www.youtube.com/embed/tYjvAdzknLE"
          centerImageSrc="/images/mongolia/pattern.svg"
          centerImageAlt="Center pattern"
          centerImageWidth={3000}
          centerImageHeight={3000}
          centerImageStyle={{ opacity: 0.8, zIndex: 5, marginTop: '200px' }}
        />
        <LoanTypesSection />
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-no-repeat bg-right top-90 -right-40 w-full h-full" style={{ backgroundImage: "url('/images/mongolia/pattern_r.svg')", backgroundSize: '20%' }} />
          <ProcessStep />
        </section>
      </div>
      <LoanDetailSection backgroundImage="/images/mongolia/loan_detail_bg.webp" country="mongolia" />
      <div style={{ background: getGradient('mongolia') }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <GarlandDecoration country="mongolia" />
          <EMICalculatorSection />
          <LoanApplicationForm country="mongolia" />
        </section>
      </div>
    </div>
  );
}
