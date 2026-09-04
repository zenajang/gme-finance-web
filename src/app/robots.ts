import type { MetadataRoute } from "next";
import { INDEXABLE_NOTICE_SLUGS } from "./notices/data";

const baseUrl = "https://gmefinance.com";

// 관리 화면은 모든 크롤러에게 공통 차단.
const ALWAYS_DISALLOW = ["/admin", "/login"];

// 실제로 페이지를 가져오는 크롤러(GPTBot, ClaudeBot, CCBot 등)는 일부러 막지
// 않는다. 크롤을 막으면 noindex 메타태그를 읽지 못해 이미 들어간 색인이 그대로
// 남는다. 공지의 검색 노출 차단은 전부 noindex 로 처리한다.
//
// Google-Extended 만 예외로 막는다. 이건 크롤러가 아니라 사용 허가 신호다.
// Googlebot 이 가져간 내용을 Gemini 학습/그라운딩에 써도 되는지만 결정하므로,
// 막아도 크롤과 색인 판정에는 영향이 없다.
const NOTICE_DISALLOW = "/notices";
const NOTICE_ALLOW = INDEXABLE_NOTICE_SLUGS.map((slug) => `/notices/${slug}`);

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ALWAYS_DISALLOW,
      },
      // robots.txt 그룹은 배타적이다. Google-Extended 로 매칭된 요청은 "*" 그룹을
      // 아예 무시하므로 ALWAYS_DISALLOW 를 다시 넣어야 한다.
      //
      // 안내성 공지 1건은 검색 노출이 필요해 Allow 로 되살린다. 구글은
      // Disallow/Allow 중 경로가 더 긴 쪽을 적용하므로
      // "/notices/debt-adjustment-guide" 가 "/notices" 보다 우선한다.
      // 슬래시 없는 "/notices" 는 목록(/notices)과 상세(/notices/...)를 함께 덮는다.
      {
        userAgent: "Google-Extended",
        allow: NOTICE_ALLOW,
        disallow: [...ALWAYS_DISALLOW, NOTICE_DISALLOW],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
