
import IntroductionSection from "@/features/common/components/IntroductionSection";
import LoanTypesSection from "@/features/common/components/LoanTypesSection";
import EMICalculatorSection from "@/features/common/components/EMICalculatorSection";
import GarlandDecoration from "@/features/common/components/GarlandDecoration";
import LatestSocials from "@/features/common/components/LatestSocials";
import LoanDetailSection from "@/features/common/components/LoanDetailSection";
import ProcessStep from "@/features/common/components/ProcessStep";
import TeamSection from "@/features/common/components/TeamSection";
import CountryBlogSection from "@/features/common/components/CountryBlogSection";
import { getColorScheme, getGradient } from "@/constants/colors";
import TeamVideoSection from "@/features/common/components/TeamVideoSection";
import { COUNTRY_SOCIALS, COUNTRY_TEAMS, COUNTRY_PHONES } from "@/constants/countryPageData";

export default function PhilippinesPage() {
  const colors = getColorScheme('philippines')
  return (
    <div>
      <IntroductionSection
        videoSrc="/images/philippines/background.webm"
        title="Philippines"
        buttonHref="#apply-loan-online"
        mobilePhone={COUNTRY_PHONES.philippines?.mobile}
        hotlinePhone={COUNTRY_PHONES.philippines?.hotline}
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
        {/* <LoanTypesSection /> */}
        <section className="bg-no-repeat relative overflow-hidden">
          <ProcessStep />
        </section>
      </div>
      <LoanDetailSection backgroundImage="/images/philippines/loan_detail_bg.webp" country="philippines" />
      <div style={{ background: getGradient('philippines', true) }}>
        <section className="bg-no-repeat relative overflow-hidden">
          <GarlandDecoration country="philippines" />
          <EMICalculatorSection />
        </section>
      </div>
    </div>
  );
}
