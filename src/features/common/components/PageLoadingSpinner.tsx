'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function PageLoadingSpinner() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setLoading(false);
    setProgress(0);
  }, [pathname]);

  useEffect(() => {
    if (!loading) {
      return;
    }

    // 프로그레스 애니메이션
    setProgress(0);
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90; // 90%에서 멈춤 (로딩 완료 시 100%로)
        }
        // 처음엔 빠르게, 나중엔 느리게
        const increment = prev < 50 ? 8 : prev < 80 ? 3 : 1;
        return prev + increment;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [loading]);

  useEffect(() => {
    if (loading) {
      return;
    }

    // 로딩 완료 시 100%로 채우고 사라짐
    if (progress > 0) {
      setProgress(100);
      const timeoutId = setTimeout(() => setProgress(0), 200);
      return () => clearTimeout(timeoutId);
    }
  }, [loading, progress]);

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 5000);
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');

      if (link) {
        const href = link.getAttribute('href');

        if (href &&
            !href.startsWith('#') &&
            !href.startsWith('http') &&
            !href.startsWith('mailto:') &&
            !href.startsWith('tel:') &&
            link.target !== '_blank') {
          if (href !== pathname) {
            handleStart();
          }
        }
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [pathname]);

  if (progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-red-500 to-red-400 transition-all duration-200 ease-out shadow-[0_0_10px_rgba(239,68,68,0.5)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
