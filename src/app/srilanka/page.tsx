
import { getGradient } from "@/constants/colors";
import CountryIntroductionSection from "../components/home/CountryIntroductionSection";
import LoanTypesSection from "../components/home/LoanTypesSection";
import EMICalculatorSection from "../components/sections/EMICalculatorSection";
import LatestSocials, { SocialsItem } from "../components/sections/LatestSocials";
import LoanApplicationForm from "../components/sections/LoanApplicationForm";
import LoanDetailSection from "../components/sections/LoanDetailSection";
import ProcessStep from "../components/sections/ProcessStep";
import TeamSection, { Teams } from "../components/sections/TeamSection";

const SCRILANKA_SOCIALS: SocialsItem[] = [
  {
    id: 'facebook',
    image: '/images/srilanka/social1.jpg',
    snsLogo: '/images/icons/facebook.svg',
    title: 'GME Finance Srilanka',
    likes: '2.5K',
    followers: '3.1K',
    tags: ['Event', 'News', 'Updates'],
    href: '/news/srilanka/facebook',
  },
  {
    id: 'tiktok',
    image: '/images/srilanka/social2.jpg',
    snsLogo: '/images/icons/tictok.svg',
    title: 'GME Finance Srilanka',
    likes: '1.8K',
    followers: '2.4K',
    tags: ['Videos', 'Tips', 'Community'],
    href: '/news/srilanka/tiktok',
  },
  {
    id: 'instagram',
    image: '/images/srilanka/social3.jpg',
    snsLogo: '/images/icons/instagram.svg',
    title: 'GME Finance Srilanka',
    likes: '2.1K',
    followers: '2.8K',
    tags: ['Photos', 'Stories', 'News'],
    href: '/news/srilanka/instagram',
  },
];

const SCRILANKA_TEAMS: Teams[] = [
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

export default function SrilankaPage() {

  return (
    <div>
     <CountryIntroductionSection
      imageSrc="/images/srilanka/background.webp"
      title="Srilanka Team"
    />
    <div
      className="bg-cover bg-center bg-no-repeat"
      style={{ background:getGradient('srilanka')}}
    >
    <section className="bg-no-repeat relative overflow-hidden">
      <div className="absolute bg-no-repeat bg-left -top-30 left-0 w-full h-220 " style={{ backgroundImage: "url('/images/srilanka/garland_u.svg')" }} />
      <LatestSocials 
        socials={SCRILANKA_SOCIALS}/>
      <TeamSection
        teams={SCRILANKA_TEAMS}
        title='Scrilanka'
      />
      <div className="absolute bg-no-repeat bg-left -left-50 top-300 w-full h-230" style={{ backgroundImage: "url('/images/srilanka/flower.svg')" }} />
      <div className="absolute bg-no-repeat bg-right -right-50 top-500 w-full h-230" style={{ backgroundImage: "url('/images/srilanka/flower.svg')" }} />
      <div className="container mx-auto px-4 relative z-10 mb-20">
        <h2 className="text-5xl font-bold text-center mb-10">Meet Our Philippines Team</h2>
        <p className="text-xl text-center mb-10 font-medium text-red-600">The People Behind GME Finance</p>
          <div className="aspect-video w-full max-w-4xl mx-auto">
            <iframe
              className="w-full h-full rounded-xl"
              src="https://www.youtube.com/embed/xYKDgKik2iM"
              title="Philippines Team Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
      </div>
        <LoanTypesSection/>
        <ProcessStep/>
        <div className="absolute bg-no-repeat bg-right -bottom-10 right-0 w-full h-220" style={{ backgroundImage: "url('/images/srilanka/garland_d.svg')" }} />
      </section>
    </div>
    <LoanDetailSection backgroundImage="/images/srilanka/loan_detail_bg.webp"/>
      <div style={{background: getGradient('srilanka') }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-no-repeat -bottom-80 bg-left left-0 w-full h-250" style={{ backgroundImage: "url('/images/srilanka/garland_l.svg')",zIndex:2 }} />
          <div className="absolute bg-no-repeat top-100 bg-right right-0 w-full h-250" style={{ backgroundImage: "url('/images/srilanka/garland_r.svg')",zIndex:2 }} />
          <div className="absolute bg-no-repeat bg-contain -bottom-90 w-full h-full" style={{ backgroundImage: "url('/images/srilanka/bubble.svg')" }} />
          <EMICalculatorSection/>
          <LoanApplicationForm/>
        </section>
      </div>
    </div>
  );
}
