import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
export { default } from "@/app/components/common/SimpleLayout";

type NoticeLayoutParams = {
  params: { slug: string };
};

export function generateMetadata({ params }: NoticeLayoutParams): Metadata {
  const slug = params.slug;
  const title = slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return buildPageMetadata({
    title: `Notice: ${title}`,
    description: "Official notice from GME Finance.",
    path: `/notices/${slug}`,
  });
}
