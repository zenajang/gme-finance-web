'use client'

import { getColorScheme } from "@/constants/colors";
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

const UZBEKISTAN_SOCIALS: SocialsItem[] = [
  {
    id: 'facebook',
    image: '/images/uzbekistan/social1.jpg',
    snsLogo: '/images/icons/facebook.svg',
    title: 'GME Finance Uzbekistan',
    likes: '2.5K',
    followers: '3.1K',
    tags: ['Event', 'News', 'Updates'],
    href: '/news/uzbekistan/facebook',
  },
  {
    id: 'tiktok',
    image: '/images/uzbekistan/social2.jpg',
    snsLogo: '/images/icons/tictok.svg',
    title: 'GME Finance Uzbekistan',
    likes: '1.8K',
    followers: '2.4K',
    tags: ['Videos', 'Tips', 'Community'],
    href: '/news/uzbekistan/tiktok',
  },
  {
    id: 'instagram',
    image: '/images/uzbekistan/social3.jpg',
    snsLogo: '/images/icons/instagram.svg',
    title: 'GME Finance Uzbekistan',
    likes: '2.1K',
    followers: '2.8K',
    tags: ['Photos', 'Stories', 'News'],
    href: '/news/uzbekistan/instagram',
  },
];

const UZBEKISTAN_TEAMS: Teams[] = [
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

export default function UzbekistanPage() {
  const colors = getColorScheme('uzbekistan')
  const { t } = useTranslation()

  return (
    <div>
      <CountryIntroductionSection
        videoSrc="/images/uzbekistan/background.mp4"
        title={t('country.uzbekistan')}
        description={t('countryPage.mainTitle')}
        buttonText={t('button.applyNow')}
        buttonTextColor={colors.primary}
        buttonHoverBgColor={colors.introHover}
      />
      <div
        className="bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ background: colors.gradient1 }}
      >
        <section className="bg-no-repeat relative overflow-hidden">
          <LatestSocials
            socials={UZBEKISTAN_SOCIALS}
            buttonBgColor={colors.primary}
            buttonHoverBgColor={colors.hover}
          />
          <div className="absolute bg-no-repeat -top-170 bg-left -left-30 w-full h-full" style={{ backgroundImage: "url('/images/uzbekistan/flower_lg.svg')" }} />
          <TeamSection
            teams={UZBEKISTAN_TEAMS}
            title='Uzbekistan'
            nameBgColor={colors.primary}
          />
        </section>
        <TeamVideoSection
          title="Meet Our Uzbekistan Team"
          titleColor={colors.title}
          subtitleColor="#0094AE"
          videoUrl="https://www.youtube.com/embed/7P2VEM70KgA"
          centerImageSrc="/images/uzbekistan/pattern.svg"
          centerImageAlt="Center pattern"
          centerImageWidth={3000}
          centerImageHeight={3000}
          centerImageStyle={{ opacity: 0.8, zIndex: 5, marginTop: '200px' }}
        />
        <LoanTypesSection />
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-no-repeat bg-right -bottom-80 -right-50 w-full h-full" style={{ backgroundImage: "url('/images/uzbekistan/flower_lg.svg')" }} />
          <ProcessStep subtitleColor={colors.primary} />
        </section>
      </div>

      <LoanDetailSection backgroundImage="/images/uzbekistan/loan_detail_bg.webp" country="uzbekistan" />
      <div style={{ background: colors.gradient1 }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <GarlandDecoration country="uzbekistan" variant="compact" />
          <EMICalculatorSection buttonBgColor={colors.primary} buttonHoverBgColor={colors.hover} />
          <div className="mb-69">
            <LoanApplicationForm subtitleColor={colors.primary} buttonBgColor={colors.primary} />
          </div>
        </section>
      </div>
    </div>
  );
}
