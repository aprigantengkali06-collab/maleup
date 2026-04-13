import Link from 'next/link';
import { Beef, Clock3, Flame } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Meal } from '@/lib/types';

export function MealCard({ meal, completed = false, onComplete }: { meal: Meal; completed?: boolean; onComplete?: () => void }) {
  return (
    <Card className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{meal.meal_type}</p>
          <h3 className="mt-1 text-lg font-semibold text-white">{meal.name}</h3>
        </div>
        {completed ? <Badge>Selesai</Badge> : null}
      </div>
      <div className="grid grid-cols-3 gap-2 text-xs text-zinc-400">
        <div className="rounded-2xl bg-white/5 p-3">
          <Clock3 className="mb-2 h-4 w-4 text-blue-400" />
          {meal.cooking_time_minutes} menit
        </div>
        <div className="rounded-2xl bg-white/5 p-3">
          <Flame className="mb-2 h-4 w-4 text-blue-400" />
          {meal.total_calories} kkal
        </div>
        <div className="rounded-2xl bg-white/5 p-3">
          <Beef className="mb-2 h-4 w-4 text-blue-400" />
          {meal.total_protein_g} g protein
        </div>
      </div>
      <div className="flex gap-2">
        <Link href={`/meal/${meal.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">Lihat Resep</Button>
        </Link>
        <Button className="flex-1" onClick={onComplete} disabled={completed}>Tandai Selesai</Button>
      </div>
    </Card>
  );
}
