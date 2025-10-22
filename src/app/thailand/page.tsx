
import { getColorScheme, getGradient } from "@/constants/colors";
import CountryIntroductionSection from "../components/home/CountryIntroductionSection";
import LoanTypesSection from "../components/home/LoanTypesSection";
import EMICalculatorSection from "../components/sections/EMICalculatorSection";
import LatestSocials, { SocialsItem } from "../components/sections/LatestSocials";
import LoanApplicationForm from "../components/sections/LoanApplicationForm";
import LoanDetailSection from "../components/sections/LoanDetailSection";
import ProcessStep from "../components/sections/ProcessStep";
import TeamSection, { Teams } from "../components/sections/TeamSection";

const THAILAND_SOCIALS: SocialsItem[] = [
  {
    id: 'facebook',
    image: '/images/thailand/social1.jpg',
    snsLogo: '/images/icons/facebook.svg',
    title: 'GME Finance Thailand',
    likes: '2.5K',
    followers: '3.1K',
    tags: ['Event', 'News', 'Updates'],
    href: '/news/thailand/facebook',
  },
  {
    id: 'tiktok',
    image: '/images/thailand/social2.jpg',
    snsLogo: '/images/icons/tictok.svg',
    title: 'GME Finance Thailand',
    likes: '1.8K',
    followers: '2.4K',
    tags: ['Videos', 'Tips', 'Community'],
    href: '/news/thailand/tiktok',
  },
  {
    id: 'instagram',
    image: '/images/thailand/social3.jpg',
    snsLogo: '/images/icons/instagram.svg',
    title: 'GME Finance Thailand',
    likes: '2.1K',
    followers: '2.8K',
    tags: ['Photos', 'Stories', 'News'],
    href: '/news/thailand/instagram',
  },
];

const THAILAND_TEAMS: Teams[] = [
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

export default function ThailandPage() {
  const colors = getColorScheme('thailand')
  
  return (
    <div>
     <CountryIntroductionSection
      imageSrc="/images/thailand/background.webp"
      title="Thailand Team"
    />
    <div
      className="bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ background: getGradient('thailand')}}
    >
    <section className="bg-no-repeat relative overflow-hidden">
      <div className="absolute bg-no-repeat bg-right top-0 -right-25 w-full h-65" style={{ backgroundImage: "url('/images/thailand/cloud_l.svg')" }} />
      <LatestSocials
        socials={THAILAND_SOCIALS}
        titleColor={colors.title}
        />
      <div className="absolute bg-no-repeat top-180 bg-left -left-40 w-full h-65" style={{ backgroundImage: "url('/images/thailand/e_r.svg')" }} />
      <TeamSection
        teams={THAILAND_TEAMS}
        title='Thailand'
        titleColor={colors.title}
      />
    </section>
       <section className="relative overflow-hidden">
             <div className="mx-auto relative z-10 mb-20">
               <h2 className="text-5xl font-bold text-center mb-10 text-white">Meet Our Thailand Team</h2>
               <p
                 className="text-xl text-center mb-10 font-medium text-red-600"
               >
                 The People Behind GME Finance
               </p>
               <div className="relative">
                <div className="absolute bg-no-repeat bg-bottom bottom-40 right-0 w-full h-full" style={{ backgroundImage: "url('/images/thailand/pattern.svg')",backgroundSize:'110% auto' }} />
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
        <LoanTypesSection titleColor={colors.title}/>
        <ProcessStep titleColor={colors.title} subtitleColor={colors.subtitle}/>
    </div>
    <LoanDetailSection backgroundImage="/images/bangladesh/loan_detail_bg.webp"/>
      <div style={{ background: colors.gradient2 }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-no-repeat top-90 bg-right -right-30 w-full h-250" style={{ backgroundImage: "url('/images/thailand/cloud_l.svg')", zIndex:1, }} />
          <div className="absolute bg-no-repeat top-20 bg-left -left-40 w-full h-80" style={{ backgroundImage: "url('/images/thailand/cloud_r.svg')", zIndex:1 }} />
          <div className="absolute bg-no-repeat -bottom-100 bg-right right-0 w-full h-250" style={{ backgroundImage: "url('/images/thailand/garland_r.svg')", zIndex:2 }} />
          <div className="absolute bg-no-repeat top-115 bg-left left-0 w-full h-250" style={{ backgroundImage: "url('/images/thailand/garland_l.svg')", zIndex:2 }} />
          <EMICalculatorSection titleColor={colors.title}/>
          <LoanApplicationForm/>
        </section>
      </div>
    </div>
  );
}
