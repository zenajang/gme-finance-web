import { buildPageMetadata } from "@/lib/seo";
export { default } from "@/features/common/components/SimpleLayout";

export const metadata = buildPageMetadata({
  title: "Lending Company Terms",
  description: "Lending company terms and conditions for GME Finance services.",
  path: "/terms/company",
});
