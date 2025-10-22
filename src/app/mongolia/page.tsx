
import { getGradient } from "@/constants/colors";
import CountryIntroductionSection from "../components/home/CountryIntroductionSection";
import LoanTypesSection from "../components/home/LoanTypesSection";
import EMICalculatorSection from "../components/sections/EMICalculatorSection";
import LatestSocials, { SocialsItem } from "../components/sections/LatestSocials";
import LoanApplicationForm from "../components/sections/LoanApplicationForm";
import LoanDetailSection from "../components/sections/LoanDetailSection";
import ProcessStep from "../components/sections/ProcessStep";
import TeamSection, { Teams } from "../components/sections/TeamSection";

const MONGOLIA_SOCIALS: SocialsItem[] = [
  {
    id: 'facebook',
    image: '/images/mongolia/social1.jpg',
    snsLogo: '/images/icons/facebook.svg',
    title: 'GME Finance Mongolia',
    likes: '2.5K',
    followers: '3.1K',
    tags: ['Event', 'News', 'Updates'],
    href: '/news/mongolia/facebook',
  },
  {
    id: 'tiktok',
    image: '/images/mongolia/social2.jpg',
    snsLogo: '/images/icons/tictok.svg',
    title: 'GME Finance Mongolia',
    likes: '1.8K',
    followers: '2.4K',
    tags: ['Videos', 'Tips', 'Community'],
    href: '/news/mongolia/tiktok',
  },
  {
    id: 'instagram',
    image: '/images/mongolia/social3.jpg',
    snsLogo: '/images/icons/instagram.svg',
    title: 'GME Finance Mongolia',
    likes: '2.1K',
    followers: '2.8K',
    tags: ['Photos', 'Stories', 'News'],
    href: '/news/mongolia/instagram',
  },
];

const MONGOLIA_TEAMS: Teams[] = [
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

export default function MongoliaPage() {

  return (
    <div>
     <CountryIntroductionSection
      imageSrc="/images/mongolia/background.webp"
      title="Mongolia Team"
    />
    <div
      className="bg-cover bg-center bg-no-repeat"
      style={{ background: getGradient('mongolia')}}
    >
    <section className="bg-no-repeat relative overflow-hidden">
    
      <div className="absolute bg-no-repeat bg-top top-150 left-240 w-full h-full" style={{ backgroundImage: "url('/images/mongolia/pattern.svg')" }} />
      <div className="absolute bg-no-repeat bg-top top-150 -left-240 w-full h-full" style={{ backgroundImage: "url('/images/mongolia/pattern.svg')" }} />  <LatestSocials 
        socials={MONGOLIA_SOCIALS}/>
      <TeamSection
        teams={MONGOLIA_TEAMS}
        title='Mongolia'
      />
    </section>
     <section className="bg-no-repeat relative overflow-hidden">
      <div className="absolute bg-no-repeat -top-60 bg-left left-50 w-full h-full" style={{ backgroundImage: "url('/images/mongolia/cloud.svg')" }} />
      <div className="absolute bg-no-repeat -bottom-50 bg-right right-70 w-full h-full" style={{ backgroundImage: "url('/images/mongolia/cloud.svg')" }} />
      <div className="container mx-auto px-4 relative z-10 mb-20">
        <h2 className="text-5xl font-bold text-center mb-10">Meet Our Mongolia Team</h2>
        <p className="text-xl text-center mb-10 font-medium text-red-600">The People Behind GME Finance</p>
          <div className="aspect-video w-full max-w-4xl mx-auto">
            <iframe
              className="w-full h-full rounded-xl"
              src="https://www.youtube.com/embed/xYKDgKik2iM"
              title="Mongolia Team Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
      </div>
      </section>
        <LoanTypesSection/>
      <section className="bg-no-repeat relative overflow-hidden">
        <div className="absolute bg-no-repeat bg-left bottom-40 left-0 w-full h-full" style={{ backgroundImage: "url('/images/mongolia/cloud_w.svg')",backgroundSize: '10% auto' }} />
        <div className="absolute bg-no-repeat bg-right bottom-40 -right-20 w-full h-full" style={{ backgroundImage: "url('/images/mongolia/cloud_w.svg')",backgroundSize: '20% auto'  }} />
        <div className="absolute bg-no-repeat bg-bottom -bottom-0 right-0 w-full h-full" style={{ backgroundImage: "url('/images/mongolia/piece.svg')",backgroundSize: '110% auto' }} />
         <ProcessStep/>
      </section>
    </div>
    <LoanDetailSection backgroundImage="/images/mongolia/loan_detail_bg.webp"/>
      <div style={{ background: getGradient('mongolia') }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-no-repeat top-125 left-0 w-full h-full" style={{ backgroundImage: "url('/images/mongolia/garland_l.svg')" }} />
          <div className="absolute bg-no-repeat bottom-0 right-0 w-full h-100 -mr-285" style={{ backgroundImage: "url('/images/mongolia/garland_r.svg')" }} />
          <div className="absolute bg-no-repeat bg-top top-220 right-0 w-full h-full" style={{ backgroundImage: "url('/images/mongolia/shutterstock.svg')",backgroundSize: '65% auto' }} />
          <EMICalculatorSection/>
          <div className="mb-70 mt-20">
            <LoanApplicationForm/>
          </div>
        </section>
      </div>
    </div>
  );
}
