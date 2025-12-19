"use client";

import Image from "next/image";
import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useTranslation } from "react-i18next";
import { COMMON_COLORS } from "@/constants/colors";

/** =========================
 * Types
 * ========================= */
export type SocialPlatform = "facebook" | "tiktok" | "instagram_post";

export type SocialsItem = {
  id?: string;
  image: string;   // (지금은 상단이 위젯이라 사실상 안 써도 됨. 기존 타입 유지용)
  snsLogo: string;
  title: string;
  href?: string;     // Visit 버튼 눌렀을 때 이동할 링크

  platform: SocialPlatform;
  embedUrl: string;  // facebook: page url / tiktok: profile url / instagram_post: post url
};

interface LatestSocialsProps {
  socials: SocialsItem[];
  buttonBgColor?: string;
  buttonHoverBgColor?: string;
  titleColor?: string;
}
/** =========================
 * Embeds
 * ========================= */

function FacebookPageEmbed({ pageUrl }: { pageUrl: string }) {
  const src =
    "https://www.facebook.com/plugins/page.php" +
    `?href=${encodeURIComponent(pageUrl)}` +
    "&tabs=timeline" +
    "&width=550" +
    "&height=520" +
    "&small_header=true" +
    "&adapt_container_width=true" +
    "&hide_cover=false" +
    "&show_facepile=false";

  return (
    <iframe
      title="facebook-page-plugin"
      src={src}
      width="100%"
      height="100%"
      style={{ border: "none", overflow: "hidden" }}
      scrolling="no"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      allowFullScreen
    />
  );
}

// 2) TikTok Creator Profile Embed
function parseTikTokUsername(url: string) {
  const m = url.match(/tiktok\.com\/@([^/?]+)/i);
  return m?.[1] ?? "";
}

function TikTokCreatorEmbed({ profileUrl }: { profileUrl: string }) {
  const username = useMemo(() => parseTikTokUsername(profileUrl), [profileUrl]);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!username) return;

    setIsLoading(true);

    // 기존 스크립트 제거 후 다시 로드
    const existingScript = document.getElementById("tiktok-embed-js");
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.id = "tiktok-embed-js";
    script.async = true;
    script.src = "https://www.tiktok.com/embed.js";
    document.body.appendChild(script);

    // iframe 생성 감지 후 2초 더 대기 (TikTok 렌더링 시간)
    const checkIframe = setInterval(() => {
      const iframe = containerRef.current?.querySelector("iframe");
      if (iframe) {
        clearInterval(checkIframe);
        setTimeout(() => setIsLoading(false), 5000);
      }
    }, 200);

    // 15초 후에도 안 되면 강제로 숨김
    const fallback = setTimeout(() => {
      setIsLoading(false);
      clearInterval(checkIframe);
    }, 15000);

    return () => {
      clearInterval(checkIframe);
      clearTimeout(fallback);
    };
  }, [username, profileUrl]);

  if (!username) {
    return <div className="text-sm p-4">TikTok 프로필 URL이 올바르지 않아요.</div>;
  }

  return (
    <div className="-mt-5 relative min-h-[400px]" ref={containerRef}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div
            className="w-10 h-10 rounded-full animate-spin"
            style={{ border: '4px solid #e5e7eb', borderTopColor: '#000' }}
          />
        </div>
      )}
      <blockquote
        className="tiktok-embed"
        cite={`https://www.tiktok.com/@${username}`}
        data-unique-id={username}
        data-embed-type="creator"
        style={{ maxWidth: "100%", minWidth: "0px" }}
      >
        <section />
      </blockquote>
    </div>
  );
}

function InstagramPostEmbed({ postUrl }: { postUrl: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Instagram embed.js 로드
    const scriptId = "instagram-embed-js";

    const processEmbed = () => {
      const win = window as Window & { instgrm?: { Embeds?: { process: () => void } } };
      if (win.instgrm?.Embeds) {
        win.instgrm.Embeds.process();
      }
    };

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.async = true;
      script.src = "https://www.instagram.com/embed.js";
      script.onload = processEmbed;
      document.body.appendChild(script);
    } else {
      // 이미 로드됨 → 바로 process
      processEmbed();
    }
  }, [postUrl]);

  const cleanUrl = postUrl.split("?")[0];

  return (
    <div ref={containerRef} className="w-full h-full flex items-start justify-center">
      <blockquote
        className="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink={cleanUrl}
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: 0,
          borderRadius: "3px",
          boxShadow: "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
          margin: "1px",
          maxWidth: "540px",
          minWidth: "326px",
          padding: 0,
          width: "100%",
        }}
      />
    </div>
  );
}

