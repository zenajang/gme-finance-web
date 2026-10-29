import { buildPageMetadata } from "@/lib/seo";
export { default } from "@/features/common/components/SimpleLayout";

export const metadata = buildPageMetadata({
  title: "Countries",
  description: "Explore GME Finance service pages by country for foreigner loans in Korea.",
  path: "/countries",
});
