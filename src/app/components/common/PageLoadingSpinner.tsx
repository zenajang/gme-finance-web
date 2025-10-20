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
    const handleStart = () => {
      setLoading(true);
      // Auto-hide after 5 seconds as fallback
      setTimeout(() => setLoading(false), 5000);
    };

    // Handle both regular links and Next.js Link components
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check if click is within a Link component or regular anchor
      const link = target.closest('a');

      if (link) {
        const href = link.getAttribute('href');

        if (href &&
            !href.startsWith('#') &&
            !href.startsWith('http') &&
            !href.startsWith('mailto:') &&
            !href.startsWith('tel:') &&
            link.target !== '_blank') {

          // Check if it's a different page
          if (href !== pathname) {
            handleStart();
          }
        }
      }
    };

    // Use capture phase to catch events before React handles them
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