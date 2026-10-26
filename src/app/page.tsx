import type { Metadata } from 'next';
import HomeTemplate from '@/features/home/templates';

export const metadata: Metadata = {
  title: "GME Finance | Loan for Foreigners in Korea | 외국인대출",
  description: "Your trusted partner for foreigner loans in South Korea.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "GME Finance | Loan for Foreigners in Korea | 외국인대출",
    description: "Your trusted partner for foreigner loans in South Korea.",
    url: "/",
    images: [
      {
        url: "/images/logo.png",
      },
    ],
  },
  twitter: {
    title: "GME Finance | Loan for Foreigners in Korea | 외국인대출",
    description: "Your trusted partner for foreigner loans in South Korea.",
    images: ["/images/logo.png"],
  },
};

export default function Home() {
  return <HomeTemplate />;
}
