import { Quote } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function MotivationCard({ quote }: { quote: string }) {
  return (
    <Card className="bg-gradient-to-br from-blue-600/20 via-cyan-400/10 to-transparent">
      <div className="flex gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-300">
          <Quote className="h-5 w-5" />
        </div>
        <div>
          <p className="mb-1 text-xs uppercase tracking-[0.18em] text-blue-300">MaleUp Insight</p>
          <p className="text-sm leading-6 text-zinc-100">{quote}</p>
        </div>
      </div>
    </Card>
  );
}
