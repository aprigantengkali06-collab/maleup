import { Clock3, Flame } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Meal } from '@/lib/types';
import { IngredientList } from '@/components/meal/IngredientList';

export function RecipeDetail({ meal }: { meal: Meal }) {
  return (
    <div className="space-y-4">
      <Card className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">{meal.name}</h2>
          <div className="text-right text-xs text-zinc-400">
            <p className="inline-flex items-center gap-1"><Clock3 className="h-3 w-3" /> {meal.cooking_time_minutes} menit</p>
            <p className="inline-flex items-center gap-1"><Flame className="h-3 w-3" /> {meal.total_calories} kkal</p>
          </div>
        </div>
        <p className="text-sm leading-6 text-zinc-300">{meal.recipe_instructions}</p>
      </Card>
      <Card>
        <h3 className="mb-3 text-sm font-medium text-white">Bahan</h3>
        <IngredientList ingredients={meal.meal_ingredients ?? []} />
      </Card>
    </div>
  );
}
