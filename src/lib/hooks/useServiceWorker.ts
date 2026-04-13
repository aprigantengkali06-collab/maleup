/**
 * Hook untuk mendaftarkan dan mengelola Service Worker PWA.
 * Menangani update SW dan offline caching.
 */

'use client';

import { useEffect, useState } from 'react';

export function useServiceWorker() {
  const [isSupported, setIsSupported] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      setIsSupported(true);
      navigator.serviceWorker
        .register('/sw.js')
        .then(() => setIsRegistered(true))
        .catch(() => setIsRegistered(false));
    }
  }, []);

  return { isSupported, isRegistered };
}
