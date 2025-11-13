
import { getColorScheme, getGradient } from "@/constants/colors";
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

const THAILAND_SOCIALS: SocialsItem[] = [
  {
    id: 'facebook',
    image: '/images/thailand/social1.jpg',
    snsLogo: '/images/icons/facebook.svg',
    title: 'GME Finance Thailand',
    likes: '2.5K',
    followers: '3.1K',
    tags: ['Event', 'News', 'Updates'],
    href: '/news/thailand/facebook',
  },
  {
    id: 'tiktok',
    image: '/images/thailand/social2.jpg',
    snsLogo: '/images/icons/tictok.svg',
    title: 'GME Finance Thailand',
    likes: '1.8K',
    followers: '2.4K',
    tags: ['Videos', 'Tips', 'Community'],
    href: '/news/thailand/tiktok',
  },
  {
    id: 'instagram',
    image: '/images/thailand/social3.jpg',
    snsLogo: '/images/icons/instagram.svg',
    title: 'GME Finance Thailand',
    likes: '2.1K',
    followers: '2.8K',
    tags: ['Photos', 'Stories', 'News'],
    href: '/news/thailand/instagram',
  },
];

const THAILAND_TEAMS: Teams[] = [
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

export default function ThailandPage() {
  const colors = getColorScheme('thailand')
  
  return (
    <div>
     <CountryIntroductionSection
      imageSrc="/images/thailand/background.webp"
      title="Thailand Team"
    />
    <div
      className="bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ background: getGradient('thailand')}}
    >
    <section className="bg-no-repeat relative overflow-hidden">
      <LatestSocials
        socials={THAILAND_SOCIALS}
        titleColor={colors.title}
        />
      <TeamSection
        teams={THAILAND_TEAMS}
        title='Thailand'
        titleColor={colors.title}
      />
    </section>
    <TeamVideoSection
      title="Meet Our Thailand Team"
      titleColor={colors.title}
      videoUrl="https://www.youtube.com/embed/QUxBfo6QAgk"
      centerImageSrc="/images/thailand/pattern.svg"
      centerImageAlt="Center pattern"
      centerImageWidth={2000}
      centerImageHeight={2000}
      centerImageStyle={{ opacity: 0.8, zIndex: 5, marginTop: '200px' }}
    />
    <LoanTypesSection titleColor={colors.title}/>
    <ProcessStep titleColor={colors.title} subtitleColor={colors.subtitle}/>
    </div>
    <LoanDetailSection backgroundImage="/images/bangladesh/loan_detail_bg.webp"/>
      <div style={{ background: colors.gradient2 }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-no-repeat top-90 bg-right -right-30 w-full h-250" style={{ backgroundImage: "url('/images/thailand/cloud_l.svg')", zIndex:1, }} />
          <div className="absolute bg-no-repeat top-20 bg-left -left-40 w-full h-80" style={{ backgroundImage: "url('/images/thailand/cloud_r.svg')", zIndex:1 }} />
          <GarlandDecoration country="thailand" />
          <EMICalculatorSection titleColor={colors.title}/>
          <LoanApplicationForm/>
        </section>
      </div>
    </div>
  );
}
