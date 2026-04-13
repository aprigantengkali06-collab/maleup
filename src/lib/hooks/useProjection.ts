/**
 * Hook untuk menghitung proyeksi progress pengguna.
 * Memperkirakan pencapaian target berdasarkan data historis.
 */

'use client';

import { useMemo } from 'react';
import {
  projectPenisLength,
  projectPenisLengthAtTarget,
  estimateTestosteroneChange,
  determinePhase,
} from '@/lib/utils/formulas';
import type { Profile } from '@/lib/types';

// ─── Types ─────────────────────────────────────────────────────────
export interface WeightProjectionPoint {
  week: number;
  projected: number;
  target: number;
}

export interface ProjectionResult {
  weightPerWeek: WeightProjectionPoint[];
  penisAtTarget: { conservative: number; optimistic: number };
  penisNow: number;
  testosteroneChange: { percentIncrease: number; ngDlIncrease: string };
  weeksToTarget: number;
  phaseAtWeek: (week: number) => 1 | 2 | 3 | 4 | 5;
}

// ─── useProjections ────────────────────────────────────────────────
export function useProjections(profile: Profile | null): ProjectionResult | null {
  return useMemo(() => {
    if (!profile) return null;

    const {
      starting_weight_kg,
      current_weight_kg,
      target_weight_kg,
      starting_penis_length,
      current_week,
    } = profile;

    const startLength = parseFloat(starting_penis_length) || 0;
    const totalToLose = starting_weight_kg - target_weight_kg;

    // Hitung rate penurunan per minggu berdasarkan fase
    // Fase 1 (1-2):  ~1.2 kg/minggu (PSMF)
    // Fase 2 (3-6):  ~0.8 kg/minggu (VLCD)
    // Fase 3 (7-12): ~0.5 kg/minggu (defisit moderat)
    // Fase 4 (13-18):~0.4 kg/minggu (rekomposisi)
    // Fase 5 (19-24):~0.25 kg/minggu (maintenance)
    const rateByPhase: Record<number, number> = {
      1: 1.2,
      2: 0.8,
      3: 0.5,
      4: 0.4,
      5: 0.25,
    };

    // Build projected weight untuk 24 minggu
    const weightPerWeek: WeightProjectionPoint[] = [];
    let projectedWeight = starting_weight_kg;

    for (let week = 1; week <= 24; week++) {
      const phase = determinePhase(week);
      const rate = rateByPhase[phase] ?? 0.4;

      if (week > 1) {
        projectedWeight = Math.max(target_weight_kg, projectedWeight - rate);
      }

      weightPerWeek.push({
        week,
        projected: Number(projectedWeight.toFixed(1)),
        target: target_weight_kg,
      });
    }

    // Hitung minggu sampai target
    const weeksToTarget =
      weightPerWeek.find((p) => p.projected <= target_weight_kg)?.week ??
      24;

    // Proyeksi penis saat ini
    const penisNow = projectPenisLength(startLength, starting_weight_kg, current_weight_kg);

    // Proyeksi penis saat mencapai target
    const penisAtTarget = projectPenisLengthAtTarget(
      startLength,
      starting_weight_kg,
      target_weight_kg
    );

    // Proyeksi perubahan testosteron
    const weightLostSoFar = starting_weight_kg - current_weight_kg;
    const { percentIncrease, ngDlIncrease } = estimateTestosteroneChange(weightLostSoFar);

    return {
      weightPerWeek,
      penisAtTarget,
      penisNow,
      testosteroneChange: {
        percentIncrease,
        ngDlIncrease: String(ngDlIncrease),
      },
      weeksToTarget,
      phaseAtWeek: (week: number) => determinePhase(week),
    };
  }, [profile]);
}

// ─── Helper: proyeksi berat saat minggu tertentu ───────────────────
export function getProjectedWeightAtWeek(
  profile: Profile,
  targetWeek: number
): number {
  const rateByPhase: Record<number, number> = {
    1: 1.2, 2: 0.8, 3: 0.5, 4: 0.4, 5: 0.25,
  };
  let weight = profile.starting_weight_kg;
  for (let w = 2; w <= Math.min(targetWeek, 24); w++) {
    const phase = determinePhase(w);
    weight = Math.max(profile.target_weight_kg, weight - (rateByPhase[phase] ?? 0.4));
  }
  return Number(weight.toFixed(1));
}
