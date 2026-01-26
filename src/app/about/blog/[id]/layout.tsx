import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
export { default } from "@/app/components/common/SimpleLayout";

type BlogLayoutParams = {
  params: { id: string };
};

export function generateMetadata({ params }: BlogLayoutParams): Metadata {
  const postId = params.id;

  return buildPageMetadata({
    title: `Blog Post ${postId}`,
    description: "Read the latest GME Finance blog post and updates.",
    path: `/about/blog/${postId}`,
  });
}
