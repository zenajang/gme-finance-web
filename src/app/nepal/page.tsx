
import Image from "next/image";
import CountryIntroductionSection from "../components/home/CountryIntroductionSection";
import LoanTypesSection from "../components/home/LoanTypesSection";
import EMICalculatorSection from "../components/sections/EMICalculatorSection";
import LatestSocials, { SocialsItem } from "../components/sections/LatestSocials";
import LoanApplicationForm from "../components/sections/LoanApplicationForm";
import LoanDetailSection from "../components/sections/LoanDetailSection";
import ProcessStep from "../components/sections/ProcessStep";
import TeamSection, { Teams } from "../components/sections/TeamSection";

const NEPAL_SOCIALS: SocialsItem[] = [
  {
    id: 'facebook',
    image: '/images/nepal/social1.jpg',
    snsLogo: '/images/icons/facebook.svg',
    title: 'GME Finance Nepal',
    likes: '2.5K',
    followers: '3.1K',
    tags: ['Event', 'News', 'Updates'],
    href: '/news/nepal/facebook',
  },
  {
    id: 'tiktok',
    image: '/images/nepal/social2.jpg',
    snsLogo: '/images/icons/tictok.svg',
    title: 'GME Finance Nepal',
    likes: '1.8K',
    followers: '2.4K',
    tags: ['Videos', 'Tips', 'Community'],
    href: '/news/nepal/tiktok',
  },
  {
    id: 'instagram',
    image: '/images/nepal/social3.jpg',
    snsLogo: '/images/icons/instagram.svg',
    title: 'GME Finance Nepal',
    likes: '2.1K',
    followers: '2.8K',
    tags: ['Photos', 'Stories', 'News'],
    href: '/news/nepal/instagram',
  },
];

const NEPAL_TEAMS: Teams[] = [
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

export default function NepalPage() {

  return (
    <div>
     <CountryIntroductionSection
      imageSrc="/images/nepal/background.jpg"
      title="Nepal Team"
    />
    <div
      className="bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #FFF4C7, #FFFFFF, #FFF4C7)'}}
    >
    <section className="bg-no-repeat relative overflow-hidden">
      <div className="absolute bg-no-repeat bg-left top-0 -left-14 w-full h-65" style={{ backgroundImage: "url('/images/nepal/castle_2.svg')" }} />
      <LatestSocials 
        socials={NEPAL_SOCIALS}/>
      <div className="absolute bg-no-repeat top-210 bg-right -right-10 w-full h-65" style={{ backgroundImage: "url('/images/nepal/castle_3.svg')" }} />
      <TeamSection
        teams={NEPAL_TEAMS}
        title='Nepal'
      />
    </section>
       <section className="relative overflow-hidden">
             <div className="container mx-auto px-4 relative z-10 mb-20">
               <h2 className="text-5xl font-bold text-center mb-10">Meet Our Nepal Team</h2>
               <p
                 className="text-xl text-center mb-10 font-medium"
                 style={{ color: "#DF2121" }}
               >
                 The People Behind GME Finance
               </p>
               <div className="relative">
                 <Image
                   src="/images/nepal/castle_.svg"
                   alt="Left castle"
                   width={250}
                   height={250}
                   className="hidden lg:block absolute top-1/2 -translate-y-1/2"
                   style={{ left: '-70px', marginTop:'82px', zIndex: 1 }}
                   priority
                 />
                 <Image
                   src="/images/nepal/buddha.svg"
                   alt="Right castle"
                   width={300}
                   height={300}
                   className="hidden lg:block absolute top-1/2 -translate-y-1/2"
                   style={{ right: '-100px', marginTop:'25px', zIndex: 1 }}
                   priority
                 />
                 <div className="aspect-video w-full max-w-4xl mx-auto relative" style={{ zIndex: 10 }}>
                   <iframe
                     className="w-full h-full rounded-xl"
                     src="https://www.youtube.com/embed/xYKDgKik2iM"
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
        <div className="absolute bg-no-repeat bg-right -bottom-6 -right-10 w-full h-65" style={{ backgroundImage: "url('/images/nepal/cow.svg')" }} />
        <div className="absolute bg-no-repeat bg-left bottom-0 -left-14 w-full h-65" style={{ backgroundImage: "url('/images/nepal/castle.svg')" }} />
        <ProcessStep/>
      </section>
    </div>
    <LoanDetailSection backgroundImage="/images/nepal/loan_detail_bg.jpg"/>
      <div style={{ background: 'linear-gradient(to bottom, #FFF4C7, #FFFFFF)' }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-no-repeat -bottom-100 bg-right right-0 w-full h-250" style={{ backgroundImage: "url('/images/nepal/garland_r.svg')",zIndex:2 }} />
          <div className="absolute bg-no-repeat top-115 bg-left left-0 w-full h-250" style={{ backgroundImage: "url('/images/nepal/garland_l.svg')",zIndex:2 }} />
          <EMICalculatorSection/>
          <LoanApplicationForm/>
        </section>
      </div>
    </div>
  );
}
