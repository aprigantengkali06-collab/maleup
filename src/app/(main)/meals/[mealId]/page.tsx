'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, UtensilsCrossed, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { usePhaseStore } from '@/lib/stores/phaseStore';
import { useUserStore } from '@/lib/stores/userStore';
import type { MealType, MealIngredient } from '@/lib/types';

// ─── Helpers ───────────────────────────────────────────────────────
const MEAL_TYPE_LABEL: Record<string, string> = {
  breakfast: 'Sarapan',
  lunch: 'Makan Siang',
  dinner: 'Makan Malam',
  snack: 'Snack',
  snack1: 'Snack',
  snack2: 'Snack',
};

const MEAL_TYPE_COLOR: Record<string, string> = {
  breakfast: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  lunch: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  dinner: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  snack: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  snack1: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  snack2: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
};

// ─── MacroBar ─────────────────────────────────────────────────────
function MacroBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.min(100, max > 0 ? (value / max) * 100 : 0);
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-zinc-400">{label}</span>
        <span className="text-white font-medium">{value}g</span>
      </div>
      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────

// ─── Skeleton Loading ──────────────────────────────────────────────
function MealDetailSkeleton() {
  return (
    <div className="space-y-4 pb-6">
      <div className="flex items-center gap-3">
        <Skeleton className="h-8 w-8 rounded-full bg-zinc-800" />
        <Skeleton className="h-6 w-48 bg-zinc-800" />
      </div>
      <Skeleton className="h-24 w-full rounded-2xl bg-zinc-800" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-32 bg-zinc-800" />
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-10 w-full rounded-xl bg-zinc-800" />
        ))}
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-28 bg-zinc-800" />
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 w-full rounded-xl bg-zinc-800" />
        ))}
      </div>
    </div>
  );
}

