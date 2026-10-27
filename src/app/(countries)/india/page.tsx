
import { getColorScheme, getGradient } from "@/constants/colors";
import IntroductionSection from "@/features/common/components/IntroductionSection";
import EMICalculatorSection from "@/features/common/components/EMICalculatorSection";
import LatestSocials from "@/features/common/components/LatestSocials";
import LoanDetailSection from "@/features/common/components/LoanDetailSection";
import ProcessStep from "@/features/common/components/ProcessStep";
import TeamSection from "@/features/common/components/TeamSection";
import CountryBlogSection from "@/features/common/components/CountryBlogSection";
import GarlandDecoration from "@/features/common/components/GarlandDecoration";
import TeamVideoSection from "@/features/common/components/TeamVideoSection";
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
          </section>
        </div>
      </div>
    </div>
  );
}
