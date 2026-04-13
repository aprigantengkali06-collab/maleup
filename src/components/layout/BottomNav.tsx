'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, Dumbbell, Home, Salad, Settings2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/meals', label: 'Menu', icon: Salad },
  { href: '/workout', label: 'Workout', icon: Dumbbell },
  { href: '/progress', label: 'Progress', icon: Activity },
  { href: '/settings', label: 'Settings', icon: Settings2 }
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-[480px] -translate-x-1/2 border-t border-white/10 bg-zinc-950/90 px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur-xl">
      <div className="grid grid-cols-5 gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-medium transition-colors',
                active ? 'bg-blue-600 text-white' : 'text-zinc-500 hover:bg-white/5 hover:text-zinc-100'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
