'use client'

import { getGradient } from "@/constants/colors";
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

const SRILANKA_SOCIALS: SocialsItem[] = [
  {
    id: 'facebook',
    image: '/images/srilanka/social1.jpg',
    snsLogo: '/images/icons/facebook.svg',
    title: 'GME Finance Sri lanka',
    likes: '2.5K',
    followers: '3.1K',
    tags: ['Event', 'News', 'Updates'],
    href: '/news/srilanka/facebook',
  },
  {
    id: 'tiktok',
    image: '/images/srilanka/social2.jpg',
    snsLogo: '/images/icons/tictok.svg',
    title: 'GME Finance Sri lanka',
    likes: '1.8K',
    followers: '2.4K',
    tags: ['Videos', 'Tips', 'Community'],
    href: '/news/srilanka/tiktok',
  },
  {
    id: 'instagram',
    image: '/images/srilanka/social3.jpg',
    snsLogo: '/images/icons/instagram.svg',
    title: 'GME Finance Sri lanka',
    likes: '2.1K',
    followers: '2.8K',
    tags: ['Photos', 'Stories', 'News'],
    href: '/news/srilanka/instagram',
  },
];

const SRILANKA_TEAMS: Teams[] = [
  {
    id: 'malsha',
    image: '/images/srilanka/team/malsha.svg',
    name: 'MALSHA',
  },
  {
    id: 'nova',
    image: '/images/srilanka/team/nova.svg',
    name: 'NOVA',

  },
  {
    id: 'udra',
    image: '/images/srilanka/team/udra.svg',
    name: 'UDRA',
  },
  {
    id: 'mallikaa',
    image: '/images/team.svg',
    name: 'MALLIKA',
  },
  {
    id: 'thilini',
    image: '/images/team.svg',
    name: 'THILINI',

  },
  {
    id: 'subodani',
    image: '/images/team.svg',
    name: 'SUBODANI',
  },
  {
    id: 'amalsha',
    image: '/images/team.svg',
    name: 'AMALSHA',

  }
];

export default function SrilankaPage() {
  const { t } = useTranslation()

  return (
    <div>
      <CountryIntroductionSection
        videoSrc="/images/srilanka/background.webm"
        title={t('country.sri lanka')}
        description={t('countryPage.mainTitle')}
        buttonText={t('button.applyNow')}
      />
      <div
        className="bg-cover bg-center bg-no-repeat"
        style={{ background: getGradient('srilanka') }}
      >
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-no-repeat bg-left -top-30 left-0 w-full h-220 " style={{ backgroundImage: "url('/images/srilanka/garland_u.svg')" }} />
          <LatestSocials
            socials={SRILANKA_SOCIALS} />
          <TeamSection
            teams={SRILANKA_TEAMS}
            title='Sri lanka'
          />
          <TeamVideoSection
            title={t('countryPage.introductionTitlelk')}
            videoUrl="https://www.youtube.com/embed/FJhRx5fyf64"
            leftImageSrc="/images/srilanka/flower.svg"
            leftImageAlt="Left flower"
            leftImageWidth={700}
            leftImageHeight={700}
            leftImageStyle={{ left: '-450px', marginTop: '80px', zIndex: 1 }}
            rightImageSrc="/images/srilanka/flower.svg"
            rightImageAlt="Right flower"
            rightImageWidth={700}
            rightImageHeight={700}
            rightImageStyle={{ right: '-500px', marginTop: '90px', zIndex: 1 }}
          />
          <LoanTypesSection />
          <ProcessStep />
          <div className="absolute bg-no-repeat bg-right -bottom-10 right-0 w-full h-220" style={{ backgroundImage: "url('/images/srilanka/garland_d.svg')" }} />
        </section>
      </div>
      <LoanDetailSection backgroundImage="/images/srilanka/loan_detail_bg.webp" country="srilanka" />
      <div style={{ background: getGradient('srilanka', true) }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <GarlandDecoration country="srilanka" />
          <EMICalculatorSection />
          <div className="mb-20 mt-10">
            <LoanApplicationForm />
          </div>
        </section>
      </div>
    </div>
  );
}
