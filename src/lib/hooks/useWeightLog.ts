/**
 * Hook untuk mencatat dan mengambil riwayat berat badan.
 * Menyediakan: log berat terbaru, chart data, dan fungsi tambah log.
 */

'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { calculateBMI } from '@/lib/utils/formulas';
import type { ChartDataPoint, WeightLog } from '@/lib/types';

// ─── Query Keys ────────────────────────────────────────────────────
export const weightKeys = {
  all: (userId: string) => ['weight', 'logs', userId] as const,
  latest: (userId: string) => ['weight', 'latest', userId] as const,
  chart: (userId: string) => ['weight', 'chart', userId] as const,
};

// ─── useWeightLogs ─────────────────────────────────────────────────
export function useWeightLogs(userId: string) {
  return useQuery({
    queryKey: weightKeys.all(userId),
    queryFn: async (): Promise<WeightLog[]> => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('weight_logs')
        .select('*')
        .eq('user_id', userId)
        .order('logged_at', { ascending: false });

      if (error) throw new Error(error.message);
      return (data ?? []) as WeightLog[];
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
}

// ─── useLatestWeight ───────────────────────────────────────────────
export function useLatestWeight(userId: string) {
  return useQuery({
    queryKey: weightKeys.latest(userId),
    queryFn: async (): Promise<WeightLog | null> => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('weight_logs')
        .select('*')
        .eq('user_id', userId)
        .order('logged_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw new Error(error.message);
      return data as WeightLog | null;
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
}

// ─── useLogWeight ──────────────────────────────────────────────────
interface LogWeightInput {
  userId: string;
  weightKg: number;
  waistCm: number | null;
  heightCm: number; // untuk recalculate BMI
  loggedAt?: string;
}

export function useLogWeight() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: LogWeightInput) => {
      const supabase = createClient();

      // Insert weight log
      const { data: logData, error: logError } = await supabase
        .from('weight_logs')
        .insert({
          user_id: input.userId,
          weight_kg: input.weightKg,
          waist_cm: input.waistCm,
          logged_at: input.loggedAt ?? new Date().toISOString(),
        })
        .select()
        .single();

      if (logError) throw new Error(logError.message);

      // Update profile current_weight_kg + BMI
      const newBmi = calculateBMI(input.heightCm, input.weightKg);
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          current_weight_kg: input.weightKg,
          bmi: newBmi,
          updated_at: new Date().toISOString(),
        })
        .eq('id', input.userId);

      if (profileError) throw new Error(profileError.message);

      return logData as WeightLog;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: weightKeys.all(variables.userId) });
      queryClient.invalidateQueries({ queryKey: weightKeys.latest(variables.userId) });
      queryClient.invalidateQueries({ queryKey: weightKeys.chart(variables.userId) });
      queryClient.invalidateQueries({ queryKey: ['auth', 'profile', variables.userId] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

// ─── useWeightChartData ────────────────────────────────────────────
export function useWeightChartData(userId: string, targetWeightKg?: number) {
  return useQuery({
    queryKey: weightKeys.chart(userId),
    queryFn: async (): Promise<ChartDataPoint[]> => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('weight_logs')
        .select('*')
        .eq('user_id', userId)
        .order('logged_at', { ascending: true });

      if (error) throw new Error(error.message);
      if (!data || data.length === 0) return [];

      return data.map((log) => ({
        date: log.logged_at.split('T')[0],
        label: new Date(log.logged_at).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
        }),
        value: Number(log.weight_kg),
        secondaryValue: targetWeightKg ?? undefined,
      }));
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
}
