import CountryIntroductionSection from "../components/home/CountryIntroductionSection";
import LoanTypesSection from "../components/home/LoanTypesSection";
import EMICalculatorSection from "../components/sections/EMICalculatorSection";
import LatestSocials, { SocialsItem } from "../components/sections/LatestSocials";
import LoanApplicationForm from "../components/sections/LoanApplicationForm";
import LoanDetailSection from "../components/sections/LoanDetailSection";
import ProcessStep from "../components/sections/ProcessStep";
import TeamSection, { Teams } from "../components/sections/TeamSection";
import { getColorScheme, getGradient } from "@/constants/colors";
import GarlandDecoration from "../components/sections/GarlandDecoration";
import TeamVideoSection from "../components/sections/TeamVideoSection";

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
         <div className="absolute bg-no-repeat bg-top -top-40 -left-200 w-full h-full" style={{ backgroundImage: "url('/images/pakistan/flower.svg')" }} />  
         <LatestSocials 
           socials={PAKISTAN_SOCIALS} buttonBgColor={colors.primary} buttonHoverBgColor={colors.hover}/>
         <TeamSection
           teams={PAKISTAN_TEAMS}
           nameBgColor={colors.primary}
           title='Bharat & Pakistan'
         />
       </section>
       <TeamVideoSection
          title="Meet Our Bharat & Pakistan Team"
          videoUrl="https://www.youtube.com/embed/mX9zCgpqohU"
          leftImageSrc="/images/pakistan/castle_l.svg"
          leftImageAlt="Left castle"
          leftImageWidth={320}
          leftImageHeight={320}
          leftImageStyle={{ left: '-240px', marginTop:'-30px', zIndex: 1 }}
          rightImageSrc="/images/pakistan/castle_r.svg"
          rightImageAlt="Right castle"
          rightImageWidth={680}
          rightImageHeight={680}
          rightImageStyle={{ right: '-280px', marginTop:'40px', zIndex: 1 }}
        />
        <LoanTypesSection/>
         <section className="bg-no-repeat relative overflow-hidden">
            <div className="absolute bg-no-repeat bg-right -bottom-90 -right-50 w-full h-220" style={{ backgroundImage: "url('/images/pakistan/flower.svg')" }} />
            <ProcessStep subtitleColor={colors.primary}/>
         </section>
       </div>
    <LoanDetailSection backgroundImage="/images/pakistan/loan_detail_bg.webp"/>
      <div className="relative" style={{ background: getGradient('pakistan') }}>
        <div className="absolute bg-repeat top-0 left-0 w-full h-full" style={{ backgroundImage: "url('/images/pakistan/pattern.svg')", backgroundSize: 'auto' }} />
        <section className="bg-no-repeat relative overflow-hidden">          
          <GarlandDecoration country="pakistan" />
          <EMICalculatorSection buttonBgColor={colors.primary} buttonHoverBgColor={colors.hover}/>
          <div className="mb-20">
          <LoanApplicationForm buttonBgColor={colors.primary} subtitleColor={colors.primary}/>
          </div>
        </section>
      </div>
    </div>
  );
}
