'use client';

import { useEffect } from 'react';
import { BottomNav } from '@/components/BottomNav';
import { InstallBanner } from '@/components/InstallBanner';
import { usePhaseStore } from '@/lib/stores/phaseStore';
import { useUserStore } from '@/lib/stores/userStore';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = useUserStore((s) => s.profile);
  const loadTodayPlan = usePhaseStore((s) => s.loadTodayPlan);

  useEffect(() => {
    if (profile?.current_phase && profile?.current_week) {
      void loadTodayPlan(profile.current_phase, profile.current_week);
    }
  }, [profile?.current_phase, profile?.current_week, loadTodayPlan]);

  return (
    <div className="min-h-screen pb-24">
      <InstallBanner />
      {children}
      <BottomNav />
    </div>
  );
}
