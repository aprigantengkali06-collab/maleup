import { Bell, Flame } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function Header({ title, subtitle, streak }: { title: string; subtitle?: string; streak?: number }) {
  return (
    <header className="mb-5 flex items-start justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-zinc-400">{subtitle}</p> : null}
      </div>
      <div className="flex items-center gap-2">
        {typeof streak === 'number' ? (
          <Badge className="gap-1">
            <Flame className="h-3 w-3" />
            {streak} hari
          </Badge>
        ) : null}
        <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-zinc-200">
          <Bell className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
