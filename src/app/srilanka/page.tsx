'use client'

import { getColorScheme, getGradient } from "@/constants/colors";
import IntroductionSection from "@/features/home/components/IntroductionSection";
import LoanTypesSection from "@/features/home/components/LoanTypesSection";
import EMICalculatorSection from "@/features/home/sections/EMICalculatorSection";
import LatestSocials, { SocialsItem } from "@/features/home/sections/LatestSocials";
import LoanApplicationForm from "@/features/home/sections/LoanApplicationForm";
import LoanDetailSection from "@/features/home/sections/LoanDetailSection";
import ProcessStep from "@/features/home/sections/ProcessStep";
import TeamSection, { Teams } from "@/features/home/sections/TeamSection";
import GarlandDecoration from "@/features/home/sections/GarlandDecoration";
import TeamVideoSection from "@/features/home/sections/TeamVideoSection";
import { useTranslation } from "react-i18next";

const SRILANKA_SOCIALS: SocialsItem[] = [
  {
    id: "fb-sr",
    platform: "facebook",
    embedUrl: "https://www.facebook.com/gmefinancesrilanka?locale=ko_KR",
    href: "https://www.facebook.com/gmefinancesrilanka?locale=ko_KR",
    image: "/images/dummy.jpg",
    snsLogo: "/images/icons/facebook.svg",
    title: "GME Sri Lanka Finance (Facebook)",
  },
  {
    id: "tt-sr",
    platform: "tiktok",
    embedUrl: "https://www.tiktok.com/@gme_finance_srilanka",
    href: "https://www.tiktok.com/@gme_finance_srilanka",
    image: "/images/dummy.jpg",
    snsLogo: "/images/icons/tictok.svg",
    title: "GME Sri Lanka Finance (TikTok)",
  },
];

const SRILANKA_TEAMS: Teams[] = [
  {
    id: 'malsha',
    image: '/images/srilanka/team/malsha.jpg',
    name: 'MALSHA',
  },
  {
    id: 'nova',
    image: '/images/srilanka/team/nova.jpg',
    name: 'NOVA',

  },
  {
    id: 'udra',
    image: '/images/srilanka/team/udra.jpg',
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
  const colors = getColorScheme('srilanka')

  return (
    <div>
      <IntroductionSection
        videoSrc="/images/srilanka/background.mp4"
        title={t('country.sri lanka')}
        description={t('countryPage.mainTitle')}
        buttonText={t('button.applyNow')}
        buttonHref="#apply-loan-online"
      />
      <div
        className="bg-cover bg-center bg-no-repeat"
        style={{ background: getGradient('srilanka') }}
      >
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-no-repeat bg-left -top-30 left-0 w-full h-100 md:h-220" style={{ backgroundImage: "url('/images/srilanka/garland_u.svg')", backgroundSize: 'contain' }} />
          <LatestSocials
            socials={SRILANKA_SOCIALS} />
          <TeamSection
            teams={SRILANKA_TEAMS}
            title='Sri lanka'
          />
          <TeamVideoSection
            title={t('countryPage.introductionTitlelk')}
            subtitleColor={colors.primary}
            videoUrl="https://www.youtube.com/embed/FJhRx5fyf64"
            leftImageSrc="/images/srilanka/flower.svg"
            leftImageAlt="Left flower"
            leftImageWidth={800}
            leftImageHeight={800}
            leftImageStyle={{ width: '40vw', marginTop:'120px',zIndex: 1 }}
            leftImageOffsetX={200}
            rightImageSrc="/images/srilanka/flower.svg"
            rightImageAlt="Right flower"
            rightImageWidth={700}
            rightImageHeight={700}
            rightImageStyle={{ width: '40vw', marginTop:'120px',zIndex: 1 }}
            rightImageOffsetX={-200}
          />
          <LoanTypesSection />
          <ProcessStep />
          <div className="absolute bg-no-repeat bg-right -bottom-10 right-0 w-full h-80 md:h-220" style={{ backgroundImage: "url('/images/srilanka/garland_d.svg')", backgroundSize: 'contain' }} />
        </section>
      </div>
      <LoanDetailSection backgroundImage="/images/srilanka/loan_detail_bg.webp" country="srilanka" />
      <div style={{ background: getGradient('srilanka', true) }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <GarlandDecoration country="srilanka" />
          <EMICalculatorSection />
          <LoanApplicationForm  anchorId="apply-loan-online" />
        </section>
      </div>
    </div>
  );
}
