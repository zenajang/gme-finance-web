import { NOINDEX, buildPageMetadata } from "@/lib/seo";
export { default } from "@/app/components/common/SimpleLayout";

// 목록에는 이름이 없지만(제목만 렌더) 공지 상세 270건으로 가는 링크를 그대로
// 노출한다. 검색에 띄울 공지는 sitemap 에 상세 URL 을 직접 넣어 처리한다.
export const metadata = {
  ...buildPageMetadata({
    title: "Notices",
    description: "Official notices and updates from GME Finance.",
    path: "/notices",
  }),
  robots: NOINDEX,
};
