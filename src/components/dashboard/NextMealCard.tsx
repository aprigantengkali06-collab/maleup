// src/components/dashboard/NextMealCard.tsx
'use client';

import Link from 'next/link';
import { ArrowRight, Clock, Utensils } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { DailyMealPlan } from '@/lib/types';

const MEAL_TYPE_LABELS: Record<string, string> = {
  breakfast: 'Sarapan',
  lunch: 'Makan Siang',
  dinner: 'Makan Malam',
  snack: 'Cemilan',
  snack1: 'Cemilan 1',
  snack2: 'Cemilan 2',
};

interface NextMealCardProps {
  mealPlan: DailyMealPlan | null;
  completedMealIds?: number[];
}

export function NextMealCard({ mealPlan, completedMealIds = [] }: NextMealCardProps) {
  const meals = mealPlan?.meals ?? [];
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // Find next meal that hasn't been completed yet
  const nextMeal =
    meals.find((meal) => {
      if (completedMealIds.includes(meal.id)) return false;
      const [h, m] = (meal.time_scheduled ?? '00:00').split(':').map(Number);
      return h * 60 + m >= currentMinutes;
    }) ?? meals.find((m) => !completedMealIds.includes(m.id));

  if (!nextMeal) {
    return (
      <Card className="border-zinc-800 bg-zinc-900">
        <CardContent className="flex items-center gap-3 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600/20">
            <Utensils className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-200">Semua meal selesai! 🎉</p>
            <p className="text-xs text-zinc-500">Target nutrisi hari ini tercapai</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const mealType = nextMeal.meal_type ?? nextMeal.mealType ?? 'lunch';
  const mealName = nextMeal.name ?? nextMeal.mealName ?? 'Menu hari ini';
  const calories = nextMeal.total_calories ?? nextMeal.calories ?? 0;
  const time = nextMeal.time_scheduled ?? nextMeal.timeScheduled;

  return (
    <Card className="border-zinc-800 bg-zinc-900">
      <CardContent className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Meal Berikutnya
          </p>
          {time && (
            <span className="flex items-center gap-1 text-xs text-zinc-500">
              <Clock className="h-3 w-3" />
              {time}
            </span>
          )}
        </div>
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-600/20">
            <Utensils className="h-5 w-5 text-amber-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-zinc-200 truncate">{mealName}</p>
            <p className="text-xs text-zinc-500">
              {MEAL_TYPE_LABELS[mealType] ?? mealType} · {calories} kkal
            </p>
          </div>
          <Link href="/meal">
            <button className="flex h-8 items-center gap-1 rounded-xl bg-zinc-800 px-3 text-xs font-medium text-zinc-300 hover:bg-zinc-700 transition-colors whitespace-nowrap">
              Lihat Menu <ArrowRight className="h-3 w-3" />
            </button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
