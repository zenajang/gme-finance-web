import { buildPageMetadata } from "@/lib/seo";
export { default } from "@/features/common/components/SimpleLayout";

export const metadata = buildPageMetadata({
  title: "Terms of Use",
  description: "Terms of use and service policies for GME Finance.",
  path: "/terms/use",
});
