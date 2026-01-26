import { buildPageMetadata } from "@/lib/seo";
export { default } from "@/app/components/common/SimpleLayout";

export const metadata = buildPageMetadata({
  title: "Product Change Notice",
  description: "Product and related change notices from GME Finance.",
  path: "/marketing",
});
