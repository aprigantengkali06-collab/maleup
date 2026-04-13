// src/components/dashboard/LogWeightDialog.tsx
'use client';

import { useState } from 'react';
import { Scale } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLogWeight } from '@/lib/hooks/useWeightLog';
import type { Profile, WeightLog } from '@/lib/types';

interface LogWeightDialogProps {
  profile: Profile;
  latestWeight: WeightLog | null;
  children?: React.ReactNode;
}

export function LogWeightDialog({ profile, latestWeight, children }: LogWeightDialogProps) {
  const [open, setOpen] = useState(false);
  const [weight, setWeight] = useState('');
  const [waist, setWaist] = useState('');
  const logWeight = useLogWeight();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const kg = parseFloat(weight);
    if (isNaN(kg) || kg < 30 || kg > 300) {
      toast.error('Masukkan berat yang valid (30–300 kg)');
      return;
    }
    try {
      await logWeight.mutateAsync({
        userId: profile.id,
        weightKg: kg,
        waistCm: waist ? parseFloat(waist) : null,
        heightCm: profile.height_cm,
      });
      toast.success(`Berat ${kg} kg berhasil dicatat!`);
      setWeight('');
      setWaist('');
      setOpen(false);
    } catch {
      toast.error('Gagal menyimpan berat. Coba lagi.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ?? (
          <button className="flex flex-col items-center gap-2 rounded-2xl bg-zinc-800 p-4 text-center hover:bg-zinc-700 transition-colors">
            <Scale className="h-5 w-5 text-blue-400" />
            <span className="text-xs font-medium text-zinc-300">Log Berat</span>
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="mx-auto max-w-sm rounded-2xl border-zinc-800 bg-zinc-900 text-zinc-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-zinc-50">
            <Scale className="h-5 w-5 text-blue-400" />
            Catat Berat Badan
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {latestWeight && (
            <p className="rounded-xl bg-zinc-800 px-4 py-2.5 text-sm text-zinc-400">
              Terakhir:{' '}
              <span className="font-semibold text-zinc-200">
                {Number(latestWeight.weight_kg).toFixed(1)} kg
              </span>{' '}
              · {new Date(latestWeight.logged_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
            </p>
          )}

          <div className="space-y-1.5">
            <Label className="text-zinc-300">Berat sekarang (kg)</Label>
            <Input
              type="number"
              step="0.1"
              min={30}
              max={300}
              placeholder={latestWeight ? String(Number(latestWeight.weight_kg).toFixed(1)) : '75.0'}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="rounded-xl border-zinc-700 bg-zinc-800 text-zinc-50 placeholder:text-zinc-600"
              autoFocus
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-zinc-400 text-sm">
              Lingkar pinggang (cm) <span className="text-zinc-600 text-xs">— opsional</span>
            </Label>
            <Input
              type="number"
              step="0.5"
              min={50}
              max={180}
              placeholder={latestWeight?.waist_cm ? String(latestWeight.waist_cm) : '95'}
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
              className="rounded-xl border-zinc-700 bg-zinc-800 text-zinc-50 placeholder:text-zinc-600"
            />
          </div>

          <Button
            type="submit"
            disabled={logWeight.isPending}
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 h-10 font-semibold"
          >
            {logWeight.isPending ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
