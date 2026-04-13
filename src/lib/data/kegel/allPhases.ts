// /src/lib/data/kegel/allPhases.ts
// Kegel plan data semua fase – matching KegelPlan interface dari types/index.ts
// Diperkaya dengan instructions detail dan progression notes

import type { KegelPlan } from '@/lib/types';

// ─── Extended interface untuk data lokal (superset dari KegelPlan) ───
export interface KegelPlanExtended extends KegelPlan {
  kegelType: 'standard' | 'reverse' | 'combination';
  restBetweenReps: number;    // relax_seconds alias
  restBetweenSets: number;    // detik istirahat antar set
  sessionsPerDay: number;     // alias times_per_day
  progressionNotes: string;   // kapan naik level
}

// ─── Fase 1 ───────────────────────────────────────────────────────────
export const phase1Kegel: KegelPlanExtended = {
  id: 1,
  phase_number: 1,
  sets: 3,
  reps: 10,
  hold_seconds: 5,
  relax_seconds: 5,
  times_per_day: 2,
  include_reverse_kegel: false,
  kegelType: 'standard',
  restBetweenReps: 5,
  restBetweenSets: 30,
  sessionsPerDay: 2,
  description: `CARA MENEMUKAN OTOT PC (Pubococcygeus):
Bayangkan kamu sedang menahan aliran urine di toilet. Otot yang kamu kencangkan itulah otot PC (pelvic floor). Coba sekali sekarang – tahan sebentar, lalu lepas. Kamu harus merasakan kontraksi internal tanpa menggerakkan bokong, paha, atau perut.

CARA MELAKUKAN (Fase 1 – Standard Kegel):
1. Duduk, berdiri, atau berbaring telentang dengan posisi nyaman.
2. Tarik napas dalam 3 detik.
3. Saat buang napas, kencangkan otot PC seperti menahan pipis. Tahan selama 5 detik. Bernapas secara normal selama penahanan.
4. Setelah 5 detik, lepaskan kontraksi sepenuhnya. Relaks penuh 5 detik.
5. Ulangi 10 kali = 1 set. Istirahat 30 detik antar set. Lakukan 3 set.
6. Lakukan 2 sesi per hari: pagi setelah bangun tidur, malam sebelum tidur.

KESALAHAN UMUM:
- Menahan napas saat kontraksi → bernapas terus secara normal.
- Mengencangkan bokong atau paha → isolasi hanya otot PC.
- Tidak melepas kontraksi sepenuhnya → relaks penuh adalah separuh dari latihan.`,
  progressionNotes: `Siap naik ke Fase 2 jika: sudah bisa menyelesaikan 3×10 dengan nyaman selama 2 minggu berturut-turut tanpa kelelahan otot berlebihan. Kamu seharusnya sudah bisa merasakan dan mengisolasi otot PC dengan jelas tanpa mengaktifkan otot sekitar.`,
};

// ─── Fase 2 ───────────────────────────────────────────────────────────
export const phase2Kegel: KegelPlanExtended = {
  id: 2,
  phase_number: 2,
  sets: 3,
  reps: 15,
  hold_seconds: 7,
  relax_seconds: 5,
  times_per_day: 2,
  include_reverse_kegel: false,
  kegelType: 'standard',
  restBetweenReps: 5,
  restBetweenSets: 45,
  sessionsPerDay: 2,
  description: `PERKEMBANGAN FASE 2:
Otot PC kamu sekarang lebih kuat dan responsif dari Fase 1. Di fase ini kamu akan menambah jumlah reps (10 → 15) dan durasi tahan (5 → 7 detik). Ini akan terasa lebih menantang – itu pertanda baik.

CARA MELAKUKAN (Fase 2 – Standard Kegel Menengah):
1. Posisi duduk tegak atau berdiri adalah yang terbaik – ini menambah komponen gravitasi.
2. Tarik napas pelan 3 detik melalui hidung.
3. Saat buang napas perlahan, kencangkan otot PC dari bawah ke atas (bayangkan lift naik). Tahan 7 detik sambil terus bernapas normal.
4. Pada detik ke-7, lepaskan kontraksi PERLAHAN (jangan tiba-tiba). Relaks penuh 5 detik.
5. 15 reps per set, 3 set, istirahat 45 detik antar set.

TEKNIK LIFT (Baru di Fase 2):
Bayangkan otot pelvic floor sebagai elevator berlantai 3. Saat kontraksi, naikkan ke lantai 1, tahan, naik ke lantai 2, tahan, naik ke lantai 3 (puncak). Saat relaksasi, turunkan perlahan lantai per lantai. Teknik ini meningkatkan kontrol neuromuskular secara signifikan.`,
  progressionNotes: `Siap naik ke Fase 3 jika: bisa menyelesaikan 3×15 selama 4 minggu tanpa kelelahan berlebihan, dan kamu mulai merasakan kontraksi lebih terkendali dan kuat. Fase 3 akan memperkenalkan Reverse Kegel – pastikan kamu benar-benar menguasai standard kegel dulu.`,
};

