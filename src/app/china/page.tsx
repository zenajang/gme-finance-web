
import { getGradient } from "@/constants/colors";
import CountryIntroductionSection from "../components/home/CountryIntroductionSection";
import LoanTypesSection from "../components/home/LoanTypesSection";
import EMICalculatorSection from "../components/sections/EMICalculatorSection";
import LatestSocials, { SocialsItem } from "../components/sections/LatestSocials";
import LoanApplicationForm from "../components/sections/LoanApplicationForm";
import LoanDetailSection from "../components/sections/LoanDetailSection";
import ProcessStep from "../components/sections/ProcessStep";
import TeamSection, { Teams } from "../components/sections/TeamSection";

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
      <div className="absolute bg-no-repeat bg-top top-0 -left-190 w-full h-full" style={{ backgroundImage: "url('/images/china/flower.svg')",backgroundSize: '20% auto' }} />
      <div className="absolute bg-no-repeat bg-top top-0 -left-140 w-full h-full" style={{ backgroundImage: "url('/images/china/flower.svg')" ,backgroundSize: '5% auto'}} />
      <div className="absolute bg-no-repeat bg-bottom bottom-130 left-210 w-full h-full" style={{ backgroundImage: "url('/images/china/pattern.svg')" ,backgroundSize: '20% auto'}} />
      <div className="absolute bg-no-repeat bg-bottom bottom-0 -left-210 w-full h-full" style={{ backgroundImage: "url('/images/china/pattern.svg')" ,backgroundSize: '10% auto'}} />

      <LatestSocials 
        socials={CHINA_SOCIALS}/>
      <TeamSection
        teams={CHINA_TEAMS}
        title='China'
      />
    </section>
         <section className="relative overflow-hidden">
             <div className="mx-auto relative z-10 mb-20">
               <h2 className="text-5xl font-bold text-center mb-10">Meet Our China Team</h2>
               <p
                 className="text-xl text-center mb-10 font-medium text-red-600"
               >
                 The People Behind GME Finance
               </p>
               <div className="relative">
                <div className="absolute bg-no-repeat bg-right -top-70 right-100 w-full h-full" style={{ backgroundImage: "url('/images/china/flower.svg')" ,backgroundSize: '8% auto'}} />
                <div className="absolute bg-no-repeat bg-bottom bottom-35 right-0 w-full h-full" style={{ backgroundImage: "url('/images/china/pattern_1.svg')", backgroundSize:'100% auto' }} />
                 <div className="aspect-video w-full max-w-4xl mx-auto relative" style={{ zIndex: 10 }}>
                   <iframe
                     className="w-full h-full rounded-xl"
                     src="https://www.youtube.com/embed/xYKDgKik2iM"
                     title="China Team Video"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                   />
                 </div>
               </div>
             </div>
           </section>
        <LoanTypesSection/>
      <section className="bg-no-repeat relative overflow-hidden">
        <div className="absolute bg-no-repeat bg-bottom -bottom-30 right-0 w-full h-full" style={{ backgroundImage: "url('/images/china/cloud.svg')",backgroundSize: '120% auto' }} />
        <ProcessStep/>
      </section>
    </div>
    <LoanDetailSection backgroundImage="/images/nepal/loan_detail_bg.webp"/>
      <div style={{ background: getGradient('china') }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-no-repeat top-90 bg-right right-0 w-full h-250" style={{ backgroundImage: "url('/images/china/pattern.svg')", zIndex:1,backgroundSize: '18% auto' }} />
          <div className="absolute bg-no-repeat -top-200 bg-left -left-50 w-full h-full" style={{ backgroundImage: "url('/images/china/pattern.svg')", zIndex:1,backgroundSize: '30% auto' }} />
          <div className="absolute bg-no-repeat -bottom-70 bg-bottom -left-150 w-full h-full" style={{ backgroundImage: "url('/images/china/pattern.svg')", zIndex:1,backgroundSize: '30% auto' }} />
          <div className="absolute bg-no-repeat -bottom-100 bg-right right-0 w-full h-250" style={{ backgroundImage: "url('/images/china/garland_r.svg')", zIndex:2 }} />
          <div className="absolute bg-no-repeat top-115 bg-left left-0 w-full h-250" style={{ backgroundImage: "url('/images/china/garland_l.svg')", zIndex:2 }} />
         <EMICalculatorSection/>
         <LoanApplicationForm/>
        </section>
      </div>
    </div>
  );
}
