
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

const MYANMAR_SOCIALS: SocialsItem[] = [
  {
    id: 'facebook',
    image: '/images/introduction.jpg',
    snsLogo: '/images/icons/facebook.svg',
    title: 'GME Finance Myanmar',
    likes: '2.5K',
    followers: '3.1K',
    tags: ['Event', 'News', 'Updates'],
    href: '/news/philippines/facebook',
  },
  {
    id: 'tiktok',
    image: '/images/myanmar/social2.jpg',
    snsLogo: '/images/icons/tictok.svg',
    title: 'GME Finance Myanmar',
    likes: '1.8K',
    followers: '2.4K',
    tags: ['Videos', 'Tips', 'Community'],
    href: '/news/myanmar/tiktok',
  },
  {
    id: 'instagram',
    image: '/images/myanmar/social3.jpg',
    snsLogo: '/images/icons/instagram.svg',
    title: 'GME Finance Myanmar',
    likes: '2.1K',
    followers: '2.8K',
    tags: ['Photos', 'Stories', 'News'],
    href: '/news/myanmar/instagram',
  },
];

const MYANMAR_TEAMS: Teams[] = [
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

export default function MyanmarPage() {
  const colors = getColorScheme('myanmar')

  return (
    <div>
     <CountryIntroductionSection
      imageSrc="/images/myanmar/background.webp"
      title="Myanmar Team"
      buttonBgColor={colors.primary}
      buttonHoverBgColor={colors.hover}
      buttonTextColor={colors.gradient1}
    />
    <div
      className="bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: "url('/images/myanmar/section_bg.svg')" }}
    >
    <section className="bg-no-repeat bg-cover bg-center relative overflow-hidden">
      <div className="absolute bg-no-repeat bg-cover bg-center top-0 w-full h-330" style={{ backgroundImage: "url('/images/myanmar/wave_t.svg')" }} />
      <LatestSocials 
        socials={MYANMAR_SOCIALS}
        buttonBgColor={colors.primary}
        buttonHoverBgColor={colors.hover}
        />
      <TeamSection
        teams={MYANMAR_TEAMS}
        title='Myanmar'
        nameBgColor={colors.primary}
      />
    </section>
    <div style={{ background:getGradient('myanmar') }}>
      <TeamVideoSection
        title="Meet Our Myanmar Team"
        subtitleColor={colors.primary}
        videoUrl="https://www.youtube.com/embed/8GcPTQb2iog"
        leftImageSrc="/images/myanmar/castle_l.svg"
        leftImageAlt="Left castle"
        leftImageWidth={380}
        leftImageHeight={380}
        leftImageStyle={{ left: '-320px', marginTop:'80px', zIndex: 1 }}
        rightImageSrc="/images/myanmar/castle_r.svg"
        rightImageAlt="Right castle"
        rightImageWidth={380}
        rightImageHeight={380}
        rightImageStyle={{ right: '-320px', marginTop:'146px', zIndex: 1 }}
      />
      <LoanTypesSection/>
      <div className="bg-no-repeat bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: "url('/images/myanmar/wave_b.svg')" }} />
      <ProcessStep subtitleColor={colors.primary}/>
    </div>
    </div>
    <LoanDetailSection backgroundImage="/images/myanmar/loan_detail_bg.webp" />
      <section className="bg-cover relative overflow-hidden" style={{ background:getGradient('myanmar')  }}>
        <EMICalculatorSection buttonBgColor={colors.primary} buttonHoverBgColor={colors.hover}/>
        <GarlandDecoration country="myanmar" />
        <div className="mb-20 mt-10">
        <LoanApplicationForm buttonBgColor={colors.primary} subtitleColor={colors.primary}/>
        </div>
      </section>
    </div>
  );
}
