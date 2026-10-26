import AppSection from '@/features/home/organisms/AppSection';
import CalculatorSection from '@/features/home/organisms/CalculatorSection';
import DocumentsSection from '@/features/home/organisms/DocumentsSection';
import EligibilitySection from '@/features/home/organisms/EligibilitySection';
import FaqSection from '@/features/home/organisms/FaqSection';
import HeroSection from '@/features/home/organisms/HeroSection';
import HowToApplySection from '@/features/home/organisms/HowToApplySection';
import LoanTermsSection from '@/features/home/organisms/LoanTermsSection';
import StatsStrip from '@/features/home/organisms/StatsStrip';
import WhyChooseSection from '@/features/home/organisms/WhyChooseSection';

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
    </div>
  );
};

export default HomeTemplate;
