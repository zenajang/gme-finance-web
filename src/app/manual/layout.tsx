import { buildPageMetadata } from "@/lib/seo";
export { default } from "@/app/components/common/SimpleLayout";

export const metadata = buildPageMetadata({
  title: "Loan Product Information",
  description: "Loan product information and disclosures from GME Finance.",
  path: "/manual",
});
