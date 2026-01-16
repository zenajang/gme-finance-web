'use client'

import { getColorScheme } from "@/constants/colors";
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

const UZBEKISTAN_SOCIALS: SocialsItem[] = [
  {
    id: "fb-uz",
    platform: "facebook",
    embedUrl: "https://www.facebook.com/gmefinancecis?locale=ko_KR",
    href: "https://www.facebook.com/gmefinancecis?locale=ko_KR",
    image: "/images/dummy.jpg",
    snsLogo: "/images/icons/facebook.svg",
    title: "GME Uzbekistan Finance (Facebook)",
  },
  {
    id: "tt-uz",
    platform: "tiktok",
    embedUrl: "https://www.tiktok.com/@gme_finance_cis",
    href: "https://www.tiktok.com/@gme_finance_cis",
    image: "/images/dummy.jpg",
    snsLogo: "/images/icons/tictok.svg",
    title: "GME Uzbekistan Finance (TikTok)",
  },
  {
    id: "is-uz",
    platform: "instagram_post",
    embedUrl: "https://www.instagram.com/p/DSHJ7ocEiq_/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    href: "https://www.instagram.com/gmefinancecis/",
    image: "/images/dummy.jpg",
    snsLogo: "/images/icons/instagram.svg",
    title: "GME Uzbekistan Finance (Instagram post)",
  },
];

const UZBEKISTAN_TEAMS: Teams[] = [
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

export default function UzbekistanPage() {
  const colors = getColorScheme('uzbekistan')
  const { t } = useTranslation()

  return (
    <div>
      <IntroductionSection
        videoSrc="/images/uzbekistan/background.mp4"
        title={t('country.uzbekistan')}
        description={t('countryPage.mainTitle')}
        buttonText={t('button.applyNow')}
        buttonTextColor={colors.primary}
        buttonHoverBgColor={colors.introHover}
        buttonHref="#apply-loan-online"
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
          {/* 모바일용 flower - 작은 크기 */}
          <div className="absolute bg-no-repeat bg-left block md:hidden -top-20 -left-10 w-[50vw] h-[50vw]" style={{ backgroundImage: "url('/images/uzbekistan/flower_lg.svg')", backgroundSize: 'contain' }} />
          {/* 데스크톱용 flower */}
          <div className="absolute bg-no-repeat bg-left hidden md:block -top-170 -left-30 w-full h-full" style={{ backgroundImage: "url('/images/uzbekistan/flower_lg.svg')" }} />
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
          centerImageStyle={{ opacity: 0.8, zIndex: 5, maxHeight: '30vh' }}
        />
        <LoanTypesSection />
        <section className="bg-no-repeat relative overflow-hidden">
          {/* 모바일용 flower - 작은 크기 */}
          <div className="absolute bg-no-repeat bg-right block md:hidden -bottom-10 -right-10 w-[50vw] h-[50vw]" style={{ backgroundImage: "url('/images/uzbekistan/flower_lg.svg')", backgroundSize: 'contain' }} />
          {/* 데스크톱용 flower */}
          <div className="absolute bg-no-repeat bg-right hidden md:block -bottom-80 -right-50 w-full h-full" style={{ backgroundImage: "url('/images/uzbekistan/flower_lg.svg')" }} />
          <ProcessStep subtitleColor={colors.primary} />
        </section>
      </div>

      <LoanDetailSection backgroundImage="/images/uzbekistan/loan_detail_bg.webp" country="uzbekistan" />
      <section className="bg-no-repeat relative overflow-hidden">
        <GarlandDecoration country="uzbekistan" />
        <div className="relative z-10" style={{ background: colors.gradient1 }}>
          <EMICalculatorSection buttonBgColor={colors.primary} buttonHoverBgColor={colors.hover} />
        </div>
        <div style={{ background: colors.gradient1 }}>
          <LoanApplicationForm subtitleColor={colors.primary} buttonBgColor={colors.primary}  anchorId="apply-loan-online" />
        </div>
      </section>
    </div>
  );
}
