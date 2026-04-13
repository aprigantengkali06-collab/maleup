// src/providers/Providers.tsx
'use client';

import { QueryProvider } from './QueryProvider';
import { SupabaseProvider } from './SupabaseProvider';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      <SupabaseProvider>
        {children}
      </SupabaseProvider>
    </QueryProvider>
  );
}
