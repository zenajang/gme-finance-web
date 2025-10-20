// app/components/PageLoadingSpinner.tsx
'use client';

import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function LoadingSpinnerLogic() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleStart = () => setLoading(true);

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');

      if (link && link.href && !link.href.startsWith('#') && link.target !== '_blank') {
        const url = new URL(link.href);
        if (url.origin === window.location.origin && url.pathname !== pathname) {
          handleStart();
        }
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-transparent border-t-red-400 rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}

export default function PageLoadingSpinner() {
  return (
    <Suspense fallback={null}>
      <LoadingSpinnerLogic />
    </Suspense>
  );
}