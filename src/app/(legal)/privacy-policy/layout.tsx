import { buildPageMetadata } from "@/lib/seo";
export { default } from "@/features/common/components/SimpleLayout";

export const metadata = buildPageMetadata({
  title: "Privacy Policy",
  description: "Privacy policy and personal information handling by GME Finance.",
  path: "/privacy-policy",
});
