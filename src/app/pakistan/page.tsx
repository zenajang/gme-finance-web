
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

const PAKISTAN_SOCIALS: SocialsItem[] = [
  {
    id: 'facebook',
    image: '/images/pakistan/social1.jpg',
    snsLogo: '/images/icons/facebook.svg',
    title: 'GME Finance Pakistan',
    likes: '2.5K',
    followers: '3.1K',
    tags: ['Event', 'News', 'Updates'],
    href: '/news/pakistan/facebook',
  },
  {
    id: 'tiktok',
    image: '/images/pakistan/social2.jpg',
    snsLogo: '/images/icons/tictok.svg',
    title: 'GME Finance Pakistan',
    likes: '1.8K',
    followers: '2.4K',
    tags: ['Videos', 'Tips', 'Community'],
    href: '/news/pakistan/tiktok',
  },
  {
    id: 'instagram',
    image: '/images/pakistan/social3.jpg',
    snsLogo: '/images/icons/instagram.svg',
    title: 'GME Finance Pakistan',
    likes: '2.1K',
    followers: '2.8K',
    tags: ['Photos', 'Stories', 'News'],
    href: '/news/pakistan/instagram',
  },
];

const PAKISTAN_TEAMS: Teams[] = [
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

export default function PakistanPage() {
  const colors = getColorScheme('pakistan')

  return (
    <div>
     <CountryIntroductionSection
      imageSrc="/images/pakistan/background.webp"
      title="Pakistan Team"
      buttonTextColor={colors.primary}
      buttonHoverBgColor={colors.introHover}    
      />
    <div
      className="bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ background: getGradient('pakistan')}}
    >
     <section className="bg-no-repeat relative overflow-hidden">
       
         <div className="absolute bg-no-repeat bg-top top-150 left-200 w-full h-full" style={{ backgroundImage: "url('/images/pakistan/flower.svg')" }} />
         <div className="absolute bg-no-repeat bg-top -top-40 -left-200 w-full h-full" style={{ backgroundImage: "url('/images/pakistan/flower.svg')" }} />  
         <LatestSocials 
           socials={PAKISTAN_SOCIALS} buttonBgColor={colors.primary} buttonHoverBgColor={colors.hover}/>
         <TeamSection
           teams={PAKISTAN_TEAMS}
           nameBgColor={colors.primary}
           title='Bharat & Pakistan'
         />
       </section>
         <section className="relative overflow-hidden">
              <div className="container mx-auto px-4 relative z-10 mb-20">
                <h2 className="text-5xl font-bold text-center mb-10">Meet Our Bharat & Pakistan Team</h2>
                <p
                  className="text-xl text-center mb-10 font-medium"
                  style={{ color: colors.primary }}
                >
                  The People Behind GME Finance
                </p>
                <div className="relative">
                  <Image
                    src="/images/pakistan/castle_1.svg"
                    alt="Left castle"
                    width={300}
                    height={300}
                    className="hidden lg:block absolute top-1/2 -translate-y-1/2"
                    style={{ left: '-100px', marginTop:'-80px'}}
                    priority
                  />
                  <Image
                    src="/images/pakistan/castle_2.svg"
                    alt="Right castle"
                    width={600}
                    height={600}
                    className="hidden lg:block absolute top-1/2 -translate-y-1/2"
                    style={{ right: '-300px'}}
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
           <div className="absolute bg-no-repeat bg-left bottom-60 left-0 w-full h-full" style={{ backgroundImage: "url('/images/pakistan/flower.svg')",backgroundSize: '20% auto' }} />
           <div className="absolute bg-no-repeat bg-bottom -bottom-0 right-0 w-full h-full" style={{ backgroundImage: "url('/images/pakistan/wave.svg')",backgroundSize: '110% auto' }} />
            <ProcessStep subtitleColor={colors.primary}/>
         </section>
       </div>
    <LoanDetailSection backgroundImage="/images/pakistan/loan_detail_bg.webp"/>
      <div className="relative" style={{ background: getGradient('pakistan') }}>
        <div className="absolute bg-repeat top-0 left-0 w-full h-full" style={{ backgroundImage: "url('/images/pakistan/pattern.svg')", backgroundSize: 'auto' }} />
        <section className="bg-no-repeat relative overflow-hidden">          
          <div className="absolute bg-no-repeat top-125 left-0 w-full h-full" style={{ backgroundImage: "url('/images/pakistan/garland_l.svg')" }} />
          <div className="absolute bg-no-repeat bg-bottom -bottom-50 left-170 w-full h-full" style={{ backgroundImage: "url('/images/pakistan/garland_r.svg')" }} />
          <EMICalculatorSection buttonBgColor={colors.primary} buttonHoverBgColor={colors.hover}/>
          <LoanApplicationForm buttonColor={colors.primary} subtitleColor={colors.primary}/>
        </section>
      </div>
    </div>
  );
}
