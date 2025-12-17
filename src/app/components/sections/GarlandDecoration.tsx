import React from 'react';

interface GarlandDecorationProps {
  country: string;
  variant?: 'standard' | 'compact';
}

export default function GarlandDecoration({
  country,
  variant = 'standard'
}: GarlandDecorationProps) {
  const isStandard = variant === 'standard';
  const isPakistan = country === 'pakistan';
  const isMyanmar = country === 'myanmar';

  // 모바일 garland 크기 설정
  const getMobileRightSize = () => {
    if (isPakistan) return '130px auto';
    return isStandard ? '180px auto' : '360px auto';
  };

  const getMobileLeftSize = () => {
    if (isPakistan) return '250px auto';
    return isStandard ? '200px auto' : '350px auto';
  };

  return (
    <>
      {/* 오른쪽 하단 garland - 모바일 */}
      <div
        className={`absolute bg-no-repeat right-0 block md:hidden ${isStandard
          ? `${isMyanmar ? 'bottom-0' : '-bottom-20'} h-80 w-70 bg-right-bottom`
          : '-bottom-10 h-50 w-full bg-right-bottom'
          }`}
        style={{
          backgroundImage: `url('/images/${country}/garland_r.svg')`,
          backgroundSize: getMobileRightSize(),
          zIndex: 2
        }}
      />
      {/* 오른쪽 하단 garland - 데스크톱 */}
      <div
        className={`absolute bg-no-repeat bg-right right-0 hidden md:block w-full ${isStandard
          ? '-bottom-85 h-250'
          : 'bottom-0 h-200'
          }`}
        style={{
          backgroundImage: `url('/images/${country}/garland_r.svg')`,
          ...(isStandard ? {} : { backgroundSize: '100% auto' }),
          zIndex: 2
        }}
      />

      {/* 왼쪽 상단 garland - 모바일 */}
      <div
        className={`absolute bg-no-repeat -left-5 block md:hidden ${isStandard
          ? 'top-68 h-90 w-70 bg-left-top -ml-3'
          : 'top-75 h-50 w-full bg-left-top ml-5'
          }`}
        style={{
          backgroundImage: `url('/images/${country}/garland_l.svg')`,
          backgroundSize: getMobileLeftSize(),
          ...(isStandard ? { transform: 'rotate(10deg)' } : {}),
          zIndex: 2
        }}
      />
      {/* 왼쪽 상단 garland - 데스크톱 */}
      <div
        className={`absolute bg-no-repeat bg-left left-0 hidden md:block w-full ${isStandard
          ? 'top-100 h-190 -ml-13'
          : 'top-110 h-200'
          }`}
        style={{
          backgroundImage: `url('/images/${country}/garland_l.svg')`,
          ...(isStandard ? { transform: 'rotate(10deg)' } : { backgroundSize: '100% auto' }),
          zIndex: 2
        }}
      />
    </>
  );
}
