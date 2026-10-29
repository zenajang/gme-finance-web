import { buildPageMetadata } from "@/lib/seo";
export { default } from "@/features/common/components/SimpleLayout";

export const metadata = buildPageMetadata({
  title: "Loan Product Information",
  description: "Loan product information and disclosures from GME Finance.",
  path: "/loan-product-info",
});
