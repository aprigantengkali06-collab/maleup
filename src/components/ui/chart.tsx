import { cn } from '@/lib/utils';

export function ChartContainer({ className, children }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={cn('h-[220px] w-full text-xs text-zinc-400', className)}>{children}</div>;
}
