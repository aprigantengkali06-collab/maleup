import { differenceInCalendarDays } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { DayOfWeek } from '@/lib/types';
import { DAYS_OF_WEEK, PHASE_CONFIGS } from '@/lib/utils/constants';

export function calculateBMI(heightCm: number, weightKg: number): number {
  if (!heightCm || !weightKg) return 0;
  const heightM = heightCm / 100;
  return Number((weightKg / (heightM * heightM)).toFixed(1));
}

export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  if (bmi < 35) return 'obese1';
  if (bmi < 40) return 'obese2';
  return 'obese3';
}

export function calculateTDEE(
  weightKg: number,
  heightCm: number,
  age: number,
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active'
): number {
  const bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  const multipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725
  };
  return Math.round(bmr * multipliers[activityLevel]);
}

export function calculateIdealWeight(heightCm: number) {
  const square = (heightCm / 100) ** 2;
  return {
    min: Number((18.5 * square).toFixed(1)),
    mid: Number((22 * square).toFixed(1)),
    max: Number((24.9 * square).toFixed(1))
  };
}

export function calculateWeightToLose(currentKg: number, heightCm: number): number {
  const ideal = calculateIdealWeight(heightCm);
  return Math.max(0, Number((currentKg - ideal.max).toFixed(1)));
}

export function determinePhase(currentWeek: number): 1 | 2 | 3 | 4 | 5 {
  if (currentWeek <= 2) return 1;
  if (currentWeek <= 6) return 2;
  if (currentWeek <= 12) return 3;
  if (currentWeek <= 18) return 4;
  return 5;
}

export function projectPenisLength(startLength: number, startWeight: number, currentWeight: number): number {
  const weightLost = Math.max(0, startWeight - currentWeight);
  const gain = Math.min(3.5, (weightLost / 6) * 0.75);
  return Number((startLength + gain).toFixed(2));
}

export function projectPenisLengthAtTarget(startLength: number, startWeight: number, targetWeight: number) {
  const projected = projectPenisLength(startLength, startWeight, targetWeight);
  const conservative = Number((startLength + Math.min(2.5, (startWeight - targetWeight) / 8 * 0.5)).toFixed(2));
  const optimistic = Number(Math.min(startLength + 3.5, projected + 0.35).toFixed(2));
  return { conservative, optimistic };
}

export function estimateTestosteroneChange(weightLostKg: number) {
  const percentIncrease = Number((Math.max(0, weightLostKg) * 0.6).toFixed(1));
  const ngDlIncrease = Number((Math.max(0, weightLostKg) * 5.5).toFixed(0));
  return { percentIncrease, ngDlIncrease };
}

export function getCurrentDayOfWeek(): DayOfWeek {
  const zoned = toZonedTime(new Date(), 'Asia/Jakarta');
  const dayIndex = zoned.getDay();
  const map = [6, 0, 1, 2, 3, 4, 5];
  return DAYS_OF_WEEK[map[dayIndex]];
}

export function getWeekNumber(programStartDate: string | Date): number {
  const start = new Date(programStartDate);
  const now = toZonedTime(new Date(), 'Asia/Jakarta');
  const diff = differenceInCalendarDays(now, start);
  return Math.min(24, Math.max(1, Math.floor(diff / 7) + 1));
}

export function getDailyCalorieTarget(phase: number) {
  const config = PHASE_CONFIGS.find((item) => item.phase_number === phase) ?? PHASE_CONFIGS[0];
  return {
    min: config.daily_calories_min,
    max: config.daily_calories_max
  };
}

export function getDailyMacroTarget(phase: number) {
  const config = PHASE_CONFIGS.find((item) => item.phase_number === phase) ?? PHASE_CONFIGS[0];
  return {
    protein: config.protein_target_g,
    carb: config.carb_target_g,
    fat: config.fat_target_g
  };
}
