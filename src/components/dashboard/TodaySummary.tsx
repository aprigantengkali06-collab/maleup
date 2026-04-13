import { Flame, Salad, Zap, HeartPulse } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { TodaySummary as Summary } from '@/lib/types';

// waterIntakeLiters removed — no actual tracking in app.
// Replaced with kegelDone (morning + night sessions).
const items = [
  { key: 'caloriesConsumed', label: 'Kalori Masuk', icon: Flame, suffix: 'kkal' },
  { key: 'completedMeals',   label: 'Meal Selesai', icon: Salad,      suffix: '' },
  { key: 'workoutsCompleted', label: 'Workout',     icon: Zap,        suffix: 'x' },
  { key: 'kegelDone',        label: 'Kegel',        icon: HeartPulse, suffix: 'sesi' },
] as const;

export function TodaySummary({ summary }: { summary: Summary }) {
  const values: Record<string, string | number> = {
    caloriesConsumed: summary.caloriesConsumed,
    completedMeals: `${summary.completedMeals}/${summary.totalMeals}`,
    workoutsCompleted: summary.workoutsCompleted,
    kegelDone: summary.kegelDone,
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.label} className="space-y-2 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400">{item.label}</span>
              <Icon className="h-4 w-4 text-blue-400" />
            </div>
            <p className="text-xl font-semibold text-white">
              {values[item.key]}
              {item.suffix && (
                <span className="text-sm text-zinc-500 ml-1">{item.suffix}</span>
              )}
            </p>
          </Card>
        );
      })}
    </div>
  );
}
