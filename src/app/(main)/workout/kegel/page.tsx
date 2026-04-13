'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Play, Pause, Square, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useTimerStore } from '@/lib/stores/timerStore';
import { usePhaseStore } from '@/lib/stores/phaseStore';
import { useUserStore } from '@/lib/stores/userStore';

function useBeep() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  return useCallback((frequency = 660, duration = 0.12) => {
    try {
      if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = frequency;
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {}
  }, []);
}

const PHASE_CONFIG: Record<string, { label: string; color: string; scale: number; ringColor: string }> = {
  work: { label: 'TAHAN 💪', color: 'text-blue-400', scale: 0.5, ringColor: '#3b82f6' },
  rest: { label: 'LEPAS 😌', color: 'text-emerald-400', scale: 1, ringColor: '#10b981' },
  prepare: { label: 'SIAP-SIAP ⏳', color: 'text-amber-400', scale: 0.75, ringColor: '#f59e0b' },
};

export default function KegelTimerPage() {
  const router = useRouter();
  const beep = useBeep();
  const timer = useTimerStore();
  const { todayKegel, completeKegel } = usePhaseStore();
  const profile = useUserStore((s) => s.profile);
  const startedRef = useRef(false);
  const prevPhaseRef = useRef(timer.currentPhase);

  useEffect(() => {
    if (!startedRef.current && timer.mode === 'idle' && todayKegel) {
      timer.startKegel({
        totalSets: todayKegel.sets ?? 3,
        totalReps: todayKegel.reps ?? 10,
        workDuration: todayKegel.hold_seconds ?? 5,
        restDuration: todayKegel.relax_seconds ?? 5,
      });
      startedRef.current = true;
    }
  }, [timer, todayKegel]);

  useEffect(() => {
    if (!timer.isRunning) return;
    const id = setInterval(() => timer.tick(), 1000);
    return () => clearInterval(id);
  }, [timer.isRunning, timer]);

  useEffect(() => {
    if (prevPhaseRef.current !== timer.currentPhase) {
      beep(timer.currentPhase === 'work' ? 880 : 550, 0.15);
      prevPhaseRef.current = timer.currentPhase;
    }
  }, [timer.currentPhase, beep]);

  const isDone = timer.mode === 'idle' && startedRef.current;
  const phaseConfig = PHASE_CONFIG[timer.currentPhase] ?? PHASE_CONFIG.prepare;

  const handleSave = async () => {
    if (profile) {
      await completeKegel(profile.id, 'morning');
      toast.success('Kegel selesai! ✅', { description: 'Pelvic floor training tercatat.' });
    }
    router.push('/workout');
  };

  if (isDone) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 px-6 text-center space-y-6">
        <CheckCircle2 className="h-20 w-20 text-blue-400" />
        <div>
          <h1 className="text-2xl font-bold text-white">Kegel Selesai! 💪</h1>
          <p className="text-zinc-400 mt-2">Pelvic floor training berhasil diselesaikan</p>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
          <div className="bg-zinc-900 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">{timer.totalSets}</p>
            <p className="text-xs text-zinc-500 mt-1">Set Selesai</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-emerald-400">{timer.totalReps}</p>
            <p className="text-xs text-zinc-500 mt-1">Rep / Set</p>
          </div>
        </div>
        <Button className="w-full max-w-xs h-12 bg-blue-600 hover:bg-blue-500 text-white font-semibold" onClick={() => void handleSave()}>
          Simpan & Kembali
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      {/* Top */}
      <div className="flex items-center justify-between px-6 pt-12 pb-4">
        <button onClick={() => { timer.stop(); router.push('/workout'); }} className="text-zinc-400 hover:text-white text-sm flex items-center gap-1">
          <Square className="h-4 w-4" /> Stop
        </button>
        <span className="text-zinc-300 text-sm font-medium">
          Set {timer.currentSet}/{timer.totalSets} • Rep {timer.currentRep}/{timer.totalReps}
        </span>
        <div className="w-12" />
      </div>

      {/* Circle Animation */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        <AnimatePresence mode="wait">
          <motion.p key={timer.currentPhase} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`text-xl font-bold ${phaseConfig.color}`}>
            {phaseConfig.label}
          </motion.p>
        </AnimatePresence>

        {/* Animated ring */}
        <div className="relative w-52 h-52 flex items-center justify-center">
          <motion.div
            className="absolute inset-0 rounded-full border-4"
            style={{ borderColor: phaseConfig.ringColor }}
            animate={{ scale: phaseConfig.scale, opacity: timer.currentPhase === 'work' ? 0.5 : 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute inset-4 rounded-full"
            style={{ background: `${phaseConfig.ringColor}18` }}
            animate={{ scale: timer.currentPhase === 'work' ? 0.6 : 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
          <div className="relative z-10 text-center">
            <motion.span key={timer.timeRemaining} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.15 }} className="text-6xl font-mono font-bold text-white">
              {String(timer.timeRemaining).padStart(2, '0')}
            </motion.span>
            <p className="text-xs text-zinc-500 mt-1">detik</p>
          </div>
        </div>

        <p className="text-zinc-500 text-sm">
          {timer.currentPhase === 'work' ? 'Kontraksikan pelvic floor...' :
           timer.currentPhase === 'rest' ? 'Relakskan sepenuhnya...' :
           'Bersiap untuk sesi berikutnya...'}
        </p>
      </div>

      {/* Controls */}
      <div className="px-6 pb-12 flex justify-center">
        <Button size="lg" className="w-20 h-20 rounded-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 text-3xl" onClick={timer.isRunning ? timer.pause : timer.resume}>
          {timer.isRunning ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
        </Button>
      </div>
    </div>
  );
}
