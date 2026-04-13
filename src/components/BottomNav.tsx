// src/components/BottomNav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, Dumbbell, LayoutDashboard, Settings2, UtensilsCrossed } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { href: '/meal', label: 'Meals', icon: UtensilsCrossed },
  { href: '/workout', label: 'Workout', icon: Dumbbell },
  { href: '/progress', label: 'Progress', icon: Activity },
  { href: '/settings', label: 'Settings', icon: Settings2 },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-1/2 z-40 w-full max-w-[480px] -translate-x-1/2',
        'border-t border-zinc-800 bg-zinc-900/95 backdrop-blur-xl',
        'px-2 pt-2',
        'pb-[calc(env(safe-area-inset-bottom,0px)+0.5rem)]'
      )}
    >
      <div className="grid grid-cols-5">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-1 py-1.5 text-[10px] font-medium transition-colors"
            >
              {/* Active dot indicator */}
              <span
                className={cn(
                  'mb-0.5 h-1 w-4 rounded-full transition-all duration-300',
                  active ? 'bg-blue-500 opacity-100' : 'opacity-0'
                )}
              />
              <div
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-2xl transition-colors',
                  active ? 'bg-blue-600/20 text-blue-400' : 'text-zinc-500 hover:text-zinc-300'
                )}
              >
                <Icon className="h-[18px] w-[18px]" />
              </div>
              <span className={cn(active ? 'text-blue-400' : 'text-zinc-500')}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
