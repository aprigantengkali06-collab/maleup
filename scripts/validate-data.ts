/**
 * scripts/validate-data.ts
 * Run with: npx tsx scripts/validate-data.ts
 *
 * Validates all meal, workout, and kegel data against source-of-truth thresholds.
 */

import { phase1MealData } from '../src/lib/data/meals/phase1';
import { phase2MealData } from '../src/lib/data/meals/phase2';
import { phase3MealData } from '../src/lib/data/meals/phase3';
import { phase4MealData } from '../src/lib/data/meals/phase4';
import { phase5MealData } from '../src/lib/data/meals/phase5';
import { phase1WorkoutData } from '../src/lib/data/workouts/phase1';
import { phase2WorkoutData } from '../src/lib/data/workouts/phase2';
import { phase3WorkoutData } from '../src/lib/data/workouts/phase3';
import { phase4WorkoutData } from '../src/lib/data/workouts/phase4';
import { phase5WorkoutData } from '../src/lib/data/workouts/phase5';
import { allKegelData } from '../src/lib/data/kegel/allPhases';

// ─── Source-of-truth constants ────────────────────────────────────────────────

const DAYS_OF_WEEK = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const DAY_LABELS   = ['Senin',  'Selasa',  'Rabu',    'Kamis',   'Jumat',  'Sabtu',  'Minggu'];

const PHASE_NUTRITION: Record<number, {
  kcalMin: number; kcalMax: number;
  pMin: number; pMax: number;
  kMin: number; kMax: number;
  lMin: number; lMax: number;
  mealsMin: number; mealsMax: number;
}> = {
  1: { kcalMin: 750,  kcalMax: 850,  pMin: 150, pMax: 160, kMin: 0,   kMax: 20,  lMin: 0,  lMax: 20,  mealsMin: 3, mealsMax: 4 },
  2: { kcalMin: 1000, kcalMax: 1200, pMin: 130, pMax: 140, kMin: 50,  kMax: 80,  lMin: 25, lMax: 35,  mealsMin: 4, mealsMax: 4 },
  3: { kcalMin: 1500, kcalMax: 1700, pMin: 140, pMax: 150, kMin: 120, kMax: 150, lMin: 40, lMax: 55,  mealsMin: 4, mealsMax: 4 },
  4: { kcalMin: 1500, kcalMax: 1600, pMin: 140, pMax: 150, kMin: 130, kMax: 150, lMin: 40, lMax: 50,  mealsMin: 3, mealsMax: 3 },
  5: { kcalMin: 2000, kcalMax: 2200, pMin: 130, pMax: 140, kMin: 200, kMax: 250, lMin: 55, lMax: 65,  mealsMin: 5, mealsMax: 5 },
};

const KCAL_TOLERANCE  = 50;
const MACRO_TOLERANCE = 10;

const PHASE_WORKOUT_SCHEDULE: Record<number, string[]> = {
  // Index:  Mon              Tue              Wed     Thu              Fri          Sat          Sun
  // NOTE: Sunday accepts 'mobility' as equivalent to 'rest' (active recovery is preferred).
  // Phase 3 uses full_body on Tue+Thu (not split upper/lower).
  // Phase 5 Tue = strength_upper (Push+Pull both upper), Thu = strength_lower (Legs).
  1: ['walk',           'walk',           'walk',  'walk',           'walk',      'walk',     'mobility'],
  2: ['hiit',           'walk',           'hiit',  'walk',           'hiit',      'walk',     'mobility'],
  3: ['hiit',           'full_body',      'hiit',  'full_body',      'hiit',      'walk',     'mobility'],
  4: ['tabata',         'strength_upper', 'tabata','strength_lower', 'tabata',    'full_body','tabata'],
  5: ['strength_upper', 'strength_upper', 'hiit',  'strength_lower', 'full_body', 'hiit',     'mobility'],
};

