import { buildPageMetadata } from "@/lib/seo";
export { default } from "@/features/common/components/SimpleLayout";

export const metadata = buildPageMetadata({
  title: "Product Change Notice",
  description: "Product and related change notices from GME Finance.",
  path: "/terms/product-changes",
});
