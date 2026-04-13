'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Play, Pause, Square, SkipForward, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useTimerStore } from '@/lib/stores/timerStore';
import { usePhaseStore } from '@/lib/stores/phaseStore';
import { useUserStore } from '@/lib/stores/userStore';

// ─── Audio Beep via Web Audio API ─────────────────────────────────
function useBeep() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const beep = useCallback((frequency = 880, duration = 0.1, type: OscillatorType = 'sine') => {
    try {
      if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = frequency;
      osc.type = type;
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch {}
  }, []);
  return beep;
}

const BG_COLOR: Record<string, string> = {
  work: 'from-red-950 via-red-900/80 to-zinc-950',
  rest: 'from-emerald-950 via-emerald-900/80 to-zinc-950',
  prepare: 'from-amber-950 via-amber-900/80 to-zinc-950',
};
const PHASE_LABEL: Record<string, string> = {
  work: 'KERJA! 🔥',
  rest: 'ISTIRAHAT 😮‍💨',
  prepare: 'SIAP-SIAP ⏳',
};
const PHASE_COLOR: Record<string, string> = {
  work: 'text-red-400',
  rest: 'text-emerald-400',
  prepare: 'text-amber-400',
};

export default function HIITTimerPage() {
  const router = useRouter();
  const beep = useBeep();
  const timer = useTimerStore();
  const { todayWorkout, completeWorkout } = usePhaseStore();
  const profile = useUserStore((s) => s.profile);

  const prevTimeRef = useRef(timer.timeRemaining);
  const startedRef = useRef(false);

  // Auto-start if not running
  useEffect(() => {
    if (!startedRef.current && timer.mode === 'idle' && todayWorkout) {
      const exercises = (todayWorkout as any).exercises ?? [];
      const exerciseNames = exercises.map((e: any) => e.name ?? 'Exercise');
      const config = todayWorkout.timerConfig;
      const isTabata = todayWorkout.workout_type === 'tabata';
      timer.startHIIT({
        totalSets: config?.rounds ?? (isTabata ? 8 : 4),
        workDuration: config?.workSeconds ?? (isTabata ? 20 : 40),
        restDuration: config?.restSeconds ?? (isTabata ? 10 : 20),
        exercises: exerciseNames.length > 0 ? exerciseNames : ['Sprint', 'Burpee', 'Jump Squat', 'Mountain Climber'],
      });
      startedRef.current = true;
    }
  }, [timer, todayWorkout]);

  // Tick interval
  useEffect(() => {
    if (!timer.isRunning) return;
    const id = setInterval(() => timer.tick(), 1000);
    return () => clearInterval(id);
  }, [timer.isRunning, timer]);

  // Beep on phase transition & countdown
  useEffect(() => {
    if (timer.timeRemaining <= 3 && timer.timeRemaining > 0) {
      beep(660, 0.08);
    }
    if (prevTimeRef.current !== timer.timeRemaining && timer.timeRemaining === 0) {
      beep(880, 0.3);
    }
    prevTimeRef.current = timer.timeRemaining;
  }, [timer.timeRemaining, beep]);

  // Done state
  const isDone = timer.mode === 'idle' && startedRef.current;

  const handleSave = async () => {
    if (profile && todayWorkout) {
      await completeWorkout(profile.id, todayWorkout.id);
      toast.success('Workout HIIT selesai! 🔥', { description: 'Luar biasa! Kalori terbakar maksimal.' });
    }
    router.push('/workout');
  };

  if (isDone) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 px-6 text-center space-y-6">
        <CheckCircle2 className="h-20 w-20 text-emerald-400" />
        <div>
          <h1 className="text-2xl font-bold text-white">Selesai! 🎉</h1>
          <p className="text-zinc-400 mt-2">{todayWorkout?.workout_type === 'tabata' ? 'Tabata workout berhasil diselesaikan' : 'HIIT workout berhasil diselesaikan'}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
          <div className="bg-zinc-900 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-red-400">{timer.totalSets}</p>
            <p className="text-xs text-zinc-500 mt-1">Total Set</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-amber-400">~{Math.round((todayWorkout as any)?.estimated_calories_burned ?? 250)}</p>
            <p className="text-xs text-zinc-500 mt-1">kcal</p>
          </div>
        </div>
        <Button className="w-full max-w-xs h-12 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold" onClick={() => void handleSave()}>
          Simpan & Kembali
        </Button>
      </motion.div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-b ${BG_COLOR[timer.currentPhase] ?? BG_COLOR.prepare} flex flex-col`}>
      {/* Round indicator */}
      <div className="flex items-center justify-between px-6 pt-12 pb-4">
        <button onClick={() => { timer.stop(); router.push('/workout'); }} className="text-white/60 hover:text-white text-sm flex items-center gap-1">
          <Square className="h-4 w-4" /> Stop
        </button>
        <span className="text-white/80 text-sm font-medium">Round {timer.currentSet}/{timer.totalSets}</span>
        <button onClick={() => timer.tick()} className="text-white/60 hover:text-white text-sm flex items-center gap-1">
          Skip <SkipForward className="h-4 w-4" />
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 space-y-8">
        <AnimatePresence mode="wait">
          <motion.p key={timer.currentPhase} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className={`text-xl font-bold tracking-wider ${PHASE_COLOR[timer.currentPhase]}`}>
            {PHASE_LABEL[timer.currentPhase]}
          </motion.p>
        </AnimatePresence>

        {/* Countdown */}
        <AnimatePresence mode="wait">
          <motion.div key={timer.timeRemaining} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.1, opacity: 0 }} transition={{ duration: 0.15 }}>
            <span className="text-[96px] font-mono font-bold text-white leading-none tabular-nums">
              {String(timer.timeRemaining).padStart(2, '0')}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Exercise name */}
        {timer.exercises.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.p key={timer.currentExerciseIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-lg text-white/90 font-medium text-center">
              {timer.exercises[timer.currentExerciseIndex] ?? ''}
            </motion.p>
          </AnimatePresence>
        )}
      </div>

      {/* Controls */}
      <div className="px-6 pb-12 flex items-center justify-center gap-6">
        <Button size="lg" className="w-20 h-20 rounded-full bg-white/10 hover:bg-white/20 text-white border-0 text-3xl" onClick={timer.isRunning ? timer.pause : timer.resume}>
          {timer.isRunning ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
        </Button>
      </div>
    </div>
  );
}
