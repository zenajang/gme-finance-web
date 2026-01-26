import { buildPageMetadata } from "@/lib/seo";
export { default } from "@/app/components/common/SimpleLayout";

export const metadata = buildPageMetadata({
  title: "Countries",
  description: "Explore GME Finance service pages by country for foreigner loans in Korea.",
  path: "/countries",
});
