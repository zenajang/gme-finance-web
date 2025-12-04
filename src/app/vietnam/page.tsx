
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

const VIETNAM_SOCIALS: SocialsItem[] = [
  {
    id: 'facebook',
    image: '/images/vietnam/social1.jpg',
    snsLogo: '/images/icons/facebook.svg',
    title: 'GME Finance Vietnam',
    likes: '2.5K',
    followers: '3.1K',
    tags: ['Event', 'News', 'Updates'],
    href: '/news/vietnam/facebook',
  },
  {
    id: 'tiktok',
    image: '/images/vietnam/social2.jpg',
    snsLogo: '/images/icons/tictok.svg',
    title: 'GME Finance Vietnam',
    likes: '1.8K',
    followers: '2.4K',
    tags: ['Videos', 'Tips', 'Community'],
    href: '/news/vietnam/tiktok',
  },
  {
    id: 'instagram',
    image: '/images/vietnam/social3.jpg',
    snsLogo: '/images/icons/instagram.svg',
    title: 'GME Finance Vietnam',
    likes: '2.1K',
    followers: '2.8K',
    tags: ['Photos', 'Stories', 'News'],
    href: '/news/vietnam/instagram',
  },
];

const VIETNAM_TEAMS: Teams[] = [
  {
    id: 'lenissa',
    image: '/images/vietnam/team/lenissa.svg',
    name: 'Lenissa',
  },
  {
    id: 'haha',
    image: '/images/vietnam/team/haha.svg',
    name: 'Haha',

  }
];

export default function VietnamPage() {

  return (
    <div>
      <CountryIntroductionSection
        videoSrc="/images/vietnam/background.mp4"
        title="Vietnam Team"
      />
      <div
        className="bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ background: getGradient('vietnam') }}
      >
        <section className="bg-no-repeat relative overflow-hidden">
          <LatestSocials
            socials={VIETNAM_SOCIALS} />
          <div className="absolute bg-no-repeat -top-170 bg-left -left-30 w-full h-full" style={{ backgroundImage: "url('/images/vietnam/pattern_y.svg')", backgroundSize: '25% auto' }} />
          <TeamSection
            teams={VIETNAM_TEAMS}
            title='Vietnam'
          />
        </section>
        <TeamVideoSection
          title="Meet Our Vietnam Team"
          videoUrl="https://www.youtube.com/embed/oyHViqUxhhA"
          leftImageSrc="/images/vietnam/castle_l.svg"
          leftImageAlt="Left castle"
          leftImageWidth={530}
          leftImageHeight={530}
          leftImageStyle={{ left: '-450px', marginTop: '60px', zIndex: 1 }}
          rightImageSrc="/images/vietnam/castle_r.svg"
          rightImageAlt="Right castle"
          rightImageWidth={1000}
          rightImageHeight={1000}
          rightImageStyle={{ right: '-700px', marginTop: '68px', zIndex: 1 }}
        />
        <LoanTypesSection />
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-no-repeat bg-right -bottom-80 -right-50 w-full h-full" style={{ backgroundImage: "url('/images/vietnam/pattern_r.svg')", backgroundSize: '20% auto' }} />
          <ProcessStep />
        </section>
      </div>
      <LoanDetailSection backgroundImage="/images/vietnam/loan_detail_bg.webp" />
      <div style={{ background: getGradient('vietnam') }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <GarlandDecoration country="vietnam" />
          <EMICalculatorSection />
          <div className="mb-20">
            <LoanApplicationForm />
          </div>
        </section>
      </div>
    </div>
  );
}
