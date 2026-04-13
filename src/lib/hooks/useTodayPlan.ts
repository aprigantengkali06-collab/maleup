'use client';

import { useEffect } from 'react';
import { usePhaseStore } from '@/lib/stores/phaseStore';
import { useUserStore } from '@/lib/stores/userStore';

export function useTodayPlan() {
  const profile = useUserStore((state) => state.profile);
  const loadTodayPlan = usePhaseStore((state) => state.loadTodayPlan);

  useEffect(() => {
    if (profile) {
      void loadTodayPlan(profile.current_phase, profile.current_week);
    }
  }, [profile, loadTodayPlan]);
}
