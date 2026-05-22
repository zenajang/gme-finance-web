
import { getColorScheme, getGradient } from "@/constants/colors";
import IntroductionSection from "@/features/home/components/IntroductionSection";
import LoanTypesSection from "@/features/home/components/LoanTypesSection";
import EMICalculatorSection from "@/features/home/sections/EMICalculatorSection";
import LatestSocials from "@/features/home/sections/LatestSocials";
import LoanApplicationForm from "@/features/home/sections/LoanApplicationForm";
import LoanDetailSection from "@/features/home/sections/LoanDetailSection";
import ProcessStep from "@/features/home/sections/ProcessStep";
import TeamSection from "@/features/home/sections/TeamSection";
import CountryBlogSection from "@/features/home/sections/CountryBlogSection";
import GarlandDecoration from "@/features/home/sections/GarlandDecoration";
import TeamVideoSection from "@/features/home/sections/TeamVideoSection";
import { COUNTRY_SOCIALS, COUNTRY_TEAMS, COUNTRY_PHONES } from "@/constants/countryPageData";

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
        mobilePhone={COUNTRY_PHONES.india?.mobile}
        hotlinePhone={COUNTRY_PHONES.india?.hotline}
      />
      <div
        className="bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ background: getGradient('india') }}
      >
        <section className="bg-no-repeat relative overflow-hidden">
          <div className="absolute pointer-events-none bg-no-repeat -top-20 -left-10 w-full h-full" style={{ backgroundImage: "url('/images/india/pattern_o_r.svg')", backgroundSize: '25%', backgroundPosition: 'left top' }} />
          <LatestSocials
            socials={COUNTRY_SOCIALS.india} buttonBgColor={colors.primary} buttonHoverBgColor={colors.hover}/>
          <CountryBlogSection country="india" />
          <TeamSection
            teams={COUNTRY_TEAMS.india}
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
          <div className="absolute pointer-events-none bg-no-repeat bg-right -bottom-70 -right-50 w-full h-full" style={{ backgroundImage: "url('/images/india/pattern_g_l.svg')" }} />
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
