import type { Metadata } from "next";
import "./globals.css";
import '@radix-ui/themes/styles.css';
import { Theme } from "@radix-ui/themes";
import PageLoadingSpinner from "./components/common/PageLoadingSpinner";
import LayoutWrapper from "./components/common/LayoutWrapper";
import I18nProvider from "./components/common/I18nProvider";

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
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/variable/woff2/SUIT-Variable.css"
        />
      </head>
      <body
        className="antialiased min-h-screen bg-background text-foreground"
        suppressHydrationWarning={true}
      >
        <Theme appearance="light" accentColor="indigo" radius="large">
          <I18nProvider>
            <PageLoadingSpinner />
            <LayoutWrapper>{children}</LayoutWrapper>
          </I18nProvider>
        </Theme>
      </body>
    </html>
  );
}
