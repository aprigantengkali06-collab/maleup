'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type TabsContextValue = {
  value: string;
  onValueChange: (value: string) => void;
};

const TabsContext = React.createContext<TabsContextValue | null>(null);

export function Tabs({ value, onValueChange, className, children }: React.PropsWithChildren<{ value: string; onValueChange: (value: string) => void; className?: string }>) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('grid grid-cols-4 gap-2 rounded-2xl bg-white/5 p-1', className)} {...props} />;
}

export function TabsTrigger({ value, className, children }: React.PropsWithChildren<{ value: string; className?: string }>) {
  const context = React.useContext(TabsContext);
  const active = context?.value === value;
  return (
    <button
      type="button"
      onClick={() => context?.onValueChange(value)}
      className={cn(
        'rounded-xl px-3 py-2 text-xs font-medium transition-colors',
        active ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white',
        className
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className }: React.PropsWithChildren<{ value: string; className?: string }>) {
  const context = React.useContext(TabsContext);
  if (context?.value !== value) return null;
  return <div className={className}>{children}</div>;
}
