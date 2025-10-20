import IntroductionSection from "./components/home/IntroductionSection";
import CountrySection from "./components/home/CountrySection";
import AnimatedBannerSection from "./components/home/AnimatedBannerSection";
import LatestNewsSection from "./components/home/LatestNewsSection";
import CustomerFeedbackSection from "./components/home/CustomerFeedbackSection";
import LoanTypesSection from "./components/home/LoanTypesSection";
import SimpleLoanApplySection from "./components/home/SimpleLoanApplySection";
import FindBranchSection from "./components/home/FindBranchSection";


export default function Home() {

  return (
    <div className="min-h-screen">
      <IntroductionSection />
      <CountrySection/>
      <AnimatedBannerSection/>
      <LatestNewsSection/>
      <CustomerFeedbackSection/>
      <LoanTypesSection/>
      <SimpleLoanApplySection/>
      <FindBranchSection/>
    </div>
  );
}