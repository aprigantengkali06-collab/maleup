'use client';

import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type DeferredPrompt = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<DeferredPrompt | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as DeferredPrompt);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (!deferredPrompt || dismissed) return null;

  return (
    <div className="fixed bottom-24 left-1/2 z-30 w-[calc(100%-1.5rem)] max-w-[456px] -translate-x-1/2">
      <Card className="flex items-center justify-between gap-3 rounded-3xl p-3">
        <div>
          <p className="text-sm font-medium text-white">Install MaleUp</p>
          <p className="text-xs text-zinc-400">Akses lebih cepat, offline-ready, dan terasa seperti aplikasi native.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => setDismissed(true)}>
            Nanti
          </Button>
          <Button
            size="sm"
            onClick={async () => {
              await deferredPrompt.prompt();
              setDeferredPrompt(null);
            }}
          >
            <Download className="h-4 w-4" />
            Install
          </Button>
        </div>
      </Card>
    </div>
  );
}
