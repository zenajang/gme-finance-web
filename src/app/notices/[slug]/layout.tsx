import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { NOTICES } from "../data";
export { default } from "@/app/components/common/SimpleLayout";

// 검색 노출은 아래 slug만 허용. 나머지 공지(UUID 상세 등)는 noindex.
const INDEXABLE_SLUGS = new Set(["debt-adjustment-guide"]);

// Next.js 15 부터 params 는 Promise 다.
type NoticeLayoutParams = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: NoticeLayoutParams): Promise<Metadata> {
  const { slug } = await params;
  const notice = NOTICES.find((item) => item.slug === slug);
  const title =
    notice?.title ??
    slug
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

  const metadata = buildPageMetadata({
    title: notice ? title : `Notice: ${title}`,
    description: notice?.excerpt ?? "Official notice from GME Finance.",
    path: `/notices/${slug}`,
  });

  if (INDEXABLE_SLUGS.has(slug)) return metadata;

  return {
    ...metadata,
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  };
}
