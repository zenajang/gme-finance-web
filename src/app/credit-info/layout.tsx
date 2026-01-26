import { buildPageMetadata } from "@/lib/seo";
export { default } from "@/app/components/common/SimpleLayout";

export const metadata = buildPageMetadata({
  title: "Credit Information System",
  description: "Credit information system and related disclosures for GME Finance.",
  path: "/credit-info",
});