// ─── Fase 3 ───────────────────────────────────────────────────────────
export const phase3Kegel: KegelPlanExtended = {
  id: 3,
  phase_number: 3,
  sets: 3,
  reps: 20,
  hold_seconds: 10,
  relax_seconds: 5,
  times_per_day: 2,
  include_reverse_kegel: true,
  kegelType: 'standard',  // primary type; reverse dilakukan setelah setiap set
  restBetweenReps: 5,
  restBetweenSets: 60,
  sessionsPerDay: 2,
  description: `PENGENALAN REVERSE KEGEL (Fase 3):
Standard kegel = kontraksi (menarik ke dalam). Reverse kegel = ekspansi/relaksasi aktif (mendorong ke luar dengan lembut). Keduanya SAMA PENTINGNYA untuk kesehatan pelvic floor dan ereksi yang kuat.

CARA MENEMUKAN GERAKAN REVERSE KEGEL:
Bayangkan kamu sedang mengejan ringan seperti akan buang air kecil – tapi SANGAT LEMBUT, tanpa tekanan berlebihan. Kamu akan merasakan pelvic floor sedikit terbuka/menonjol keluar. JANGAN mengejan kuat – ini bukan latihan otot perut.

PROTOKOL SESI FASE 3 (lakukan 2× sehari):

BAGIAN 1 – Standard Kegel:
1. Duduk atau berdiri tegak, bernapas normal.
2. Kencangkan otot PC dari bawah ke atas (teknik lift dari Fase 2). Tahan 10 detik.
3. Lepas perlahan. Relaks 5 detik penuh.
4. 20 reps per set × 3 set. Istirahat 60 detik antar set.

BAGIAN 2 – Reverse Kegel (setelah setiap set standard):
1. Setelah menyelesaikan 1 set standard, duduk santai.
2. Tarik napas dalam ke perut (diafragma turun).
3. Saat napas penuh, rasakan pelvic floor secara alami terbuka sedikit – JANGAN dorong aktif, cukup biarkan terbuka seiring napas.
4. Saat buang napas, biarkan pelvic floor kembali ke netral.
5. Lakukan 5 repetisi napas dalam ini setelah setiap set standard.

MANFAAT KOMBINASI:
Otot yang bisa berkontraksi KUAT sekaligus berelaksasi PENUH = ereksi lebih keras dan lebih terkontrol. Reverse kegel mencegah hipertonus (otot terlalu tegang) yang justru bisa melemahkan ereksi.`,
  progressionNotes: `Siap naik ke Fase 4 jika: setelah 4-6 minggu fase ini, kamu merasakan kontrol yang jauh lebih baik, kemampuan menunda ejakulasi meningkat, dan ereksi terasa lebih penuh. Fase 4 akan menggabungkan keduanya dalam protokol kombinasi yang lebih kompleks.`,
};

// ─── Fase 4 ───────────────────────────────────────────────────────────
export const phase4Kegel: KegelPlanExtended = {
  id: 4,
  phase_number: 4,
  sets: 3,
  reps: 25,
  hold_seconds: 10,
  relax_seconds: 5,
  times_per_day: 2,
  include_reverse_kegel: true,
  kegelType: 'combination',
  restBetweenReps: 5,
  restBetweenSets: 90,
  sessionsPerDay: 2,
  description: `FASE 4 – KOMBINASI LANJUTAN:
Di fase ini kamu akan mengintegrasikan standard kegel, reverse kegel, dan napas diafragma dalam satu sesi yang mulus dan terkontrol. Ini adalah level paling kompleks dalam program.

PROTOKOL SESI PAGI – Standard Volume Tinggi:
1. Duduk tegak dengan punggung tidak bersandar, telapak kaki rata di lantai.
2. Satu tangan di perut, pastikan perut rileks sepanjang latihan.
3. Kencangkan otot PC. Tahan 10 detik sambil bernapas normal. Lepas perlahan 3 detik. Relaks penuh 5 detik.
4. 25 reps × 3 set. Istirahat 60 detik antar set.
5. Setelah setiap set: 3 napas dalam diafragma untuk recovery.

PROTOKOL SESI MALAM – Kombinasi Alternasi:
Dalam 1 set 25 reps, alternasikan:
- Reps 1-5: Standard kegel 10 detik tahan
- Reps 6-8: Reverse kegel (napas dalam + ekspansi lembut)
- Reps 9-13: Standard kegel 10 detik tahan
- Reps 14-16: Reverse kegel
- Reps 17-21: Standard kegel 10 detik tahan
- Reps 22-25: Reverse kegel penutup
× 3 set. Istirahat 90 detik antar set.

QUICK FLICKS – Latihan Tambahan 5 Menit:
Kencangkan dan lepas otot PC secepat mungkin (1 detik tahan, 1 detik lepas). 20 quick flicks berturut-turut, istirahat 30 detik. Ulangi 3 kali. Ini melatih fast-twitch fiber otot pelvic floor untuk respons ereksi yang lebih cepat.

NAPAS DIAFRAGMA – KUNCI FASE 4:
Aturan: JANGAN pernah menahan napas saat melakukan kegel. Inhale = pelvic floor naturally descends. Exhale = natural time to contract. Gunakan pola ini secara konsisten.`,
  progressionNotes: `Siap ke Fase 5 (Maintenance) jika: sudah menyelesaikan 3×25 dengan konsisten selama 6 minggu, koordinasi kombinasi terasa natural, Quick Flicks bisa dilakukan tanpa kehilangan kontrol, dan kamu merasakan perbaikan signifikan dalam fungsi seksual dan kontrol ejakulasi.`,
};

