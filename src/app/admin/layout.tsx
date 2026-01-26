import type { Metadata } from "next";
export { default } from "@/app/components/common/SimpleLayout";

export const metadata: Metadata = {
  title: "Admin",
  description: "GME Finance admin portal.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};
