/**
 * Hook untuk mengelola workout plan harian.
 * Menyediakan data workout hari ini, log workout, dan riwayat latihan.
 */

'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import type { WorkoutLog, WorkoutPlan } from '@/lib/types';

// ─── Query Keys ────────────────────────────────────────────────────
export const workoutKeys = {
  today: (phase: number, day: string) => ['workout', 'today', phase, day] as const,
  logs: (userId: string, start: string, end: string) =>
    ['workout', 'logs', userId, start, end] as const,
};

// ─── useTodayWorkout ───────────────────────────────────────────────
export function useTodayWorkout(phaseNumber: number, dayOfWeek: string) {
  return useQuery({
    queryKey: workoutKeys.today(phaseNumber, dayOfWeek),
    queryFn: async (): Promise<WorkoutPlan | null> => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('workout_plans')
        .select(`
          *,
          exercises (
            *
          )
        `)
        .eq('phase_number', phaseNumber)
        .eq('day_of_week', dayOfWeek)
        .maybeSingle();

      if (error) throw new Error(error.message);
      if (!data) return null;

      // Sort exercises by order_index
      const sorted = {
        ...data,
        exercises: [...(data.exercises ?? [])].sort(
          (a: { order_index: number }, b: { order_index: number }) => a.order_index - b.order_index
        ),
      };

      return sorted as WorkoutPlan;
    },
    enabled: !!phaseNumber && !!dayOfWeek,
    staleTime: 1000 * 60 * 10,
  });
}

// ─── useLogWorkout ─────────────────────────────────────────────────
interface LogWorkoutInput {
  userId: string;
  workoutPlanId: number | null;
  date: string;
  workoutType: WorkoutLog['workout_type'];
  completed: boolean;
  durationActualMinutes: number;
  intensityRating?: 1 | 2 | 3 | 4 | 5;
  notes?: string;
}

export function useLogWorkout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: LogWorkoutInput) => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('workout_logs')
        .insert({
          user_id: input.userId,
          workout_plan_id: input.workoutPlanId,
          date: input.date,
          workout_type: input.workoutType,
          completed: input.completed,
          duration_actual_minutes: input.durationActualMinutes,
          intensity_rating: input.intensityRating ?? null,
          notes: input.notes ?? null,
        })
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data as WorkoutLog;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['workout', 'logs', variables.userId] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

// ─── useWorkoutLogs ────────────────────────────────────────────────
export function useWorkoutLogs(
  userId: string,
  dateRange: { start: Date; end: Date }
) {
  const start = dateRange.start.toISOString().split('T')[0];
  const end = dateRange.end.toISOString().split('T')[0];

  return useQuery({
    queryKey: workoutKeys.logs(userId, start, end),
    queryFn: async (): Promise<WorkoutLog[]> => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('workout_logs')
        .select('*')
        .eq('user_id', userId)
        .gte('date', start)
        .lte('date', end)
        .order('date', { ascending: false });

      if (error) throw new Error(error.message);
      return (data ?? []) as WorkoutLog[];
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
}
