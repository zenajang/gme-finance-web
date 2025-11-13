
import Image from "next/image";
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
    id: 'Name1',
    image: '/images/introduction.jpg',
    name: 'Name1',
  },
  {
    id: 'Name2',
    image: '/images/introduction.jpg',
    name: 'Name2',
  },
  {
    id: 'Name3',
    image: '/images/introduction.jpg',
    name: 'Name3',
  },
  {
    id: 'Name4',
    image: '/images/introduction.jpg',
    name: 'Name1',
  },
  {
    id: 'Name5',
    image: '/images/introduction.jpg',
    name: 'Name2',

  },
  {
    id: 'Name6',
    image: '/images/introduction.jpg',
    name: 'Name3',
  }, 
];

export default function BangladeshPage() {
  const colors = getColorScheme('bangladesh');

  return (
    <div>
     <CountryIntroductionSection
      imageSrc="/images/bangladesh/background.webp"
      title="Bangladesh Team"
      buttonHoverBgColor={colors.introHover}
      buttonTextColor={colors.primary}
    />
    <div
      className="bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ background: getGradient('bangladesh')}}
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
      title="Meet Our Bangladesh Team"
      subtitleColor="green"
      videoUrl="https://www.youtube.com/embed/FZ3Ck4bnLXY"
      leftImageSrc="/images/bangladesh/castle_l.svg"
      leftImageAlt="Left castle"
      leftImageWidth={500}
      leftImageHeight={500}
      leftImageStyle={{ left: '-350px', marginTop:'140px', zIndex: 1 }}
      rightImageSrc="/images/bangladesh/castle_r.svg"
      rightImageAlt="Right castle"
      rightImageWidth={500}
      rightImageHeight={500}
      rightImageStyle={{ right: '-390px', marginTop:'180px', zIndex: 1 }}
    />
    <LoanTypesSection/>
    <ProcessStep/>
    </div>
    <LoanDetailSection backgroundImage="/images/bangladesh/loan_detail_bg.webp"/>
      <div style={{ background: getGradient('bangladesh') }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <GarlandDecoration country="bangladesh" />
          <EMICalculatorSection/>
          <LoanApplicationForm/>
        </section>
      </div>
    </div>
  );
}
