'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, CartesianGrid } from 'recharts';
import { Lock, Plus, Award, Scale, Ruler, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUserStore } from '@/lib/stores/userStore';
import { useDashboardData } from '@/lib/hooks/useDashboardData';
import { useWeightChartData, useLogWeight } from '@/lib/hooks/useWeightLog';
import { useLogMeasurement } from '@/lib/hooks/useMeasurementLog';
import { projectPenisLength } from '@/lib/utils/formulas';
import { decrypt } from '@/lib/utils/encryption';
import type { UserAchievement } from '@/lib/types';

function LogWeightDialog({ open, onClose, lastWeight }: { open: boolean; onClose: () => void; lastWeight: number }) {
  const [weight, setWeight] = useState(String(lastWeight));
  const profile = useUserStore((s) => s.profile);
  const { mutateAsync: logWeight, isPending } = useLogWeight();

  const handleSubmit = async () => {
    const w = parseFloat(weight);
    if (isNaN(w) || w < 30 || w > 300) {
      toast.error('Masukkan berat yang valid (30–300 kg)');
      return;
    }

    if (!profile) {
      toast.error('Profil tidak ditemukan');
      return;
    }

    try {
      await logWeight({
        userId: profile.id,
        weightKg: w,
        waistCm: null,
        heightCm: profile.height_cm,
      });
      toast.success(`Berat ${w} kg dicatat! ✅`);
      onClose();
    } catch {
      toast.error('Gagal menyimpan berat. Coba lagi.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-xs mx-auto">
        <DialogHeader><DialogTitle>Log Berat Badan</DialogTitle></DialogHeader>
        <div className="space-y-4">
          {lastWeight > 0 && <p className="text-sm text-zinc-400">Berat terakhir: <span className="text-white font-medium">{lastWeight} kg</span></p>}
          <div className="space-y-2">
            <Label className="text-zinc-300">Berat Sekarang (kg)</Label>
            <Input type="number" step="0.1" min="30" max="300" value={weight} onChange={(e) => setWeight(e.target.value)} className="bg-zinc-800 border-zinc-700 text-white" placeholder="e.g. 82.5" />
          </div>
          <Button className="w-full bg-emerald-600 hover:bg-emerald-500" onClick={() => void handleSubmit()} disabled={isPending}>
            {isPending ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function LogMeasurementDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [length, setLength] = useState('');
  const [girth, setGirth] = useState('');
  const [ehs, setEhs] = useState<1 | 2 | 3 | 4>(3);
  const profile = useUserStore((s) => s.profile);
  const { mutateAsync: logMeasurement, isPending } = useLogMeasurement();

  const handleSubmit = async () => {
    const l = parseFloat(length);
    if (isNaN(l) || l < 5 || l > 30) {
      toast.error('Masukkan panjang yang valid (5–30 cm)');
      return;
    }

    if (!profile) {
      toast.error('Profil tidak ditemukan');
      return;
    }

    const g = parseFloat(girth) || l * 0.85;

    try {
      await logMeasurement({
        userId: profile.id,
        penisLength: String(l),
        penisGirth: String(g),
        erectionHardnessScore: ehs,
      });
      toast.success('Pengukuran dicatat & dienkripsi 🔒');
      setLength('');
      setGirth('');
      onClose();
    } catch {
      toast.error('Gagal menyimpan. Coba lagi.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-xs mx-auto">
        <DialogHeader><DialogTitle>Log Ukuran</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs text-zinc-500 bg-zinc-800/50 rounded-lg p-2">
            <Lock className="h-3 w-3 flex-shrink-0" />
            <span>Data dienkripsi AES-256-GCM di perangkat Anda</span>
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300">Panjang (cm)</Label>
            <Input type="number" step="0.1" min="5" max="30" value={length} onChange={(e) => setLength(e.target.value)} className="bg-zinc-800 border-zinc-700 text-white" placeholder="e.g. 11.5" />
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300">Lingkar (cm) – opsional</Label>
            <Input type="number" step="0.1" min="5" max="20" value={girth} onChange={(e) => setGirth(e.target.value)} className="bg-zinc-800 border-zinc-700 text-white" placeholder="e.g. 10.0" />
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300">Erection Hardness Score (1–4)</Label>
            <div className="grid grid-cols-4 gap-1">
              {([1, 2, 3, 4] as const).map((n) => (
                <button
                  key={n}
                  onClick={() => setEhs(n)}
                  className={`rounded-lg py-2 text-sm font-semibold transition-colors ${ehs === n ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}
                >
                  {n}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-zinc-600">1 = sangat lembek · 4 = keras penuh</p>
          </div>
          <Button className="w-full bg-blue-600 hover:bg-blue-500" onClick={() => void handleSubmit()} disabled={isPending}>
            {isPending ? 'Mengenkripsi...' : 'Simpan & Enkripsi'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AchievementBadge({ ua }: { ua: UserAchievement }) {
  const ach = ua.achievement;
  const unlocked = !!ua.unlocked_at;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`rounded-xl p-3 flex flex-col items-center text-center gap-1 border ${
        unlocked ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-900 border-zinc-800 opacity-40'
      }`}
    >
      <span className={`text-2xl ${!unlocked ? 'grayscale' : ''}`}>{ach?.icon ?? '🏆'}</span>
      <p className="text-[10px] font-semibold text-white leading-tight">{unlocked ? ach?.name : '???'}</p>
      {unlocked && ua.unlocked_at && (
        <p className="text-[9px] text-zinc-500">{new Date(ua.unlocked_at).toLocaleDateString('id-ID')}</p>
      )}
    </motion.div>
  );
}

function StatRow({ icon, label, start, now, delta, positive }: { icon: React.ReactNode; label: string; start: string; now: string; delta: string; positive?: boolean }) {
  const isPositive = positive ?? delta.startsWith('+');

  return (
    <div className="flex items-center gap-3 py-3 border-b border-zinc-800/60 last:border-0">
      <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-zinc-500">{label}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-zinc-400">{start}</span>
          <span className="text-zinc-700">→</span>
          <span className="text-sm font-semibold text-white">{now}</span>
        </div>
      </div>
      <Badge className={`text-xs ${isPositive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>{delta}</Badge>
    </div>
  );
}

function ProgressLoadingSkeleton() {
  return (
    <div className="space-y-4 pb-6">
      <div className="space-y-2">
        <Skeleton className="h-7 w-36 bg-zinc-800" />
        <Skeleton className="h-4 w-48 bg-zinc-800" />
      </div>
      <Skeleton className="h-32 w-full rounded-2xl bg-zinc-800" />
      <Skeleton className="h-48 w-full rounded-2xl bg-zinc-800" />
      <Skeleton className="h-24 w-full rounded-2xl bg-zinc-800" />
      <Skeleton className="h-24 w-full rounded-2xl bg-zinc-800" />
    </div>
  );
}

export default function ProgressPage() {
  const [tab, setTab] = useState('weight');
  const [showWeightLog, setShowWeightLog] = useState(false);
  const [showMeasureLog, setShowMeasureLog] = useState(false);
  const [decryptedLength, setDecryptedLength] = useState<number | null>(null);
  const [isDecryptingLength, setIsDecryptingLength] = useState(false);

  const profile = useUserStore((s) => s.profile);
  const { data, isLoading } = useDashboardData();

  const userId = profile?.id ?? '';
  const targetWeight = profile?.target_weight_kg ?? (profile?.starting_weight_kg ?? 80) - 10;
  const { data: chartData = [] } = useWeightChartData(userId, targetWeight);

  useEffect(() => {
    let isActive = true;

    async function decryptLength() {
      const raw = profile?.starting_penis_length;
      const currentUserId = profile?.id;

      if (!raw || !currentUserId) {
        if (isActive) {
          setDecryptedLength(null);
          setIsDecryptingLength(false);
        }
        return;
      }

      if (isActive) {
        setIsDecryptingLength(true);
      }

      try {
        const directNumber = parseFloat(raw);
        if (!isNaN(directNumber) && directNumber > 0 && directNumber < 30) {
          if (isActive) {
            setDecryptedLength(directNumber);
          }
          return;
        }

        const decryptedValue = await decrypt(raw, currentUserId);
        const parsed = parseFloat(decryptedValue);

        if (isActive) {
          setDecryptedLength(!isNaN(parsed) && parsed > 0 ? parsed : null);
        }
      } catch {
        if (isActive) {
          setDecryptedLength(null);
        }
      } finally {
        if (isActive) {
          setIsDecryptingLength(false);
        }
      }
    }

    void decryptLength();

    return () => {
      isActive = false;
    };
  }, [profile?.id, profile?.starting_penis_length]);

  if (isLoading && !data?.profile) {
    return <ProgressLoadingSkeleton />;
  }

  const latestWeight = profile?.current_weight_kg ?? 0;
  const startWeight = profile?.starting_weight_kg ?? 0;
  const weightDelta = latestWeight - startWeight;
  const programDay = profile?.program_start_date
    ? Math.floor((Date.now() - new Date(profile.program_start_date).getTime()) / 86400000) + 1
    : 1;
  const programProgress = Math.min(100, (programDay / 168) * 100);
  const tickInterval = chartData.length > 1 ? Math.floor((chartData.length - 1) / 4) : 0;

  const startLength = decryptedLength ?? 11;
  const projectedNow = profile
    ? projectPenisLength(startLength, profile.starting_weight_kg, profile.current_weight_kg)
    : 11;
  const projectedLengthDelta = projectedNow - startLength;
  const startLengthDisplay = isDecryptingLength
    ? 'Mengdekripsi...'
    : decryptedLength !== null
      ? `${decryptedLength} cm`
      : '—';
  const projectedNowDisplay = isDecryptingLength
    ? 'Mengdekripsi...'
    : decryptedLength !== null
      ? `${projectedNow.toFixed(2)} cm`
      : '—';
  const projectedDeltaDisplay = isDecryptingLength
    ? 'Mengdekripsi...'
    : decryptedLength !== null
      ? `+${projectedLengthDelta.toFixed(2)} cm`
      : '—';

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 pb-6">
      <div>
        <h1 className="text-xl font-bold text-white">Progress</h1>
        <p className="text-sm text-zinc-400 mt-0.5">Hari ke-{programDay} dari 168</p>
      </div>

      <Card className="space-y-2">
        <div className="flex justify-between text-xs text-zinc-400">
          <span>Progres Program</span>
          <span>{Math.round(programProgress)}%</span>
        </div>
        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full" initial={{ width: 0 }} animate={{ width: `${programProgress}%` }} transition={{ duration: 0.8, delay: 0.2 }} />
        </div>
        <p className="text-[10px] text-zinc-600">Fase {profile?.current_phase ?? 1} • Minggu {profile?.current_week ?? 1}</p>
      </Card>

      <Tabs value={tab} onValueChange={setTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full bg-zinc-900">
          <TabsTrigger value="weight" className="text-xs">Berat</TabsTrigger>
          <TabsTrigger value="measure" className="text-xs">Ukuran</TabsTrigger>
          <TabsTrigger value="summary" className="text-xs">Ringkasan</TabsTrigger>
          <TabsTrigger value="achievements" className="text-xs">Pencapaian</TabsTrigger>
        </TabsList>

        <TabsContent value="weight" className="space-y-4">
          <Card className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-zinc-500 font-medium">Grafik Berat</p>
            {chartData.length === 0 ? (
              <div className="h-48 flex flex-col items-center justify-center gap-2">
                <Scale className="h-10 w-10 text-zinc-700 opacity-60" />
                <p className="text-sm text-zinc-500">Belum ada data berat</p>
                <p className="text-xs text-zinc-600">Log berat pertamamu di bawah</p>
              </div>
            ) : (
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#71717a' }} interval={tickInterval} />
                    <YAxis tick={{ fontSize: 10, fill: '#71717a' }} domain={['auto', 'auto']} />
                    <Tooltip contentStyle={{ background: '#18181b', border: '1px solid #3f3f46', borderRadius: 8, fontSize: 11 }} labelStyle={{ color: '#a1a1aa' }} itemStyle={{ color: '#10b981' }} />
                    <ReferenceLine y={targetWeight} stroke="#52525b" strokeDasharray="4 4" label={{ value: 'Target', fill: '#52525b', fontSize: 10, position: 'right' }} />
                    <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#10b981' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </Card>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Sekarang', value: latestWeight > 0 ? `${latestWeight} kg` : '— kg', color: 'text-white' },
              { label: 'Target', value: `${targetWeight} kg`, color: 'text-emerald-400' },
              { label: 'Tersisa', value: latestWeight > 0 ? `${Math.abs(latestWeight - targetWeight).toFixed(1)} kg` : '—', color: 'text-amber-400' },
            ].map((s) => (
              <Card key={s.label} className="text-center py-2">
                <p className="text-xs text-zinc-500">{s.label}</p>
                <p className={`text-base font-bold mt-1 ${s.color}`}>{s.value}</p>
              </Card>
            ))}
          </div>
          <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white" onClick={() => setShowWeightLog(true)}>
            <Plus className="h-4 w-4 mr-2" /> Log Berat Hari Ini
          </Button>
          <LogWeightDialog open={showWeightLog} onClose={() => setShowWeightLog(false)} lastWeight={latestWeight} />
        </TabsContent>

        <TabsContent value="measure" className="space-y-4">
          <Card className="space-y-3">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-zinc-500" />
              <p className="text-xs text-zinc-500">Data terenkripsi AES-256</p>
            </div>

            {!profile?.starting_penis_length ? (
              <div className="text-center py-6 space-y-2">
                <Ruler className="h-10 w-10 text-zinc-700 mx-auto" />
                <p className="text-zinc-400 text-sm">Kamu belum mencatat data ini</p>
                <Button className="bg-blue-600 hover:bg-blue-500" size="sm" onClick={() => setShowMeasureLog(true)}>
                  <Plus className="h-4 w-4 mr-1" /> Mulai Catat
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-widest text-zinc-500 font-medium">Estimasi Progres</p>
                <div className="bg-zinc-800/50 rounded-lg p-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Awal</span>
                    <span className="text-zinc-400">Proyeksi sekarang</span>
                  </div>
                  <div className="flex justify-between mt-1 gap-3">
                    <span className="text-white font-bold">{startLengthDisplay}</span>
                    <span className="text-blue-400 font-bold text-right">{projectedNowDisplay}</span>
                  </div>
                </div>
              </div>
            )}
          </Card>
          <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white" onClick={() => setShowMeasureLog(true)}>
            <Plus className="h-4 w-4 mr-2" /> Log Ukuran
          </Button>
          <LogMeasurementDialog open={showMeasureLog} onClose={() => setShowMeasureLog(false)} />
        </TabsContent>

        <TabsContent value="summary" className="space-y-3">
          <Card className="space-y-0 divide-y divide-zinc-800/60">
            <StatRow
              icon={<Scale className="h-4 w-4 text-emerald-400" />}
              label="Berat Badan"
              start={`${startWeight} kg`}
              now={`${latestWeight} kg`}
              delta={`${weightDelta >= 0 ? '+' : ''}${weightDelta.toFixed(1)} kg`}
              positive={weightDelta < 0}
            />
            <StatRow
              icon={<Ruler className="h-4 w-4 text-blue-400" />}
              label="Panjang Proyeksi"
              start={startLengthDisplay}
              now={projectedNowDisplay}
              delta={projectedDeltaDisplay}
              positive
            />
            <StatRow
              icon={<Zap className="h-4 w-4 text-amber-400" />}
              label="Estimasi Testosteron"
              start="Baseline"
              now={`+${Math.max(0, Math.round((startWeight - latestWeight) * 1.2))}%`}
              delta={`+${Math.max(0, Math.round((startWeight - latestWeight) * 1.2))}%`}
              positive
            />
          </Card>
          <Card>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: 'Hari Aktif', value: programDay, color: 'text-blue-400' },
                { label: 'Workout', value: data?.todaySummary?.workoutsCompleted ?? 0, color: 'text-amber-400' },
                { label: 'Streak', value: data?.todaySummary?.streakDays ?? 0, color: 'text-emerald-400' },
              ].map((s) => (
                <div key={s.label}>
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          {(data?.achievements ?? []).length === 0 ? (
            <Card className="text-center py-8">
              <Award className="h-10 w-10 text-zinc-700 mx-auto mb-2" />
              <p className="text-zinc-400 text-sm">Belum ada pencapaian</p>
              <p className="text-zinc-600 text-xs mt-1">Terus konsisten untuk unlock achievement!</p>
            </Card>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {(data?.achievements ?? []).map((ua, i) => (
                <AchievementBadge key={ua.id ?? i} ua={ua} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
