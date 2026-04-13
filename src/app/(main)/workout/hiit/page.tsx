'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { HIITTimer } from '@/components/workout/HIITTimer';
import { Button } from '@/components/ui/button';
import { usePhaseStore } from '@/lib/stores/phaseStore';
import { useTimerStore } from '@/lib/stores/timerStore';

export default function HIITPage() {
  const todayWorkout = usePhaseStore((state) => state.todayWorkout);
  const startHIIT = useTimerStore((state) => state.startHIIT);
  const mode = useTimerStore((state) => state.mode);

  useEffect(() => {
    if (todayWorkout?.exercises?.length && mode === 'idle') {
      startHIIT({
        totalSets: todayWorkout.exercises[0]?.sets ?? 4,
        workDuration: todayWorkout.exercises[0]?.work_seconds ?? 40,
        restDuration: todayWorkout.exercises[0]?.rest_seconds ?? 20,
        exercises: todayWorkout.exercises.map((item) => item.name)
      });
    }
  }, [todayWorkout, startHIIT, mode]);

  return (
    <div className="py-2">
      <Link href="/workout"><Button variant="ghost"><ArrowLeft className="h-4 w-4" />Kembali</Button></Link>
      <HIITTimer />
    </div>
  );
}
