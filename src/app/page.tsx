import dynamic from 'next/dynamic';
import IntroductionSection from "./components/home/IntroductionSection";
import CountrySection from "./components/home/CountrySection";
import {
  NewsLoadingSkeleton,
  FeedbackLoadingSkeleton,
  BannerLoadingSkeleton,
  BranchLoadingSkeleton
} from "./components/common/LoadingSkeletons";

const AnimatedBannerSection = dynamic(
  () => import("./components/home/AnimatedBannerSection"),
  { loading: () => <BannerLoadingSkeleton /> }
);

const LatestNewsSection = dynamic(
  () => import("./components/home/LatestNewsSection"),
  { loading: () => <NewsLoadingSkeleton /> }
);

const CustomerFeedbackSection = dynamic(
  () => import("./components/home/CustomerFeedbackSection"),
  { loading: () => <FeedbackLoadingSkeleton /> }
);

const LoanTypesSection = dynamic(
  () => import("./components/home/LoanTypesSection"),
  { loading: () => <div className="h-96 bg-white animate-pulse" /> }
);

const SimpleLoanApplySection = dynamic(
  () => import("./components/home/SimpleLoanApplySection"),
  { loading: () => <div className="h-96 bg-gray-50 animate-pulse" /> }
);

const FindBranchSection = dynamic(
  () => import("./components/home/FindBranchSection"),
  { loading: () => <BranchLoadingSkeleton /> }
);


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