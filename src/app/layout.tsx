import type { Metadata } from "next";
import '@radix-ui/themes/styles.css';
import "./globals.css";
import { Theme } from "@radix-ui/themes";
import PageLoadingSpinner from "./components/common/PageLoadingSpinner";
import LayoutWrapper from "./components/common/LayoutWrapper";
import AppProviders from "./components/common/AppProviders";
import ImageLoadGuard from "./components/common/ImageLoadGuard";
import ServiceWorkerRegistrar from "./components/common/ServiceWorkerRegistrar";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gme-finance-web.vercel.app"),
  title: {
    default: "GME Finance | Loan for Foreigner in Korea | 외국인대출",
    template: "%s | GME Finance",
  },
  description: "Your Trusted Partner for Foreigner Loans in South Korea.",
  openGraph: {
    title: "GME Finance | Loan for Foreigner in Korea | 외국인대출",
    description: "Your Trusted Partner for Foreigner Loans in South Korea.",
    url: "/",
    siteName: "GME Finance",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GME Finance | Loan for Foreigner in Korea | 외국인대출",
    description: "Your Trusted Partner for Foreigner Loans in South Korea.",
    images: ["/images/logo.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" className={inter.className}>
      <body
        className={`${inter.variable} antialiased min-h-screen bg-background text-foreground`}
        suppressHydrationWarning={true}
      >
        <Theme appearance="light" accentColor="indigo" radius="large">
          <ImageLoadGuard />
          <ServiceWorkerRegistrar />
          <AppProviders>
            <PageLoadingSpinner />
            <LayoutWrapper>{children}</LayoutWrapper>
          </AppProviders>
        </Theme>
      </body>
    </html>
  );
}
