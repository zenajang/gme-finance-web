
import CountryIntroductionSection from "../components/home/CountryIntroductionSection";
import LoanTypesSection from "../components/home/LoanTypesSection";
import EMICalculatorSection from "../components/sections/EMICalculatorSection";
import LatestSocials, { SocialsItem } from "../components/sections/LatestSocials";
import LoanApplicationForm from "../components/sections/LoanApplicationForm";
import LoanDetailSection from "../components/sections/LoanDetailSection";
import ProcessStep from "../components/sections/ProcessStep";
import TeamSection, { Teams } from "../components/sections/TeamSection";

const INDONESIA_SOCIALS: SocialsItem[] = [
  {
    id: 'facebook',
    image: '/images/indonesia/social1.jpg',
    snsLogo: '/images/icons/facebook.svg',
    title: 'GME Finance Indonesia',
    likes: '2.5K',
    followers: '3.1K',
    tags: ['Event', 'News', 'Updates'],
    href: '/news/indonesia/facebook',
  },
  {
    id: 'tiktok',
    image: '/images/indonesia/social2.jpg',
    snsLogo: '/images/icons/tictok.svg',
    title: 'GME Finance Indonesia',
    likes: '1.8K',
    followers: '2.4K',
    tags: ['Videos', 'Tips', 'Community'],
    href: '/news/indonesia/tiktok',
  },
  {
    id: 'instagram',
    image: '/images/indonesia/social3.jpg',
    snsLogo: '/images/icons/instagram.svg',
    title: 'GME Finance Indonesia',
    likes: '2.1K',
    followers: '2.8K',
    tags: ['Photos', 'Stories', 'News'],
    href: '/news/indonesia/instagram',
  },
];

const INDONESIA_TEAMS: Teams[] = [
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

export default function IndonesiaPage() {

  return (
    <div>
     <CountryIntroductionSection
      imageSrc="/images/indonesia/background.jpg"
      title="Indonesia Team"
    />
     <div
      className="bg-cover bg-center bg-no-repeat"
      style={{ background: 'linear-gradient(to bottom, #FFE6D8, #FFC8C8, #FFF3F3, #FFF8F5, #FFEBEB)'}}
    >
    <section className="bg-no-repeat relative overflow-hidden">
    <div className="absolute bg-repeat bg-top top-0 w-full h-300" style={{ backgroundImage: "url('/images/indonesia/garland_u.svg')" }} />
      <LatestSocials 
        socials={INDONESIA_SOCIALS}/>
      <TeamSection
        teams={INDONESIA_TEAMS}
        title='Indonesia'
      />
    </section>
     <section className="bg-no-repeat relative overflow-hidden">
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
        <LoanTypesSection/>
      <section className="bg-no-repeat relative overflow-hidden">
        <ProcessStep/>
      <div className="absolute bg-repeat bg-bottom bottom-0 right-0 w-full h-full" style={{ backgroundImage: "url('/images/indonesia/garland_d.svg')" }} />
      </section>
    </div>
    <LoanDetailSection backgroundImage="/images/indonesia/loan_detail_bg.jpg"/>
      <div style={{ background: 'linear-gradient(to bottom,  #FFECEC, #FFFFFF, #FFECEC)' }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-no-repeat -bottom-80 bg-left left-0 w-full h-250" style={{ backgroundImage: "url('/images/indonesia/garland_l.svg')",zIndex:2 }} />
          <div className="absolute bg-no-repeat top-115 bg-right right-0 w-full h-250" style={{ backgroundImage: "url('/images/indonesia/garland_r.svg')",zIndex:2 }} />
          <EMICalculatorSection/>
          <LoanApplicationForm/>
          <div className="absolute bg-repeat bg-bottom bottom-0 right-0 w-full h-full" style={{ backgroundImage: "url('/images/indonesia/garland_d.svg')" }} />
        </section>
      </div>
    </div>
  );
}
