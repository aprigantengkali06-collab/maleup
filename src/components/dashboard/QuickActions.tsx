// src/components/dashboard/QuickActions.tsx
'use client';

import Link from 'next/link';
import { Activity, BookOpen, Play, Scale } from 'lucide-react';
import type { Profile } from '@/lib/types';
import type { WeightLog } from '@/lib/types';
import { LogWeightDialog } from './LogWeightDialog';

interface QuickActionsProps {
  profile: Profile;
  latestWeight: WeightLog | null;
}

export function QuickActions({ profile, latestWeight }: QuickActionsProps) {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Aksi Cepat
      </p>
      <div className="grid grid-cols-2 gap-3">
        {/* Log Berat */}
        <LogWeightDialog profile={profile} latestWeight={latestWeight}>
          <button className="flex flex-col items-center gap-2 rounded-2xl bg-zinc-800 p-4 text-center hover:bg-zinc-700 transition-colors w-full">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20">
              <Scale className="h-5 w-5 text-blue-400" />
            </div>
            <span className="text-xs font-medium text-zinc-300">Log Berat</span>
          </button>
        </LogWeightDialog>

        {/* Mulai Workout */}
        <Link href="/workout">
          <button className="flex w-full flex-col items-center gap-2 rounded-2xl bg-zinc-800 p-4 text-center hover:bg-zinc-700 transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600/20">
              <Play className="h-5 w-5 text-emerald-400" />
            </div>
            <span className="text-xs font-medium text-zinc-300">Mulai Workout</span>
          </button>
        </Link>

        {/* Mulai Kegel */}
        <Link href="/workout/kegel">
          <button className="flex w-full flex-col items-center gap-2 rounded-2xl bg-zinc-800 p-4 text-center hover:bg-zinc-700 transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600/20">
              <Activity className="h-5 w-5 text-purple-400" />
            </div>
            <span className="text-xs font-medium text-zinc-300">Mulai Kegel</span>
          </button>
        </Link>

        {/* Lihat Menu */}
        <Link href="/meal">
          <button className="flex w-full flex-col items-center gap-2 rounded-2xl bg-zinc-800 p-4 text-center hover:bg-zinc-700 transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-600/20">
              <BookOpen className="h-5 w-5 text-amber-400" />
            </div>
            <span className="text-xs font-medium text-zinc-300">Lihat Menu</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
