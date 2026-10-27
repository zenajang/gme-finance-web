import { buildPageMetadata } from "@/lib/seo";
export { default } from "@/features/common/components/SimpleLayout";

export const metadata = buildPageMetadata({
  title: "Credit Information System",
  description: "Credit information system and related disclosures for GME Finance.",
  path: "/credit-info",
});
