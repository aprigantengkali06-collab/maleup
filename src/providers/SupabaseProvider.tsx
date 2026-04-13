'use client';

import { createContext, useContext, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';

const SupabaseContext = createContext<ReturnType<typeof createClient> | null>(null);

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const client = useMemo(() => {
    try {
      return createClient();
    } catch {
      return null;
    }
  }, []);

  return <SupabaseContext.Provider value={client}>{children}</SupabaseContext.Provider>;
}

export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('Supabase client belum tersedia. Pastikan env terisi dan SupabaseProvider aktif.');
  }
  return context;
}
