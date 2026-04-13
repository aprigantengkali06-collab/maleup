/**
 * Hook untuk mengelola sesi Kegel harian.
 * Menyediakan kegel plan hari ini, log sesi pagi/malam, dan streak.
 */

'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import type { KegelLog, KegelPlan } from '@/lib/types';

// ─── Query Keys ────────────────────────────────────────────────────
export const kegelKeys = {
  today: (phase: number) => ['kegel', 'today', phase] as const,
  logs: (userId: string, start: string, end: string) =>
    ['kegel', 'logs', userId, start, end] as const,
  streak: (userId: string) => ['kegel', 'streak', userId] as const,
};

// ─── useTodayKegel ─────────────────────────────────────────────────
export function useTodayKegel(phaseNumber: number) {
  return useQuery({
    queryKey: kegelKeys.today(phaseNumber),
    queryFn: async (): Promise<KegelPlan | null> => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('kegel_plans')
        .select('*')
        .eq('phase_number', phaseNumber)
        .maybeSingle();

      if (error) throw new Error(error.message);
      return data as KegelPlan | null;
    },
    enabled: !!phaseNumber,
    staleTime: 1000 * 60 * 60, // 1 jam
  });
}

// ─── useLogKegel ───────────────────────────────────────────────────
interface LogKegelInput {
  userId: string;
  date: string;
  session: 'morning' | 'night';
  setsCompleted: number;
  repsCompleted: number;
  completed: boolean;
}

export function useLogKegel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: LogKegelInput) => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('kegel_logs')
        .insert({
          user_id: input.userId,
          date: input.date,
          session: input.session,
          sets_completed: input.setsCompleted,
          reps_completed: input.repsCompleted,
          completed: input.completed,
        })
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data as KegelLog;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['kegel', 'logs', variables.userId] });
      queryClient.invalidateQueries({ queryKey: kegelKeys.streak(variables.userId) });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

// ─── useKegelLogs ──────────────────────────────────────────────────
export function useKegelLogs(
  userId: string,
  dateRange: { start: Date; end: Date }
) {
  const start = dateRange.start.toISOString().split('T')[0];
  const end = dateRange.end.toISOString().split('T')[0];

  return useQuery({
    queryKey: kegelKeys.logs(userId, start, end),
    queryFn: async (): Promise<KegelLog[]> => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('kegel_logs')
        .select('*')
        .eq('user_id', userId)
        .gte('date', start)
        .lte('date', end)
        .order('date', { ascending: false });

      if (error) throw new Error(error.message);
      return (data ?? []) as KegelLog[];
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
}

// ─── useKegelStreak ────────────────────────────────────────────────
export function useKegelStreak(userId: string) {
  return useQuery({
    queryKey: kegelKeys.streak(userId),
    queryFn: async (): Promise<number> => {
      const supabase = createClient();

      // Ambil semua log yang completed, urutkan descending
      const { data, error } = await supabase
        .from('kegel_logs')
        .select('date, completed')
        .eq('user_id', userId)
        .eq('completed', true)
        .order('date', { ascending: false });

      if (error) throw new Error(error.message);
      if (!data || data.length === 0) return 0;

      // Hitung hari berturut-turut dari hari ini/kemarin
      const uniqueDates = [...new Set(data.map((l) => l.date as string))].sort(
        (a, b) => new Date(b).getTime() - new Date(a).getTime()
      );

      let streak = 0;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      for (let i = 0; i < uniqueDates.length; i++) {
        const logDate = new Date(uniqueDates[i]);
        logDate.setHours(0, 0, 0, 0);
        const expectedDate = new Date(today);
        expectedDate.setDate(today.getDate() - i);

        if (logDate.getTime() === expectedDate.getTime()) {
          streak++;
        } else {
          break;
        }
      }

      return streak;
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
}
