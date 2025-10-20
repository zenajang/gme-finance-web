
import Image from "next/image";
import CountryIntroductionSection from "../components/home/CountryIntroductionSection";
import LoanTypesSection from "../components/home/LoanTypesSection";
import EMICalculatorSection from "../components/sections/EMICalculatorSection";
import LatestSocials, { SocialsItem } from "../components/sections/LatestSocials";
import LoanApplicationForm from "../components/sections/LoanApplicationForm";
import LoanDetailSection from "../components/sections/LoanDetailSection";
import ProcessStep from "../components/sections/ProcessStep";
import TeamSection, { Teams } from "../components/sections/TeamSection";

const VIETNAM_SOCIALS: SocialsItem[] = [
  {
    id: 'facebook',
    image: '/images/vietnam/social1.jpg',
    snsLogo: '/images/icons/facebook.svg',
    title: 'GME Finance Vietnam',
    likes: '2.5K',
    followers: '3.1K',
    tags: ['Event', 'News', 'Updates'],
    href: '/news/vietnam/facebook',
  },
  {
    id: 'tiktok',
    image: '/images/vietnam/social2.jpg',
    snsLogo: '/images/icons/tictok.svg',
    title: 'GME Finance Vietnam',
    likes: '1.8K',
    followers: '2.4K',
    tags: ['Videos', 'Tips', 'Community'],
    href: '/news/vietnam/tiktok',
  },
  {
    id: 'instagram',
    image: '/images/vietnam/social3.jpg',
    snsLogo: '/images/icons/instagram.svg',
    title: 'GME Finance Vietnam',
    likes: '2.1K',
    followers: '2.8K',
    tags: ['Photos', 'Stories', 'News'],
    href: '/news/vietnam/instagram',
  },
];

const VIETNAM_TEAMS: Teams[] = [
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

export default function VietnamPage() {

  return (
    <div>
     <CountryIntroductionSection
      imageSrc="/images/vietnam/background.webp"
      title="Vietnam Team"
    />
    <div
      className="bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #FFFCE9, #FFF4F0)'}}
    >
    <section className="bg-no-repeat relative overflow-hidden">
      <div className="absolute bg-no-repeat bg-left top-0 -left-80 w-full h-full" style={{ backgroundImage: "url('/images/vietnam/pattern_y.svg')" }} />
      <LatestSocials 
        socials={VIETNAM_SOCIALS}/>
      <TeamSection
        teams={VIETNAM_TEAMS}
        title='Vietnam'
      />
    </section>
       <section className="relative overflow-hidden">
             <div className="container mx-auto px-4 relative z-10 mb-20">
               <h2 className="text-5xl font-bold text-center mb-10">Meet Our Vietnam Team</h2>
               <p
                 className="text-xl text-center mb-10 font-medium"
                 style={{ color: "#DF2121" }}
               >
                 The People Behind GME Finance
               </p>
               <div className="relative">
                 <Image
                   src="/images/vietnam/castle_1.svg"
                   alt="Left castle"
                   width={400}
                   height={400}
                   className="hidden lg:block absolute top-1/2 -translate-y-1/2"
                   style={{ left: '-200px', marginTop:'50px', zIndex: 1 }}
                   priority
                 />
                 <Image
                   src="/images/vietnam/castle_3.svg"
                   alt="Right castle"
                   width={730}
                   height={730}
                   className="hidden lg:block absolute top-1/2 -translate-y-1/2"
                   style={{ right: '-320px', marginTop:'65px', zIndex: 1 }}
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
        <div className="absolute bg-no-repeat bg-right -bottom-100 -right-10 w-full h-full" style={{ backgroundImage: "url('/images/vietnam/pattern_r.svg')",backgroundSize: '40% auto' }} />        <ProcessStep/>
      </section>
    </div>
    <LoanDetailSection backgroundImage="/images/nepal/loan_detail_bg.webp"/>
      <div style={{ background: 'linear-gradient(to bottom, #FFFCE9, #FFF4F0)' }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-no-repeat top-90 bg-right -right-30 w-full h-250" style={{ backgroundImage: "url('/images/vietnam/pattern_r.svg')", zIndex:1,backgroundSize: '20% auto' }} />
          <div className="absolute bg-no-repeat -top-200 bg-left -left-50 w-full h-full" style={{ backgroundImage: "url('/images/vietnam/pattern_r.svg')", zIndex:1,backgroundSize: '30% auto' }} />
                    <div className="absolute bg-no-repeat -bottom-70 bg-bottom -left-150 w-full h-full" style={{ backgroundImage: "url('/images/vietnam/pattern_y.svg')", zIndex:1,backgroundSize: '30% auto' }} />
          <div className="absolute bg-no-repeat -bottom-100 bg-right right-0 w-full h-250" style={{ backgroundImage: "url('/images/vietnam/garland_r.svg')", zIndex:2 }} />
          <div className="absolute bg-no-repeat top-115 bg-left left-0 w-full h-250" style={{ backgroundImage: "url('/images/vietnam/garland_l.svg')", zIndex:2 }} />
         <EMICalculatorSection/>
          <LoanApplicationForm/>
        </section>
      </div>
    </div>
  );
}
