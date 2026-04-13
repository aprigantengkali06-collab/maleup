import Link from 'next/link';
import { Activity, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { WorkoutPlan } from '@/lib/types';
import { ExerciseItem } from '@/components/workout/ExerciseItem';

export function WorkoutCard({ workout, onComplete }: { workout: WorkoutPlan; onComplete?: () => void }) {
  return (
    <Card className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{workout.workout_type}</p>
          <h3 className="mt-1 text-lg font-semibold text-white">Workout Hari Ini</h3>
          <p className="mt-2 text-sm text-zinc-300">{workout.description}</p>
        </div>
        <div className="rounded-2xl bg-blue-500/10 px-3 py-2 text-right text-xs text-blue-300">
          <p>{workout.duration_minutes} menit</p>
          <p>{workout.exercises?.length ?? 0} latihan</p>
        </div>
      </div>
      <div className="space-y-3">
        {(workout.exercises ?? []).map((exercise) => (
          <ExerciseItem key={exercise.id} exercise={exercise} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Link href={workout.workout_type === 'hiit' ? '/workout/hiit' : '/workout'}>
          <Button variant="secondary" className="w-full">
            <Timer className="h-4 w-4" />
            Mulai Timer
          </Button>
        </Link>
        <Button onClick={onComplete}>
          <Activity className="h-4 w-4" />
          Tandai Selesai
        </Button>
      </div>
    </Card>
  );
}
