'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Timer, ChevronDown, ChevronUp, Dumbbell, BedDouble, CheckCircle2, Zap, Flame } from 'lucide-react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { usePhaseStore } from '@/lib/stores/phaseStore';
import { useUserStore } from '@/lib/stores/userStore';

const WORKOUT_TYPE_LABEL: Record<string, string> = {
  rest: 'Hari Istirahat', walk: 'Jalan Kaki', strength_upper: 'Latihan Atas',
  strength_lower: 'Latihan Bawah', full_body: 'Full Body', hiit: 'HIIT',
  tabata: 'Tabata', mobility: 'Mobilitas',
};
const WORKOUT_TYPE_COLOR: Record<string, string> = {
  rest: 'bg-zinc-700/40 text-zinc-400 border-zinc-600/30', walk: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  strength_upper: 'bg-blue-500/20 text-blue-400 border-blue-500/30', strength_lower: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  full_body: 'bg-blue-500/20 text-blue-400 border-blue-500/30', hiit: 'bg-red-500/20 text-red-400 border-red-500/30',
  tabata: 'bg-orange-600/20 text-orange-400 border-orange-600/30', mobility: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
};
const INTENSITY_COLOR: Record<string, string> = {
  low: 'bg-emerald-500/20 text-emerald-400', medium: 'bg-amber-500/20 text-amber-400',
  high: 'bg-orange-500/20 text-orange-400', max: 'bg-red-500/20 text-red-400',
};

