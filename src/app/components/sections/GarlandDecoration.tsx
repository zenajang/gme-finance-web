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

  return (
    <>
      <div
        className={`absolute bg-no-repeat bg-right right-0 w-full ${isStandard ? '-bottom-100 h-250' : 'bottom-0 h-200'}`}
        style={{
          backgroundImage: `url('/images/${country}/garland_r.svg')`,
          ...(isStandard ? {} : { backgroundSize: '100% auto' }),
          zIndex: 2
        }}
      />
      <div
        className={`absolute bg-no-repeat bg-left left-0 w-full ${isStandard ? 'top-80 h-230' : 'top-120 h-200'}`}
        style={{
          backgroundImage: `url('/images/${country}/garland_l.svg')`,
          ...(isStandard ? {} : { backgroundSize: '100% auto' }),
          zIndex: 2
        }}
      />
    </>
  );
}
