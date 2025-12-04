
import { getGradient } from "@/constants/colors";
import CountryIntroductionSection from "../components/home/CountryIntroductionSection";
import LoanTypesSection from "../components/home/LoanTypesSection";
import EMICalculatorSection from "../components/sections/EMICalculatorSection";
import LatestSocials, { SocialsItem } from "../components/sections/LatestSocials";
import LoanApplicationForm from "../components/sections/LoanApplicationForm";
import LoanDetailSection from "../components/sections/LoanDetailSection";
import ProcessStep from "../components/sections/ProcessStep";
import TeamSection, { Teams } from "../components/sections/TeamSection";
import GarlandDecoration from "../components/sections/GarlandDecoration";
import TeamVideoSection from "../components/sections/TeamVideoSection";

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
    id: 'ferry',
    image: '/images/indonesia/team/ferry.svg',
    name: 'FERRY',
  },
  {
    id: 'livi',
    image: '/images/indonesia/team/livi.svg',
    name: 'LIVI',

  },
  {
    id: 'adiba',
    image: '/images/team.svg',
    name: 'ADIBA',
  },
  {
    id: 'winda',
    image: '/images/team.svg',
    name: 'WINDA',
  },
  {
    id: 'sandi',
    image: '/images/team.svg',
    name: 'SANDI',

  },
  {
    id: 'widi',
    image: '/images/team.svg',
    name: 'WIDI',
  },
];

export default function IndonesiaPage() {

  return (
    <div>
      <CountryIntroductionSection
        videoSrc="/images/indonesia/background.mp4"
        title="Indonesia Team"
      />
      <div
        className="bg-cover bg-center bg-no-repeat"
        style={{ background: getGradient('indonesia') }}
      >
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-repeat bg-top top-0 w-full h-300" style={{ backgroundImage: "url('/images/indonesia/garland_d.svg')", transform: 'rotate(180deg)' }} />
          <LatestSocials
            socials={INDONESIA_SOCIALS} />
          <TeamSection
            teams={INDONESIA_TEAMS}
            title='Indonesia'
          />
        </section>
        <TeamVideoSection
          title="Meet Our Indonesia Team"
          videoUrl="https://www.youtube.com/embed/Q-AGuNjVNMU"
        />
        <LoanTypesSection />
        <section className="bg-no-repeat relative overflow-hidden">
          <ProcessStep />
          <div className="absolute bg-repeat bg-bottom bottom-0 right-0 w-full h-full" style={{ backgroundImage: "url('/images/indonesia/garland_u.svg')", transform: 'rotate(180deg)' }} />
        </section>
      </div>
      <LoanDetailSection backgroundImage="/images/indonesia/loan_detail_bg.webp" />
      <div style={{ background: getGradient('indonesia', true) }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <GarlandDecoration country="indonesia" />
          <EMICalculatorSection />
          <LoanApplicationForm />
        </section>
      </div>
    </div>
  );
}
