import type { MetadataRoute } from "next";
import { INDEXABLE_NOTICE_SLUGS } from "./notices/data";

const baseUrl = "https://gmefinance.com";

// 관리 화면은 모든 크롤러에게 공통 차단.
const ALWAYS_DISALLOW = ["/admin", "/login"];

// robots.txt 그룹은 배타적이다. 특정 user-agent 그룹에 매칭된 크롤러는
// "*" 그룹을 아예 무시하므로, 각 그룹에 ALWAYS_DISALLOW 를 다시 넣어야 한다.
//
// Googlebot 은 여기 넣지 않는다. /notices/ 크롤을 막으면 noindex 메타태그를
// 읽지 못해 오히려 색인에서 빠지지 않는다. 구글은 noindex 로 처리한다.
// (Google-Extended 는 학습/그라운딩 전용 토큰이라 색인에 영향 없음)
const AI_CRAWLERS = [
  "Google-Extended",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "CCBot",
  "Bytespider",
  "Applebot-Extended",
  "meta-externalagent",
];

// 공지 상세는 개인정보(연체자 명단)를 렌더하므로 AI 크롤러에게 차단.
// 단 안내성 공지 1건은 검색 노출이 필요해 Allow 로 되살린다.
// 구글은 Disallow/Allow 중 경로가 더 긴 쪽을 적용하므로
// "/notices/debt-adjustment-guide" 가 "/notices" 보다 우선한다.
// 슬래시 없는 "/notices" 로 두면 접두 매칭이 목록(/notices)과
// 상세(/notices/...)를 한 번에 덮는다. "/notices/" 는 목록을 놓친다.
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
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: NOTICE_ALLOW,
        disallow: [...ALWAYS_DISALLOW, NOTICE_DISALLOW],
      })),
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
