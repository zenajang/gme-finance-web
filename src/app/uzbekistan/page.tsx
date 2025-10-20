
import CountryIntroductionSection from "../components/home/CountryIntroductionSection";
import LoanTypesSection from "../components/home/LoanTypesSection";
import EMICalculatorSection from "../components/sections/EMICalculatorSection";
import LatestSocials, { SocialsItem } from "../components/sections/LatestSocials";
import LoanApplicationForm from "../components/sections/LoanApplicationForm";
import LoanDetailSection from "../components/sections/LoanDetailSection";
import ProcessStep from "../components/sections/ProcessStep";
import TeamSection, { Teams } from "../components/sections/TeamSection";

const UZBEKISTAN_SOCIALS: SocialsItem[] = [
  {
    id: 'facebook',
    image: '/images/uzbekistan/social1.jpg',
    snsLogo: '/images/icons/facebook.svg',
    title: 'GME Finance Uzbekistan',
    likes: '2.5K',
    followers: '3.1K',
    tags: ['Event', 'News', 'Updates'],
    href: '/news/uzbekistan/facebook',
  },
  {
    id: 'tiktok',
    image: '/images/uzbekistan/social2.jpg',
    snsLogo: '/images/icons/tictok.svg',
    title: 'GME Finance Uzbekistan',
    likes: '1.8K',
    followers: '2.4K',
    tags: ['Videos', 'Tips', 'Community'],
    href: '/news/uzbekistan/tiktok',
  },
  {
    id: 'instagram',
    image: '/images/uzbekistan/social3.jpg',
    snsLogo: '/images/icons/instagram.svg',
    title: 'GME Finance Uzbekistan',
    likes: '2.1K',
    followers: '2.8K',
    tags: ['Photos', 'Stories', 'News'],
    href: '/news/uzbekistan/instagram',
  },
];

const UZBEKISTAN_TEAMS: Teams[] = [
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

export default function UzbekistanPage() {

  return (
    <div>
     <CountryIntroductionSection
      imageSrc="/images/uzbekistan/background.jpg"
      title="Uzbekistan Team"
      buttonTextColor="text-teal-600"
      buttonBgColor="#FFFFFF"
      buttonHoverBgColor="#bacfd3ff"
    />
    <div
      className="bg-cover bg-center bg-no-repeat"
      style={{ background: '#F3FCFF'}}
    >
    <section className="bg-no-repeat relative overflow-hidden">
      <div className="absolute bg-no-repeat bg-right top-70 -right-25 w-full h-full" style={{ backgroundImage: "url('/images/uzbekistan/flower_sm.svg')" }} />
      <LatestSocials 
        socials={UZBEKISTAN_SOCIALS}
        buttonBgColor="#0094AE"
        buttonHoverBgColor="#bacfd3ff"
        />
      <div className="absolute bg-no-repeat top-0 bg-left -left-40 w-full h-full" style={{ backgroundImage: "url('/images/uzbekistan/flower_lg.svg')" }} />
      <TeamSection
        teams={UZBEKISTAN_TEAMS}
        title='Uzbekistan'
        nameBgColor="#0094AE"
      />
    </section>
       <section className="relative overflow-visible">
             <div className="mx-auto relative z-10 mb-20">
               <h2 className="text-5xl font-bold text-center mb-10">Meet Our Uzbekistan Team</h2>
               <p
                 className="text-xl text-center mb-10 font-medium"
                 style={{ color: "#0094AE" }}
               >
                 The People Behind GME Finance
               </p>
               <div className="relative">
                <div className="absolute bg-no-repeat bg-bottom bottom-30 right-0 w-full h-full" style={{ backgroundImage: "url('/images/uzbekistan/pattern.svg')",backgroundSize:'100% auto' }} />
                 <div className="aspect-video w-full max-w-4xl mx-auto relative" style={{ zIndex: 10 }}>
                   <iframe
                     className="w-full h-full rounded-xl"
                     src="https://www.youtube.com/embed/xYKDgKik2iM"
                     title="Uzbekistan Team Video"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                   />
                 </div>
               </div>
             </div>
           </section>
        <LoanTypesSection/>
        <ProcessStep subtitleColor="#0094AE"/>
    </div>
    <LoanDetailSection backgroundImage="/images/bangladesh/loan_detail_bg.png"/>
      <div style={{ background: '#F3FCFF' }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-no-repeat top-90 bg-right -right-30 w-full h-200" style={{ backgroundImage: "url('/images/uzbekistan/flower_lg.svg')", zIndex:1, }} />
          <div className="absolute bg-no-repeat top-20 bg-left -left-20 w-full h-80" style={{ backgroundImage: "url('/images/uzbekistan/flower_sm.svg')", zIndex:1 }} />
          <div className="absolute bg-no-repeat bg-right bottom-0 right-0 w-full h-200" style={{ backgroundImage: "url('/images/uzbekistan/garland_r.svg')", backgroundSize: '100% auto', zIndex:2 }} />
          <div className="absolute bg-no-repeat bg-left top-160 left-0 w-full h-200" style={{ backgroundImage: "url('/images/uzbekistan/garland_l.svg')", backgroundSize: '100% auto', zIndex:2 }} />
          <EMICalculatorSection buttonBgColor="#0094AE" buttonHoverBgColor="#bacfd3ff"/>
          <div className="mb-110">
          <LoanApplicationForm subtitleColor="#0094AE" buttonColor="#0094AE"/>
          </div>
        </section>
      </div>
    </div>
  );
}
