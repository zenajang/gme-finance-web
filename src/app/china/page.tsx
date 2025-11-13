
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

const CHINA_SOCIALS: SocialsItem[] = [
  {
    id: 'facebook',
    image: '/images/china/social1.jpg',
    snsLogo: '/images/icons/facebook.svg',
    title: 'GME Finance China',
    likes: '2.5K',
    followers: '3.1K',
    tags: ['Event', 'News', 'Updates'],
    href: '/news/china/facebook',
  },
  {
    id: 'tiktok',
    image: '/images/china/social2.jpg',
    snsLogo: '/images/icons/tictok.svg',
    title: 'GME Finance China',
    likes: '1.8K',
    followers: '2.4K',
    tags: ['Videos', 'Tips', 'Community'],
    href: '/news/china/tiktok',
  },
  {
    id: 'instagram',
    image: '/images/china/social3.jpg',
    snsLogo: '/images/icons/instagram.svg',
    title: 'GME Finance China',
    likes: '2.1K',
    followers: '2.8K',
    tags: ['Photos', 'Stories', 'News'],
    href: '/news/china/instagram',
  },
];

const CHINA_TEAMS: Teams[] = [
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

export default function ChinaPage() {
  return (
    <div>
     <CountryIntroductionSection
      imageSrc="/images/china/background.webp"
      title="China Team"
    />
    <div
      className="bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ background: getGradient('china')}}
    >
    <section className="bg-no-repeat relative overflow-hidden">
        <div className="absolute bg-no-repeat bg-bottom bottom-45 right-0 w-full h-full" style={{ backgroundImage: "url('/images/china/cloud.svg')",backgroundSize: '120% auto', transform: 'rotate(180deg)' }} />
      <LatestSocials 
        socials={CHINA_SOCIALS}/>
      <TeamSection
        teams={CHINA_TEAMS}
        title='China'
      />
    </section>
      <TeamVideoSection
        title="Meet Our China Team"
        videoUrl="https://www.youtube.com/embed/qfbna4s-ZPs"
        centerImageSrc="/images/china/pattern.svg"
        centerImageAlt="Center pattern"
        centerImageWidth={2800}
        centerImageHeight={2000}
        centerImageStyle={{ opacity: 0.8, zIndex: 5, marginTop: '200px' }}
      />
        <LoanTypesSection/>
      <section className="bg-no-repeat relative overflow-hidden">
        <div className="absolute bg-no-repeat bg-bottom -bottom-30 right-0 w-full h-full" style={{ backgroundImage: "url('/images/china/cloud.svg')",backgroundSize: '120% auto' }} />
        <ProcessStep/>
      </section>
    </div>
    <LoanDetailSection backgroundImage="/images/nepal/loan_detail_bg.webp"/>
      <div style={{ background: getGradient('china') }}>
        <section className="bg-no-repeat relative overflow-hidden">
         <GarlandDecoration country="china" />
         <EMICalculatorSection/>
         <div className="mb-20">
         <LoanApplicationForm/>
         </div>
        </section>
      </div>
    </div>
  );
}
