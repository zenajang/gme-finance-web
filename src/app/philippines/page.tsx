
import IntroductionSection from "@/features/home/components/IntroductionSection";
import LoanTypesSection from "@/features/home/components/LoanTypesSection";
import EMICalculatorSection from "@/features/home/sections/EMICalculatorSection";
import GarlandDecoration from "@/features/home/sections/GarlandDecoration";
import LatestSocials from "@/features/home/sections/LatestSocials";
import LoanApplicationForm from "@/features/home/sections/LoanApplicationForm";
import LoanDetailSection from "@/features/home/sections/LoanDetailSection";
import ProcessStep from "@/features/home/sections/ProcessStep";
import TeamSection from "@/features/home/sections/TeamSection";
import CountryBlogSection from "@/features/home/sections/CountryBlogSection";
import { getColorScheme, getGradient } from "@/constants/colors";
import TeamVideoSection from "@/features/home/sections/TeamVideoSection";
import { COUNTRY_SOCIALS, COUNTRY_TEAMS } from "@/constants/countryPageData";

export default function PhilippinesPage() {
  const colors = getColorScheme('philippines')
  return (
    <div>
      <IntroductionSection
        videoSrc="/images/philippines/background.webm"
        title="Philippines"
        buttonHref="#apply-loan-online"
      />
      <div
        className="bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ background: getGradient('philippines') }}
      >
        <section className="bg-no-repeat relative overflow-hidden">
          <LatestSocials
            socials={COUNTRY_SOCIALS.philippines} />
          <CountryBlogSection country="philippines" />
          <TeamSection
            teams={COUNTRY_TEAMS.philippines}
            title='Philippines'
          />
        </section>
        <TeamVideoSection
          title="Meet Our Philippines Team"
          subtitleColor={colors.primary}
          videoUrl="https://www.youtube.com/embed/xWK8F88Akeo"
          leftImageSrc="/images/philippines/castle_l.svg"
          leftImageAlt="Left castle"
          leftImageWidth={600}
          leftImageHeight={600}
          leftImageOffsetX={200}
          leftImageStyle={{ width: '30vw',zIndex: 1 }}
          rightImageSrc="/images/philippines/castle_r.svg"
          rightImageAlt="Right castle"
          rightImageWidth={370}
          rightImageHeight={370}
          rightImageOffsetX={-10}
          rightImageStyle={{ width:'20vw',zIndex: 1 }}
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
          <LoanApplicationForm country="philippines"  anchorId="apply-loan-online" />
        </section>
      </div>
    </div>
  );
}
