
import CountryIntroductionSection from "../components/home/CountryIntroductionSection";
import LoanTypesSection from "../components/home/LoanTypesSection";
import EMICalculatorSection from "../components/sections/EMICalculatorSection";
import LatestSocials, { SocialsItem } from "../components/sections/LatestSocials";
import LoanApplicationForm from "../components/sections/LoanApplicationForm";
import LoanDetailSection from "../components/sections/LoanDetailSection";
import ProcessStep from "../components/sections/ProcessStep";
import TeamSection, { Teams } from "../components/sections/TeamSection";

const PHILIPPINES_SOCIALS: SocialsItem[] = [
  {
    id: 'facebook',
    image: '/images/philippines/social1.jpg',
    snsLogo: '/images/icons/facebook.svg',
    title: 'GME Finance Philippines',
    likes: '2.5K',
    followers: '3.1K',
    tags: ['Event', 'News', 'Updates'],
    href: '/news/philippines/facebook',
  },
  {
    id: 'tiktok',
    image: '/images/philippines/social2.jpg',
    snsLogo: '/images/icons/tictok.svg',
    title: 'GME Finance Philippines',
    likes: '1.8K',
    followers: '2.4K',
    tags: ['Videos', 'Tips', 'Community'],
    href: '/news/philippines/tiktok',
  },
  {
    id: 'instagram',
    image: '/images/philippines/social3.jpg',
    snsLogo: '/images/icons/instagram.svg',
    title: 'GME Finance Philippines',
    likes: '2.1K',
    followers: '2.8K',
    tags: ['Photos', 'Stories', 'News'],
    href: '/news/philippines/instagram',
  },
];

const PHILIPPINES_TEAMS: Teams[] = [
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

export default function PhilippinesPage() {

  return (
    <div>
     <CountryIntroductionSection
      imageSrc="/images/philippines/background.png"
      title="Philippines Team"
    />
    <div
      className="bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/philippines/section_bg.svg')" }}
    >
    <section className="bg-no-repeat relative overflow-hidden">
      <div className="absolute bg-no-repeat top-10 left-0 w-full h-100 -mt-20" style={{ backgroundImage: "url('/images/philippines/garland_u.svg')" }} />
      <div className="absolute bg-no-repeat top-150 right-0 w-full h-100 -mr-215" style={{ backgroundImage: "url('/images/philippines/garland_d.svg')" }} />
      <LatestSocials 
        socials={PHILIPPINES_SOCIALS}/>
      <TeamSection
        teams={PHILIPPINES_TEAMS}
        title='Philippines'
      />
    </section>
     <section className="bg-no-repeat relative overflow-hidden">
      {/* 왼쪽 */}
      <div className="absolute bg-no-repeat bg-contain top-50 right-0 w-180 h-30 mr-195" style={{ backgroundImage: "url('/images/philippines/star_y.svg')" }} />
      <div className="absolute bg-no-repeat bg-contain top-90 right-0 w-180 h-16 mr-215" style={{ backgroundImage: "url('/images/philippines/star_b.svg')" }} />
      <div className="absolute bg-no-repeat bg-contain bottom-50 right-0 w-180 h-15 mr-205" style={{ backgroundImage: "url('/images/philippines/star_r.svg')" }} />
      <div className="absolute bg-no-repeat bg-contain bottom-20 right-0 w-180 h-20 mr-235" style={{ backgroundImage: "url('/images/philippines/star_y.svg')" }} />
      {/* 오른쪽 */}
      <div className="absolute bg-no-repeat bg-contain top-50 left-345 w-180 h-30 mr-195" style={{ backgroundImage: "url('/images/philippines/star_b.svg')" }} />
      <div className="absolute bg-no-repeat bg-contain top-90 left-380 w-180 h-16 mr-215" style={{ backgroundImage: "url('/images/philippines/star_r.svg')" }} />
      <div className="absolute bg-no-repeat bg-contain bottom-50 left-370 w-180 h-15 mr-205" style={{ backgroundImage: "url('/images/philippines/star_y.svg')" }} />
      <div className="absolute bg-no-repeat bg-contain bottom-20 left-390 w-180 h-20 mr-235" style={{ backgroundImage: "url('/images/philippines/star_b.svg')" }} />
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
        <div className="absolute bg-no-repeat top-40 left-0 w-full h-full -mt-20" style={{ backgroundImage: "url('/images/philippines/garland_3d.svg')" }} />
        <ProcessStep/>
      </section>
    </div>
    <LoanDetailSection backgroundImage="/images/philippines/loan_detail_bg.png"/>
      <div style={{ background: 'linear-gradient(to bottom, #FEF7DB, #FAE5EB, #FCFEFE, #DBECF4)' }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-no-repeat top-125 left-0 w-full h-full" style={{ backgroundImage: "url('/images/philippines/garland_l.svg')" }} />
          <div className="absolute bg-no-repeat bottom-0 right-0 w-full h-100 -mr-285" style={{ backgroundImage: "url('/images/philippines/garland_r.svg')" }} />
          <div className="absolute bg-no-repeat bg-contain top-190 right-200 w-500 h-370 -mr-275" style={{ backgroundImage: "url('/images/philippines/light.svg')" }} />
          <EMICalculatorSection/>
          <div className="mb-70 mt-20">
            <LoanApplicationForm/>
          </div>
        </section>
      </div>
    </div>
  );
}
