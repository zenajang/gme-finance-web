import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@radix-ui/themes/styles.css';
import { Theme } from "@radix-ui/themes";
import PageLoadingSpinner from "./components/common/PageLoadingSpinner";
import LayoutWrapper from "./components/common/LayoutWrapper";


const inter = Inter({
 variable: "--font-inter",
 subsets: ["latin"],
 display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="en">
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
        suppressHydrationWarning={true}
      >
        <Theme appearance="light" accentColor="indigo" radius="large">
          <PageLoadingSpinner />
          <LayoutWrapper>{children}</LayoutWrapper>
        </Theme>
      </body>
    </html>
  );
}