// ─── Fase 5 ───────────────────────────────────────────────────────────
export const phase5Kegel: KegelPlanExtended = {
  id: 5,
  phase_number: 5,
  sets: 2,
  reps: 20,
  hold_seconds: 10,
  relax_seconds: 5,
  times_per_day: 1,
  include_reverse_kegel: true,
  kegelType: 'combination',
  restBetweenReps: 5,
  restBetweenSets: 60,
  sessionsPerDay: 1,
  description: `FASE 5 – MAINTENANCE & INTEGRASI:
Selamat! Kamu telah menyelesaikan fase aktif program kegel. Di fase ini fokusnya bukan lagi pembangunan kekuatan baru, tapi mempertahankan semua yang telah dicapai dengan investasi waktu minimal (1 sesi/hari).

PILIHAN A – Sesi Singkat 10 Menit (Hari Sibuk):
1. 2 set standard kegel × 20 reps × 10 detik tahan, relaks 5 detik.
2. Istirahat 60 detik antar set.
3. Akhiri dengan 5 napas diafragma dalam.

PILIHAN B – Sesi Lengkap 15 Menit (Hari Santai):
1. Set 1: Standard kegel 20 reps × 10 detik.
2. Istirahat 60 detik + 3 napas dalam.
3. Set 2: Kombinasi alternasi (standard 10 reps + reverse 5 reps + standard 5 reps).
4. Bonus: 15 quick flicks × 2 kali.

INTEGRASI KEGEL KE RUTINITAS HARIAN:
- Saat berkendara atau di lampu merah: 10 standard kegel.
- Saat menonton TV: sesi kombinasi 5 menit.
- Saat berdiri mengantre: quick flicks 20 kali.

TANDA KEBERHASILAN FASE 5:
- Kontrol ejakulasi terasa jauh lebih baik dibanding Minggu 1.
- Ereksi lebih kuat dan lebih mudah dipertahankan.
- Kamu bisa melakukan kegel tanpa harus berpikir keras – sudah otomatis.
- Pelvic floor terasa "hidup" – tidak terlalu tegang, tidak terlalu lemah.`,
  progressionNotes: `Setelah program selesai: lanjutkan minimal 3× seminggu seumur hidup. Otot pelvic floor seperti otot lainnya – jika tidak dilatih, melemah kembali. 10 menit 3× seminggu sudah cukup untuk mempertahankan semua hasil yang telah kamu bangun selama 24 minggu.`,
};

// ─── Eksport array & helpers ──────────────────────────────────────────
export const allKegelData: KegelPlanExtended[] = [
  phase1Kegel,
  phase2Kegel,
  phase3Kegel,
  phase4Kegel,
  phase5Kegel,
];

/** Ambil kegel plan berdasarkan nomor fase */
export function getKegelByPhase(phaseNumber: 1 | 2 | 3 | 4 | 5): KegelPlanExtended | undefined {
  return allKegelData.find((k) => k.phase_number === phaseNumber);
}

/** Konversi ke KegelPlan standar (untuk kompatibilitas dengan hooks) */
export function toKegelPlan(extended: KegelPlanExtended): KegelPlan {
  return {
    id: extended.id,
    phase_number: extended.phase_number,
    sets: extended.sets,
    reps: extended.reps,
    hold_seconds: extended.hold_seconds,
    relax_seconds: extended.relax_seconds,
    times_per_day: extended.times_per_day,
    include_reverse_kegel: extended.include_reverse_kegel,
    description: extended.description,
  };
}

/** Hitung total waktu satu sesi kegel dalam detik */
export function calcSessionDurationSeconds(plan: KegelPlanExtended): number {
  const perSet = plan.reps * (plan.hold_seconds + plan.restBetweenReps);
  const totalSets = perSet * plan.sets + plan.restBetweenSets * (plan.sets - 1);
  return totalSets;
}

/** Hitung total waktu satu sesi dalam menit */
export function calcSessionDurationMinutes(plan: KegelPlanExtended): number {
  return Math.ceil(calcSessionDurationSeconds(plan) / 60);
}

/** Alias for backwards compatibility with validate-data.ts */
export { allKegelData as allPhaseKegelData };