function ExerciseCard({ exercise, index }: { exercise: any; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const sets       = exercise.sets ?? 3;
  const reps       = exercise.reps ?? null;        // string like "10 repetisi" or "30 detik"
  const workSec    = exercise.work_seconds ?? null; // number | null
  const restSec    = exercise.rest_seconds ?? null;
  const intensity  = exercise.intensity ?? 'medium';
  const muscleGroup = exercise.muscle_group ?? '';
  const instructions = exercise.instructions ?? exercise.description ?? '';
  // Build a clean label: prefer reps string, fall back to seconds, then bare set count
  const setsLabel = reps
    ? (sets > 1 ? `${sets}× ` : '') + reps
    : workSec
    ? `${sets}×${workSec}s`
    : `${sets} set`;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
      <Card className="cursor-pointer active:scale-[0.99] transition-transform" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400 flex-shrink-0">{index + 1}</div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-white text-sm">{exercise.name ?? exercise.exercise_name ?? 'Exercise'}</p>
            <p className="text-xs text-zinc-400 mt-0.5">{setsLabel}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex gap-1">
              {intensity && <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${INTENSITY_COLOR[intensity] ?? INTENSITY_COLOR.medium}`}>{intensity.toUpperCase()}</span>}
              {muscleGroup && <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">{muscleGroup}</span>}
            </div>
            {expanded ? <ChevronUp className="h-3.5 w-3.5 text-zinc-500" /> : <ChevronDown className="h-3.5 w-3.5 text-zinc-500" />}
          </div>
        </div>
        <AnimatePresence>
          {expanded && instructions && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
              <div className="mt-3 pt-3 border-t border-zinc-800/60 space-y-1">
                <p className="text-xs text-zinc-400 leading-relaxed">{instructions}</p>
                {restSec != null && restSec > 0 && (
                  <p className="text-[10px] text-zinc-600">⏱ Istirahat: {restSec}s</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}


// ─── Skeleton Loading ──────────────────────────────────────────────
function WorkoutLoadingSkeleton() {
  return (
    <div className="space-y-4 pb-6">
      <div className="space-y-2">
        <Skeleton className="h-7 w-44 bg-zinc-800" />
        <Skeleton className="h-4 w-32 bg-zinc-800" />
      </div>
      <Skeleton className="h-28 w-full rounded-2xl bg-zinc-800" />
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-20 w-full rounded-2xl bg-zinc-800" />
      ))}
    </div>
  );
}

export default function WorkoutPage() {
  const router = useRouter();
  const profile = useUserStore((s) => s.profile);
  const { todayWorkout, todayKegel, completedWorkout, completedKegel, completeWorkout, completeKegel, currentPhase } = usePhaseStore();

  const [isInitializing] = useState(!todayWorkout);

  if (isInitializing && !todayWorkout) {
    return <WorkoutLoadingSkeleton />;
  }

  if (!todayWorkout) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
        <Dumbbell className="h-12 w-12 text-zinc-700" />
        <p className="text-zinc-400">Workout hari ini belum tersedia</p>
      </div>
    );
  }

  const workoutType = (todayWorkout.workout_type ?? 'full_body') as string;
  const isRest = workoutType === 'rest';
  const isTimerWorkout = workoutType === 'hiit' || workoutType === 'tabata';
  const exercises = (todayWorkout as any).exercises ?? [];

  const handleComplete = async () => {
    if (!profile) return;
    await completeWorkout(profile.id, todayWorkout.id);
    toast.success('Workout selesai! 💪', { description: 'Kerja bagus, terus konsisten!' });
  };

  const handleKegelComplete = async (session: 'morning' | 'night') => {
    if (!profile) return;
    await completeKegel(profile.id, session);
    toast.success('Kegel selesai! ✅', { description: `Sesi ${session === 'morning' ? 'pagi' : 'malam'} tercatat.` });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 pb-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-white">Workout Hari Ini</h1>
          <Badge className={`text-xs border ${WORKOUT_TYPE_COLOR[workoutType] ?? WORKOUT_TYPE_COLOR.full_body}`}>{WORKOUT_TYPE_LABEL[workoutType] ?? workoutType}</Badge>
        </div>
        <p className="text-sm text-zinc-400 mt-0.5">Fase {currentPhase}</p>
      </div>

      {isRest ? (
        <Card className="text-center py-10 space-y-3">
          <BedDouble className="h-14 w-14 text-zinc-600 mx-auto" />
          <div>
            <p className="text-white font-semibold text-lg">Hari Istirahat 😴</p>
            <p className="text-zinc-400 text-sm mt-1 max-w-xs mx-auto">Istirahat adalah bagian dari program. Biarkan otot pulih dan siap untuk latihan berikutnya.</p>
          </div>
          <p className="text-xs text-zinc-600">Fokus pada hidrasi & tidur berkualitas</p>
        </Card>
      ) : (
        <>
          <Card>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-xs text-zinc-500">Durasi</p>
                <p className="text-base font-bold text-white mt-0.5">{(todayWorkout as any).duration_minutes ?? 45}<span className="text-xs font-normal text-zinc-500"> mnt</span></p>
              </div>
              <div>
                <p className="text-xs text-zinc-500">Kalori</p>
                <p className="text-base font-bold text-amber-400 mt-0.5">~{(todayWorkout as any).estimated_calories_burned ?? 300}<span className="text-xs font-normal text-zinc-500"> kcal</span></p>
              </div>
              <div>
                <p className="text-xs text-zinc-500">Exercise</p>
                <p className="text-base font-bold text-blue-400 mt-0.5">{exercises.length}<span className="text-xs font-normal text-zinc-500"> gerakan</span></p>
              </div>
            </div>
          </Card>
          {exercises.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-zinc-500 font-medium">Daftar Latihan</p>
              {exercises.map((ex: any, i: number) => <ExerciseCard key={ex.id ?? i} exercise={ex} index={i} />)}
            </div>
          )}
          <div className="space-y-2 pt-2">
            {isTimerWorkout ? (
              <Button className="w-full h-12 bg-red-600 hover:bg-red-500 text-white font-semibold text-base" onClick={() => router.push('/workout/timer')}>
                <Flame className="h-5 w-5 mr-2" />{workoutType === 'tabata' ? 'Mulai Tabata Timer' : 'Mulai HIIT Timer'}
              </Button>
            ) : (
              <Button className={`w-full h-12 font-semibold text-base ${completedWorkout ? 'bg-emerald-700 text-emerald-100 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white'}`} disabled={completedWorkout} onClick={() => void handleComplete()}>
                {completedWorkout ? <><CheckCircle2 className="h-5 w-5 mr-2" />Sudah Selesai ✅</> : <><Dumbbell className="h-5 w-5 mr-2" />Selesaikan Workout</>}
              </Button>
            )}
          </div>
        </>
      )}

      {todayKegel && (
        <Card className="space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-blue-400" />
            <p className="text-sm font-semibold text-white">Kegel Hari Ini</p>
          </div>
          <div className="bg-zinc-800/50 rounded-lg p-3 space-y-1">
            <p className="text-sm text-white font-medium">{todayKegel.sets} set × {todayKegel.reps} rep</p>
            <p className="text-xs text-zinc-400">Tahan {todayKegel.hold_seconds}s • Relax {todayKegel.relax_seconds}s{todayKegel.include_reverse_kegel ? ' • + Reverse kegel' : ''}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" className="flex-1 h-10" onClick={() => router.push('/workout/kegel')}>
              <Timer className="h-4 w-4 mr-1.5" />Kegel Timer
            </Button>
            <Button size="sm" className={`h-10 px-3 text-xs ${completedKegel.morning ? 'bg-emerald-700 text-emerald-100' : 'bg-blue-600 hover:bg-blue-500'}`} disabled={completedKegel.morning} onClick={() => void handleKegelComplete('morning')}>
              {completedKegel.morning ? '✅' : '🌅'} Pagi
            </Button>
            <Button size="sm" className={`h-10 px-3 text-xs ${completedKegel.night ? 'bg-emerald-700 text-emerald-100' : 'bg-zinc-700 hover:bg-zinc-600'}`} disabled={completedKegel.night} onClick={() => void handleKegelComplete('night')}>
              {completedKegel.night ? '✅' : '🌙'} Malam
            </Button>
          </div>
        </Card>
      )}
    </motion.div>
  );
}
