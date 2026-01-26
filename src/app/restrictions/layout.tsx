import { buildPageMetadata } from "@/lib/seo";
export { default } from "@/app/components/common/SimpleLayout";

export const metadata = buildPageMetadata({
  title: "Third-Party Disclosure",
  description: "Third-party disclosure and outsourcing status for GME Finance.",
  path: "/restrictions",
});
