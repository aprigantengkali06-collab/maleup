import { MealIngredient } from '@/lib/types';

export function IngredientList({ ingredients }: { ingredients: MealIngredient[] }) {
  return (
    <div className="space-y-3">
      {ingredients.map((ingredient) => (
        <div key={ingredient.id} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 text-sm">
          <div>
            <p className="font-medium text-white">{ingredient.quantity_description}</p>
            <p className="text-zinc-400">Food ID #{ingredient.food_id}</p>
          </div>
          <div className="text-right text-zinc-400">
            <p>{ingredient.calories_portion} kkal</p>
            <p>P {ingredient.protein_portion}g</p>
          </div>
        </div>
      ))}
    </div>
  );
}
