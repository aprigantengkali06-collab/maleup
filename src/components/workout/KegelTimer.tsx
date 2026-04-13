'use client';

import { useEffect } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CountdownTimer } from '@/components/shared/CountdownTimer';
import { useTimerStore } from '@/lib/stores/timerStore';

export function KegelTimer() {
  const store = useTimerStore();

  useEffect(() => {
    const interval = window.setInterval(() => store.tick(), 1000);
    return () => window.clearInterval(interval);
  }, [store]);

  const contraction = store.currentPhase === 'work';

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-8">
      <div className={`flex h-52 w-52 items-center justify-center rounded-full border transition-all ${contraction ? 'scale-100 border-blue-400 bg-blue-500/20 shadow-[0_0_80px_rgba(59,130,246,0.2)]' : 'scale-90 border-white/10 bg-white/5'}`}>
        <div className="text-center">
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-zinc-400">{contraction ? 'Kontraksi' : store.currentPhase === 'prepare' ? 'Siap' : 'Relaksasi'}</p>
          <CountdownTimer seconds={store.timeRemaining} />
        </div>
      </div>
      <div className="text-center text-sm text-zinc-400">
        Set {store.currentSet}/{store.totalSets} • Rep {store.currentRep}/{store.totalReps}
      </div>
      <div className="flex gap-3">
        {store.isRunning ? (
          <Button variant="secondary" size="lg" onClick={store.pause}><Pause className="h-5 w-5" />Pause</Button>
        ) : (
          <Button size="lg" onClick={store.resume}><Play className="h-5 w-5" />Resume</Button>
        )}
        <Button variant="outline" size="lg" onClick={store.stop}><RotateCcw className="h-5 w-5" />Stop</Button>
      </div>
    </div>
  );
}
