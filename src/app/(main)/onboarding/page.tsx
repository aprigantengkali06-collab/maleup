// src/app/(main)/onboarding/page.tsx
'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Lock,
  Rocket,
  ShieldCheck,
} from 'lucide-react';
import { toast } from 'sonner';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useUserStore } from '@/lib/stores/userStore';
import {
  calculateBMI,
  calculateTDEE,
  determinePhase,
  estimateTestosteroneChange,
  projectPenisLengthAtTarget,
} from '@/lib/utils/formulas';
import { PHASE_CONFIGS, EHS_SCALE } from '@/lib/utils/constants';

// ─── Types ──────────────────────────────────────────────────────────────────
interface FormData {
  name: string;
  age: number;
  heightCm: number;
  currentWeightKg: number;
  targetWeightKg: number;
  startingWaistCm: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active';
  startLengthCm: number | '';
  startGirthCm: number | '';
  ehsScore: 1 | 2 | 3 | 4 | '';
}

// ─── BMI Badge ───────────────────────────────────────────────────────────────
function BMIBadge({ bmi }: { bmi: number }) {
  if (!bmi || bmi < 5) return null;
  const { label, color } =
    bmi < 18.5
      ? { label: 'Underweight', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' }
      : bmi < 25
        ? { label: 'Normal', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' }
        : bmi < 30
          ? { label: 'Overweight', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' }
          : { label: 'Obesitas', color: 'bg-red-500/20 text-red-400 border-red-500/30' };
  return (
    <div className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-sm font-medium ${color}`}>
      BMI {bmi.toFixed(1)} — {label}
    </div>
  );
}

// ─── Projection chart data ───────────────────────────────────────────────────
function buildChartData(startWeight: number, targetWeight: number) {
  const totalLoss = startWeight - targetWeight;
  return Array.from({ length: 25 }, (_, i) => {
    const phase = determinePhase(Math.max(1, i));
    const progress = i === 0 ? 0 : Math.min(1, (i / 24) * (1 + (phase - 1) * 0.05));
    return {
      week: i,
      berat: Number((startWeight - totalLoss * progress).toFixed(1)),
    };
  });
}

// ─── Step indicator ──────────────────────────────────────────────────────────
const STEP_LABELS = ['Data Dasar', 'Target', 'Pengukuran', 'Proyeksi'];

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function OnboardingPage() {
  const router = useRouter();
  const completeOnboarding = useUserStore((s) => s.completeOnboarding);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  const [form, setForm] = useState<FormData>({
    name: '',
    age: 28,
    heightCm: 170,
    currentWeightKg: 90,
    targetWeightKg: 75,
    startingWaistCm: 95,
    activityLevel: 'light',
    startLengthCm: '',
    startGirthCm: '',
    ehsScore: '',
  });

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // Computed
  const bmi = useMemo(
    () => calculateBMI(form.heightCm, form.currentWeightKg),
    [form.heightCm, form.currentWeightKg]
  );
  const tdee = useMemo(
    () => calculateTDEE(form.currentWeightKg, form.heightCm, form.age, form.activityLevel),
    [form.currentWeightKg, form.heightCm, form.age, form.activityLevel]
  );
  const weightLoss = useMemo(
    () => Math.max(0, form.currentWeightKg - form.targetWeightKg),
    [form.currentWeightKg, form.targetWeightKg]
  );
  const chartData = useMemo(
    () => buildChartData(form.currentWeightKg, form.targetWeightKg),
    [form.currentWeightKg, form.targetWeightKg]
  );
  const penisProjection = useMemo(() => {
    if (!form.startLengthCm) return null;
    return projectPenisLengthAtTarget(
      Number(form.startLengthCm),
      form.currentWeightKg,
      form.targetWeightKg
    );
  }, [form.startLengthCm, form.currentWeightKg, form.targetWeightKg]);
  const testoChange = useMemo(
    () => estimateTestosteroneChange(weightLoss),
    [weightLoss]
  );

  // Navigation
  const goNext = () => {
    setDirection(1);
    setStep((s) => Math.min(3, s + 1));
  };
  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(0, s - 1));
  };

  // Submit
  const handleFinish = async () => {
    if (!agreed) {
      toast.error('Centang persetujuan terlebih dahulu');
      return;
    }
    setLoading(true);
    try {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      await completeOnboarding(user.id, {
        name: form.name,
        age: form.age,
        heightCm: form.heightCm,
        startingWeightKg: form.currentWeightKg,
        currentWeightKg: form.currentWeightKg,
        targetWeightKg: form.targetWeightKg,
        startingWaistCm: form.startingWaistCm,
        activityLevel: form.activityLevel,
        startLengthCm: form.startLengthCm ? Number(form.startLengthCm) : 0,
        startGirthCm: form.startGirthCm ? Number(form.startGirthCm) : 0,
        startDate: new Date().toISOString().slice(0, 10),
      });
      toast.success('Program dimulai! Selamat datang 🚀');
      router.push('/dashboard');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-zinc-950 px-4 pb-10 pt-6">
      {/* Header progress */}
      <div className="mb-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-zinc-400">
            Langkah {step + 1} dari 4
          </span>
          <span className="text-sm font-semibold text-blue-400">{STEP_LABELS[step]}</span>
        </div>
        <Progress value={((step + 1) / 4) * 100} className="h-1.5 bg-zinc-800" />
        <div className="grid grid-cols-4 gap-1.5">
          {STEP_LABELS.map((label, i) => (
            <div
              key={label}
              className={`rounded-lg py-1.5 text-center text-[10px] font-medium transition-colors ${
                i === step
                  ? 'bg-blue-600 text-white'
                  : i < step
                    ? 'bg-blue-600/20 text-blue-400'
                    : 'bg-zinc-800 text-zinc-600'
              }`}
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Animated step content */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: 'easeInOut' }}
          >
            {/* ── STEP 0: Data Dasar ─────────────────────────────── */}
            {step === 0 && (
              <div className="space-y-4">
                <h1 className="text-xl font-bold text-zinc-50">Data Diri</h1>
                <p className="text-sm text-zinc-400">Informasi dasar untuk memulai program</p>

                <div className="space-y-3">
                  <div>
                    <Label className="text-zinc-300">Nama lengkap</Label>
                    <Input
                      placeholder="Masukkan nama"
                      value={form.name}
                      onChange={(e) => set('name', e.target.value)}
                      className="mt-1.5 rounded-xl border-zinc-700 bg-zinc-800 text-zinc-50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-zinc-300">Usia (tahun)</Label>
                      <Input
                        type="number"
                        min={16}
                        max={60}
                        value={form.age}
                        onChange={(e) => set('age', Number(e.target.value))}
                        className="mt-1.5 rounded-xl border-zinc-700 bg-zinc-800 text-zinc-50"
                      />
                    </div>
                    <div>
                      <Label className="text-zinc-300">Tinggi (cm)</Label>
                      <Input
                        type="number"
                        min={140}
                        max={210}
                        value={form.heightCm}
                        onChange={(e) => set('heightCm', Number(e.target.value))}
                        className="mt-1.5 rounded-xl border-zinc-700 bg-zinc-800 text-zinc-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-zinc-300">Berat saat ini (kg)</Label>
                      <Input
                        type="number"
                        min={50}
                        max={200}
                        step={0.1}
                        value={form.currentWeightKg}
                        onChange={(e) => set('currentWeightKg', Number(e.target.value))}
                        className="mt-1.5 rounded-xl border-zinc-700 bg-zinc-800 text-zinc-50"
                      />
                    </div>
                    <div>
                      <Label className="text-zinc-300">Lingkar pinggang (cm)</Label>
                      <Input
                        type="number"
                        min={60}
                        max={180}
                        value={form.startingWaistCm}
                        onChange={(e) => set('startingWaistCm', Number(e.target.value))}
                        className="mt-1.5 rounded-xl border-zinc-700 bg-zinc-800 text-zinc-50"
                      />
                    </div>
                  </div>

                  {/* BMI Real-time */}
                  <div className="mt-1">
                    <BMIBadge bmi={bmi} />
                  </div>
                </div>

                <Button
                  onClick={goNext}
                  disabled={!form.name.trim() || !form.heightCm || !form.currentWeightKg}
                  className="mt-2 w-full rounded-xl bg-blue-600 hover:bg-blue-500 h-11 font-semibold"
                >
                  Lanjut <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            )}

            {/* ── STEP 1: Target & Program ───────────────────────── */}
            {step === 1 && (
              <div className="space-y-4">
                <h1 className="text-xl font-bold text-zinc-50">Target & Program</h1>
                <p className="text-sm text-zinc-400">Tetapkan tujuan dan pahami programnya</p>

                <div>
                  <Label className="text-zinc-300">Berat target (kg)</Label>
                  <Input
                    type="number"
                    min={40}
                    max={form.currentWeightKg - 1}
                    step={0.5}
                    value={form.targetWeightKg}
                    onChange={(e) => set('targetWeightKg', Number(e.target.value))}
                    className="mt-1.5 rounded-xl border-zinc-700 bg-zinc-800 text-zinc-50"
                  />
                </div>

                {/* Activity Level */}
                <div>
                  <Label className="text-zinc-300">Level aktivitas harian</Label>
                  <div className="relative mt-1.5">
                    <select
                      value={form.activityLevel}
                      onChange={(e) => set('activityLevel', e.target.value as FormData['activityLevel'])}
                      className="w-full appearance-none rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-zinc-50 focus:outline-none focus:border-blue-500"
                    >
                      <option value="sedentary">Sedentary – Hampir tidak olahraga</option>
                      <option value="light">Light – Olahraga ringan 1-3x/minggu</option>
                      <option value="moderate">Moderate – Olahraga 3-5x/minggu</option>
                      <option value="active">Active – Olahraga berat 6-7x/minggu</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  </div>
                </div>

                {/* TDEE info */}
                <Card className="border-blue-500/20 bg-blue-600/10">
                  <CardContent className="p-4 space-y-1">
                    <p className="text-xs text-blue-300 font-medium uppercase tracking-wide">TDEE Kamu</p>
                    <p className="text-2xl font-bold text-white">{tdee.toLocaleString()} <span className="text-sm font-normal text-zinc-400">kkal/hari</span></p>
                    <p className="text-xs text-zinc-400">Estimasi berdasarkan tinggi, berat, usia, dan aktivitas (Mifflin-St Jeor)</p>
                  </CardContent>
                </Card>

                {/* Estimasi turun */}
                <Card className="border-emerald-500/20 bg-emerald-500/10">
                  <CardContent className="p-4">
                    <p className="text-sm text-emerald-300">
                      🎯 Estimasi turun <strong>{weightLoss.toFixed(1)} kg</strong> selama 24 minggu
                    </p>
                  </CardContent>
                </Card>

                {/* Phase list */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Program 5 Fase</p>
                  {PHASE_CONFIGS.map((phase) => (
                    <Card key={phase.phase_number} className="border-zinc-800 bg-zinc-900/60">
                      <CardContent className="flex items-center gap-3 p-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-600/20 text-sm font-bold text-blue-400">
                          {phase.phase_number}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-zinc-100">{phase.name}</p>
                          <p className="text-xs text-zinc-500">
                            Minggu {phase.week_start}–{phase.week_end} •{' '}
                            {phase.daily_calories_min}–{phase.daily_calories_max} kkal
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={goBack} className="flex-1 rounded-xl border-zinc-700 h-11">
                    <ArrowLeft className="mr-1 h-4 w-4" /> Kembali
                  </Button>
                  <Button onClick={goNext} className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-500 h-11 font-semibold">
                    Lanjut <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* ── STEP 2: Pengukuran Pribadi ─────────────────────── */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <Lock className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />
                  <div>
                    <h1 className="text-xl font-bold text-zinc-50">Pengukuran Pribadi</h1>
                    <p className="mt-0.5 text-sm text-zinc-400">Semua data dienkripsi di perangkat Anda</p>
                  </div>
                </div>

                <Card className="border-blue-500/20 bg-blue-600/10">
                  <CardContent className="flex items-start gap-3 p-4">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />
                    <p className="text-xs text-blue-200">
                      Data ini <strong>100% opsional</strong> dan dienkripsi dengan AES-256 menggunakan kunci unik akun Anda. Tidak ada orang lain yang bisa membacanya.
                    </p>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-zinc-300">Panjang (cm) <span className="text-zinc-600">opsional</span></Label>
                    <Input
                      type="number"
                      min={5}
                      max={30}
                      step={0.5}
                      placeholder="—"
                      value={form.startLengthCm}
                      onChange={(e) =>
                        set('startLengthCm', e.target.value === '' ? '' : Number(e.target.value))
                      }
                      className="mt-1.5 rounded-xl border-zinc-700 bg-zinc-800 text-zinc-50"
                    />
                    <p className="mt-1 text-[11px] text-zinc-600">Panjang ereksi</p>
                  </div>
                  <div>
                    <Label className="text-zinc-300">Lingkar (cm) <span className="text-zinc-600">opsional</span></Label>
                    <Input
                      type="number"
                      min={5}
                      max={25}
                      step={0.5}
                      placeholder="—"
                      value={form.startGirthCm}
                      onChange={(e) =>
                        set('startGirthCm', e.target.value === '' ? '' : Number(e.target.value))
                      }
                      className="mt-1.5 rounded-xl border-zinc-700 bg-zinc-800 text-zinc-50"
                    />
                    <p className="mt-1 text-[11px] text-zinc-600">Lingkar ereksi</p>
                  </div>
                </div>

                {/* EHS */}
                <div>
                  <Label className="text-zinc-300">Erection Hardness Score <span className="text-zinc-600">opsional</span></Label>
                  <div className="mt-2 space-y-2">
                    {([1, 2, 3, 4] as const).map((score) => (
                      <button
                        key={score}
                        type="button"
                        onClick={() => set('ehsScore', form.ehsScore === score ? '' : score)}
                        className={`w-full rounded-xl border px-4 py-2.5 text-left text-sm transition-colors ${
                          form.ehsScore === score
                            ? 'border-blue-500 bg-blue-600/20 text-blue-200'
                            : 'border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-zinc-600'
                        }`}
                      >
                        <span className="font-semibold text-zinc-300">EHS {score} — </span>
                        {EHS_SCALE[score]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={goBack} className="flex-1 rounded-xl border-zinc-700 h-11">
                    <ArrowLeft className="mr-1 h-4 w-4" /> Kembali
                  </Button>
                  <Button onClick={goNext} className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-500 h-11 font-semibold">
                    Lanjut <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* ── STEP 3: Proyeksi & Konfirmasi ─────────────────── */}
            {step === 3 && (
              <div className="space-y-4">
                <h1 className="text-xl font-bold text-zinc-50">Proyeksi 24 Minggu</h1>
                <p className="text-sm text-zinc-400">Estimasi hasil jika program dijalankan konsisten</p>

                {/* Summary */}
                <Card className="border-zinc-800 bg-zinc-900">
                  <CardContent className="divide-y divide-zinc-800 p-0">
                    {[
                      { label: 'Nama', value: form.name },
                      { label: 'Usia / Tinggi', value: `${form.age} th · ${form.heightCm} cm` },
                      { label: 'Berat Awal → Target', value: `${form.currentWeightKg} → ${form.targetWeightKg} kg` },
                      { label: 'TDEE', value: `${tdee.toLocaleString()} kkal` },
                      { label: 'BMI Saat Ini', value: bmi.toFixed(1) },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between px-4 py-2.5 text-sm">
                        <span className="text-zinc-500">{label}</span>
                        <span className="font-medium text-zinc-200">{value}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Weight chart */}
                <Card className="border-zinc-800 bg-zinc-900">
                  <CardContent className="p-4">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                      Proyeksi Penurunan Berat
                    </p>
                    <div className="h-[130px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                          <XAxis
                            dataKey="week"
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(v) => (v % 6 === 0 ? `W${v}` : '')}
                            tick={{ fontSize: 10, fill: '#71717a' }}
                          />
                          <YAxis
                            hide
                            domain={[form.targetWeightKg - 2, form.currentWeightKg + 2]}
                          />
                          <Tooltip
                            contentStyle={{
                              background: '#18181b',
                              border: '1px solid rgba(255,255,255,0.08)',
                              borderRadius: 12,
                              fontSize: 12,
                            }}
                            formatter={(v: number) => [`${v} kg`, 'Berat']}
                            labelFormatter={(l) => `Minggu ${l}`}
                          />
                          <Line
                            type="monotone"
                            dataKey="berat"
                            stroke="#10b981"
                            strokeWidth={2.5}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-2 flex justify-between text-xs text-zinc-500">
                      <span>Start: {form.currentWeightKg} kg</span>
                      <span>Target: {form.targetWeightKg} kg</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Projection cards */}
                <div className="grid grid-cols-2 gap-3">
                  <Card className="border-zinc-800 bg-zinc-900">
                    <CardContent className="p-3 text-center">
                      <p className="text-xs text-zinc-500">Turun Berat</p>
                      <p className="mt-1 text-xl font-bold text-emerald-400">
                        ≈{weightLoss.toFixed(1)} kg
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-zinc-800 bg-zinc-900">
                    <CardContent className="p-3 text-center">
                      <p className="text-xs text-zinc-500">Testosteron</p>
                      <p className="mt-1 text-xl font-bold text-blue-400">
                        +{testoChange.percentIncrease}%
                      </p>
                    </CardContent>
                  </Card>
                  {penisProjection && (
                    <Card className="col-span-2 border-zinc-800 bg-zinc-900">
                      <CardContent className="p-3 text-center">
                        <p className="text-xs text-zinc-500">Proyeksi Ukuran (dari fat pad)</p>
                        <p className="mt-1 font-semibold text-zinc-200">
                          +{(penisProjection.conservative - Number(form.startLengthCm)).toFixed(1)} –{' '}
                          +{(penisProjection.optimistic - Number(form.startLengthCm)).toFixed(1)} cm
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Disclaimer */}
                <Card className="border-amber-500/20 bg-amber-500/10">
                  <CardContent className="p-4">
                    <p className="text-xs text-amber-200">
                      ⚠️ <strong>Disclaimer:</strong> Hasil bervariasi per individu. Proyeksi ini adalah estimasi berdasarkan data rata-rata. Konsultasikan dengan dokter sebelum memulai program diet dan olahraga intensif.
                    </p>
                  </CardContent>
                </Card>

                {/* Agreement checkbox */}
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-zinc-700 bg-zinc-800/50 p-3">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-blue-500"
                  />
                  <span className="text-sm text-zinc-300">
                    Saya memahami risiko, hasil bervariasi, dan akan berkonsultasi dokter sebelum memulai.
                  </span>
                </label>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={goBack} className="flex-1 rounded-xl border-zinc-700 h-11">
                    <ArrowLeft className="mr-1 h-4 w-4" /> Kembali
                  </Button>
                  <Button
                    onClick={handleFinish}
                    disabled={!agreed || loading}
                    className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-500 h-11 font-semibold disabled:opacity-50"
                  >
                    {loading ? (
                      'Menyimpan...'
                    ) : (
                      <>
                        Mulai Program <Rocket className="ml-1.5 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
