/**
 * Hook untuk mengelola meal plan harian.
 * Menyediakan data meal plan hari ini, detail meal, log meal, dan riwayat log.
 */

'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import type { DailyMealPlan, Meal, MealLog } from '@/lib/types';

// ─── Query Keys ────────────────────────────────────────────────────
export const mealKeys = {
  todayPlan: (phase: number, week: number, day: string) =>
    ['meal', 'plan', 'today', phase, week, day] as const,
  detail: (mealId: string) => ['meal', 'detail', mealId] as const,
  logs: (userId: string, start: string, end: string) =>
    ['meal', 'logs', userId, start, end] as const,
};

// ─── useTodayMealPlan ──────────────────────────────────────────────
export function useTodayMealPlan(
  phaseNumber: number,
  weekNumber: number,
  dayOfWeek: string
) {
  return useQuery({
    queryKey: mealKeys.todayPlan(phaseNumber, weekNumber, dayOfWeek),
    queryFn: async (): Promise<DailyMealPlan | null> => {
      const supabase = createClient();

      // Coba minggu spesifik dulu
      let { data: plan, error } = await supabase
        .from('daily_meal_plans')
        .select('*')
        .eq('phase_number', phaseNumber)
        .eq('week_number', weekNumber)
        .eq('day_of_week', dayOfWeek)
        .maybeSingle();

      if (error) throw new Error(error.message);

      // Fallback: ambil minggu pertama dari fase ini
      if (!plan) {
        const { data: firstWeekPlan, error: fallbackError } = await supabase
          .from('daily_meal_plans')
          .select('*')
          .eq('phase_number', phaseNumber)
          .eq('day_of_week', dayOfWeek)
          .order('week_number', { ascending: true })
          .limit(1)
          .maybeSingle();

        if (fallbackError) throw new Error(fallbackError.message);
        plan = firstWeekPlan;
      }

      if (!plan) return null;

      // Fetch meals + ingredients + foods
      const { data: meals, error: mealsError } = await supabase
        .from('meals')
        .select(`
          *,
          meal_ingredients (
            *,
            food:foods (*)
          )
        `)
        .eq('daily_meal_plan_id', plan.id)
        .order('time_scheduled', { ascending: true });

      if (mealsError) throw new Error(mealsError.message);

      return {
        ...plan,
        meals: (meals ?? []) as Meal[],
      } as DailyMealPlan;
    },
    enabled: !!phaseNumber && !!weekNumber && !!dayOfWeek,
    staleTime: 1000 * 60 * 10,
  });
}

// ─── useMealDetail ─────────────────────────────────────────────────
export function useMealDetail(mealId: string) {
  return useQuery({
    queryKey: mealKeys.detail(mealId),
    queryFn: async (): Promise<Meal> => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('meals')
        .select(`
          *,
          meal_ingredients (
            *,
            food:foods (*)
          )
        `)
        .eq('id', mealId)
        .single();

      if (error) throw new Error(error.message);
      return data as Meal;
    },
    enabled: !!mealId,
    staleTime: 1000 * 60 * 30,
  });
}

// ─── useLogMeal ────────────────────────────────────────────────────
interface LogMealInput {
  userId: string;
  mealId: number | null;
  date: string;
  mealType: MealLog['meal_type'];
  caloriesConsumed: number;
  proteinConsumedG: number;
  completed: boolean;
}

export function useLogMeal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: LogMealInput) => {
      const supabase = createClient();
      const { data, error } = await supabase.from('meal_logs').insert({
        user_id: input.userId,
        meal_id: input.mealId,
        date: input.date,
        meal_type: input.mealType,
        calories_consumed: input.caloriesConsumed,
        protein_consumed_g: input.proteinConsumedG,
        completed: input.completed,
      }).select().single();

      if (error) throw new Error(error.message);
      return data as MealLog;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['meal', 'logs', variables.userId] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

// ─── useMealLogs ───────────────────────────────────────────────────
export function useMealLogs(userId: string, startDate: Date, endDate: Date) {
  const start = startDate.toISOString().split('T')[0];
  const end = endDate.toISOString().split('T')[0];

  return useQuery({
    queryKey: mealKeys.logs(userId, start, end),
    queryFn: async (): Promise<MealLog[]> => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('meal_logs')
        .select('*')
        .eq('user_id', userId)
        .gte('date', start)
        .lte('date', end)
        .order('logged_at', { ascending: false });

      if (error) throw new Error(error.message);
      return (data ?? []) as MealLog[];
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
}
