'use client';

import { useEffect } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CountdownTimer } from '@/components/shared/CountdownTimer';
import { useTimerStore } from '@/lib/stores/timerStore';

export function HIITTimer() {
  const store = useTimerStore();

  useEffect(() => {
    const interval = window.setInterval(() => store.tick(), 1000);
    return () => window.clearInterval(interval);
  }, [store]);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-8">
      <div className="text-center">
        <p className="mb-2 text-sm uppercase tracking-[0.24em] text-zinc-500">{store.currentPhase}</p>
        <CountdownTimer seconds={store.timeRemaining} />
        <p className="mt-3 text-lg text-zinc-300">{store.exercises[store.currentExerciseIndex] ?? 'Siap'}</p>
        <p className="text-sm text-zinc-500">Set {store.currentSet}/{store.totalSets}</p>
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
