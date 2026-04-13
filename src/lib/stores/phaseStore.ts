'use client';

import { create } from 'zustand';
import { DailyMealPlan, KegelPlan, WorkoutPlan } from '@/lib/types';
import { createClient } from '@/lib/supabase/client';
import { getCurrentDayOfWeek } from '@/lib/utils/formulas';

interface PhaseStore {
  currentPhase: number;
  currentWeek: number;
  currentDay: string;
  todayMealPlan: DailyMealPlan | null;
  todayWorkout: WorkoutPlan | null;
  todayKegel: KegelPlan | null;
  completedMeals: number[];
  completedWorkout: boolean;
  completedKegel: { morning: boolean; night: boolean };
  loadTodayPlan: (phaseNumber: number, weekNumber: number) => Promise<void>;
  completeMeal: (userId: string, mealId: number) => Promise<void>;
  completeWorkout: (userId: string, workoutId: number) => Promise<void>;
  completeKegel: (userId: string, session: 'morning' | 'night') => Promise<void>;
  resetDaily: () => void;
}

export const usePhaseStore = create<PhaseStore>((set, get) => ({
  currentPhase: 1,
  currentWeek: 1,
  currentDay: getCurrentDayOfWeek(),
  todayMealPlan: null,
  todayWorkout: null,
  todayKegel: null,
  completedMeals: [],
  completedWorkout: false,
  completedKegel: { morning: false, night: false },
  loadTodayPlan: async (phaseNumber, weekNumber) => {
    const day = getCurrentDayOfWeek();
    // Start with null — UI harus handle loading/empty state, tidak ada demo fallback
    set({ currentPhase: phaseNumber, currentWeek: weekNumber, currentDay: day, todayMealPlan: null, todayWorkout: null, todayKegel: null });

    try {
      const supabase = createClient();
      const { data: mealPlan } = await supabase
        .from('daily_meal_plans')
        .select('*, meals(*, meal_ingredients(*))')
        .eq('phase_number', phaseNumber)
        .eq('week_number', weekNumber)
        .eq('day_of_week', day)
        .maybeSingle();

      const { data: workout } = await supabase
        .from('workout_plans')
        .select('*, exercises(*)')
        .eq('phase_number', phaseNumber)
        .eq('day_of_week', day)
        .maybeSingle();

      const { data: kegel } = await supabase
        .from('kegel_plans')
        .select('*')
        .eq('phase_number', phaseNumber)
        .maybeSingle();

      set({
        todayMealPlan: mealPlan ?? null,
        todayWorkout: workout ?? null,
        todayKegel: kegel ?? null,
      });
    } catch {
      // Biarkan null — UI tampilkan empty state, bukan demo data
      set({ todayMealPlan: null, todayWorkout: null, todayKegel: null });
    }
  },
  completeMeal: async (userId, mealId) => {
    const plan = get().todayMealPlan;
    const meal = plan?.meals?.find((item) => item.id === mealId);
    set((state) => ({ completedMeals: [...new Set([...state.completedMeals, mealId])] }));
    if (!meal) return;
    try {
      const supabase = createClient();
      await supabase.from('meal_logs').insert({
        user_id: userId,
        meal_id: meal.id,
        date: new Date().toISOString().slice(0, 10),
        meal_type: meal.meal_type,
        calories_consumed: meal.total_calories,
        protein_consumed_g: meal.total_protein_g,
        completed: true
      });
    } catch {}
  },
  completeWorkout: async (userId, workoutId) => {
    const workout = get().todayWorkout;
    set({ completedWorkout: true });
    try {
      const supabase = createClient();
      await supabase.from('workout_logs').insert({
        user_id: userId,
        workout_plan_id: workoutId,
        date: new Date().toISOString().slice(0, 10),
        workout_type: workout?.workout_type ?? 'full_body',
        completed: true,
        duration_actual_minutes: workout?.duration_minutes ?? 0,
        intensity_rating: 4,
        notes: 'Diselesaikan dari aplikasi MaleUp'
      });
    } catch {}
  },
  completeKegel: async (userId, session) => {
    const kegel = get().todayKegel;
    set((state) => ({ completedKegel: { ...state.completedKegel, [session]: true } }));
    try {
      const supabase = createClient();
      await supabase.from('kegel_logs').insert({
        user_id: userId,
        date: new Date().toISOString().slice(0, 10),
        session,
        sets_completed: kegel?.sets ?? 0,
        reps_completed: kegel?.reps ?? 0,
        completed: true
      });
    } catch {}
  },
  resetDaily: () => set({ completedMeals: [], completedWorkout: false, completedKegel: { morning: false, night: false } })
}));
