import React from 'react';

interface GarlandDecorationProps {
  country: string;
  variant?: 'standard' | 'compact';
}

// 국가별 garland 설정 (standard variant용) - 숫자는 vw 단위
const garlandConfig: Record<string, {
  desktop: {
    left: { top: number; height: number; left: number; size?: string; rotate?: string; width?: string; maxHeight?: number; heightPx?: number; zIndex?: number };
    right: { bottom: number; height: number; right: number; size?: string; width?: string; maxHeight?: number; heightPx?: number; zIndex?: number };
  };
  mobile: {
    left: { top: number; height: number; width: number; left: number; size: string; rotate?: string };
    right: { bottom: number; height: number; width: number; right: number; size: string };
  };
}> = {
  philippines: {
    desktop: {
      left: { top: 0, height: 75, left: -12, size: '70vw auto', width: '70vw', rotate: '0deg' },
      right: { bottom: -20, height: 55, right: -10, size: '55vw auto', width: '55vw', },
    },
    mobile: {
      left: { top: 53, height: 73, width: 70, left: -10, size: '80vw auto' },
      right: { bottom: -20, height: 70, width: 70, right: -10, size: '75vw auto' }
    },
  },
  nepal: {
    desktop: {
      left: { top: 6, height: 67, left: -12, size: '75vw auto', width: '75vw', rotate: '0deg' },
      right: { bottom: -25, height: 70, right: 0, size: '33vw auto', width: '33vw' },
    },
    mobile: {
      left: { top: 50, height: 80, width: 100, left: -20, size: '100vw auto' },
      right: { bottom: -18, height: 80, width: 100, right: 0, size: '45vw auto' },
    },
  },
  bangladesh: {
    desktop: {
      left: { top: 6, height: 70, left: 0, size: '60vw auto', width: '60vw', rotate: '0deg' },
      right: { bottom: -16, height: 70, right: -2, size: '60vw auto', width: '60vw' },
    },
    mobile: {
      left: { top: 65, height: 80, width: 100, left: -5, size: '60vw auto', rotate: '0deg' },
      right: { bottom: -18, height: 80, width: 100, right: 0, size: '60vw auto' },
    },
  },
  pakistan: {
    desktop: {
      left: { top: 6, height: 67, left: 0, size: '75vw auto', width: '75vw', rotate: '0deg' },
      right: { bottom: -25, height: 70, right: 0, size: '33vw auto', width: '33vw' },
    },
    mobile: {
      left: { top: 50, height: 80, width: 100, left: 0, size: '100vw auto' },
      right: { bottom: -18, height: 80, width: 100, right: 0, size: '45vw auto' },
    },
  },
  india: {
    desktop: {
      left: { top: 6, height: 53, left: -1, size: '70vw auto', width: '160vw', rotate: '0deg' },
      right: { bottom: -26, height: 70, right: 0, size: '70vw auto', width: '70vw' },
    },
    mobile: {
      left: { top: 65, height: 100, width: 100, left: 0, size: '75vw auto', rotate: '0deg' },
      right: { bottom: -22, height: 100, width: 100, right: 0, size: '75vw auto' },
    },
  },
  indonesia: {
    desktop: {
      left: { top: 10, height: 50, left: -2, size: '45vw auto', width: '45vw', rotate: '0deg' },
      right: { bottom: -5, height: 40, right: 0, size: '45vw auto', width: '45vw', },
    },
    mobile: {
      left: { top: 82, height: 100, width: 100, left: -6, size: '55vw auto' },
      right: { bottom: -10, height: 100, width: 100, right: 0, size: '55vw auto' },
    },
  },
  mongolia: {
    desktop: {
      left: { top: 6, height: 67, left: -12, size: '75vw auto', width: '75vw', rotate: '0deg' },
      right: { bottom: -25, height: 70, right: -10, size: '60vw auto', width: '60vw' },
    },
    mobile: {
      left: { top: 62, height: 73, width: 70, left: -20, size: '80vw auto' },
      right: { bottom: -20, height: 70, width: 70, right: -10, size: '60vw auto' },
    },
  },
  myanmar: {
    desktop: {
      left: { top: 10, height: 50, left: -2, size: '60vw auto', width: '60vw', rotate: '0deg' },
      right: { bottom: -10, height: 40, right: 0, size: '60vw auto', width: '60vw', },
    },
    mobile: {
      left: { top: 70, height: 100, width: 100, left: 0, rotate: '-1deg', size: '80vw auto' },
      right: { bottom: -1, height: 100, width: 100, right: 0, size: '80vw auto' },
    },
  },
  cambodia: {
    desktop: {
      left: { top: 0, height: 70, left: -12, size: '70vw auto', width: '70vw', rotate: '0deg' },
      right: { bottom: -22, height: 60, right: -  10, size: '70vw auto', width: '70vw', },
    },
    mobile: {
      left: { top: 65, height: 100, width: 100, left: -20, rotate: '0deg', size: '90vw auto' },
      right: { bottom: -20, height: 100, width: 100, right: -20, size: '80vw auto' },
    },
  },
  thailand: {
    desktop: {
      left: { top: 6, height: 67, left: 0, size: '60vw auto', width: '60vw', rotate: '0deg' },
      right: { bottom: -25, height: 70, right: -10, size: '50vw auto', width: '50vw' },
    },
    mobile: {
      left: { top: 55, height: 100, width: 100, left: 0, size: '75vw auto' },
      right: { bottom: -20, height: 100, width: 100, right: 0, size: '60vw auto' },
    },
  },
  vietnam: {
    desktop: {
      left: { top: 6, height: 67, left: 0, size: '60vw auto', width: '60vw', rotate: '0deg' },
      right: { bottom: -26, height: 70, right: -10, size: '50vw auto', width: '50vw' },
    },
    mobile: {
      left: { top: 55, height: 100, width: 100, left: 0, size: '75vw auto' },
      right: { bottom: -20, height: 100, width: 100, right: 0, size: '60vw auto' },
    },
  },
  russia: {
    desktop: {
      left: { top: 0, height: 0, left: -10, rotate: '0deg', size: '120vw auto', width: '120vw', heightPx: 1350, zIndex: -1 },
      right: { bottom: -23, height: 0, right: -10, size: '120vw auto', width: '120vw', heightPx: 1350, zIndex: -1 },
    },
    mobile: {
      left: { top: 60, height: 100, width: 120, left: -13, rotate: '0deg', size: '120vw auto' },
      right: { bottom: -16, height: 100, width: 130, right: -17, size: '130vw auto' },
    },
  },
  srilanka: {
    desktop: {
      left: { top: 0, height: 60, left: -12, size: '70vw auto', width: '70vw', rotate: '0deg' },
      right: { bottom: -22, height: 60, right: -10, size: '70vw auto', width: '70vw', },
    },
    mobile: {
      left: { top: 65, height: 100, width: 100, left: -10, size: '60vw auto' },
      right: { bottom: -25, height: 100, width: 120, right: -12, size: '60vw auto' },
    },
  },
  uzbekistan: {
    desktop: {
      left: { top: 0, height: 0, left: -10, rotate: '0deg', size: '120vw auto', width: '120vw', heightPx: 1350, zIndex: -1 },
      right: { bottom: -23, height: 0, right: -10, size: '120vw auto', width: '120vw', heightPx: 1350, zIndex: -1 },
    },
    mobile: {
      left: { top: 60, height: 100, width: 120, left: -13, rotate: '0deg', size: '120vw auto' },
      right: { bottom: -16, height: 100, width: 130, right: -17, size: '130vw auto' },
    },
  },
};

