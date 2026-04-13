'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  User, Bell, BookOpen, ShieldCheck, Smartphone, LogOut,
  ExternalLink, Download, Trash2, ToggleLeft, ToggleRight,
} from 'lucide-react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUserStore } from '@/lib/stores/userStore';
import { usePushNotifications } from '@/lib/hooks/usePushNotifications';
import { useInstallPrompt } from '@/lib/hooks/useInstallPrompt';
import { createClient } from '@/lib/supabase/client';

const REFERENCES = [
  {
    label: 'PSMF – Protein-Sparing Modified Fast Safety',
    journal: 'Nutrition & Metabolism',
    year: '2016',
    url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4784653/',
  },
  {
    label: 'HIIT Meta-analysis 2023',
    journal: 'British Journal of Sports Medicine',
    year: '2023',
    url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10054577/',
  },
  {
    label: 'Weight Loss & Testosterone – Esposito 2004',
    journal: 'JAMA',
    year: '2004',
    url: 'https://pubmed.ncbi.nlm.nih.gov/15213713/',
  },
  {
    label: 'Kegel & Erectile Dysfunction – Dorey 2004',
    journal: 'BJU International',
    year: '2004',
    url: 'https://pubmed.ncbi.nlm.nih.gov/15363137/',
  },
  {
    label: 'Penile Fat Pad & Weight Loss',
    journal: 'Andrologia',
    year: '2021',
    url: 'https://pubmed.ncbi.nlm.nih.gov/33236366/',
  },
  {
    label: 'Penile Traction Therapy – Nikoobakht 2011',
    journal: 'Journal of Sexual Medicine',
    year: '2011',
    url: 'https://pubmed.ncbi.nlm.nih.gov/21449788/',
  },
];

