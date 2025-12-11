'use client';

import { useTranslation } from 'react-i18next';
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

const BANGLADESH_SOCIALS: SocialsItem[] = [
  {
    id: 'facebook',
    image: '/images/bangladesh/social1.jpg',
    snsLogo: '/images/icons/facebook.svg',
    title: 'GME Finance Bangladesh',
    likes: '2.5K',
    followers: '3.1K',
    tags: ['Event', 'News', 'Updates'],
    href: '/news/bangladesh/facebook',
  },
  {
    id: 'tiktok',
    image: '/images/bangladesh/social2.jpg',
    snsLogo: '/images/icons/tictok.svg',
    title: 'GME Finance Bangladesh',
    likes: '1.8K',
    followers: '2.4K',
    tags: ['Videos', 'Tips', 'Community'],
    href: '/news/bangladesh/tiktok',
  },
  {
    id: 'instagram',
    image: '/images/bangladesh/social3.jpg',
    snsLogo: '/images/icons/instagram.svg',
    title: 'GME Finance Bangladesh',
    likes: '2.1K',
    followers: '2.8K',
    tags: ['Photos', 'Stories', 'News'],
    href: '/news/bangladesh/instagram',
  },
];

const BANGLADESH_TEAMS: Teams[] = [
  {
    id: 'taizul',
    image: '/images/bangladesh/team/taizul.svg',
    name: 'TAIZUL',
  },
  {
    id: 'parag',
    image: '/images/bangladesh/team/parag.svg',
    name: 'PARAG',
  },
  {
    id: 'ripon',
    image: '/images/bangladesh/team/ripon.svg',
    name: 'RIPON',
  },
  {
    id: 'saiful',
    image: '/images/bangladesh/team/saiful.svg',
    name: 'SAIFUL',
  },
  {
    id: 'smita',
    image: '/images/team.svg',
    name: 'SMITA',
  },
  {
    id: 'ritu',
    image: '/images/team.svg',
    name: 'RITU',
  },
  {
    id: 'rokan',
    image: '/images/team.svg',
    name: 'ROKAN',
  },
];

export default function BangladeshPage() {
  const { t } = useTranslation();
  const colors = getColorScheme('bangladesh');

  return (
    <div>
      <CountryIntroductionSection
        videoSrc="/images/bangladesh/background.mp4"
        title={t('country.bangladesh')}
        description={t('countryPage.mainTitle')}
        buttonText={t('button.applyNow')}
        buttonHoverBgColor={colors.introHover}
        buttonTextColor={colors.primary}
      />
      <div
        className="bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ background: getGradient('bangladesh') }}
      >
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-no-repeat bg-left top-0 -left-14 w-full h-65" style={{ backgroundImage: "url('/images/bangladesh/fireflake.svg')" }} />
          <LatestSocials
            socials={BANGLADESH_SOCIALS}
            buttonBgColor={colors.primary}
            buttonHoverBgColor={colors.hover}
          />
          <div className="absolute bg-no-repeat top-210 bg-right -right-10 w-full h-65" style={{ backgroundImage: "url('/images/bangladesh/fireflake.svg')" }} />
          <TeamSection
            teams={BANGLADESH_TEAMS}
            title='Bangladesh'
            nameBgColor={colors.primary}
          />
        </section>
        <TeamVideoSection
          title={t('countryPage.introductionTitlebd')}
          subtitleColor="green"
          videoUrl="https://www.youtube.com/embed/5qTiEUKbjLY"
          leftImageSrc="/images/bangladesh/castle_l.svg"
          leftImageAlt="Left castle"
          leftImageWidth={500}
          leftImageHeight={500}
          leftImageStyle={{ left: '-350px', marginTop: '140px', zIndex: 1 }}
          rightImageSrc="/images/bangladesh/castle_r.svg"
          rightImageAlt="Right castle"
          rightImageWidth={500}
          rightImageHeight={500}
          rightImageStyle={{ right: '-390px', marginTop: '180px', zIndex: 1 }}
        />
        <LoanTypesSection />
        <ProcessStep />
      </div>
      <LoanDetailSection backgroundImage="/images/bangladesh/loan_detail_bg.webp" country="bangladesh" />
      <div style={{ background: getGradient('bangladesh') }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <GarlandDecoration country="bangladesh" />
          <EMICalculatorSection buttonBgColor={colors.primary} buttonHoverBgColor={colors.hover} />
          <LoanApplicationForm country='bangladesh' buttonBgColor={colors.primary} buttonHoverBgColor={colors.hover} subtitleColor={colors.primary} />
        </section>
      </div>
    </div>
  );
}
