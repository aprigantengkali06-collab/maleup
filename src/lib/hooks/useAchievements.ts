/**
 * Hook untuk mengelola pencapaian (achievements) pengguna.
 * Menyediakan daftar achievement yang sudah dan belum terbuka.
 */

'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import type { Achievement, UserAchievement } from '@/lib/types';

// ─── Query Keys ────────────────────────────────────────────────────
export const achievementKeys = {
  all: (userId: string) => ['achievements', userId] as const,
};

// ─── useAchievements ───────────────────────────────────────────────
export function useAchievements(userId: string) {
  return useQuery({
    queryKey: achievementKeys.all(userId),
    queryFn: async (): Promise<UserAchievement[]> => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('user_achievements')
        .select(`
          *,
          achievement:achievements (*)
        `)
        .eq('user_id', userId)
        .order('unlocked_at', { ascending: false });

      if (error) throw new Error(error.message);
      return (data ?? []) as UserAchievement[];
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
}

// ─── useCheckAchievements ──────────────────────────────────────────
interface CheckAchievementsInput {
  userId: string;
  profileStartingWeightKg: number;
  profileCurrentWeightKg: number;
  profileTargetWeightKg: number;
  profileCurrentPhase: number;
}

export function useCheckAchievements() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CheckAchievementsInput): Promise<string[]> => {
      const supabase = createClient();
      const { userId } = input;

      // 1. Fetch stats bersamaan
      const [
        { count: weightLogCount },
        { count: workoutLogCount },
        { count: mealLogCount },
        { count: kegelLogCount },
        { count: measurementLogCount },
        { data: allAchievements },
        { data: unlockedAchievements },
      ] = await Promise.all([
        supabase
          .from('weight_logs')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId),
        supabase
          .from('workout_logs')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId)
          .eq('completed', true),
        supabase
          .from('meal_logs')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId)
          .eq('completed', true),
        supabase
          .from('kegel_logs')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId)
          .eq('completed', true),
        supabase
          .from('measurement_logs')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId),
        supabase.from('achievements').select('*'),
        supabase
          .from('user_achievements')
          .select('achievement_id')
          .eq('user_id', userId),
      ]);

      if (!allAchievements) return [];

      const alreadyUnlockedIds = new Set(
        (unlockedAchievements ?? []).map((u) => u.achievement_id as number)
      );

      const weightLostKg = Math.max(
        0,
        input.profileStartingWeightKg - input.profileCurrentWeightKg
      );
      const totalWeightToLose =
        input.profileStartingWeightKg - input.profileTargetWeightKg;
      const weightGoalPercent =
        totalWeightToLose > 0
          ? Math.round((weightLostKg / totalWeightToLose) * 100)
          : 0;

      // 2. Evaluasi setiap achievement yang belum diraih
      const newlyUnlocked: Achievement[] = [];

      for (const achievement of allAchievements as Achievement[]) {
        if (alreadyUnlockedIds.has(achievement.id!)) continue;

        let isUnlocked = false;

        switch (achievement.condition_type) {
          case 'weight_log_count':
            isUnlocked = (weightLogCount ?? 0) >= achievement.condition_value;
            break;
          case 'weight_loss_kg':
            isUnlocked = weightLostKg >= achievement.condition_value;
            break;
          case 'weight_goal_percent':
            isUnlocked = weightGoalPercent >= achievement.condition_value;
            break;
          case 'reached_ideal_weight': {
            const bmiApprox =
              input.profileCurrentWeightKg / Math.pow(1.7, 2);
            isUnlocked = bmiApprox < 25;
            break;
          }
          case 'workout_completed':
            isUnlocked = (workoutLogCount ?? 0) >= achievement.condition_value;
            break;
          case 'meal_log_days': {
            const mealDays = Math.floor((mealLogCount ?? 0) / 3);
            isUnlocked = mealDays >= achievement.condition_value;
            break;
          }
          case 'kegel_sessions':
            isUnlocked = (kegelLogCount ?? 0) >= achievement.condition_value;
            break;
          case 'kegel_days': {
            const kegelDays = Math.floor((kegelLogCount ?? 0) / 2);
            isUnlocked = kegelDays >= achievement.condition_value;
            break;
          }
          case 'measurement_log_count':
            isUnlocked = (measurementLogCount ?? 0) >= achievement.condition_value;
            break;
          case 'phase_completed':
            isUnlocked = input.profileCurrentPhase > achievement.condition_value;
            break;
          default:
            break;
        }

        if (isUnlocked) {
          newlyUnlocked.push(achievement);
        }
      }

      // 3. Insert achievements yang baru dibuka
      if (newlyUnlocked.length > 0) {
        const rows = newlyUnlocked.map((a) => ({
          user_id: userId,
          achievement_id: a.id!,
          unlocked_at: new Date().toISOString(),
        }));

        const { error: insertError } = await supabase
          .from('user_achievements')
          .insert(rows);

        if (insertError) throw new Error(insertError.message);
      }

      return newlyUnlocked.map((a) => a.name);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: achievementKeys.all(variables.userId),
      });
    },
  });
}
