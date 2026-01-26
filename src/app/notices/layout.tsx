import { buildPageMetadata } from "@/lib/seo";
export { default } from "@/app/components/common/SimpleLayout";

export const metadata = buildPageMetadata({
  title: "Notices",
  description: "Official notices and updates from GME Finance.",
  path: "/notices",
});
