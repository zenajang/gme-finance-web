'use client';

import { useEffect, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { SWRConfig, useSWRConfig } from 'swr';
import { createClient } from '@/lib/supabase/client';
import I18nProvider from './I18nProvider';

interface AppProvidersProps {
  children: ReactNode;
}

function RealtimeBlogSync({ enabled }: { enabled: boolean }) {
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (!enabled) {
      return;
    }
    const supabase = createClient();
    const channel = supabase
      .channel('blog-posts-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'blog_posts' },
        () => {
          mutate(
            (key) =>
              Array.isArray(key) &&
              (key[0] === 'blog_posts' || key[0] === 'blog_post')
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [enabled, mutate]);

  return null;
}

export default function AppProviders({ children }: AppProvidersProps) {
  const pathname = usePathname();
  const enableRealtime = Boolean(pathname?.startsWith('/about/blog'));

  return (
    <SWRConfig
      value={{
        dedupingInterval: 5 * 60 * 1000,
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        focusThrottleInterval: 60 * 1000,
      }}
    >
      <I18nProvider>
        <RealtimeBlogSync enabled={enableRealtime} />
        {children}
      </I18nProvider>
    </SWRConfig>
  );
}
