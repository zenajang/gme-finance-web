
import IntroductionSection from "../components/home/IntroductionSection";
import LoanTypesSection from "../components/home/LoanTypesSection";
import EMICalculatorSection from "../components/sections/EMICalculatorSection";
import GarlandDecoration from "../components/sections/GarlandDecoration";
import LatestSocials, { SocialsItem } from "../components/sections/LatestSocials";
import LoanApplicationForm from "../components/sections/LoanApplicationForm";
import LoanDetailSection from "../components/sections/LoanDetailSection";
import ProcessStep from "../components/sections/ProcessStep";
import TeamSection, { Teams } from "../components/sections/TeamSection";
import { getColorScheme, getGradient } from "@/constants/colors";
import TeamVideoSection from "../components/sections/TeamVideoSection";

const PHILIPPINES_SOCIALS: SocialsItem[] = [
  {
    id: "fb-ph",
    platform: "facebook",
    embedUrl: "https://www.facebook.com/gmefinanceph?locale=ko_KR",
    href: "https://www.facebook.com/gmefinanceph?locale=ko_KR",
    image: "/images/dummy.jpg",
    snsLogo: "/images/icons/facebook.svg",
    title: "GME Philippines Finance (Facebook)",
  },
  {
    id: "tt-ph",
    platform: "tiktok",
    embedUrl: "https://www.tiktok.com/@gmefinancephilippines",
    href: "https://www.tiktok.com/@gmefinancephilippines",
    image: "/images/dummy.jpg",
    snsLogo: "/images/icons/tictok.svg",
    title: "GME Philippines Finance (TikTok)",
  },
  {
    id: "is-ph",
    platform: "instagram_post",
    embedUrl: "https://www.instagram.com/p/DSYn5btj202/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    href: "https://www.instagram.com/gmefinance.philippines/",
    image: "/images/dummy.jpg",
    snsLogo: "/images/icons/instagram.svg",
    title: "GME Philippines Finance (Instagram post)",
  },
];

const PHILIPPINES_TEAMS: Teams[] = [
  {
    id: 'glen',
    image: '/images/philippines/team/glen.jpg',
    name: 'GLEN',
  },
  {
    id: 'eunice',
    image: '/images/philippines/team/eunice.jpg',
    name: 'EUNICE',

  },
  {
    id: 'cherry',
    image: '/images/philippines/team/cherry.jpg',
    name: 'CHERRY',
  },
  {
    id: 'jo',
    image: '/images/team.svg',
    name: 'JO',
  },
  {
    id: 'josh',
    image: '/images/team.svg',
    name: 'JOSH',

  },
  {
    id: 'kais',
    image: '/images/team.svg',
    name: 'KAIS',
  },
];

export default function PhilippinesPage() {
  const colors = getColorScheme('philippines')
  return (
    <div>
      <IntroductionSection
        videoSrc="/images/philippines/background.webm"
        title="Philippines"
      />
      <div
        className="bg-cover bg-center bg-no-repeat"
        style={{ background: getGradient('philippines') }}
      >
        <section className="bg-no-repeat relative overflow-hidden">
          <LatestSocials
            socials={PHILIPPINES_SOCIALS} />
          <TeamSection
            teams={PHILIPPINES_TEAMS}
            title='Philippines'
          />
        </section>
        <TeamVideoSection
          title="Meet Our Philippines Team"
          subtitleColor={colors.primary}
          videoUrl="https://www.youtube.com/embed/xWK8F88Akeo"
          leftImageSrc="/images/philippines/castle_l.svg"
          leftImageAlt="Left castle"
          leftImageWidth={600}
          leftImageHeight={600}
          leftImageStyle={{ left: '-550px', marginTop: '105px', zIndex: 1 }}
          rightImageSrc="/images/philippines/castle_r.svg"
          rightImageAlt="Right castle"
          rightImageWidth={370}
          rightImageHeight={370}
          rightImageStyle={{ right: '-315px', marginTop: '-10px', zIndex: 1 }}
        />
        <LoanTypesSection />
        <section className="bg-no-repeat relative overflow-hidden">
          <ProcessStep />
        </section>
      </div>
      <LoanDetailSection backgroundImage="/images/philippines/loan_detail_bg.webp" country="philippines" />
      <div style={{ background: getGradient('philippines', true) }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <GarlandDecoration country="philippines" />
          <EMICalculatorSection />
          <div className="mb-20">
            <LoanApplicationForm country="philippines" />
          </div>
        </section>
      </div>
    </div>
  );
}
