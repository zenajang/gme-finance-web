import { buildPageMetadata } from "@/lib/seo";
export { default } from "@/features/common/components/SimpleLayout";

export const metadata = buildPageMetadata({
  title: "Blog",
  description: "Latest news, notices, and customer feedback from GME Finance.",
  path: "/about/blog",
});
