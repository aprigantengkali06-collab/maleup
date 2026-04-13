'use client';

import { create } from 'zustand';
import { TimerState } from '@/lib/types';

interface TimerStore extends TimerState {
  startHIIT: (options: { totalSets: number; workDuration: number; restDuration: number; exercises: string[] }) => void;
  startKegel: (options: { totalSets: number; totalReps: number; workDuration: number; restDuration: number }) => void;
  tick: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  onComplete: () => void;
}

const initialState: TimerState = {
  mode: 'idle',
  isRunning: false,
  currentSet: 1,
  currentRep: 1,
  currentPhase: 'prepare',
  timeRemaining: 5,
  totalSets: 0,
  totalReps: 0,
  workDuration: 0,
  restDuration: 0,
  exercises: [],
  currentExerciseIndex: 0
};

export const useTimerStore = create<TimerStore>((set, get) => ({
  ...initialState,
  startHIIT: ({ totalSets, workDuration, restDuration, exercises }) =>
    set({
      mode: 'hiit',
      isRunning: true,
      currentSet: 1,
      currentRep: 1,
      currentPhase: 'prepare',
      timeRemaining: 5,
      totalSets,
      totalReps: exercises.length,
      workDuration,
      restDuration,
      exercises,
      currentExerciseIndex: 0
    }),
  startKegel: ({ totalSets, totalReps, workDuration, restDuration }) =>
    set({
      mode: 'kegel',
      isRunning: true,
      currentSet: 1,
      currentRep: 1,
      currentPhase: 'prepare',
      timeRemaining: 5,
      totalSets,
      totalReps,
      workDuration,
      restDuration,
      exercises: ['Kontraksi', 'Relaksasi'],
      currentExerciseIndex: 0
    }),
  tick: () => {
    const state = get();
    if (!state.isRunning) return;
    if (state.timeRemaining > 1) {
      set({ timeRemaining: state.timeRemaining - 1 });
      return;
    }

    if (state.currentPhase === 'prepare') {
      set({ currentPhase: 'work', timeRemaining: state.workDuration });
      return;
    }

    if (state.currentPhase === 'work') {
      if (state.mode === 'kegel') {
        if (state.currentRep >= state.totalReps && state.currentSet >= state.totalSets) {
          get().onComplete();
          return;
        }
        if (state.currentRep >= state.totalReps) {
          set({ currentPhase: 'rest', timeRemaining: state.restDuration, currentRep: 1, currentSet: state.currentSet + 1 });
          return;
        }
        set({ currentPhase: 'rest', timeRemaining: state.restDuration });
        return;
      }

      set({ currentPhase: 'rest', timeRemaining: state.restDuration });
      return;
    }

    if (state.mode === 'hiit') {
      const nextExerciseIndex = state.currentExerciseIndex + 1;
      if (nextExerciseIndex >= state.exercises.length) {
        if (state.currentSet >= state.totalSets) {
          get().onComplete();
          return;
        }
        set({ currentSet: state.currentSet + 1, currentExerciseIndex: 0, currentPhase: 'work', timeRemaining: state.workDuration });
        return;
      }
      set({ currentExerciseIndex: nextExerciseIndex, currentPhase: 'work', timeRemaining: state.workDuration });
      return;
    }

    if (state.currentRep >= state.totalReps && state.currentSet >= state.totalSets) {
      get().onComplete();
      return;
    }

    set({ currentRep: state.currentRep + 1, currentPhase: 'work', timeRemaining: state.workDuration });
  },
  pause: () => set({ isRunning: false }),
  resume: () => set({ isRunning: true }),
  stop: () => set({ ...initialState }),
  onComplete: () => set({ ...initialState })
}));
