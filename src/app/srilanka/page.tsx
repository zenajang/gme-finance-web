
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

export default function SrilankaPage() {

  return (
    <div>
     <CountryIntroductionSection
      imageSrc="/images/srilanka/background.webp"
      title="Sri lanka Team"
    />
    <div
      className="bg-cover bg-center bg-no-repeat"
      style={{ background:getGradient('srilanka')}}
    >
    <section className="bg-no-repeat relative overflow-hidden">
      <div className="absolute bg-no-repeat bg-left -top-30 left-0 w-full h-220 " style={{ backgroundImage: "url('/images/srilanka/garland_u.svg')" }} />
      <LatestSocials 
        socials={SRILANKA_SOCIALS}/>
      <TeamSection
        teams={SRILANKA_TEAMS}
        title='Sri lanka'
      />
      <TeamVideoSection
        title="Meet Our Sri lanka Team"
        videoUrl="https://www.youtube.com/embed/Lee7FwKwQLQ"
        leftImageSrc="/images/srilanka/flower.svg"
        leftImageAlt="Left flower"
        leftImageWidth={700}
        leftImageHeight={700}
        leftImageStyle={{ left: '-450px', marginTop:'80px', zIndex: 1 }}
        rightImageSrc="/images/srilanka/flower.svg"
        rightImageAlt="Right flower"
        rightImageWidth={700}
        rightImageHeight={700}
        rightImageStyle={{ right: '-500px', marginTop:'90px', zIndex: 1 }}
      />
        <LoanTypesSection/>
        <ProcessStep/>
        <div className="absolute bg-no-repeat bg-right -bottom-10 right-0 w-full h-220" style={{ backgroundImage: "url('/images/srilanka/garland_d.svg')" }} />
      </section>
    </div>
    <LoanDetailSection backgroundImage="/images/srilanka/loan_detail_bg.webp"/>
      <div style={{background: getGradient('srilanka', true) }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <GarlandDecoration country="srilanka" />
          <EMICalculatorSection/>
          <div className="mb-20 mt-10">
          <LoanApplicationForm/>
          </div>
        </section>
      </div>
    </div>
  );
}
