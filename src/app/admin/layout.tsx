import type { Metadata } from "next";
export { default } from "@/features/common/components/SimpleLayout";

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
