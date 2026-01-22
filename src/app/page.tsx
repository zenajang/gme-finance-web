import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import MainIntroductionSection from "./components/home/MainIntroductionSection";
import CountrySection from "./components/home/CountrySection";
import {
  NewsLoadingSkeleton,
  FeedbackLoadingSkeleton,
  BannerLoadingSkeleton,
  BranchLoadingSkeleton
} from "./components/common/LoadingSkeletons";
import NewServiceSection from './components/home/NewServiceSection';

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

export const metadata: Metadata = {
  title: "GME Finance | Loan for Foreigner in Korea | 외국인대출",
  description: "Your Trusted Partner for Foreigner Loans in South Korea.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "GME Finance | Loan for Foreigner in Korea | 외국인대출",
    description: "Your Trusted Partner for Foreigner Loans in South Korea.",
    url: "/",
  },
  twitter: {
    title: "GME Finance | Loan for Foreigner in Korea | 외국인대출",
    description: "Your Trusted Partner for Foreigner Loans in South Korea.",
  },
};

export default function Home() {

  return (
    <div className="min-h-screen">
      <MainIntroductionSection />
      <CountrySection />
      <AnimatedBannerSection />
      <LatestNewsSection />
      <CustomerFeedbackSection />
      <LoanTypesSection />
      <NewServiceSection />
      <SimpleLoanApplySection />
      <FindBranchSection />
    </div>
  );
}
