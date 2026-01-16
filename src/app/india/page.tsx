
import { getColorScheme, getGradient } from "@/constants/colors";
import IntroductionSection from "../components/home/IntroductionSection";
import LoanTypesSection from "../components/home/LoanTypesSection";
import EMICalculatorSection from "../components/sections/EMICalculatorSection";
import LatestSocials, { SocialsItem } from "../components/sections/LatestSocials";
import LoanApplicationForm from "../components/sections/LoanApplicationForm";
import LoanDetailSection from "../components/sections/LoanDetailSection";
import ProcessStep from "../components/sections/ProcessStep";
import TeamSection, { Teams } from "../components/sections/TeamSection";
import GarlandDecoration from "../components/sections/GarlandDecoration";
import TeamVideoSection from "../components/sections/TeamVideoSection";

const INDIA_SOCIALS: SocialsItem[] = [
  {
    id: "fb-ind",
    platform: "facebook",
    embedUrl: "https://www.facebook.com/profile.php?id=61571686684974&locale=ko_KR",
    href: "https://www.facebook.com/profile.php?id=61571686684974&locale=ko_KR",
    image: "/images/dummy.jpg",
    snsLogo: "/images/icons/facebook.svg",
    title: "GME India Finance (Facebook)",
  },
  {
    id: "tt-ind",
    platform: "tiktok",
    embedUrl: "https://www.tiktok.com/@gmefinanceindia",
    href: "https://www.tiktok.com/@gmefinanceindia",
    image: "/images/dummy.jpg",
    snsLogo: "/images/icons/tictok.svg",
    title: "GME India Finance (TikTok)",
  },
  {
    id: "is-ind",
    platform: "instagram_post",
    embedUrl: "https://www.instagram.com/reel/DSRKwXCkc6J/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    href: "https://www.instagram.com/gmefinanceindia/",
    image: "/images/dummy.jpg",
    snsLogo: "/images/icons/instagram.svg",
    title: "GME India Finance (Instagram post)",
  },
];

const INDIA_TEAMS: Teams[] = [
   {
    id: 'malaika',
    image: '/images/team.svg',
    name: 'MALAIKA',
  },
];

export default function IndiaPage() {
  const colors =  getColorScheme('india')

  return (
    <div>
      <IntroductionSection
        videoSrc="/images/india/background.mp4"
        title="India"
        buttonTextColor={colors.primary}
        buttonHoverBgColor={colors.hover}
        buttonHref="#apply-loan-online"
      />
      <div
        className="bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ background: getGradient('india') }}
      >
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-no-repeat -top-20 -left-10 w-full h-full" style={{ backgroundImage: "url('/images/india/pattern_o_r.svg')", backgroundSize: '25%', backgroundPosition: 'left top' }} />
          <LatestSocials
            socials={INDIA_SOCIALS} buttonBgColor={colors.primary} buttonHoverBgColor={colors.hover}/>
          <TeamSection
            teams={INDIA_TEAMS}
            nameBgColor={colors.primary}
            title='India'
          />
        </section>
        <TeamVideoSection
          title="Meet Our India Team"
          subtitleColor="#F94B00"
          videoUrl="https://www.youtube.com/embed/8LYtzxvDWN4"
        />
        <LoanTypesSection />
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute bg-no-repeat bg-right -bottom-70 -right-50 w-full h-full" style={{ backgroundImage: "url('/images/india/pattern_g_l.svg')" }} />
          <ProcessStep />
        </section>
      </div>
      <LoanDetailSection backgroundImage="/images/india/loan_detail_bg.webp" country="india" />
      <div className="bg-cover bg-center bg-no-repeat" style={{ background: getGradient('india', true) }}>
        <div className="bg-cover bg-no-repeat" style={{ backgroundImage: "url('/images/india/bg.svg')", backgroundPosition: 'center 50px' }}>
          <section className="bg-no-repeat relative overflow-hidden">
            <GarlandDecoration country="india" />
            <EMICalculatorSection buttonBgColor={colors.primary} buttonHoverBgColor={colors.hover}/>
            <div className="mb-20 mt-10">
              <LoanApplicationForm country="india" buttonBgColor={colors.primary} subtitleColor={colors.primary} anchorId="apply-loan-online" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
