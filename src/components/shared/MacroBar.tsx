import { Progress } from '@/components/ui/progress';

export function MacroBar({ label, value, target, unit = 'g' }: { label: string; value: number; target: number; unit?: string }) {
  const percentage = (value / target) * 100;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-zinc-400">
        <span>{label}</span>
        <span>
          {Math.round(value)}/{Math.round(target)} {unit}
        </span>
      </div>
      <Progress value={percentage} />
    </div>
  );
}
