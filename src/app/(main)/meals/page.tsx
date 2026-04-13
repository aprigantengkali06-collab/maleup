'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Clock, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { usePhaseStore } from '@/lib/stores/phaseStore';
import { useUserStore } from '@/lib/stores/userStore';
import type { Meal, MealType } from '@/lib/types';

// ─── Helpers ───────────────────────────────────────────────────────
const MEAL_TYPE_LABEL: Record<MealType | string, string> = {
  breakfast: 'Sarapan',
  lunch: 'Makan Siang',
  dinner: 'Makan Malam',
  snack: 'Snack',
  snack1: 'Snack',
  snack2: 'Snack',
};

const MEAL_TYPE_COLOR: Record<MealType | string, string> = {
  breakfast: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  lunch: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  dinner: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  snack: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  snack1: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  snack2: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
};

const MACRO_COLORS = ['#3b82f6', '#f59e0b', '#ef4444'];
const DAYS_ID = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

// ─── Skeleton Loading ──────────────────────────────────────────────
function MealsLoadingSkeleton() {
  return (
    <div className="space-y-4 pb-6">
      <div className="space-y-2">
        <Skeleton className="h-7 w-44 bg-zinc-800" />
        <Skeleton className="h-4 w-24 bg-zinc-800" />
      </div>
      {/* Donut placeholder */}
      <Card className="space-y-4">
        <Skeleton className="h-4 w-32 bg-zinc-800" />
        <div className="flex items-center gap-4">
          <Skeleton className="w-24 h-24 rounded-full bg-zinc-800 flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-full bg-zinc-800" />
            <Skeleton className="h-3 w-full bg-zinc-800" />
            <Skeleton className="h-3 w-3/4 bg-zinc-800" />
          </div>
        </div>
      </Card>
      {/* Meal card skeletons */}
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-20 w-full rounded-2xl bg-zinc-800" />
      ))}
    </div>
  );
}

