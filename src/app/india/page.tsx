
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

const INDIA_SOCIALS: SocialsItem[] = [
  {
    id: 'facebook',
    image: '/images/india/social1.jpg',
    snsLogo: '/images/icons/facebook.svg',
    title: 'GME Finance India',
    likes: '2.5K',
    followers: '3.1K',
    tags: ['Event', 'News', 'Updates'],
    href: '/news/india/facebook',
  },
  {
    id: 'tiktok',
    image: '/images/india/social2.jpg',
    snsLogo: '/images/icons/tictok.svg',
    title: 'GME Finance India',
    likes: '1.8K',
    followers: '2.4K',
    tags: ['Videos', 'Tips', 'Community'],
    href: '/news/india/tiktok',
  },
  {
    id: 'instagram',
    image: '/images/india/social3.jpg',
    snsLogo: '/images/icons/instagram.svg',
    title: 'GME Finance India',
    likes: '2.1K',
    followers: '2.8K',
    tags: ['Photos', 'Stories', 'News'],
    href: '/news/india/instagram',
  },
];

const INDIA_TEAMS: Teams[] = [
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

export default function IndiaPage() {

  return (
    <div>
     <CountryIntroductionSection
      imageSrc="/images/india/background.webp"
      title="India Team"
    />
    <div
      className="bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ background: getGradient('india')}}
    >
    <section className="bg-no-repeat relative overflow-hidden">
      <div className="absolute bg-no-repeat bg-top -top-20 right-200 w-full h-full" style={{ backgroundImage: "url('/images/india/pattern_o_r.svg')" }} />
      <LatestSocials 
        socials={INDIA_SOCIALS}/>
      <TeamSection
        teams={INDIA_TEAMS}
        title='India'
      />
    </section>
     <TeamVideoSection
      title="Meet Our India Team"
      subtitleColor="#F94B00"
      videoUrl="https://www.youtube.com/embed/mX9zCgpqohU"
    />
    <LoanTypesSection/>
      <section className="bg-no-repeat relative overflow-hidden">
        <div className="absolute bg-no-repeat bg-right -bottom-70 -right-50 w-full h-full" style={{ backgroundImage: "url('/images/india/pattern_g_l.svg')" }} />  
        <ProcessStep/>
      </section>
    </div>
    <LoanDetailSection backgroundImage="/images/india/loan_detail_bg.webp"/>
    <div className="bg-cover bg-center bg-no-repeat" style={{ background: getGradient('india')}}>
      <div className="bg-cover bg-no-repeat" style={{ backgroundImage: "url('/images/india/bg.svg')", backgroundPosition: 'center 50px' }}>
        <section className="bg-no-repeat relative overflow-hidden">
         <GarlandDecoration country="india" />
         <EMICalculatorSection/>
         <div className="mb-20 mt-10">
          <LoanApplicationForm/>
         </div>
        </section>
      </div>
      </div>
    </div>
  );
}
