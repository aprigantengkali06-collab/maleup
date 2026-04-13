import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Phase } from '@/lib/types';

export function PhaseCard({ phase, currentWeek }: { phase: Phase; currentWeek: number }) {
  const totalWeeks = phase.week_end - phase.week_start + 1;
  const completedWeeks = currentWeek - phase.week_start + 1;
  const progress = Math.max(0, Math.min(100, (completedWeeks / totalWeeks) * 100));

  return (
    <Card>
      <CardHeader>
        <CardDescription>Fase aktif</CardDescription>
        <CardTitle>{phase.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-zinc-300">{phase.description}</p>
        <Progress value={progress} />
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>Minggu {currentWeek}</span>
          <span className="inline-flex items-center gap-1 text-blue-300">Fase {phase.phase_number} <ArrowRight className="h-3 w-3" /></span>
        </div>
      </CardContent>
    </Card>
  );
}
