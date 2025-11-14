
import CountryIntroductionSection from "../components/home/CountryIntroductionSection";
import LoanTypesSection from "../components/home/LoanTypesSection";
import EMICalculatorSection from "../components/sections/EMICalculatorSection";
import LatestSocials, { SocialsItem } from "../components/sections/LatestSocials";
import LoanApplicationForm from "../components/sections/LoanApplicationForm";
import LoanDetailSection from "../components/sections/LoanDetailSection";
import ProcessStep from "../components/sections/ProcessStep";
import TeamSection, { Teams } from "../components/sections/TeamSection";
import { getGradient } from "@/constants/colors";
import GarlandDecoration from "../components/sections/GarlandDecoration";
import TeamVideoSection from "../components/sections/TeamVideoSection";

const RUSSIA_SOCIALS: SocialsItem[] = [
  {
    id: 'facebook',
    image: '/images/russia/social1.jpg',
    snsLogo: '/images/icons/facebook.svg',
    title: 'GME Finance Russia',
    likes: '2.5K',
    followers: '3.1K',
    tags: ['Event', 'News', 'Updates'],
    href: '/news/russia/facebook',
  },
  {
    id: 'tiktok',
    image: '/images/russia/social2.jpg',
    snsLogo: '/images/icons/tictok.svg',
    title: 'GME Finance Russia',
    likes: '1.8K',
    followers: '2.4K',
    tags: ['Videos', 'Tips', 'Community'],
    href: '/news/russia/tiktok',
  },
  {
    id: 'instagram',
    image: '/images/russia/social3.jpg',
    snsLogo: '/images/icons/instagram.svg',
    title: 'GME Finance Russia',
    likes: '2.1K',
    followers: '2.8K',
    tags: ['Photos', 'Stories', 'News'],
    href: '/news/russia/instagram',
  },
];

const RUSSIA_TEAMS: Teams[] = [
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

export default function RussiaPage() {

  return (
    <div>
     <CountryIntroductionSection
      imageSrc="/images/russia/background.webp"
      title="Russia Team"
      buttonTextColor="#3A57B4"
      buttonHoverBgColor="#e1e6f5ff"
    />
    <div
      className="bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ background: getGradient('russia')}}
    >
    <section className="bg-no-repeat relative overflow-hidden">
      <div className="absolute bg-repeat bg-top top-0 w-full h-130" style={{ backgroundImage: "url('/images/russia/snow_bg_b.svg')" }} />
      <LatestSocials 
        socials={RUSSIA_SOCIALS}
        buttonBgColor="#3A57B4"
        buttonHoverBgColor="#ccd7f8ff"
        />
      <TeamSection
        teams={RUSSIA_TEAMS}
        title='CIS'
        nameBgColor="#3A57B4"
      />
    </section>
      <TeamVideoSection
        title="Meet Our CIS Team"
        subtitleColor="#3A57B4"
        videoUrl="https://www.youtube.com/embed/mX9zCgpqohU"
        leftImageSrc="/images/russia/castle_l.svg"
        leftImageAlt="Left castle"
        leftImageWidth={380}
        leftImageHeight={380}
        leftImageStyle={{ left: '-320px', marginTop:'60px', zIndex: 1 }}
        rightImageSrc="/images/russia/castle_r.svg"
        rightImageAlt="Right castle"
        rightImageWidth={350}
        rightImageHeight={350}
        rightImageStyle={{ right: '-290px', marginTop:'10px', zIndex: 1 }}
      />
        <LoanTypesSection/>
      <section className="bg-no-repeat relative overflow-hidden">
      <div className="absolute bg-no-repeat bg-bottom bottom-0 w-full h-135" style={{ backgroundImage: "url('/images/russia/snow_bg.svg')" }} />
      <ProcessStep subtitleColor="#3A57B4"/>
      </section>
    </div>
    <LoanDetailSection backgroundImage="/images/russia/loan_detail_bg.webp"/>
      <div style={{ background: getGradient('russia', true) }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <GarlandDecoration country="russia" variant="compact" />
          <EMICalculatorSection/>
          <div className="mb-69">
          <LoanApplicationForm/>
          </div>
        </section>
      </div>
    </div>
  );
}
