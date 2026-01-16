import type { Metadata } from "next";
import '@radix-ui/themes/styles.css';
import "./globals.css";
import { Theme } from "@radix-ui/themes";
import PageLoadingSpinner from "./components/common/PageLoadingSpinner";
import LayoutWrapper from "./components/common/LayoutWrapper";
import I18nProvider from "./components/common/I18nProvider";
import ImageLoadGuard from "./components/common/ImageLoadGuard";
import ServiceWorkerRegistrar from "./components/common/ServiceWorkerRegistrar";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Finance",
  description: "GME Finance",
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
          <I18nProvider>
            <PageLoadingSpinner />
            <LayoutWrapper>{children}</LayoutWrapper>
          </I18nProvider>
        </Theme>
      </body>
    </html>
  );
}
