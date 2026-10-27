'use client';

import { usePathname } from 'next/navigation';
import Header from '@/features/common/header/organisms/Header';
import Footer from '@/features/common/footer/organisms/Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide Header on admin and login pages
  const hideHeader = pathname?.startsWith('/admin') || pathname?.startsWith('/login');
  const hideFooter = pathname?.startsWith('/admin') || pathname?.startsWith('/login');

  return (
    <>
      {!hideHeader && <Header />}
      <main className="flex-1">{children}</main>
      {!hideFooter && <Footer />}
    </>
  );
}