import { buildPageMetadata } from "@/lib/seo";
export { default } from "@/app/components/common/SimpleLayout";

export const metadata = buildPageMetadata({
  title: "Terms of Use",
  description: "Terms of use and service policies for GME Finance.",
  path: "/usage",
});
