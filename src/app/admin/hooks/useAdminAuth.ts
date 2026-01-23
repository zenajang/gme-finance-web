'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

interface UseAdminAuthOptions {
  redirectTo?: string;
}

export function useAdminAuth({ redirectTo = '/login?redirect=/admin' }: UseAdminAuthOptions = {}) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkUser = useCallback(async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.replace(redirectTo);
    } else {
      setUser(user);
    }
    setLoading(false);
  }, [redirectTo, router]);

  const handleLogout = useCallback(async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace('/login');
  }, [router]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  return {
    user,
    loading,
    checkUser,
    handleLogout,
  };
}
