// /src/lib/data/meals/index.ts
// Barrel export + helper untuk mengambil data fallback berdasarkan fase.

import { phase1MealData } from './phase1';
import { phase2MealData } from './phase2';
import { phase3MealData } from './phase3';
import { phase4MealData } from './phase4';
import { phase5MealData } from './phase5';
import type { DailyMealPlan, DayOfWeek } from '@/lib/types';

export { phase1MealData, phase2MealData, phase3MealData, phase4MealData, phase5MealData };

const DAY_NAME_TO_EN: Record<string, DayOfWeek> = {
  Senin: 'monday',
  Selasa: 'tuesday',
  Rabu: 'wednesday',
  Kamis: 'thursday',
  Jumat: 'friday',
  Sabtu: 'saturday',
  Minggu: 'sunday',
};

function resolveDay(plan: DailyMealPlan): DayOfWeek | undefined {
  if (plan.day_of_week) return plan.day_of_week as DayOfWeek;
  if (plan.dayName && DAY_NAME_TO_EN[plan.dayName]) return DAY_NAME_TO_EN[plan.dayName];
  if (plan.day_name && DAY_NAME_TO_EN[plan.day_name]) return DAY_NAME_TO_EN[plan.day_name];
  return undefined;
}

function resolveWeek(plan: DailyMealPlan): number | undefined {
  return plan.week_number ?? plan.weekNumber;
}

export function getFallbackMealPlan(
  phaseNumber: number,
  weekNumber: number,
  dayOfWeek: DayOfWeek
): DailyMealPlan | null {
  const allData = getAllPhaseData(phaseNumber);
  if (!allData) return null;

  const exactMatch = allData.find((plan) => {
    const sameDay = resolveDay(plan) === dayOfWeek;
    const planWeek = resolveWeek(plan);
    return sameDay && (planWeek === undefined || planWeek === weekNumber);
  });
  if (exactMatch) return exactMatch;

  const dayData = allData.filter((plan) => resolveDay(plan) === dayOfWeek);
  dayData.sort((a, b) => (resolveWeek(a) ?? 0) - (resolveWeek(b) ?? 0));
  return dayData[0] ?? null;
}

function getAllPhaseData(phaseNumber: number): DailyMealPlan[] | null {
  switch (phaseNumber) {
    case 1: return phase1MealData;
    case 2: return phase2MealData;
    case 3: return phase3MealData;
    case 4: return phase4MealData;
    case 5: return phase5MealData;
    default: return null;
  }
}