const PHASE_KEGEL: Record<number, { sets: number; reps: number; holdSeconds: number; sessionsPerDay: number }> = {
  1: { sets: 3, reps: 10, holdSeconds: 5,  sessionsPerDay: 2 },
  2: { sets: 3, reps: 15, holdSeconds: 7,  sessionsPerDay: 2 },
  3: { sets: 3, reps: 20, holdSeconds: 10, sessionsPerDay: 2 },
  4: { sets: 3, reps: 25, holdSeconds: 10, sessionsPerDay: 2 },
  5: { sets: 2, reps: 20, holdSeconds: 10, sessionsPerDay: 1 },
};

// ─── Counters ─────────────────────────────────────────────────────────────────

let mealPass = 0,    mealFail = 0;
let workoutPass = 0, workoutFail = 0;
let kegelPass = 0,   kegelFail = 0;

// ─── Meal Validation ──────────────────────────────────────────────────────────

console.log('\n═══ MEAL VALIDATION ═══');

function validateMeals(phaseNum: number, mealData: any[]) {
  const spec = PHASE_NUTRITION[phaseNum];

  for (let i = 0; i < DAYS_OF_WEEK.length; i++) {
    const day   = DAYS_OF_WEEK[i];
    const label = DAY_LABELS[i];
    const dayData = mealData.find((d: any) => d.day_of_week === day);

    if (!dayData) {
      console.log(`Fase ${phaseNum} - ${label} (Day ${i + 1}): ❌ MISSING`);
      mealFail += 5;
      continue;
    }

    const meals: any[] = dayData.meals ?? [];
    const kcal = meals.reduce((s: number, m: any) => s + (m.total_calories  ?? 0), 0);
    const p    = meals.reduce((s: number, m: any) => s + (m.total_protein_g ?? 0), 0);
    const k    = meals.reduce((s: number, m: any) => s + (m.total_carb_g    ?? 0), 0);
    const l    = meals.reduce((s: number, m: any) => s + (m.total_fat_g     ?? 0), 0);

    const kcalOk = kcal >= spec.kcalMin - KCAL_TOLERANCE  && kcal <= spec.kcalMax + KCAL_TOLERANCE;
    const pOk    = p    >= spec.pMin    - MACRO_TOLERANCE  && p    <= spec.pMax    + MACRO_TOLERANCE;
    const kOk    = k    >= spec.kMin    - MACRO_TOLERANCE  && k    <= spec.kMax    + MACRO_TOLERANCE;
    const lOk    = l    >= spec.lMin    - MACRO_TOLERANCE  && l    <= spec.lMax    + MACRO_TOLERANCE;
    const mOk    = meals.length >= spec.mealsMin && meals.length <= spec.mealsMax;

    console.log(
      `Fase ${phaseNum} - ${label} (Day ${i + 1}): ` +
      `${kcal} kcal (${spec.kcalMin}-${spec.kcalMax}) ${kcalOk ? '✅' : '❌'} | ` +
      `P ${p}g (${spec.pMin}-${spec.pMax}) ${pOk ? '✅' : '❌'} | ` +
      `K ${k}g (${spec.kMin}-${spec.kMax}) ${kOk ? '✅' : '❌'} | ` +
      `L ${l}g (${spec.lMin}-${spec.lMax}) ${lOk ? '✅' : '❌'} | ` +
      `Meals: ${meals.length} (${spec.mealsMin}-${spec.mealsMax}) ${mOk ? '✅' : '❌'}`
    );

    [kcalOk, pOk, kOk, lOk, mOk].forEach((ok) => { if (ok) mealPass++; else mealFail++; });
  }
}

validateMeals(1, phase1MealData);
validateMeals(2, phase2MealData);
validateMeals(3, phase3MealData);
validateMeals(4, phase4MealData);
validateMeals(5, phase5MealData);

// ─── Workout Validation ───────────────────────────────────────────────────────

console.log('\n═══ WORKOUT VALIDATION ═══');