// 기본 설정 (설정이 없는 국가용)
const defaultConfig = {
  desktop: {
    left: { top: 5, height: 40, left: -2 },
    right: { bottom: -10, height: 40, right: 0 },
  },
  mobile: {
    left: { top: 17, height: 23, width: 18, left: -1.5, size: '50vw auto' },
    right: { bottom: -5, height: 20, width: 18, right: 0, size: '45vw auto' },
  },
};

export default function GarlandDecoration({
  country,
  variant = 'standard'
}: GarlandDecorationProps) {
  const isStandard = variant === 'standard';
  const config = garlandConfig[country] || defaultConfig;

  if (isStandard) {
    return (
      <>
        {/* 오른쪽 하단 garland - 모바일 */}
        <div
          className="absolute bg-no-repeat block md:hidden bg-right-bottom"
          style={{
            backgroundImage: `url('/images/${country}/garland_r.svg')`,
            backgroundSize: config.mobile.right.size,
            bottom: `${config.mobile.right.bottom}vw`,
            height: `${config.mobile.right.height}vw`,
            width: `${config.mobile.right.width}vw`,
            right: `${config.mobile.right.right}vw`,
            zIndex: 1
          }}
        />
        {/* 오른쪽 하단 garland - 데스크톱 */}
        <div
          className="absolute bg-no-repeat bg-right hidden md:block"
          style={{
            backgroundImage: `url('/images/${country}/garland_r.svg')`,
            backgroundSize: config.desktop.right.size || 'contain',
            bottom: `${config.desktop.right.bottom}%`,
            height: config.desktop.right.heightPx
              ? `${config.desktop.right.heightPx}px`
              : `${config.desktop.right.height}%`,
            width: config.desktop.right.width || '100%',
            right: `${config.desktop.right.right}%`,
            zIndex: 0
          }}
        />

        {/* 왼쪽 상단 garland - 모바일 */}
        <div
          className="absolute bg-no-repeat block md:hidden bg-left-top"
          style={{
            backgroundImage: `url('/images/${country}/garland_l.svg')`,
            backgroundSize: config.mobile.left.size,
            transform: `rotate(${config.mobile.left.rotate || '10deg'})`,
            top: `${config.mobile.left.top}vw`,
            height: `${config.mobile.left.height}vw`,
            width: `${config.mobile.left.width}vw`,
            left: `${config.mobile.left.left}vw`,
            zIndex: 2
          }}
        />
        {/* 왼쪽 상단 garland - 데스크톱 */}
        <div
          className="absolute bg-no-repeat bg-left hidden md:block"
          style={{
            backgroundImage: `url('/images/${country}/garland_l.svg')`,
            transform: `rotate(${config.desktop.left.rotate || '10deg'})`,
            backgroundSize: config.desktop.left.size || 'contain',
            top: `${config.desktop.left.top}%`,
            height: config.desktop.left.heightPx
              ? `${config.desktop.left.heightPx}px`
              : `${config.desktop.left.height}%`,
            width: config.desktop.left.width || '100%',
            left: `${config.desktop.left.left}%`,
            zIndex: 2
          }}
        />
      </>
    );
  }

  // compact variant
  return (
    <>
      {/* 오른쪽 하단 garland - 모바일 */}
      <div
        className="absolute bg-no-repeat right-0 block md:hidden bg-right-bottom"
        style={{
          backgroundImage: `url('/images/${country}/garland_r.svg')`,
          backgroundSize: '100% auto',
          bottom: '-2.5vw',
          height: '12.5vw',
          width: '100%',
          zIndex: 2
        }}
      />
      {/* 오른쪽 하단 garland - 데스크톱 */}
      <div
        className="absolute bg-no-repeat bg-right right-0 hidden md:block w-full"
        style={{
          backgroundImage: `url('/images/${country}/garland_r.svg')`,
          backgroundSize: '100% auto',
          bottom: 0,
          height: '10vw',
          zIndex: 2
        }}
      />

      {/* 왼쪽 상단 garland - 모바일 */}
      <div
        className="absolute bg-no-repeat block md:hidden bg-left-top"
        style={{
          backgroundImage: `url('/images/${country}/garland_l.svg')`,
          backgroundSize: '100% auto',
          top: '19vw',
          height: '12.5vw',
          width: '100%',
          left: 0,
          zIndex: 2
        }}
      />
      {/* 왼쪽 상단 garland - 데스크톱 */}
      <div
        className="absolute bg-no-repeat bg-left left-0 hidden md:block w-full"
        style={{
          backgroundImage: `url('/images/${country}/garland_l.svg')`,
          backgroundSize: '100% auto',
          top: '5.5vw',
          height: '10vw',
          zIndex: 2
        }}
      />
    </>
  );
}
