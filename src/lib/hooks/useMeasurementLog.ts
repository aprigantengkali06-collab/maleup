/**
 * Hook untuk mencatat pengukuran sensitif (dienkripsi).
 * Data dienkripsi AES-256-GCM sebelum disimpan ke Supabase.
 */

'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { encrypt, decrypt } from '@/lib/utils/encryption';
import type { ChartDataPoint, MeasurementLog } from '@/lib/types';

// ─── Raw row type from Supabase ────────────────────────────────────
interface RawMeasurementRow {
  id: string;
  user_id: string;
  penis_length: string | null;
  penis_girth: string | null;
  erection_hardness_score: number | null;
  notes: string | null;
  logged_at: string;
  created_at?: string;
}

// Helper: enkripsi field pengukuran
async function encryptMeasurement(
  fields: { penis_length: string; penis_girth: string },
  userId: string
) {
  const [penis_length, penis_girth] = await Promise.all([
    encrypt(fields.penis_length, userId),
    encrypt(fields.penis_girth, userId),
  ]);
  return { penis_length, penis_girth };
}

// Helper: dekripsi row pengukuran
async function decryptMeasurement(row: RawMeasurementRow, userId: string): Promise<MeasurementLog> {
  const [penis_length, penis_girth] = await Promise.all([
    row.penis_length ? decrypt(row.penis_length, userId) : Promise.resolve(''),
    row.penis_girth  ? decrypt(row.penis_girth,  userId) : Promise.resolve(''),
  ]);
  return {
    id: row.id ? Number(row.id) : undefined,
    user_id: row.user_id,
    penis_length,
    penis_girth,
    erection_hardness_score: row.erection_hardness_score,
    notes: row.notes,
    logged_at: row.logged_at,
    created_at: row.created_at,
  } as MeasurementLog;
}
// ─── Query Keys ────────────────────────────────────────────────────
export const measurementKeys = {
  all: (userId: string) => ['measurement', 'logs', userId] as const,
  chart: (userId: string) => ['measurement', 'chart', userId] as const,
};

// ─── useMeasurementLogs ────────────────────────────────────────────
export function useMeasurementLogs(userId: string) {
  return useQuery({
    queryKey: measurementKeys.all(userId),
    queryFn: async (): Promise<MeasurementLog[]> => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('measurement_logs')
        .select('*')
        .eq('user_id', userId)
        .order('logged_at', { ascending: false });

      if (error) throw new Error(error.message);
      if (!data || data.length === 0) return [];

      // Safely cast raw rows before decrypt
      const rawRows = data as unknown as RawMeasurementRow[];

      // Decrypt setiap row di client
      const decrypted = await Promise.all(
        rawRows.map(async (row) => {
          try {
            return await decryptMeasurement(row, userId);
          } catch {
            // Jika decrypt gagal, return raw (data lama tanpa enkripsi)
            return row as unknown as MeasurementLog;
          }
        })
      );

      return decrypted;
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
}

// ─── useLogMeasurement ─────────────────────────────────────────────
interface LogMeasurementInput {
  userId: string;
  penisLength: string;
  penisGirth: string;
  erectionHardnessScore: 1 | 2 | 3 | 4;
  notes?: string;
  loggedAt?: string;
}

export function useLogMeasurement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: LogMeasurementInput) => {
      const supabase = createClient();

      // Encrypt fields sensitif sebelum insert
      const encrypted = await encryptMeasurement(
        {
          penis_length: input.penisLength,
          penis_girth: input.penisGirth,
        },
        input.userId
      );

      const { data, error } = await supabase
        .from('measurement_logs')
        .insert({
          user_id: input.userId,
          penis_length: encrypted.penis_length,
          penis_girth: encrypted.penis_girth,
          erection_hardness_score: input.erectionHardnessScore,
          notes: input.notes ?? null,
          logged_at: input.loggedAt ?? new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data as MeasurementLog;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: measurementKeys.all(variables.userId) });
      queryClient.invalidateQueries({ queryKey: measurementKeys.chart(variables.userId) });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

// ─── useMeasurementChartData ───────────────────────────────────────
export function useMeasurementChartData(userId: string) {
  return useQuery({
    queryKey: measurementKeys.chart(userId),
    queryFn: async (): Promise<{ length: ChartDataPoint[]; girth: ChartDataPoint[] }> => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('measurement_logs')
        .select('*')
        .eq('user_id', userId)
        .order('logged_at', { ascending: true });

      if (error) throw new Error(error.message);
      if (!data || data.length === 0) return { length: [], girth: [] };

      const rawRows = data as unknown as RawMeasurementRow[];

      const decrypted = await Promise.all(
        rawRows.map(async (row) => {
          try {
            return await decryptMeasurement(row, userId);
          } catch {
            return row as unknown as MeasurementLog;
          }
        })
      );

      const lengthData: ChartDataPoint[] = decrypted.map((log) => ({
        date: log.logged_at.split('T')[0],
        label: new Date(log.logged_at).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
        }),
        value: parseFloat(log.penis_length) || 0,
      }));

      const girthData: ChartDataPoint[] = decrypted.map((log) => ({
        date: log.logged_at.split('T')[0],
        label: new Date(log.logged_at).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
        }),
        value: parseFloat(log.penis_girth) || 0,
      }));

      return { length: lengthData, girth: girthData };
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
}
