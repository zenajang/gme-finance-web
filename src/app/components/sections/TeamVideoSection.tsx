import Image from "next/image";

type TeamVideoSectionProps = {
  title: string;
  titleColor?: string;
  subtitle?: string;
  subtitleColor?: string;
  videoUrl: string;
  leftImageSrc?: string;
  leftImageAlt?: string;
  leftImageWidth?: number;
  leftImageHeight?: number;
  leftImageStyle?: React.CSSProperties;
  rightImageSrc?: string;
  rightImageAlt?: string;
  rightImageWidth?: number;
  rightImageHeight?: number;
  rightImageStyle?: React.CSSProperties;
  centerImageSrc?: string;
  centerImageAlt?: string;
  centerImageWidth?: number;
  centerImageHeight?: number;
  centerImageStyle?: React.CSSProperties;
};

export default function TeamVideoSection({
  title,
  titleColor,
  subtitle = "The People Behind GME Finance",
  subtitleColor = "red",
  videoUrl,
  leftImageSrc,
  leftImageAlt = "Left decoration",
  leftImageWidth = 250,
  leftImageHeight = 250,
  leftImageStyle,
  rightImageSrc,
  rightImageAlt = "Right decoration",
  rightImageWidth = 300,
  rightImageHeight = 300,
  rightImageStyle,
  centerImageSrc,
  centerImageAlt = "Center decoration",
  centerImageWidth = 800,
  centerImageHeight = 800,
  centerImageStyle,
}: TeamVideoSectionProps) {
  return (
    <section className="relative overflow-visible">
      {centerImageSrc && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 0 }}>
          <Image
            src={centerImageSrc}
            alt={centerImageAlt}
            width={centerImageWidth}
            height={centerImageHeight}
            className="hidden lg:block"
            style={centerImageStyle}
            priority
          />
        </div>
      )}
      <div className="container mx-auto px-4 relative z-10 mb-20">
        <h2
          className="text-heading text-center mb-10"
          style={titleColor ? { color: titleColor } : undefined}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className="text-subheading text-center mb-10"
            style={subtitleColor ? { color: subtitleColor } : undefined}
          >
            {subtitle}
          </p>
        )}
        <div className="relative">
          {leftImageSrc && (
            <Image
              src={leftImageSrc}
              alt={leftImageAlt}
              width={leftImageWidth}
              height={leftImageHeight}
              className="hidden lg:block absolute top-1/2 -translate-y-1/2"
              style={leftImageStyle}
              priority
            />
          )}
          {rightImageSrc && (
            <Image
              src={rightImageSrc}
              alt={rightImageAlt}
              width={rightImageWidth}
              height={rightImageHeight}
              className="hidden lg:block absolute top-1/2 -translate-y-1/2"
              style={rightImageStyle}
              priority
            />
          )}
          <div className="aspect-video w-full max-w-6xl mx-auto relative" style={{ zIndex: 10 }}>
            <iframe
              className="w-full h-full rounded-xl"
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
