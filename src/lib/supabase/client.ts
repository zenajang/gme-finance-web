'use client';
import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

let clientInstance: SupabaseClient | null = null;

export const createClient = () => {
  // Return cached instance if available
  if (clientInstance) {
    return clientInstance;
  }

  // Check if we're in the browser
  if (typeof window === 'undefined') {
    // During SSR/build time, throw a more specific error
    throw new Error('Supabase client should only be created in the browser');
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
  }

  clientInstance = createBrowserClient(supabaseUrl, supabaseKey);
  return clientInstance;
};
