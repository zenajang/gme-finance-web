import { buildPageMetadata } from "@/lib/seo";
export { default } from "@/app/components/common/SimpleLayout";

export const metadata = buildPageMetadata({
  title: "Blog",
  description: "Latest news, notices, and customer feedback from GME Finance.",
  path: "/about/blog",
});
