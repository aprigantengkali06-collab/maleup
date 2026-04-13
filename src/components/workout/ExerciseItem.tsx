import { Badge } from '@/components/ui/badge';
import { Exercise } from '@/lib/types';

export function ExerciseItem({ exercise }: { exercise: Exercise }) {
  return (
    <div className="rounded-2xl bg-white/5 p-4">
      <div className="mb-2 flex items-start justify-between gap-3">
        <div>
          <h4 className="font-medium text-white">{exercise.name}</h4>
          <p className="text-xs text-zinc-500">{exercise.muscle_group}</p>
        </div>
        <Badge>{exercise.sets} set</Badge>
      </div>
      <p className="text-sm text-zinc-300">{exercise.reps} • istirahat {exercise.rest_seconds ?? 30} detik</p>
      <p className="mt-2 text-xs leading-5 text-zinc-500">{exercise.instructions} Tip: {exercise.tips}</p>
    </div>
  );
}
