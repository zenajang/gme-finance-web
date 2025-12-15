'use client'

import CountryIntroductionSection from "../components/home/CountryIntroductionSection";
import LoanTypesSection from "../components/home/LoanTypesSection";
import EMICalculatorSection from "../components/sections/EMICalculatorSection";
import LatestSocials, { SocialsItem } from "../components/sections/LatestSocials";
import LoanApplicationForm from "../components/sections/LoanApplicationForm";
import LoanDetailSection from "../components/sections/LoanDetailSection";
import ProcessStep from "../components/sections/ProcessStep";
import TeamSection, { Teams } from "../components/sections/TeamSection";
import { getGradient } from "@/constants/colors";
import GarlandDecoration from "../components/sections/GarlandDecoration";
import TeamVideoSection from "../components/sections/TeamVideoSection";
import { useTranslation } from "react-i18next";

const NEPAL_SOCIALS: SocialsItem[] = [
  {
    id: 'facebook',
    image: '/images/nepal/social1.jpg',
    snsLogo: '/images/icons/facebook.svg',
    title: 'GME Finance Nepal',
    likes: '2.5K',
    followers: '3.1K',
    tags: ['Event', 'News', 'Updates'],
    href: '/news/nepal/facebook',
  },
  {
    id: 'tiktok',
    image: '/images/nepal/social2.jpg',
    snsLogo: '/images/icons/tictok.svg',
    title: 'GME Finance Nepal',
    likes: '1.8K',
    followers: '2.4K',
    tags: ['Videos', 'Tips', 'Community'],
    href: '/news/nepal/tiktok',
  },
  {
    id: 'instagram',
    image: '/images/nepal/social3.jpg',
    snsLogo: '/images/icons/instagram.svg',
    title: 'GME Finance Nepal',
    likes: '2.1K',
    followers: '2.8K',
    tags: ['Photos', 'Stories', 'News'],
    href: '/news/nepal/instagram',
  },
];

const NEPAL_TEAMS: Teams[] = [
  {
    id: 'madhukar',
    image: '/images/nepal/team/madhukar.svg',
    name: 'MADHUKAR',
  },
  {
    id: 'aashmi',
    image: '/images/nepal/team/aashmi.svg',
    name: 'AASHMI',

  },
  {
    id: 'asmita',
    image: '/images/nepal/team/asmita.svg',
    name: 'ASMITA',
  },
  {
    id: 'prabha',
    image: '/images/nepal/team/prabha.svg',
    name: 'PRABHA',
  },
  {
    id: 'smriti',
    image: '/images/team.svg',
    name: 'SMRITI',

  },
  {
    id: 'salina',
    image: '/images/team.svg',
    name: 'SALINA',
  },
];

export default function NepalPage() {
  const { t } = useTranslation()

  return (
    <div>
      <CountryIntroductionSection
        videoSrc="/images/nepal/background.webm"
        title={t('country.nepal')}
        description={t('countryPage.mainTitle')}
        buttonText={t('button.applyNow')}
      />
      <div
        className="bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ background: getGradient('nepal') }}
      >
        <section className="bg-no-repeat relative overflow-hidden">
          <LatestSocials socials={NEPAL_SOCIALS} />
          <TeamSection teams={NEPAL_TEAMS} title='Nepal' />
        </section>
        <TeamVideoSection
          title={t('countryPage.introductionTitlenp')}
          videoUrl="https://www.youtube.com/embed/afbejvZ8a8k"
          leftImageSrc="/images/nepal/castle_l.svg"
          leftImageAlt="Left castle"
          leftImageWidth={300}
          leftImageHeight={300}
          leftImageStyle={{ left: '-250px', marginTop: '120px', zIndex: 1 }}
          rightImageSrc="/images/nepal/castle_r.svg"
          rightImageAlt="Right castle"
          rightImageWidth={350}
          rightImageHeight={350}
          rightImageStyle={{ right: '-270px', marginTop: '93px', zIndex: 1 }}
        />
        <LoanTypesSection />
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-no-repeat bg-right -bottom-6 -right-10 w-full h-65" style={{ backgroundImage: "url('/images/nepal/cow.svg')" }} />
          <div className="absolute bg-no-repeat bg-left bottom-0 -left-14 w-full h-65" style={{ backgroundImage: "url('/images/nepal/castle.svg')" }} />
          <ProcessStep />
        </section>
      </div>
      <LoanDetailSection backgroundImage="/images/nepal/loan_detail_bg.webp" country="nepal" />
      <div style={{ background: getGradient('nepal') }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <GarlandDecoration country="nepal" />
          <EMICalculatorSection />
          <LoanApplicationForm country="nepal" />
        </section>
      </div>
    </div>
  );
}
