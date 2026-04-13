/**
 * Hook utilitas untuk mendeteksi apakah komponen sudah di-mount.
 * Mencegah hydration mismatch pada komponen client-side.
 */

'use client';

import { useEffect, useState } from 'react';

export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}
