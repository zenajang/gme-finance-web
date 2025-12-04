
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
    id: 'tabitha',
    image: '/images/cambodia/team/tabitha.svg',
    name: 'TABITHA',
  },
  {
    id: 'viny',
    image: '/images/cambodia/team/viny.svg',
    name: 'VINY',

  },
  {
    id: 'kanha',
    image: '/images/team.svg',
    name: 'KANHA',
  },
  {
    id: 'sophea',
    image: '/images/team.svg',
    name: 'SOPHEA',
  },
  {
    id: 'chhea',
    image: '/images/team.svg',
    name: 'CHHEA',
  },
];

export default function CambodiaPage() {

  return (
    <div>
      <CountryIntroductionSection
        videoSrc="/images/cambodia/background.mp4"
        title="Cambodia Team"
      />
      <div
        className="bg-cover bg-center bg-no-repeat"
        style={{ background: getGradient('cambodia') }}
      >
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-no-repeat -top-450 bg-center w-full" style={{ backgroundImage: "url('/images/cambodia/pattern_w.svg')", backgroundSize: '100%', height: '180%', backgroundRepeat: 'no-repeat', zIndex: 0 }} />
          <div className="relative" style={{ zIndex: 10 }}>
            <LatestSocials
              socials={CAMBODIA_SOCIALS} />
            <TeamSection
              teams={CAMBODIA_TEAMS}
              title='Cambodia'
            />
          </div>
        </section>
        <TeamVideoSection
          title="Meet Our Cambodia Team"
          videoUrl="https://www.youtube.com/embed/6Vv3F8utqbk"
          leftImageSrc="/images/cambodia/flower_l.svg"
          leftImageAlt="Left flower"
          leftImageWidth={200}
          leftImageHeight={200}
          leftImageStyle={{ left: '-200px', marginTop: '120px', zIndex: 1 }}
          rightImageSrc="/images/cambodia/flower_r.svg"
          rightImageAlt="Right flower"
          rightImageWidth={200}
          rightImageHeight={200}
          rightImageStyle={{ right: '-200px', marginTop: '120px', zIndex: 1 }}
        />
        <LoanTypesSection />
        <section className="bg-no-repeat relative">
          <div className="absolute bg-no-repeat -top-30 bg-center w-full pointer-events-none" style={{ backgroundImage: "url('/images/cambodia/pattern.svg')", backgroundSize: '90%', height: '240%', backgroundRepeat: 'no-repeat', zIndex: 0 }} />
          <div className="relative" style={{ zIndex: 10 }}>
            <ProcessStep />
          </div>
        </section>
      </div>
      <LoanDetailSection backgroundImage="/images/cambodia/loan_detail_bg.webp" />
      <div style={{ background: getGradient('cambodia', true) }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <GarlandDecoration country="cambodia" />
          <EMICalculatorSection />
          <div className="mb-20 mt-10">
            <LoanApplicationForm />
          </div>
        </section>
      </div>
    </div>
  );
}
