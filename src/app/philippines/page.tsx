
import CountryIntroductionSection from "../components/home/CountryIntroductionSection";
import LoanTypesSection from "../components/home/LoanTypesSection";
import EMICalculatorSection from "../components/sections/EMICalculatorSection";
import GarlandDecoration from "../components/sections/GarlandDecoration";
import LatestSocials, { SocialsItem } from "../components/sections/LatestSocials";
import LoanApplicationForm from "../components/sections/LoanApplicationForm";
import LoanDetailSection from "../components/sections/LoanDetailSection";
import ProcessStep from "../components/sections/ProcessStep";
import TeamSection, { Teams } from "../components/sections/TeamSection";
import { getGradient } from "@/constants/colors";
import TeamVideoSection from "../components/sections/TeamVideoSection";

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
    id: 'glen',
    image: '/images/philippines/team/glen.svg',
    name: 'GLEN',
  },
  {
    id: 'eunice',
    image: '/images/philippines/team/eunice.svg',
    name: 'EUNICE',

  },
  {
    id: 'cherry',
    image: '/images/philippines/team/cherry.svg',
    name: 'CHERRY',
  },
  {
    id: 'jo',
    image: '/images/team.svg',
    name: 'JO',
  },
  {
    id: 'josh',
    image: '/images/team.svg',
    name: 'JOSH',

  },
  {
    id: 'kais',
    image: '/images/team.svg',
    name: 'KAIS',
  },
];

export default function PhilippinesPage() {

  return (
    <div>
      <CountryIntroductionSection
        videoSrc="/images/philippines/background.mp4"
        title="Philippines"
      />
      <div
        className="bg-cover bg-center bg-no-repeat"
        style={{ background: getGradient('philippines') }}
      >
        <section className="bg-no-repeat relative overflow-hidden">
          <LatestSocials
            socials={PHILIPPINES_SOCIALS} />
          <TeamSection
            teams={PHILIPPINES_TEAMS}
            title='Philippines'
          />
        </section>
        <TeamVideoSection
          title="Meet Our Philippines Team"
          videoUrl="https://www.youtube.com/embed/xWK8F88Akeo"
          leftImageSrc="/images/philippines/castle_l.svg"
          leftImageAlt="Left castle"
          leftImageWidth={600}
          leftImageHeight={600}
          leftImageStyle={{ left: '-550px', marginTop: '105px', zIndex: 1 }}
          rightImageSrc="/images/philippines/castle_r.svg"
          rightImageAlt="Right castle"
          rightImageWidth={370}
          rightImageHeight={370}
          rightImageStyle={{ right: '-315px', marginTop: '-10px', zIndex: 1 }}
        />
        <LoanTypesSection />
        <section className="bg-no-repeat relative overflow-hidden">
          <ProcessStep />
        </section>
      </div>
      <LoanDetailSection backgroundImage="/images/philippines/loan_detail_bg.webp" country="philippines" />
      <div style={{ background: getGradient('philippines', true) }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <GarlandDecoration country="philippines" />
          <EMICalculatorSection />
          <div className="mb-20">
            <LoanApplicationForm country="philippines" />
          </div>
        </section>
      </div>
    </div>
  );
}
