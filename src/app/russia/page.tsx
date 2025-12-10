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

const RUSSIA_SOCIALS: SocialsItem[] = [
  {
    id: 'facebook',
    image: '/images/russia/social1.jpg',
    snsLogo: '/images/icons/facebook.svg',
    title: 'GME Finance Russia',
    likes: '2.5K',
    followers: '3.1K',
    tags: ['Event', 'News', 'Updates'],
    href: '/news/russia/facebook',
  },
  {
    id: 'tiktok',
    image: '/images/russia/social2.jpg',
    snsLogo: '/images/icons/tictok.svg',
    title: 'GME Finance Russia',
    likes: '1.8K',
    followers: '2.4K',
    tags: ['Videos', 'Tips', 'Community'],
    href: '/news/russia/tiktok',
  },
  {
    id: 'instagram',
    image: '/images/russia/social3.jpg',
    snsLogo: '/images/icons/instagram.svg',
    title: 'GME Finance Russia',
    likes: '2.1K',
    followers: '2.8K',
    tags: ['Photos', 'Stories', 'News'],
    href: '/news/russia/instagram',
  },
];

const RUSSIA_TEAMS: Teams[] = [
  {
    id: 'hamid',
    image: '/images/uzbekistan/team/hamid.svg',
    name: 'HAMID',
  },
  {
    id: 'zed',
    image: '/images/uzbekistan/team/zed.svg',
    name: 'ZED',

  },
  {
    id: 'mark',
    image: '/images/uzbekistan/team/mark.svg',
    name: 'MARK',
  },
  {
    id: 'mikhail',
    image: '/images/uzbekistan/team/mikhail.svg',
    name: 'MIKHAIL',
  },
  {
    id: 'ruby',
    image: '/images/uzbekistan/team/ruby.svg',
    name: 'RUBY',

  },
  {
    id: 'ziyoda',
    image: '/images/uzbekistan/team/ziyoda.svg',
    name: 'ZIYODA',
  },
  {
    id: 'zoda',
    image: '/images/uzbekistan/team/zoda.svg',
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
      <CountryIntroductionSection
        videoSrc="/images/russia/background.mp4"
        title={t('country.russia')}
        description={t('countryPage.mainTitle')}
        buttonText={t('button.applyNow')}
        buttonTextColor={colors.primary}
        buttonHoverBgColor={colors.hover}
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
          leftImageStyle={{ left: '-320px', marginTop: '60px', zIndex: 1 }}
          rightImageSrc="/images/russia/castle_r.svg"
          rightImageAlt="Right castle"
          rightImageWidth={350}
          rightImageHeight={350}
          rightImageStyle={{ right: '-290px', marginTop: '10px', zIndex: 1 }}
        />
        <LoanTypesSection />
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-no-repeat bg-bottom bottom-0 w-full h-135" style={{ backgroundImage: "url('/images/russia/snow_bg.svg')" }} />
          <ProcessStep subtitleColor="#3A57B4" />
        </section>
      </div>
      <LoanDetailSection backgroundImage="/images/russia/loan_detail_bg.webp" />
      <div style={{ background: getGradient('russia', true) }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <GarlandDecoration country="russia" variant="compact" />
          <EMICalculatorSection buttonBgColor={colors.primary} buttonHoverBgColor={colors.hover} />
          <div className="mb-69">
            <LoanApplicationForm buttonBgColor={colors.primary} buttonHoverBgColor={colors.hover} />
          </div>
        </section>
      </div>
    </div>
  );
}
