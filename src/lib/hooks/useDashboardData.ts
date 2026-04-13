'use client';

import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import type { DashboardData } from '@/lib/types';
import { getDailyCalorieTarget, getDailyMacroTarget } from '@/lib/utils/formulas';
import { useUserStore } from '@/lib/stores/userStore';
import { usePhaseStore } from '@/lib/stores/phaseStore';

// ─── Helper: hitung streak berturut dari kegel_logs ──────────────────────────
function calculateStreak(logs: { date: string }[]): number {
  if (!logs || logs.length === 0) return 0;

  const logDates = new Set(logs.map((l) => l.date));
  let streak = 0;
  const today = new Date();

  for (let i = 0; i <= 90; i++) {
    const check = new Date(today);
    check.setDate(check.getDate() - i);
    const dateStr = check.toISOString().split('T')[0];

    if (logDates.has(dateStr)) {
      streak++;
    } else {
      if (i === 0) continue; // hari ini boleh belum ada log
      break;
    }
  }

  return streak;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useDashboardData() {
  const profile = useUserStore((s) => s.profile);
  const {
    todayMealPlan,
    todayWorkout,
    todayKegel,
    completedMeals,
    completedWorkout,
    completedKegel,
  } = usePhaseStore();

  return useQuery<DashboardData>({
    queryKey: ['dashboard-data', profile?.id, profile?.current_week],
    enabled: !!profile?.id,
    queryFn: async (): Promise<DashboardData> => {
      const supabase = createClient();
      const userId = profile!.id;
      const phaseNumber = (profile!.current_phase ?? 1) as 1 | 2 | 3 | 4 | 5;
      const calories = getDailyCalorieTarget(phaseNumber);
      const macro = getDailyMacroTarget(phaseNumber);
      const todayStr = new Date().toISOString().split('T')[0];

      // ── FIX A: Weight chart dari real weight_logs ──────────────────────────
      const { data: weightLogs } = await supabase
        .from('weight_logs')
        .select('weight_kg, logged_at')
        .eq('user_id', userId)
        .order('logged_at', { ascending: true })
        .limit(30);

      const weightChartEntries = (weightLogs ?? []).map((log) => ({
        user_id: userId,
        weight_kg: Number(log.weight_kg),
        waist_cm: null as number | null,
        logged_at: log.logged_at as string,
      }));

      // ── FIX B: Achievements dari real user_achievements ───────────────────
      const { data: userAchievements } = await supabase
        .from('user_achievements')
        .select(
          'achievement_id, unlocked_at, achievements(name, description, icon, condition_type, condition_value, category)'
        )
        .eq('user_id', userId)
        .order('unlocked_at', { ascending: false })
        .limit(5);

      const achievementsMapped = (userAchievements ?? []).map((ua) => {
        const ach = Array.isArray(ua.achievements)
          ? ua.achievements[0]
          : ua.achievements;
        return {
          user_id: userId,
          achievement_id: ua.achievement_id as number,
          unlocked_at: ua.unlocked_at as string,
          achievement: ach
            ? {
                id: ua.achievement_id as number,
                name: (ach as { name?: string }).name ?? '',
                description: (ach as { description?: string }).description ?? '',
                icon: (ach as { icon?: string }).icon ?? '🏆',
                condition_type: (ach as { condition_type?: string }).condition_type ?? '',
                condition_value: (ach as { condition_value?: number }).condition_value ?? 0,
                category: (ach as { category?: string }).category ?? '',
              }
            : undefined,
        };
      });

      // ── FIX C: Streak dari real kegel_logs ────────────────────────────────
      const { data: recentKegelLogs } = await supabase
        .from('kegel_logs')
        .select('date')
        .eq('user_id', userId)
        .eq('completed', true)
        .order('date', { ascending: false })
        .limit(90);

      const streakDays = calculateStreak(
        (recentKegelLogs ?? []).map((r) => ({ date: r.date as string }))
      );

      // ── FIX D: Consumed calories dari real meal_logs hari ini ─────────────
      const { data: todayMealLogs } = await supabase
        .from('meal_logs')
        .select('calories_consumed, protein_consumed_g')
        .eq('user_id', userId)
        .eq('date', todayStr);

      const consumedCalories = (todayMealLogs ?? []).reduce(
        (sum, log) => sum + (log.calories_consumed ?? 0),
        0
      );
      const consumedProtein = (todayMealLogs ?? []).reduce(
        (sum, log) => sum + Number(log.protein_consumed_g ?? 0),
        0
      );

      // Makro dari plan (fat & carb — tidak ada actual log per-macro)
      const totalFat = (todayMealPlan?.meals ?? []).reduce(
        (sum, meal) => sum + (meal.total_fat_g ?? 0),
        0
      );
      const totalCarb = (todayMealPlan?.meals ?? []).reduce(
        (sum, meal) => sum + (meal.total_carb_g ?? 0),
        0
      );

      // ── Phase dari Supabase (fallback minimal jika belum di-seed) ─────────
      const { data: phaseData } = await supabase
        .from('phases')
        .select('*')
        .eq('phase_number', phaseNumber)
        .maybeSingle();

      const phase = phaseData ?? {
        id: phaseNumber,
        phase_number: phaseNumber,
        name: `Fase ${phaseNumber}`,
        phase_type: 'fat_loss' as const,
        week_start: 1,
        week_end: 6,
        daily_calories_min: calories.min,
        daily_calories_max: calories.max,
        protein_target_g: macro.protein,
        carb_target_g: macro.carb,
        fat_target_g: macro.fat,
        description: '',
        exercise_description: '',
        kegel_description: '',
      };

      return {
        profile,
        phase,
        todaySummary: {
          caloriesConsumed: consumedCalories,
          caloriesTarget: calories.max,
          workoutsCompleted: completedWorkout ? 1 : 0,
          waterIntakeLiters: 0, // FIX E: tidak ada actual tracking
          completedMeals: completedMeals.length,
          totalMeals: todayMealPlan?.meals?.length ?? 0,
          kegelDone:
            Number(completedKegel.morning ?? 0) +
            Number(completedKegel.night ?? 0),
          streakDays,
        },
        todayMealPlan: todayMealPlan ?? null,
        todayWorkout: todayWorkout ?? null,
        todayKegel: todayKegel ?? null,
        latestWeightLogs: weightChartEntries,
        latestMeasurementLogs: [],
        achievements: achievementsMapped,
        macroSummary: {
          calories: consumedCalories,
          protein: consumedProtein,
          fat: totalFat,
          carb: totalCarb,
          calorieTargetMin: calories.min,
          calorieTargetMax: calories.max,
          proteinTarget: macro.protein,
          carbTarget: macro.carb,
          fatTarget: macro.fat,
        },
      };
    },
    // initialData: semua 0/empty — tidak ada demo data
    initialData: {
      profile,
      phase: null,
      todaySummary: {
        caloriesConsumed: 0,
        caloriesTarget: 1800,
        workoutsCompleted: 0,
        waterIntakeLiters: 0,
        completedMeals: 0,
        totalMeals: 0,
        kegelDone: 0,
        streakDays: 0,
      },
      todayMealPlan: null,
      todayWorkout: null,
      todayKegel: null,
      latestWeightLogs: [],
      latestMeasurementLogs: [],
      achievements: [],
      macroSummary: {
        calories: 0,
        protein: 0,
        fat: 0,
        carb: 0,
        calorieTargetMin: 1700,
        calorieTargetMax: 1900,
        proteinTarget: 150,
        carbTarget: 110,
        fatTarget: 55,
      },
    },
  });
}
