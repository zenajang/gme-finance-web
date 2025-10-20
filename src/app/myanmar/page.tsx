
import Image from "next/image";
import CountryIntroductionSection from "../components/home/CountryIntroductionSection";
import LoanTypesSection from "../components/home/LoanTypesSection";
import EMICalculatorSection from "../components/sections/EMICalculatorSection";
import LatestSocials, { SocialsItem } from "../components/sections/LatestSocials";
import LoanApplicationForm from "../components/sections/LoanApplicationForm";
import LoanDetailSection from "../components/sections/LoanDetailSection";
import ProcessStep from "../components/sections/ProcessStep";
import TeamSection, { Teams } from "../components/sections/TeamSection";

const MYANMAR_SOCIALS: SocialsItem[] = [
  {
    id: 'facebook',
    image: '/images/myanmar/social1.jpg',
    snsLogo: '/images/icons/facebook.svg',
    title: 'GME Finance Myanmar',
    likes: '2.5K',
    followers: '3.1K',
    tags: ['Event', 'News', 'Updates'],
    href: '/news/philippines/facebook',
  },
  {
    id: 'tiktok',
    image: '/images/myanmar/social2.jpg',
    snsLogo: '/images/icons/tictok.svg',
    title: 'GME Finance Myanmar',
    likes: '1.8K',
    followers: '2.4K',
    tags: ['Videos', 'Tips', 'Community'],
    href: '/news/myanmar/tiktok',
  },
  {
    id: 'instagram',
    image: '/images/myanmar/social3.jpg',
    snsLogo: '/images/icons/instagram.svg',
    title: 'GME Finance Myanmar',
    likes: '2.1K',
    followers: '2.8K',
    tags: ['Photos', 'Stories', 'News'],
    href: '/news/myanmar/instagram',
  },
];

const MYANMAR_TEAMS: Teams[] = [
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

export default function MyanmarPage() {

  return (
    <div>
     <CountryIntroductionSection
      imageSrc="/images/myanmar/background.jpg"
      title="Myanmar Team"
      buttonBgColor="#FF8000"
      buttonHoverBgColor="#f5b372ff"
      buttonTextColor="white"
    />
    <div
      className="bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/myanmar/section_bg.svg')" }}
    >
    <section className="bg-no-repeat bg-cover bg-center relative overflow-hidden">
      <div className="absolute bg-no-repeat bg-cover bg-center top-190 w-full h-330" style={{ backgroundImage: "url('/images/myanmar/wave_t.svg')" }} />
      <LatestSocials 
        socials={MYANMAR_SOCIALS}
        buttonBgColor="#FF8000"
        buttonHoverBgColor="#f5b372ff"
        />
      <TeamSection
        teams={MYANMAR_TEAMS}
        title='Myanmar'
        nameBgColor="#FF8000"
      />
    </section>
    <div style={{ background: 'linear-gradient(to bottom, #FFFFFF, #FFF0DB)' }}>
      <section className="relative overflow-visible">
        <div className="container mx-auto px-4 relative z-10 mb-20">
          <h2 className="text-5xl font-bold text-center mb-10">Meet Our Myanmar Team</h2>
          <p
            className="text-xl text-center mb-10 font-medium"
            style={{ color: "#FF8000" }}
          >
            The People Behind GME Finance
          </p>
          <div className="relative">
            <Image
              src="/images/myanmar/castle_l.svg"
              alt="Left castle"
              width={250}
              height={250}
              className="hidden lg:block absolute top-1/2 -translate-y-1/2"
              style={{ left: '-70px', marginTop:'84px', zIndex: 1 }}
              priority
            />
            <Image
              src="/images/myanmar/castle_r.svg"
              alt="Right castle"
              width={300}
              height={300}
              className="hidden lg:block absolute top-1/2 -translate-y-1/2"
              style={{ right: '-110px', marginTop:'102px', zIndex: 1 }}
              priority
            />
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
      <LoanTypesSection/>
      <div className="bg-no-repeat bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: "url('/images/myanmar/wave_b.svg')" }} />
      <ProcessStep subtitleColor="#FF8000"/>
    </div>
    </div>
    <LoanDetailSection backgroundImage="/images/myanmar/loan_detail_bg.jpg" />
      <section className="bg-no-repeat bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: "url('/images/myanmar/light.svg')" }}>
        <div className="absolute bg-no-repeat bottom-0 right-0 w-full h-100 -mr-285 -mb-20" style={{ backgroundImage: "url('/images/myanmar/garland_r.svg')" }} />
        <EMICalculatorSection buttonBgColor="#FF8000" buttonHoverBgColor="#e9b47eff"/>
        <div className="absolute bg-no-repeat top-180 left-0 w-full h-100 mt-0" style={{ backgroundImage: "url('/images/myanmar/garland_l.svg')" }} />
        <LoanApplicationForm buttonColor="#FF8000" subtitleColor="#FF8000"/>
      </section>
    </div>
  );
}