// ─── MealCard ─────────────────────────────────────────────────────
function MealCard({ meal, completed, onComplete }: { meal: Meal; completed: boolean; onComplete: () => void }) {
  const router = useRouter();
  const mealType = (meal.meal_type ?? meal.mealType ?? 'snack') as string;
  const mealName = meal.name ?? meal.mealName ?? 'Menu';
  const calories = meal.total_calories ?? meal.calories ?? 0;
  const protein = meal.total_protein_g ?? meal.protein ?? 0;
  const carbs = meal.total_carb_g ?? meal.carbs ?? 0;
  const fat = meal.total_fat_g ?? meal.fat ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className="relative overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
        onClick={() => router.push(`/meals/${meal.id}`)}
      >
        {completed && (
          <div className="absolute inset-0 bg-emerald-900/60 backdrop-blur-[1px] z-10 flex items-center justify-center gap-2 rounded-xl">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            <span className="text-emerald-300 font-semibold text-sm">Sudah Dimakan ✅</span>
          </div>
        )}
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge className={`text-[10px] px-1.5 py-0.5 ${MEAL_TYPE_COLOR[mealType] ?? MEAL_TYPE_COLOR.snack}`}>
                {MEAL_TYPE_LABEL[mealType] ?? 'Meal'}
              </Badge>
            </div>
            <p className="font-semibold text-white truncate">{mealName}</p>
            <p className="text-xs text-zinc-400 mt-1">
              {calories} kcal &bull; P {protein}g &bull; K {carbs}g &bull; L {fat}g
            </p>
          </div>
          <ChevronRight className="h-4 w-4 text-zinc-600 ml-3 flex-shrink-0" />
        </div>
        {!completed && (
          <button
            className="mt-3 w-full py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 text-xs font-medium transition-colors"
            onClick={(e) => { e.stopPropagation(); onComplete(); }}
          >
            Tandai Sudah Makan
          </button>
        )}
      </Card>
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────
export default function MealsPage() {
  const profile = useUserStore((s) => s.profile);
  const { todayMealPlan, completedMeals, completeMeal, currentPhase, loadTodayPlan } = usePhaseStore();
  const [isInitializing, setIsInitializing] = useState(!todayMealPlan);

  const meals: Meal[] = todayMealPlan?.meals ?? [];
  const today = DAYS_ID[new Date().getDay()];

  // Show skeleton on first load while plan loads
  if (isInitializing && meals.length === 0) {
    // Auto-dismiss skeleton once data arrives
    if (todayMealPlan) {
      setIsInitializing(false);
    }
    return <MealsLoadingSkeleton />;
  }

  const totals = meals.reduce(
    (acc, m) => {
      acc.calories += m.total_calories ?? m.calories ?? 0;
      acc.protein += m.total_protein_g ?? m.protein ?? 0;
      acc.carbs += m.total_carb_g ?? m.carbs ?? 0;
      acc.fat += m.total_fat_g ?? m.fat ?? 0;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const donutData = [
    { name: 'Protein', value: totals.protein },
    { name: 'Karbo', value: totals.carbs },
    { name: 'Lemak', value: totals.fat },
  ].filter((d) => d.value > 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 pb-6"
    >
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-white">Menu Hari Ini</h1>
          <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30 text-xs">
            Fase {currentPhase}
          </Badge>
        </div>
        <p className="text-sm text-zinc-400 mt-0.5">{today}</p>
      </div>

      {/* Phase 4 IF Banner */}
      {currentPhase === 4 && (
        <Card className="bg-amber-900/30 border-amber-500/30">
          <div className="flex items-center gap-2">
            <span className="text-lg">⏰</span>
            <div>
              <p className="text-sm font-semibold text-amber-300">Intermittent Fasting</p>
              <p className="text-xs text-amber-400/80">Jendela makan: 12.00 – 20.00</p>
            </div>
          </div>
        </Card>
      )}

      {/* Macro Summary */}
      <Card className="space-y-4">
        <p className="text-xs uppercase tracking-widest text-zinc-500 font-medium">Ringkasan Makro</p>
        <div className="flex items-center gap-4">
          {/* Donut */}
          <div className="w-24 h-24 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData.length > 0 ? donutData : [{ name: 'Empty', value: 1 }]}
                  cx="50%"
                  cy="50%"
                  innerRadius={28}
                  outerRadius={44}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {donutData.length > 0
                    ? donutData.map((_, index) => (
                        <Cell key={index} fill={MACRO_COLORS[index % MACRO_COLORS.length]} />
                      ))
                    : <Cell fill="#27272a" />}
                </Pie>
                {donutData.length > 0 && <Tooltip formatter={(v: number) => `${v}g`} />}
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Macro labels */}
          <div className="flex-1 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-400">Kalori</span>
              <span className="text-white font-medium">{totals.calories} kcal</span>
            </div>
            {[
              { label: 'Protein', value: totals.protein, color: '#3b82f6' },
              { label: 'Karbo', value: totals.carbs, color: '#f59e0b' },
              { label: 'Lemak', value: totals.fat, color: '#ef4444' },
            ].map((m) => (
              <div key={m.label} className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: m.color }} />
                <span className="text-zinc-400">{m.label}</span>
                <span className="text-white ml-auto font-medium">{m.value}g</span>
              </div>
            ))}
          </div>
        </div>
        {/* Progress */}
        <div className="flex items-center gap-2 text-xs text-zinc-400 pt-1 border-t border-zinc-800/60">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
          <span>{completedMeals.length} dari {meals.length} meal selesai</span>
        </div>
      </Card>

      {/* No meals state */}
      {meals.length === 0 && (
        <Card className="text-center py-6">
          <AlertCircle className="h-8 w-8 text-zinc-600 mx-auto mb-2" />
          <p className="text-sm text-zinc-400">Belum ada menu untuk hari ini</p>
          <p className="text-xs text-zinc-600 mt-1">Plan akan dimuat otomatis</p>
        </Card>
      )}

      {/* Meal list */}
      <div className="space-y-3">
        {meals.map((meal) => (
          <MealCard
            key={meal.id}
            meal={meal}
            completed={completedMeals.includes(meal.id)}
            onComplete={() => {
              if (profile?.id) void completeMeal(profile.id, meal.id);
            }}
          />
        ))}
      </div>

      {/* Time context */}
      {meals.length > 0 && (
        <Card className="flex items-center gap-2 text-xs text-zinc-500">
          <Clock className="h-3.5 w-3.5" />
          <span>Waktu makan optimal sesuai jadwal fase {currentPhase}</span>
        </Card>
      )}
    </motion.div>
  );
}
