'use client';

import { use } from 'react';
import CountryBlogListPage from '@/features/common/components/CountryBlogListPage';

export default function CountryBlogPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = use(params);
  return <CountryBlogListPage country={country} />;
}
