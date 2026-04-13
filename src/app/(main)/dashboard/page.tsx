// src/app/(main)/dashboard/page.tsx
'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, CheckCircle2, Circle, Flame, Trophy } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { LogWeightDialog } from '@/components/dashboard/LogWeightDialog';
import { NextMealCard } from '@/components/dashboard/NextMealCard';
import { useDashboardData } from '@/lib/hooks/useDashboardData';
import { useLatestWeight, useWeightChartData } from '@/lib/hooks/useWeightLog';
import { useSession } from '@/lib/hooks/useAuth';
import { useUserStore } from '@/lib/stores/userStore';
import { usePhaseStore } from '@/lib/stores/phaseStore';
import { MOTIVATIONAL_QUOTES, PHASE_CONFIGS } from '@/lib/utils/constants';
import { getGreeting } from '@/lib/utils/dateUtils';
import { determinePhase } from '@/lib/utils/formulas';

// ─── Animation variants ─────────────────────────────────────────────────────
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

// ─── Skeleton loading ────────────────────────────────────────────────────────
function DashboardSkeleton() {
  return (
    <div className="space-y-4 px-4 pt-6">
      <Skeleton className="h-12 w-3/4 rounded-2xl bg-zinc-800" />
      <Skeleton className="h-28 rounded-2xl bg-zinc-800" />
      <div className="grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-20 rounded-2xl bg-zinc-800" />
        ))}
      </div>
      <Skeleton className="h-40 rounded-2xl bg-zinc-800" />
      <Skeleton className="h-24 rounded-2xl bg-zinc-800" />
      <div className="grid grid-cols-2 gap-3">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-20 rounded-2xl bg-zinc-800" />
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { data: session } = useSession();
  const profile = useUserStore((s) => s.profile);
  const { completedMeals } = usePhaseStore();
  const { data, isLoading } = useDashboardData();
  const { data: latestWeight } = useLatestWeight(profile?.id ?? '');
  const { data: chartData } = useWeightChartData(profile?.id ?? '', profile?.target_weight_kg);

  const greeting = getGreeting();
  const currentPhase = profile?.current_phase ?? 1;
  const currentWeek = profile?.current_week ?? 1;

  const phaseConfig = useMemo(
    () => PHASE_CONFIGS.find((p) => p.phase_number === currentPhase) ?? PHASE_CONFIGS[0],
    [currentPhase]
  );

  const quote = useMemo(
    () => MOTIVATIONAL_QUOTES[(currentWeek ?? 1) % MOTIVATIONAL_QUOTES.length],
    [currentWeek]
  );

  // Phase progress
  const phaseWeekTotal = phaseConfig.week_end - phaseConfig.week_start + 1;
  const phaseWeekCurrent = Math.max(0, currentWeek - phaseConfig.week_start + 1);
  const phaseProgress = Math.min(100, (phaseWeekCurrent / phaseWeekTotal) * 100);

  // Calorie progress
  const { caloriesConsumed, caloriesTarget, completedMeals: doneMeals, totalMeals } = data.todaySummary;
  const calPct = Math.min(100, caloriesTarget > 0 ? (caloriesConsumed / caloriesTarget) * 100 : 0);

  // Workout type label
  const workoutType = data.todayWorkout?.workout_type ?? 'rest';
  const workoutLabels: Record<string, string> = {
    rest: 'Istirahat',
    walk: 'Jalan Cepat',
    strength_upper: 'Upper Body',
    strength_lower: 'Lower Body',
    full_body: 'Full Body',
    hiit: 'HIIT',
    tabata: 'Tabata',
    mobility: 'Mobilitas',
  };

  if (!profile || isLoading) return <DashboardSkeleton />;

  return (
    <motion.div
      className="space-y-4 px-4 pb-6 pt-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* ── Header ─────────────────────────────────────────────── */}
      <motion.div variants={item}>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-zinc-50">
              {greeting}, {profile.name}! 👋
            </h1>
            <p className="mt-0.5 text-sm text-zinc-400">
              Hari ke-{(currentWeek - 1) * 7 + 1} · Fase {currentPhase}: {phaseConfig.name}
            </p>
          </div>
          <Badge className="shrink-0 bg-zinc-800 border-zinc-700 text-zinc-300">
            Minggu {currentWeek}/24
          </Badge>
        </div>
      </motion.div>

      {/* ── Phase Progress Card ─────────────────────────────────── */}
      <motion.div variants={item}>
        <Card className="border-zinc-800 bg-zinc-900">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Fase Aktif
                </p>
                <p className="mt-0.5 text-base font-bold text-zinc-100">{phaseConfig.name}</p>
              </div>
              <span className="text-2xl font-black text-blue-600/40">{currentPhase}</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">{phaseConfig.description}</p>
            <Progress value={phaseProgress} className="h-1.5 bg-zinc-800" />
            <div className="flex justify-between text-xs text-zinc-500">
              <span>Minggu {phaseWeekCurrent} dari {phaseWeekTotal} di fase ini</span>
              <span className="text-blue-400">{Math.round(phaseProgress)}%</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Today Summary ────────────────────────────────────────── */}
      <motion.div variants={item}>
        <div className="grid grid-cols-3 gap-3">
          {/* Kalori */}
          <Card className="border-zinc-800 bg-zinc-900">
            <CardContent className="p-3 text-center space-y-1">
              <span className="text-lg">🔥</span>
              <p className="text-[10px] text-zinc-500">Kalori</p>
              <p className="text-sm font-bold text-zinc-200 leading-tight">
                {caloriesConsumed}
                <span className="text-[10px] font-normal text-zinc-500">/{caloriesTarget}</span>
              </p>
              <Progress value={calPct} className="h-1 bg-zinc-800" />
            </CardContent>
          </Card>

          {/* Workout */}
          <Card className="border-zinc-800 bg-zinc-900">
            <CardContent className="p-3 text-center space-y-1">
              <span className="text-lg">💪</span>
              <p className="text-[10px] text-zinc-500">Workout</p>
              <p className="text-xs font-semibold text-zinc-200 leading-tight">
                {data.todaySummary.workoutsCompleted > 0 ? (
                  <span className="text-emerald-400">Selesai ✓</span>
                ) : (
                  workoutLabels[workoutType]
                )}
              </p>
            </CardContent>
          </Card>

          {/* Kegel */}
          <Card className="border-zinc-800 bg-zinc-900">
            <CardContent className="p-3 text-center space-y-1">
              <span className="text-lg">🎯</span>
              <p className="text-[10px] text-zinc-500">Kegel</p>
              <div className="flex justify-center gap-1 pt-0.5">
                {data.todayKegel && (
                  <>
                    {data.todaySummary.kegelDone >= 1 ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Circle className="h-4 w-4 text-zinc-600" />
                    )}
                    {data.todayKegel.times_per_day >= 2 && (
                      data.todaySummary.kegelDone >= 2 ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <Circle className="h-4 w-4 text-zinc-600" />
                      )
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* ── Weight Mini Chart ────────────────────────────────────── */}
      <motion.div variants={item}>
        <Card className="border-zinc-800 bg-zinc-900">
          <CardContent className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-zinc-200">Trend Berat</p>
                <p className="text-xs text-zinc-500">
                  {latestWeight
                    ? `${Number(latestWeight.weight_kg).toFixed(1)} kg · Target ${profile.target_weight_kg} kg`
                    : 'Belum ada data'}
                </p>
              </div>
              {latestWeight && profile.target_weight_kg && (
                <Badge
                  className={`border-0 text-xs ${
                    Number(latestWeight.weight_kg) <= profile.target_weight_kg
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {Number(latestWeight.weight_kg) <= profile.target_weight_kg
                    ? 'Target!'
                    : `-${(Number(latestWeight.weight_kg) - profile.target_weight_kg).toFixed(1)} kg`}
                </Badge>
              )}
            </div>
            <div className="h-[110px]">
              {chartData && chartData.length > 1 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <XAxis
                      dataKey="label"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: '#71717a' }}
                    />
                    <YAxis hide domain={['dataMin - 1', 'dataMax + 1']} />
                    <Tooltip
                      contentStyle={{
                        background: '#18181b',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 12,
                        fontSize: 12,
                      }}
                      formatter={(v: number) => [`${v} kg`, 'Berat']}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#10b981"
                      strokeWidth={2.5}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-2">
                  <p className="text-sm text-zinc-500">Belum ada data berat</p>
                  <LogWeightDialog profile={profile} latestWeight={latestWeight ?? null}>
                    <button className="rounded-xl bg-blue-600/20 px-4 py-1.5 text-xs font-medium text-blue-400 hover:bg-blue-600/30 transition-colors">
                      Catat Sekarang
                    </button>
                  </LogWeightDialog>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Next Meal Card ───────────────────────────────────────── */}
      <motion.div variants={item}>
        <NextMealCard
          mealPlan={data.todayMealPlan}
          completedMealIds={completedMeals}
        />
      </motion.div>

      {/* ── Motivation Card ──────────────────────────────────────── */}
      <motion.div variants={item}>
        <Card className="overflow-hidden border-0">
          <div className="bg-gradient-to-br from-blue-900/60 via-blue-900/30 to-zinc-900 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Flame className="h-4 w-4 text-amber-400" />
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                Motivasi Hari Ini
              </p>
            </div>
            <p className="text-sm leading-relaxed text-zinc-200 italic">&ldquo;{quote}&rdquo;</p>
          </div>
        </Card>
      </motion.div>

      {/* ── Achievements preview ─────────────────────────────────── */}
      {data.achievements && data.achievements.length > 0 && (
        <motion.div variants={item}>
          <Card className="border-zinc-800 bg-zinc-900">
            <CardContent className="p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Trophy className="h-4 w-4 text-amber-400" />
                  <p className="text-sm font-semibold text-zinc-200">Pencapaian</p>
                </div>
                <Link href="/progress">
                  <span className="flex items-center gap-0.5 text-xs text-blue-400 hover:text-blue-300">
                    Lihat semua <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {data.achievements.slice(0, 5).map((ua) => (
                  <div
                    key={ua.achievement_id}
                    className="flex shrink-0 flex-col items-center gap-1.5 rounded-2xl bg-amber-500/10 p-3 text-center"
                    title={ua.achievement?.description}
                  >
                    <span className="text-2xl">{ua.achievement?.icon ?? '🏆'}</span>
                    <p className="w-16 truncate text-[10px] text-zinc-400">
                      {ua.achievement?.name ?? '—'}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* ── Quick Actions ────────────────────────────────────────── */}
      <motion.div variants={item}>
        <QuickActions profile={profile} latestWeight={latestWeight ?? null} />
      </motion.div>
    </motion.div>
  );
}
