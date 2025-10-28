
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
       <section className="relative overflow-hidden">
             <div className="container mx-auto px-4 relative z-10 mb-20">
               <h2 className="text-5xl font-bold text-center mb-10">Meet Our Bangladesh Team</h2>
               <p
                 className="text-xl text-center mb-10 font-medium"
                 style={{ color:colors.primary }}
               >
                 The People Behind GME Finance
               </p>
               <div className="relative">
                 <Image
                   src="/images/bangladesh/tent.svg"
                   alt="Left castle"
                   width={500}
                   height={500}
                   className="hidden lg:block absolute top-1/2 -translate-y-1/2"
                   style={{ left: '-290px', marginTop:'70px', zIndex: 1 }}
                   priority
                 />
                 <Image
                   src="/images/bangladesh/castle.svg"
                   alt="Right castle"
                   width={500}
                   height={500}
                   className="hidden lg:block absolute top-1/2 -translate-y-1/2"
                   style={{ right: '-320px', marginTop:'110px', zIndex: 1 }}
                   priority
                 />
                 <div className="aspect-video w-full max-w-4xl mx-auto relative" style={{ zIndex: 10 }}>
                   <iframe
                     className="w-full h-full rounded-xl"
                     src="https://www.youtube.com/embed/FZ3Ck4bnLXY"
                     title="Myanmar Team Video"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                   />
                 </div>
               </div>
             </div>
           </section>
        <LoanTypesSection/>
        <ProcessStep/>
    </div>
    <LoanDetailSection backgroundImage="/images/bangladesh/loan_detail_bg.webp"/>
      <div style={{ background: getGradient('bangladesh') }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-no-repeat -bottom-30 bg-left -left-40 w-full h-250" style={{ backgroundImage: "url('/images/bangladesh/tree.svg')", zIndex:1, transform: 'scaleX(-1)' }} />
          <div className="absolute bg-no-repeat top-220 bg-left left-40 w-full h-250" style={{ backgroundImage: "url('/images/bangladesh/tree.svg')", zIndex:1 }} />
          <div className="absolute bg-no-repeat -bottom-100 bg-right right-0 w-full h-250" style={{ backgroundImage: "url('/images/bangladesh/garland_r.svg')", zIndex:2 }} />
          <div className="absolute bg-no-repeat top-115 bg-left left-0 w-full h-250" style={{ backgroundImage: "url('/images/bangladesh/garland_l.svg')", zIndex:2 }} />
          <EMICalculatorSection/>
          <LoanApplicationForm/>
        </section>
      </div>
    </div>
  );
}
