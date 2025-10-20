
import CountryIntroductionSection from "../components/home/CountryIntroductionSection";
import LoanTypesSection from "../components/home/LoanTypesSection";
import EMICalculatorSection from "../components/sections/EMICalculatorSection";
import LatestSocials, { SocialsItem } from "../components/sections/LatestSocials";
import LoanApplicationForm from "../components/sections/LoanApplicationForm";
import LoanDetailSection from "../components/sections/LoanDetailSection";
import ProcessStep from "../components/sections/ProcessStep";
import TeamSection, { Teams } from "../components/sections/TeamSection";

const CAMBODIA_SOCIALS: SocialsItem[] = [
  {
    id: 'facebook',
    image: '/images/cambodia/social1.jpg',
    snsLogo: '/images/icons/facebook.svg',
    title: 'GME Finance Cambodia',
    likes: '2.5K',
    followers: '3.1K',
    tags: ['Event', 'News', 'Updates'],
    href: '/news/cambodia/facebook',
  },
  {
    id: 'tiktok',
    image: '/images/cambodia/social2.jpg',
    snsLogo: '/images/icons/tictok.svg',
    title: 'GME Finance Cambodia',
    likes: '1.8K',
    followers: '2.4K',
    tags: ['Videos', 'Tips', 'Community'],
    href: '/news/cambodia/tiktok',
  },
  {
    id: 'instagram',
    image: '/images/cambodia/social3.jpg',
    snsLogo: '/images/icons/instagram.svg',
    title: 'GME Finance Cambodia',
    likes: '2.1K',
    followers: '2.8K',
    tags: ['Photos', 'Stories', 'News'],
    href: '/news/cambodia/instagram',
  },
];

const CAMBODIA_TEAMS: Teams[] = [
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

export default function CambodiaPage() {

  return (
    <div>
     <CountryIntroductionSection
      imageSrc="/images/cambodia/background.webp"
      title="Cambodia Team"
    />
    <div
      className="bg-cover bg-center bg-no-repeat"
      style={{ background: 'linear-gradient(to bottom, #FFF0F0, #F3F9FF)'}}
    >
    <section className="bg-no-repeat relative overflow-hidden">
      <div className="absolute bg-no-repeat -top-70 bg-right right-10 w-full h-250" style={{ backgroundImage: "url('/images/cambodia/flower_y.svg')",transform: 'scaleX(-1)', zIndex:2 }} />
      <div className="absolute bg-no-repeat top-80 bg-right -right-20 w-full h-250" style={{ backgroundImage: "url('/images/cambodia/flower_y.svg')",zIndex:2 }} />
     <LatestSocials 
        socials={CAMBODIA_SOCIALS}/>
      <TeamSection
        teams={CAMBODIA_TEAMS}
        title='Cambodia'
      />
    </section>
     <section className="bg-no-repeat relative overflow-hidden">
      <div className="absolute bg-no-repeat -top-90 bg-left left-0 w-full h-250" style={{ backgroundImage: "url('/images/cambodia/flower_r.svg')",zIndex:2 }} />
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
      </section>
      <div className="absolute bg-no-repeat top-700 bg-right w-full h-250" style={{ backgroundImage: "url('/images/cambodia/flower_b.svg')",zIndex:2 }} />
        <LoanTypesSection/>
      <section className="bg-no-repeat relative overflow-hidden">
        <div className="absolute bg-no-repeat top-100 bg-left -left-30 w-full h-full -mt-20" style={{ backgroundImage: "url('/images/cambodia/pattern.svg')" }} />
        <div className="absolute bg-no-repeat top-0 bg-right -right-60 w-full h-full -mt-20" style={{ backgroundImage: "url('/images/cambodia/pattern.svg')" }} />
        <ProcessStep/>
      </section>
    </div>
    <LoanDetailSection backgroundImage="/images/cambodia/loan_detail_bg.webp"/>
      <div style={{ background: 'linear-gradient(to bottom, #FFF0F0, #F3F9FF)' }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-no-repeat -bottom-100 bg-right right-0 w-full h-250" style={{ backgroundImage: "url('/images/cambodia/garland_r.svg')",zIndex:2 }} />
          <div className="absolute bg-no-repeat top-115 bg-left left-0 w-full h-250" style={{ backgroundImage: "url('/images/cambodia/garland_l.svg')",zIndex:2 }} />
          <EMICalculatorSection/>
          <LoanApplicationForm/>
        </section>
      </div>
    </div>
  );
}