export default function MealDetailPage() {
  const router = useRouter();
  const params = useParams();
  const mealId = Number(params?.mealId ?? params?.id ?? 0);

  const profile = useUserStore((s) => s.profile);
  const { todayMealPlan, completedMeals, completeMeal } = usePhaseStore();

  // Find meal from today's plan
  const meal = todayMealPlan?.meals?.find((m) => m.id === mealId);
  const isCompleted = completedMeals.includes(mealId);

  // Show skeleton while plan is loading (no plan yet but mealId given)
  if (!todayMealPlan && mealId > 0) {
    return <MealDetailSkeleton />;
  }

  if (!meal) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-3">
        <p className="text-zinc-400">Menu tidak ditemukan</p>
        <Button variant="secondary" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Kembali
        </Button>
      </div>
    );
  }

  const mealType = (meal.meal_type ?? meal.mealType ?? 'snack') as string;
  const mealName = meal.name ?? meal.mealName ?? 'Menu';
  const calories = meal.total_calories ?? meal.calories ?? 0;
  const protein = meal.total_protein_g ?? meal.protein ?? 0;
  const carbs = meal.total_carb_g ?? meal.carbs ?? 0;
  const fat = meal.total_fat_g ?? meal.fat ?? 0;
  const prepTime = meal.prep_time_minutes ?? meal.cooking_time_minutes ?? 0;
  const instructions = meal.recipe_instructions ?? meal.recipeInstructions ?? '';
  const ingredients: MealIngredient[] = meal.meal_ingredients ?? meal.ingredients ?? [];

  const steps = instructions
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const handleComplete = () => {
    if (!profile || isCompleted) return;
    void completeMeal(profile.id, meal.id);
    toast.success('Makanan dicatat! 🎉', { description: `${mealName} berhasil dilog.` });
    setTimeout(() => router.back(), 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 pb-28"
    >
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors text-sm"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali
      </button>

      {/* Header */}
      <div className="space-y-2">
        <Badge className={`text-xs border ${MEAL_TYPE_COLOR[mealType]}`}>
          {MEAL_TYPE_LABEL[mealType] ?? 'Makanan'}
        </Badge>
        <h1 className="text-xl font-bold text-white leading-tight">{mealName}</h1>
        {prepTime > 0 && (
          <p className="text-sm text-zinc-400 flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {prepTime} menit
          </p>
        )}
      </div>

      {/* Macro Grid — quick at-a-glance numbers */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'Kalori', value: calories, unit: 'kcal', color: 'text-amber-400' },
          { label: 'Protein', value: protein, unit: 'g', color: 'text-blue-400' },
          { label: 'Karbo', value: carbs, unit: 'g', color: 'text-emerald-400' },
          { label: 'Lemak', value: fat, unit: 'g', color: 'text-red-400' },
        ].map((macro) => (
          <Card key={macro.label} className="text-center py-1 px-1">
            <p className={`text-sm font-bold ${macro.color}`}>{macro.value}</p>
            <p className="text-[10px] text-zinc-500">{macro.unit}</p>
            <p className="text-[10px] text-zinc-400">{macro.label}</p>
          </Card>
        ))}
      </div>

      {/* Macro Bars — detailed visual */}
      <Card className="space-y-3">
        <p className="text-xs uppercase tracking-widest text-zinc-500 font-medium">Informasi Gizi</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-400">Total</span>
          <span className="text-xl font-bold text-white">{calories} <span className="text-sm font-normal text-zinc-400">kcal</span></span>
        </div>
        <div className="space-y-2">
          <MacroBar label="Protein" value={protein} max={100} color="#3b82f6" />
          <MacroBar label="Karbohidrat" value={carbs} max={200} color="#f59e0b" />
          <MacroBar label="Lemak" value={fat} max={80} color="#ef4444" />
        </div>
      </Card>

      {/* Ingredients */}
      {ingredients.length > 0 && (
        <Card className="space-y-3">
          <p className="text-xs uppercase tracking-widest text-zinc-500 font-medium flex items-center gap-2">
            <UtensilsCrossed className="h-3.5 w-3.5" />
            Bahan-bahan
          </p>
          <div className="divide-y divide-zinc-800/60">
            {ingredients.map((ing, idx) => {
              // quantity_description contains the full human-readable label
              // e.g. "6 putih telur", "250g dada ayam", "1 genggam bayam segar"
              const food = (ing as unknown as { food?: { name?: string } }).food;
              const displayName =
                ing.quantity_description ??
                food?.name ??
                ing.foodName ??
                `Bahan ${idx + 1}`;
              const qty = ing.quantity_g ?? ing.quantity ?? 0;
              const unit = ing.unit ?? 'g';
              return (
                <div key={ing.id ?? idx} className="py-2.5 flex justify-between items-start gap-3 text-sm">
                  <span className="text-zinc-200 flex-1">{displayName}</span>
                  {qty > 0 && (
                    <span className="text-zinc-500 flex-shrink-0 text-xs mt-0.5">{qty} {unit}</span>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Recipe */}
      {steps.length > 0 && (
        <Card className="space-y-3">
          <p className="text-xs uppercase tracking-widest text-zinc-500 font-medium">Cara Memasak</p>
          <div className="space-y-2">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600/20 text-blue-400 text-xs flex items-center justify-center font-bold">
                  {i + 1}
                </span>
                <div className="bg-zinc-800/50 rounded-lg px-3 py-2 flex-1">
                  <p className="text-sm text-zinc-300 leading-relaxed">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Fixed CTA */}
      <div className="fixed bottom-[calc(env(safe-area-inset-bottom)+5rem)] left-1/2 -translate-x-1/2 w-full max-w-[480px] px-4 z-50">
        <Button
          className={`w-full h-12 text-base font-semibold transition-all ${
            isCompleted
              ? 'bg-emerald-700 text-emerald-100 cursor-not-allowed'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
          }`}
          disabled={isCompleted}
          onClick={handleComplete}
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="h-5 w-5 mr-2" />
              Sudah Dicatat ✅
            </>
          ) : (
            '✅ Sudah Dimakan'
          )}
        </Button>
      </div>
    </motion.div>
  );
}