function Toggle({ active, onToggle }: { active: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className="flex-shrink-0">
      {active
        ? <ToggleRight className="h-6 w-6 text-blue-400" />
        : <ToggleLeft className="h-6 w-6 text-zinc-600" />}
    </button>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const profile = useUserStore((s) => s.profile);
  const setProfile = useUserStore((s) => s.setProfile);
  const { permission, requestPermission, subscribe } = usePushNotifications();
  const { isInstallable, promptInstall, isInstalled } = useInstallPrompt();

  const [notifMeal, setNotifMeal] = useState(true);
  const [notifWorkout, setNotifWorkout] = useState(true);
  const [notifKegel, setNotifKegel] = useState(true);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editName, setEditName] = useState(profile?.name ?? '');
  const [editHeight, setEditHeight] = useState(String(profile?.height_cm ?? ''));
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const bmi = profile ? (profile.current_weight_kg / Math.pow(profile.height_cm / 100, 2)).toFixed(1) : '-';

  const handleLogout = async () => {
    try { await createClient().auth.signOut(); } catch {}
    setProfile(null);
    router.push('/login');
  };

  // ── Fix A: persist profile to Supabase + update local state ──────────────
  const handleSaveProfile = async () => {
    if (!profile) return;
    setIsSaving(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: editName,
          height_cm: parseFloat(editHeight),
          updated_at: new Date().toISOString(),
        })
        .eq('id', profile.id);

      if (error) throw error;

      // Update local store with new values
      setProfile({
        ...profile,
        name: editName,
        height_cm: parseFloat(editHeight),
      });

      toast.success('Profil berhasil diperbarui');
      setShowEditProfile(false);
      router.refresh();
    } catch (err) {
      toast.error('Gagal menyimpan profil');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  // ── Fix B: delete ALL user data from Supabase then sign out ──────────────
  const handleDeleteData = async () => {
    if (!profile) return;
    setIsDeleting(true);
    try {
      const supabase = createClient();
      const userId = profile.id;

      // Delete child tables first (FK order matters)
      const tables = [
        'meal_logs',
        'workout_logs',
        'kegel_logs',
        'weight_logs',
        'measurement_logs',
        'user_achievements',
        'push_subscriptions',
      ];

      for (const table of tables) {
        const { error } = await supabase.from(table).delete().eq('user_id', userId);
        if (error) console.warn(`Gagal hapus ${table}:`, error.message);
      }

      // Delete profile
      await supabase.from('profiles').delete().eq('id', userId);

      // Sign out
      await supabase.auth.signOut();
      setProfile(null);

      toast.success('Semua data berhasil dihapus');
      router.push('/login');
    } catch (err) {
      toast.error('Gagal menghapus data');
      console.error(err);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  // ── Fix C: export ALL user data (7 tables) ───────────────────────────────
  const handleExport = async () => {
    if (!profile) return;
    setIsExporting(true);
    try {
      const supabase = createClient();
      const userId = profile.id;

      const [
        profileRes,
        weightLogs,
        measurementLogs,
        mealLogs,
        workoutLogs,
        kegelLogs,
        achievements,
      ] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', userId).single(),
        supabase.from('weight_logs').select('*').eq('user_id', userId).order('logged_at', { ascending: true }),
        supabase.from('measurement_logs').select('*').eq('user_id', userId).order('measured_at', { ascending: true }),
        supabase.from('meal_logs').select('*').eq('user_id', userId).order('logged_at', { ascending: true }),
        supabase.from('workout_logs').select('*').eq('user_id', userId).order('logged_at', { ascending: true }),
        supabase.from('kegel_logs').select('*').eq('user_id', userId).order('logged_at', { ascending: true }),
        supabase.from('user_achievements').select('*, achievements(*)').eq('user_id', userId),
      ]);

      const exportData = {
        exportedAt: new Date().toISOString(),
        app: 'MaleUp v1.0.0',
        profile: profileRes.data,
        weightLogs: weightLogs.data ?? [],
        measurementLogs: measurementLogs.data ?? [],  // still encrypted
        mealLogs: mealLogs.data ?? [],
        workoutLogs: workoutLogs.data ?? [],
        kegelLogs: kegelLogs.data ?? [],
        achievements: achievements.data ?? [],
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      a.download = `maleup-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('Data berhasil diexport');
    } catch (err) {
      toast.error('Gagal export data');
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 pb-6">
      <div>
        <h1 className="text-xl font-bold text-white">Settings</h1>
        <p className="text-sm text-zinc-400 mt-0.5">Preferensi &amp; informasi akun</p>
      </div>

      {/* Profil */}
      <Card className="space-y-3">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-blue-400" />
          <p className="text-sm font-semibold text-white">Profil</p>
        </div>
        <div className="bg-zinc-800/50 rounded-lg p-3 space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Nama</span>
            <span className="text-white font-medium">{profile?.name ?? '-'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Usia</span>
            <span className="text-white">{profile?.age ?? '-'} tahun</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Tinggi</span>
            <span className="text-white">{profile?.height_cm ?? '-'} cm</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Berat</span>
            <span className="text-white">{profile?.current_weight_kg ?? '-'} kg</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">BMI</span>
            <span className="text-white">{bmi}</span>
          </div>
        </div>
        <Button variant="secondary" size="sm" className="w-full" onClick={() => setShowEditProfile(true)}>
          Edit Profil
        </Button>
      </Card>

      {/* Notifikasi */}
      <Card className="space-y-3">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-blue-400" />
          <p className="text-sm font-semibold text-white">Notifikasi</p>
        </div>
        <p className="text-xs text-zinc-500">Status: <span className={permission === 'granted' ? 'text-emerald-400' : 'text-amber-400'}>{permission}</span></p>
        <div className="space-y-2">
          {[
            { label: 'Pengingat Makan',   active: notifMeal,    toggle: () => setNotifMeal(!notifMeal) },
            { label: 'Pengingat Workout', active: notifWorkout, toggle: () => setNotifWorkout(!notifWorkout) },
            { label: 'Pengingat Kegel',   active: notifKegel,   toggle: () => setNotifKegel(!notifKegel) },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between py-1">
              <span className="text-sm text-zinc-300">{item.label}</span>
              <Toggle active={item.active} onToggle={item.toggle} />
            </div>
          ))}
        </div>
        {permission !== 'granted' && (
          <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white" size="sm" onClick={() => { void requestPermission(); void subscribe(); }}>
            Aktifkan Push Notification
          </Button>
        )}
      </Card>

      {/* Referensi Ilmiah */}
      <Card className="space-y-3">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-blue-400" />
          <p className="text-sm font-semibold text-white">Referensi Ilmiah</p>
        </div>
        <p className="text-xs text-zinc-500">Program ini didasarkan pada penelitian peer-reviewed berikut:</p>
        <div className="space-y-2">
          {REFERENCES.map((ref) => (
            <a
              key={ref.url}
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start justify-between gap-2 py-2.5 px-3 rounded-xl bg-zinc-800/60 hover:bg-zinc-800 transition-colors group"
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-zinc-200 group-hover:text-white transition-colors leading-snug">{ref.label}</p>
                <p className="text-[10px] text-zinc-500 mt-0.5">{ref.journal} · {ref.year}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0 mt-0.5">
                <span className="text-[10px] text-blue-400 font-medium">Baca</span>
                <ExternalLink className="h-3 w-3 text-blue-400" />
              </div>
            </a>
          ))}
        </div>
      </Card>

      {/* Data & Privasi */}
      <Card className="space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-blue-400" />
          <p className="text-sm font-semibold text-white">Data &amp; Privasi</p>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Pengukuran sensitif dienkripsi dengan AES-256-GCM di perangkat Anda sebelum dikirim ke server.
        </p>
        <div className="space-y-2">
          <Button variant="secondary" className="w-full" size="sm" onClick={() => void handleExport()} disabled={isExporting}>
            <Download className="h-4 w-4 mr-2" /> {isExporting ? 'Mengexport...' : 'Export Data (JSON)'}
          </Button>
          <Button variant="destructive" className="w-full" size="sm" onClick={() => setShowDeleteConfirm(true)}>
            <Trash2 className="h-4 w-4 mr-2" /> Hapus Semua Data Saya
          </Button>
        </div>
      </Card>

      {/* Aplikasi */}
      <Card className="space-y-3">
        <div className="flex items-center gap-2">
          <Smartphone className="h-4 w-4 text-blue-400" />
          <p className="text-sm font-semibold text-white">Aplikasi</p>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-zinc-400">Versi</span>
          <span className="text-zinc-300">MaleUp v1.0.0</span>
        </div>
        {isInstallable && !isInstalled && (
          <Button variant="secondary" className="w-full" size="sm" onClick={() => void promptInstall()}>
            <Smartphone className="h-4 w-4 mr-2" /> Install PWA ke Home Screen
          </Button>
        )}
        {isInstalled && <p className="text-xs text-emerald-400 text-center">✅ Sudah terinstall</p>}
      </Card>

      {/* Logout */}
      <Button variant="destructive" className="w-full h-11" onClick={() => void handleLogout()}>
        <LogOut className="h-4 w-4 mr-2" /> Keluar dari Akun
      </Button>

      {/* Edit Profile Dialog */}
      <Dialog open={showEditProfile} onOpenChange={setShowEditProfile}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-xs mx-auto">
          <DialogHeader><DialogTitle>Edit Profil</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-zinc-300">Nama</Label>
              <Input value={editName} onChange={(e) => setEditName(e.target.value)} className="bg-zinc-800 border-zinc-700 text-white" />
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-300">Tinggi (cm)</Label>
              <Input type="number" value={editHeight} onChange={(e) => setEditHeight(e.target.value)} className="bg-zinc-800 border-zinc-700 text-white" />
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-500" onClick={() => void handleSaveProfile()} disabled={isSaving}>
              {isSaving ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-xs mx-auto">
          <DialogHeader><DialogTitle className="text-red-400">Hapus Semua Data?</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-zinc-300">
              Tindakan ini <strong>TIDAK BISA dibatalkan</strong>. Semua data progress, log, dan pengukuran Anda akan dihapus permanen.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setShowDeleteConfirm(false)} disabled={isDeleting}>
                Batal
              </Button>
              <Button variant="destructive" className="flex-1" onClick={() => void handleDeleteData()} disabled={isDeleting}>
                {isDeleting ? 'Menghapus...' : 'Ya, Hapus Semua'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
