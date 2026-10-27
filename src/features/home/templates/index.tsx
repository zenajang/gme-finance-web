import RevealObserver from '@/features/home/atoms/RevealObserver';
import {
  AppSection,
  CalculatorSection,
  DocumentsSection,
  EligibilitySection,
  FaqSection,
  FinalCtaSection,
  HeroSection,
  HowToApplySection,
  LoanTermsSection,
  StatsStrip,
  WhyChooseSection,
} from '@/features/home/organisms';

// 홈 섹션 조합. Header · Footer · <main> 은 LayoutWrapper 가 감싼다.
// 배경: 시안처럼 건물 이미지를 고정하고 흰색 막(.76)을 덮는다.
const HomeTemplate = () => {
  return (
    <div className="bg-fog bg-[linear-gradient(rgba(255,255,255,.76),rgba(255,255,255,.76)),url(/images/home/background.png)] bg-cover bg-fixed bg-center bg-no-repeat">
      <HeroSection />
      <LoanTermsSection />
      <StatsStrip />
      <EligibilitySection />
      <CalculatorSection />
      <DocumentsSection />
      <HowToApplySection />
      <WhyChooseSection />
      <AppSection />
      <FaqSection />
      <FinalCtaSection />
      <RevealObserver />
    </div>
  );
};

export default HomeTemplate;
