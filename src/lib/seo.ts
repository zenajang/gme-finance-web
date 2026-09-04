import type { Metadata } from "next";

const SITE_NAME = "GME Finance";
const DEFAULT_IMAGE = "/images/logo.png";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

// 색인만 거부하고 링크 추적은 허용한다(noindex, follow). 개인정보가 렌더되는
// 페이지에 붙인다. follow 를 막으면 크롤러가 목록에서 상세로 못 넘어가
// 이미 색인된 상세들이 noindex 를 읽지 못한 채 남는다.
export const NOINDEX: Metadata["robots"] = {
  index: false,
  follow: true,
  googleBot: { index: false, follow: true },
};

// 부모 layout 의 robots 를 덮어써야 하는 페이지용. Next.js 는 자식이
// robots 를 정의하지 않으면 부모 값을 그대로 상속한다.
export const INDEX: Metadata["robots"] = {
  index: true,
  follow: true,
};

export function buildPageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      images: [
        {
          url: DEFAULT_IMAGE,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [DEFAULT_IMAGE],
    },
  };
}
