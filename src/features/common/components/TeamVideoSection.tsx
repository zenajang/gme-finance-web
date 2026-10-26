'use client'

import Image from "next/image";
import { useTranslation } from "react-i18next";

type TeamVideoSectionProps = {
  title: string;
  titleColor?: string;
  subtitleColor?: string;
  videoUrl: string;
  leftImageSrc?: string;
  leftImageAlt?: string;
  leftImageWidth?: number;
  leftImageHeight?: number;
  leftImageStyle?: React.CSSProperties;
  leftImageOffsetX?: number | string;
  rightImageSrc?: string;
  rightImageAlt?: string;
  rightImageWidth?: number;
  rightImageHeight?: number;
  rightImageStyle?: React.CSSProperties;
  rightImageOffsetX?: number | string;
  centerImageSrc?: string;
  centerImageAlt?: string;
  centerImageWidth?: number;
  centerImageHeight?: number;
  centerImageStyle?: React.CSSProperties;
};

export default function TeamVideoSection({
  title,
  titleColor,
  subtitleColor = "red",
  videoUrl,
  leftImageSrc,
  leftImageAlt = "Left decoration",
  leftImageWidth = 250,
  leftImageHeight = 250,
  leftImageStyle,
  leftImageOffsetX,
  rightImageSrc,
  rightImageAlt = "Right decoration",
  rightImageWidth = 300,
  rightImageHeight = 300,
  rightImageStyle,
  rightImageOffsetX,
  centerImageSrc,
  centerImageAlt = "Center decoration",
  centerImageWidth = 800,
  centerImageHeight = 800,
  centerImageStyle,
}: TeamVideoSectionProps) {
  const { t } = useTranslation();
  const leftYOffset = leftImageStyle?.marginTop ?? 0;
  const rightYOffset = rightImageStyle?.marginTop ?? 0;
  const leftTranslateY = typeof leftYOffset === "number" ? `${leftYOffset}px` : leftYOffset;
  const rightTranslateY = typeof rightYOffset === "number" ? `${rightYOffset}px` : rightYOffset;
  const leftXOffset = leftImageOffsetX ?? leftImageStyle?.marginLeft ?? 0;
  const rightXOffset = rightImageOffsetX ?? rightImageStyle?.marginLeft ?? 0;
  const leftTranslateX = typeof leftXOffset === "number" ? `${leftXOffset}px` : leftXOffset;
  const rightTranslateX = typeof rightXOffset === "number" ? `${rightXOffset}px` : rightXOffset;

  return (
    <section className="relative overflow-visible mt-15">
      <div className="container mx-auto px-4 relative z-10 mb-10">
        <h2
          className="text-heading text-center lg:mb-10 mb-2"
          style={titleColor ? { color: titleColor } : undefined}
        >
          {title}
        </h2>
        <p
          className="text-subheading text-center lg:mb-10 mb-8"
          style={subtitleColor ? { color: subtitleColor } : undefined}
        >
          {t('countryPage.introductionSubTitle')}
        </p>
        <div className="relative">
          {/* 유튜브 높이 기준 중앙 정렬 - 페이지 전체 너비 */}
          {centerImageSrc && (
            <div
              className="hidden lg:block absolute top-1/2 left-1/2 -translate-y-1/2 pointer-events-none w-screen"
              style={{ marginLeft: '-50vw', zIndex: centerImageStyle?.zIndex || 0 }}
            >
              <Image
                src={centerImageSrc}
                alt={centerImageAlt}
                width={centerImageWidth}
                height={centerImageHeight}
                className="w-full object-cover"
                style={{
                  opacity: centerImageStyle?.opacity,
                  height: centerImageStyle?.height || centerImageStyle?.maxHeight || 'auto',
                }}
                priority
              />
            </div>
          )}
          <div className="aspect-video w-full max-w-6xl mx-auto relative" style={{ zIndex: 10 }}>
            {/* 유튜브 옆 - 왼쪽, 썸네일에 붙어 정렬 */}
            {leftImageSrc && (
              <div
                className="hidden lg:block absolute bottom-0 left-0 pointer-events-none overflow-hidden"
                style={{
                  transform: `translateX(calc(-100% + ${leftTranslateX || '0px'})) translateY(${leftTranslateY || '0px'})`,
                  zIndex: leftImageStyle?.zIndex || 1
                }}
              >
                <div className="relative z-0">
                <Image
                  src={leftImageSrc}
                  alt={leftImageAlt}
                  width={leftImageWidth}
                  height={leftImageHeight}
                  className="h-auto"
                  style={{
                    width: leftImageStyle?.width || 'clamp(140px, 18vw, 320px)',
                  }}
                  priority
                />
                </div>
              </div>
            )}
            {/* 유튜브 옆 - 오른쪽, 썸네일에 붙어 정렬 */}
            {rightImageSrc && (
              <div
                className="hidden lg:block absolute bottom-0 right-0 pointer-events-none overflow-hidden"
                style={{
                  transform: `translateX(calc(100% + ${rightTranslateX || '0px'})) translateY(${rightTranslateY || '0px'})`,
                  zIndex: rightImageStyle?.zIndex || 1
                }}
              >
                <div className="relative z-0">
                <Image
                  src={rightImageSrc}
                  alt={rightImageAlt}
                  width={rightImageWidth}
                  height={rightImageHeight}
                  className="h-auto"
                  style={{
                    width: rightImageStyle?.width || 'clamp(140px, 18vw, 320px)',
                  }}
                  priority
                />
                </div>
              </div>
            )}
            <iframe
              className="w-full h-full rounded-xl relative z-10"
              src={videoUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
