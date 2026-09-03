import type { Metadata } from "next";
import { INDEX, NOINDEX, buildPageMetadata } from "@/lib/seo";
import { INDEXABLE_NOTICE_SLUGS, NOTICES } from "../data";
export { default } from "@/app/components/common/SimpleLayout";

const INDEXABLE_SLUGS = new Set(INDEXABLE_NOTICE_SLUGS);

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

  // 부모 /notices/layout.tsx 가 robots: NOINDEX 를 걸어두므로, 허용 슬러그는
  // robots 를 생략하면 안 되고 INDEX 로 명시해 덮어써야 한다.
  return {
    ...metadata,
    robots: INDEXABLE_SLUGS.has(slug) ? INDEX : NOINDEX,
  };
}
