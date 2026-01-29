import type { Metadata, Viewport } from "next";
import '@radix-ui/themes/styles.css';
import "./globals.css";
import { Theme } from "@radix-ui/themes";
import PageLoadingSpinner from "./components/common/PageLoadingSpinner";
import LayoutWrapper from "./components/common/LayoutWrapper";
import AppProviders from "./components/common/AppProviders";
import ImageLoadGuard from "./components/common/ImageLoadGuard";
import ServiceWorkerRegistrar from "./components/common/ServiceWorkerRegistrar";
import { Inter } from "next/font/google";
import en from "@/i18n/locales/en.json";
import GoogleAnalytics from "./components/google-analytics/GoogleAnalytics";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gmefinance.com"),
  title: {
    default: "GME Finance | Loan for Foreigner in Korea | 외국인대출",
    template: "%s | GME Finance",
  },
  description: "Your Trusted Partner for Foreigner Loans in South Korea.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

function stripLabel(text: string) {
  const separatorIndex = text.indexOf(":");
  if (separatorIndex === -1) return text.trim();
  return text.slice(separatorIndex + 1).trim();
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const footer = en.footer;
  const companyName = stripLabel(footer.companyName);
  const address = stripLabel(footer.address);
  const phone = stripLabel(footer.phone);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: companyName,
    url: "https://gmefinance.com",
    logo: "https://gmefinance.com/images/logo.png",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: phone,
        contactType: "customer service",
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
    },
  };

  return (
    <html lang="en" className={inter.className}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} antialiased min-h-screen bg-background text-foreground`}
        suppressHydrationWarning={true}
      >
        <Script id="channeltalk-sdk" strategy="afterInteractive">
          {`(function(){var w=window;if(w.ChannelIO){return w.console.error("ChannelIO script included twice.");}var ch=function(){ch.c(arguments);};ch.q=[];ch.c=function(args){ch.q.push(args);};w.ChannelIO=ch;function l(){if(w.ChannelIOInitialized){return;}w.ChannelIOInitialized=true;var s=document.createElement("script");s.type="text/javascript";s.async=true;s.src="https://cdn.channel.io/plugin/ch-plugin-web.js";var x=document.getElementsByTagName("script")[0];if(x.parentNode){x.parentNode.insertBefore(s,x);}}if(document.readyState==="complete"){l();}else{w.addEventListener("DOMContentLoaded",l);w.addEventListener("load",l);}})();`}
        </Script>
        <Script id="channeltalk-boot" strategy="afterInteractive">
          {`ChannelIO('boot', { "pluginKey": "24dc2dfd-3ed1-4953-b395-a2255ed41dae" });`}
        </Script>
        <GoogleAnalytics/>
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
