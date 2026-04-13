// /src/lib/data/workouts/index.ts
// Central export + helper untuk semua workout data

import { phase1WorkoutData } from './phase1';
import { phase2WorkoutData } from './phase2';
import { phase3WorkoutData } from './phase3';
import { phase4WorkoutData } from './phase4';
import { phase5WorkoutData } from './phase5';
import type { WorkoutPlan } from '@/lib/types';

export { phase1WorkoutData, phase2WorkoutData, phase3WorkoutData, phase4WorkoutData, phase5WorkoutData };

export const allWorkoutData: WorkoutPlan[] = [
  ...phase1WorkoutData,
  ...phase2WorkoutData,
  ...phase3WorkoutData,
  ...phase4WorkoutData,
  ...phase5WorkoutData,
];

/** Ambil workout untuk fase dan hari tertentu */
export function getWorkoutByPhaseAndDay(
  phaseNumber: 1 | 2 | 3 | 4 | 5,
  dayOfWeek: string
): WorkoutPlan | undefined {
  return allWorkoutData.find(
    (w) => w.phase_number === phaseNumber && w.day_of_week === dayOfWeek
  );
}

/** Ambil semua workout dalam satu fase */
export function getWorkoutsByPhase(phaseNumber: 1 | 2 | 3 | 4 | 5): WorkoutPlan[] {
  return allWorkoutData.filter((w) => w.phase_number === phaseNumber);
}
