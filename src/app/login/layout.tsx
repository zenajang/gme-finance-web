import type { Metadata } from "next";
export { default } from "@/features/common/components/SimpleLayout";

export const metadata: Metadata = {
  title: "Login",
  description: "GME Finance account login.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};
