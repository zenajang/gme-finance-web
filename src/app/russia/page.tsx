
import Image from "next/image";
import CountryIntroductionSection from "../components/home/CountryIntroductionSection";
import LoanTypesSection from "../components/home/LoanTypesSection";
import EMICalculatorSection from "../components/sections/EMICalculatorSection";
import LatestSocials, { SocialsItem } from "../components/sections/LatestSocials";
import LoanApplicationForm from "../components/sections/LoanApplicationForm";
import LoanDetailSection from "../components/sections/LoanDetailSection";
import ProcessStep from "../components/sections/ProcessStep";
import TeamSection, { Teams } from "../components/sections/TeamSection";
import { getGradient } from "@/constants/colors";

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

export default function RussiaPage() {

  return (
    <div>
     <CountryIntroductionSection
      imageSrc="/images/russia/background.webp"
      title="Russia Team"
    />
    <div
      className="bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ background: getGradient('russia')}}
    >
    <section className="bg-no-repeat relative overflow-hidden">
      <div className="absolute bg-repeat bg-top top-0 w-full h-300" style={{ backgroundImage: "url('/images/russia/snow_bg.svg')" }} />
      <LatestSocials 
        socials={RUSSIA_SOCIALS}/>
      <TeamSection
        teams={RUSSIA_TEAMS}
        title='CIS'
      />
    </section>
   <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 mb-20">
        <h2 className="text-5xl font-bold text-center mb-10">Meet Our CIS Team</h2>
        <p
          className="text-xl text-center mb-10 font-medium text-red-600"
        >
          The People Behind GME Finance
        </p>
        <div className="relative">
          <Image
            src="/images/russia/castle_2.svg"
            alt="Left castle"
            width={500}
            height={500}
            className="hidden lg:block absolute top-1/2 -translate-y-1/2"
            style={{ left: '-200px', marginTop:'-95px'}}
            priority
          />
          <Image
            src="/images/russia/castle_1.svg"
            alt="Right castle"
            width={350}
            height={350}
            className="hidden lg:block absolute top-1/2 -translate-y-1/2"
            style={{ right: '-180px', marginTop:'-65px'}}
            priority
          />
          <div className="aspect-video w-full max-w-4xl mx-auto relative" style={{ zIndex: 10 }}>
            <iframe
              className="w-full h-full rounded-xl"
              src="https://www.youtube.com/embed/mX9zCgpqohU"
              title="Myanmar Team Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section> 
        <LoanTypesSection/>
      <section className="bg-no-repeat relative overflow-hidden">
      <div className="absolute bg-no-repeat bg-bottom bottom-0 w-full h-full" style={{ backgroundImage: "url('/images/russia/snow_bg.svg')" }} />
      <ProcessStep/>
      </section>
    </div>
    <LoanDetailSection backgroundImage="/images/russia/loan_detail_bg.webp"/>
      <div style={{ background: getGradient('russia') }}>
        <div className="absolute bg-no-repeat top-475 bg-right w-full h-full" style={{ backgroundImage: "url('/images/russia/snow_bg.svg')"}} />
        <section className="bg-no-repeat relative overflow-hidden">
                    
          <div className="absolute bg-no-repeat bg-right bottom-0 right-0 w-full h-200" style={{ backgroundImage: "url('/images/russia/garland_r.svg')", backgroundSize: '100% auto', zIndex:2 }} />
          <div className="absolute bg-no-repeat bg-left top-160 left-0 w-full h-200" style={{ backgroundImage: "url('/images/russia/garland_l.svg')", backgroundSize: '100% auto', zIndex:2 }} />
          <EMICalculatorSection/>
          <div className="mb-110">
          <LoanApplicationForm/>
          </div>
        </section>
      </div>
    </div>
  );
}
