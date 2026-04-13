// src/components/InstallBanner.tsx
'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInstallPrompt } from '@/lib/hooks/useInstallPrompt';

const DISMISSED_KEY = 'maleup-install-dismissed';

export function InstallBanner() {
  const { isInstallable, isInstalled, promptInstall } = useInstallPrompt();
  const [dismissed, setDismissed] = useState(true); // start true to avoid flash

  useEffect(() => {
    const saved = localStorage.getItem(DISMISSED_KEY);
    if (!saved) setDismissed(false);
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(DISMISSED_KEY, '1');
    setDismissed(true);
  };

  const handleInstall = async () => {
    await promptInstall();
    handleDismiss();
  };

  if (!isInstallable || isInstalled || dismissed) return null;

  return (
    <div className="fixed top-0 left-1/2 z-50 w-full max-w-[480px] -translate-x-1/2">
      <div className="flex items-center justify-between gap-3 bg-blue-600 px-4 py-3">
        <span className="text-sm font-medium text-white">
          📱 Install MaleUp untuk pengalaman terbaik
        </span>
        <div className="flex shrink-0 items-center gap-1">
          <Button
            size="sm"
            onClick={handleInstall}
            className="h-7 rounded-lg bg-white px-3 text-xs font-semibold text-blue-700 hover:bg-blue-50"
          >
            Install
          </Button>
          <button
            onClick={handleDismiss}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-blue-100 hover:bg-blue-500"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