function validateWorkouts(phaseNum: number, workoutData: any[]) {
  const schedule = PHASE_WORKOUT_SCHEDULE[phaseNum];

  for (let i = 0; i < DAYS_OF_WEEK.length; i++) {
    const day   = DAYS_OF_WEEK[i];
    const label = DAY_LABELS[i];
    const dayData = workoutData.find((d: any) => d.day_of_week === day);

    if (!dayData) {
      console.log(`Fase ${phaseNum} - ${label} (Day ${i + 1}): ❌ MISSING`);
      workoutFail += 2;
      continue;
    }

    const expectedType = schedule[i];
    const actualType   = dayData.workout_type ?? '';
    const typeOk       = actualType === expectedType;

    const exercises: any[]  = dayData.exercises ?? [];
    const isLightDay         = ['rest', 'mobility', 'walk'].includes(actualType);
    const exercisesOk        = isLightDay || exercises.length >= 1;

    console.log(
      `Fase ${phaseNum} - ${label} (Day ${i + 1}): ` +
      `${actualType} (exp: ${expectedType}) ${typeOk ? '✅' : '❌'} | ` +
      `Exercises: ${exercises.length} ${exercisesOk ? '✅' : '❌'}`
    );

    if (typeOk) workoutPass++; else workoutFail++;
    if (exercisesOk) workoutPass++; else workoutFail++;
  }
}

validateWorkouts(1, phase1WorkoutData);
validateWorkouts(2, phase2WorkoutData);
validateWorkouts(3, phase3WorkoutData);
validateWorkouts(4, phase4WorkoutData);
validateWorkouts(5, phase5WorkoutData);

// ─── Kegel Validation ─────────────────────────────────────────────────────────

console.log('\n═══ KEGEL VALIDATION ═══');

for (let phaseNum = 1; phaseNum <= 5; phaseNum++) {
  const spec  = PHASE_KEGEL[phaseNum];
  const entry = allKegelData.find((k: any) => k.phase_number === phaseNum);

  if (!entry) {
    console.log(`Fase ${phaseNum}: ❌ MISSING KEGEL DATA`);
    kegelFail += 4;
    continue;
  }

  const sessionsActual = entry.times_per_day ?? (entry as any).sessionsPerDay ?? 0;
  const setsOk    = entry.sets        === spec.sets;
  const repsOk    = entry.reps        === spec.reps;
  const holdOk    = entry.hold_seconds === spec.holdSeconds;
  const sessionOk = sessionsActual    === spec.sessionsPerDay;

  const typeLabel = (entry as any).kegelType ?? (entry.include_reverse_kegel ? 'standard+reverse' : 'standard');

  console.log(
    `Fase ${phaseNum}: ${typeLabel} | ` +
    `${entry.sets}×${entry.reps} ${setsOk ? '✅' : '❌'}${repsOk ? '✅' : '❌'} | ` +
    `${entry.hold_seconds}s hold ${holdOk ? '✅' : '❌'} | ` +
    `${sessionsActual} sessions/day ${sessionOk ? '✅' : '❌'}`
  );

  [setsOk, repsOk, holdOk, sessionOk].forEach((ok) => { if (ok) kegelPass++; else kegelFail++; });
}

// ─── Summary ──────────────────────────────────────────────────────────────────

const totalPass = mealPass + workoutPass + kegelPass;
const totalFail = mealFail + workoutFail + kegelFail;

console.log('\n═══ SUMMARY ═══');
console.log(`Meals:    ${mealPass    + mealFail   }/${mealPass    + mealFail   } checks — ${mealPass   } pass, ${mealFail   } fail`);
console.log(`Workouts: ${workoutPass + workoutFail}/${workoutPass + workoutFail} checks — ${workoutPass} pass, ${workoutFail} fail`);
console.log(`Kegels:   ${kegelPass   + kegelFail  }/${kegelPass   + kegelFail  } checks — ${kegelPass  } pass, ${kegelFail  } fail`);
console.log(`─────────────────────────────────────────`);
console.log(`Total: ${totalPass} pass, ${totalFail} fail`);

if (totalFail > 0) {
  console.log(`\nRESULT: ❌ ${totalFail} FAILURE(S) — fix before deploying.`);
  process.exit(1);
} else {
  console.log('\nRESULT: ✅ ALL PASS');
  process.exit(0);
}
