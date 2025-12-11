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

const MONGOLIA_SOCIALS: SocialsItem[] = [
  {
    id: 'facebook',
    image: '/images/mongolia/social1.jpg',
    snsLogo: '/images/icons/facebook.svg',
    title: 'GME Finance Mongolia',
    likes: '2.5K',
    followers: '3.1K',
    tags: ['Event', 'News', 'Updates'],
    href: '/news/mongolia/facebook',
  },
  {
    id: 'tiktok',
    image: '/images/mongolia/social2.jpg',
    snsLogo: '/images/icons/tictok.svg',
    title: 'GME Finance Mongolia',
    likes: '1.8K',
    followers: '2.4K',
    tags: ['Videos', 'Tips', 'Community'],
    href: '/news/mongolia/tiktok',
  },
  {
    id: 'instagram',
    image: '/images/mongolia/social3.jpg',
    snsLogo: '/images/icons/instagram.svg',
    title: 'GME Finance Mongolia',
    likes: '2.1K',
    followers: '2.8K',
    tags: ['Photos', 'Stories', 'News'],
    href: '/news/mongolia/instagram',
  },
];

const MONGOLIA_TEAMS: Teams[] = [
  {
    id: 'uuree',
    image: '/images/mongolia/team/uuree.svg',
    name: 'UUREE',
  },
  {
    id: 'eba',
    image: '/images/mongolia/team/eba.svg',
    name: 'EBA',

  },
  {
    id: 'migga',
    image: '/images/mongolia/team/migga.svg',
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
      <CountryIntroductionSection
        videoSrc="/images/mongolia/background.mp4"
        title={t('country.mongolia')}
        description={t('countryPage.mainTitle')}
        buttonText={t('button.applyNow')}
      />
      <div
        className="bg-cover bg-center bg-no-repeat"
        style={{ background: getGradient('mongolia') }}
      >
        <section className="bg-no-repeat relative overflow-hidden">

          <div className="absolute bg-no-repeat -top-190 bg-left -left-30 w-full h-full" style={{ backgroundImage: "url('/images/mongolia/pattern_r.svg')", backgroundSize: '20%' }} />
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
          <div className="absolute bg-no-repeat bg-right top-80 -right-30 w-full h-full" style={{ backgroundImage: "url('/images/mongolia/pattern_r.svg')", backgroundSize: '20%' }} />
          <ProcessStep />
        </section>
      </div>
      <LoanDetailSection backgroundImage="/images/mongolia/loan_detail_bg.webp" country="mongolia" />
      <div style={{ background: getGradient('mongolia') }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <GarlandDecoration country="mongolia" />
          <EMICalculatorSection />
          <div className="mb-20">
            <LoanApplicationForm country="mongolia" />
          </div>
        </section>
      </div>
    </div>
  );
}
