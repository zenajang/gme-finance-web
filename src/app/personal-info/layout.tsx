import { buildPageMetadata } from "@/lib/seo";
export { default } from "@/app/components/common/SimpleLayout";

export const metadata = buildPageMetadata({
  title: "Privacy Policy",
  description: "Privacy policy and personal information handling by GME Finance.",
  path: "/personal-info",
});
