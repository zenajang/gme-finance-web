import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import MainIntroductionSection from "@/features/home/components/MainIntroductionSection";
import CountrySection from "@/features/home/components/CountrySection";
import {
  NewsLoadingSkeleton,
  FeedbackLoadingSkeleton,
  BannerLoadingSkeleton,
  BranchLoadingSkeleton
} from "./components/common/LoadingSkeletons";
import NewServiceSection from '@/features/home/components/NewServiceSection';

const AnimatedBannerSection = dynamic(
  () => import("@/features/home/components/AnimatedBannerSection"),
  { loading: () => <BannerLoadingSkeleton /> }
);

const LatestNewsSection = dynamic(
  () => import("@/features/home/components/LatestNewsSection"),
  { loading: () => <NewsLoadingSkeleton /> }
);

const CustomerFeedbackSection = dynamic(
  () => import("@/features/home/components/CustomerFeedbackSection"),
  { loading: () => <FeedbackLoadingSkeleton /> }
);

const LoanTypesSection = dynamic(
  () => import("@/features/home/components/LoanTypesSection"),
  { loading: () => <div className="h-96 bg-white animate-pulse" /> }
);

const SimpleLoanApplySection = dynamic(
  () => import("@/features/home/components/SimpleLoanApplySection"),
  { loading: () => <div className="h-96 bg-gray-50 animate-pulse" /> }
);

const FindBranchSection = dynamic(
  () => import("@/features/home/components/FindBranchSection"),
  { loading: () => <BranchLoadingSkeleton /> }
);

export const metadata: Metadata = {
  title: "GME Finance | Loan for Foreigners in Korea | 외국인대출",
  description: "Your Trusted Partner for Foreigner Loans in South Korea.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "GME Finance | Loan for Foreigners in Korea | 외국인대출",
    description: "Your Trusted Partner for Foreigner Loans in South Korea.",
    url: "/",
    images: [
      {
        url: "/images/logo.png",
      },
    ],
  },
  twitter: {
    title: "GME Finance | Loan for Foreigners in Korea | 외국인대출",
    description: "Your Trusted Partner for Foreigner Loans in South Korea.",
    images: ["/images/logo.png"],
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