function SocialEmbed({ item }: { item: SocialsItem }) {
  if (item.platform === "facebook") return <FacebookPageEmbed pageUrl={item.embedUrl} />;
  if (item.platform === "tiktok") return <TikTokCreatorEmbed profileUrl={item.embedUrl} />;
  if (item.platform === "instagram_post") return <InstagramPostEmbed postUrl={item.embedUrl} />;
  return null;
}

/** =========================
 * Card
 * ========================= */
function SocialCard({
  item,
  buttonBgColor,
  buttonHoverBgColor,
  hoveredId,
  setHoveredId
}: {
  item: SocialsItem;
  buttonBgColor: string;
  buttonHoverBgColor: string;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  router: AppRouterInstance;
}) {
  const { t } = useTranslation();

  return (
    <article
      className="
        rounded-3xl bg-white
        flex flex-col
        h-[360px] md:h-[600px]
        shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]
        overflow-hidden
        mb-10
      "
    >
      {/* ✅ 위젯 영역: 높이 고정 + 내부 스크롤 */}
      <div className="w-full h-[240px] md:h-[420px] bg-white">
        <div className="w-full h-full overflow-y-auto overflow-x-hidden">
          <SocialEmbed item={item} />
        </div>
      </div>

      <div className="p-4 md:p-6 flex flex-col flex-1">
        <header className="mb-3 flex items-start gap-4">
          <Image
            src={item.snsLogo}
            alt="snsLogo"
            width={60}
            height={60}
            className="w-[40px] h-[40px] md:w-[60px] md:h-[60px]"
          />
          <div className="flex-1 mt-2">
            <h3 className="text-label leading-snug line-clamp-3 font-medium">{item.title}</h3>
          </div>
        </header>

        <div className="mt-auto px-0 md:px-30">
          <button
            onClick={() => {
              if (!item.href) return;
              // 외부 링크는 window.open 권장
              window.open(item.href, "_blank", "noopener,noreferrer");
            }}
            className="text-button text-white py-2 transition-colors w-full"
            style={{
              backgroundColor: hoveredId === item.id ? buttonHoverBgColor : buttonBgColor,
            }}
            onMouseEnter={() => setHoveredId(item.id ?? null)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {t("button.visit")}
          </button>
        </div>
      </div>
    </article>
  );
}

/** =========================
 * Main
 * ========================= */
export default function LatestSocials({
  socials,
  buttonBgColor = COMMON_COLORS.primary,
  buttonHoverBgColor = COMMON_COLORS.primaryHover,
  titleColor = COMMON_COLORS.black,
}: LatestSocialsProps) {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { t } = useTranslation();

  return (
    <section className="mt-10 py-0 md:py-10 px-0 md:px-60 lg:px-45">
      <div className="px-0 md:px-3 lg:px-3 relative z-10">
        <h2 className="text-heading text-center mb-0 md:mb-20" style={{ color: titleColor }}>
          {t("countryPage.latestSocialTitle")}
        </h2>

        {/* 모바일 - Swiper */}
        <div className="block md:hidden mt-3 md:mt-8 lg:mt-8 py-4">
          <Swiper
            spaceBetween={20}
            slidesPerView={1.15}
            slidesOffsetBefore={20}
            slidesOffsetAfter={-10}
            centeredSlides={false}
            className="latest-socials-swiper"
          >
            {socials.map((item, index) => (
              <SwiperSlide key={item.id}>
                <div className={index === socials.length - 1 ? "pr-5" : ""}>
                  <SocialCard
                    item={item}
                    buttonBgColor={buttonBgColor}
                    buttonHoverBgColor={buttonHoverBgColor}
                    hoveredId={hoveredId}
                    setHoveredId={setHoveredId}
                    router={router}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 데스크톱 - Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mt-8">
          {socials.map((item) => (
            <SocialCard
              key={item.id}
              item={item}
              buttonBgColor={buttonBgColor}
              buttonHoverBgColor={buttonHoverBgColor}
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
              router={router}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
