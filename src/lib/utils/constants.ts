import { DayOfWeek, Phase } from '@/lib/types';

export const PHASE_CONFIGS: Phase[] = [
  {
    phase_number: 1,
    name: 'Reset & Adaptasi',
    phase_type: 'foundation',
    week_start: 1,
    week_end: 2,
    daily_calories_min: 750,
    daily_calories_max: 850,
    protein_target_g: 155,
    carb_target_g: 20,
    fat_target_g: 20,
    description: 'PSMF ketat untuk reset metabolik cepat. Fokus membangun ritme makan tinggi protein, menurunkan inflamasi, dan adaptasi pola tidur serta hidrasi.',
    exercise_description: 'Jalan cepat, full body ringan, dan mobilitas untuk membentuk kebiasaan.',
    kegel_description: 'Belajar aktivasi dasar pelvic floor dengan ritme santai.'
  },
  {
    phase_number: 2,
    name: 'Fat Loss Terarah',
    phase_type: 'fat_loss',
    week_start: 3,
    week_end: 6,
    daily_calories_min: 1000,
    daily_calories_max: 1200,
    protein_target_g: 135,
    carb_target_g: 65,
    fat_target_g: 30,
    description: 'Defisit kalori lebih rapi dengan volume makanan tinggi dan pemantauan waist lebih ketat.',
    exercise_description: 'Mulai HIIT ringan 1-2 kali per minggu dan latihan beban dasar.',
    kegel_description: 'Volume kegel naik untuk meningkatkan kontrol dan endurance.'
  },
  {
    phase_number: 3,
    name: 'Conditioning & Momentum',
    phase_type: 'conditioning',
    week_start: 7,
    week_end: 12,
    daily_calories_min: 1500,
    daily_calories_max: 1700,
    protein_target_g: 145,
    carb_target_g: 135,
    fat_target_g: 47,
    description: 'Menjaga momentum turun lemak sambil mendorong performa, recovery, dan konsistensi langkah harian.',
    exercise_description: 'HIIT makin terstruktur, strength 3x seminggu, cardio zone-2 untuk recovery.',
    kegel_description: 'Mulai reverse kegel untuk koordinasi dan relaksasi pelvic floor.'
  },
  {
    phase_number: 4,
    name: 'Strength Rebuild',
    phase_type: 'strength',
    week_start: 13,
    week_end: 18,
    daily_calories_min: 1500,
    daily_calories_max: 1600,
    protein_target_g: 145,
    carb_target_g: 140,
    fat_target_g: 45,
    description: 'Menjaga defisit moderat sambil memprioritaskan progres kekuatan dan komposisi tubuh.',
    exercise_description: 'Latihan upper/lower lebih progresif dan HIIT tetap efisien.',
    kegel_description: 'Latihan kontraksi lebih lama dengan kontrol napas dan reverse kegel.'
  },
  {
    phase_number: 5,
    name: 'Maintenance & Confidence',
    phase_type: 'maintenance',
    week_start: 19,
    week_end: 24,
    daily_calories_min: 2000,
    daily_calories_max: 2200,
    protein_target_g: 135,
    carb_target_g: 225,
    fat_target_g: 60,
    description: 'Transisi ke pola hidup jangka panjang yang lebih stabil, kuat, dan sustainable.',
    exercise_description: 'Strength tetap jadi inti, langkah harian stabil, HIIT secukupnya.',
    kegel_description: 'Volume lebih efisien untuk maintenance dan kualitas kontraksi.'
  }
];

export const NOTIFICATION_TIMES = {
  morningWeight: '06:30',
  breakfast: '07:00',
  lunch: '12:00',
  dinner: '18:30',
  workout: '17:30',
  kegelMorning: '08:00',
  kegelNight: '21:00',
  sleepReminder: '22:30'
};

export const EHS_SCALE: Record<1 | 2 | 3 | 4, string> = {
  1: 'Penis membesar tetapi belum keras.',
  2: 'Keras namun belum cukup untuk penetrasi.',
  3: 'Cukup keras untuk penetrasi tetapi belum sepenuhnya kaku.',
  4: 'Sepenuhnya keras dan kaku.'
};

export const MOTIVATIONAL_QUOTES = [
  'Setiap 5 kg yang turun = lebih banyak progress yang terlihat. Konsistensi adalah kunci.',
  '33% pria obesitas memulihkan fungsi ereksi setelah turun 15 kg — Anda bisa jadi salah satunya.',
  'Testosteron naik sekitar 0.6% untuk setiap 1 kg yang Anda turunkan. Setiap rep, setiap langkah berarti.',
  'MaleUp bukan sprint 7 hari. Ini transformasi 24 minggu yang tenang, terukur, dan nyata.',
  'Perut mengecil bukan hanya soal penampilan — itu membuka ruang untuk energi, hormon, dan kepercayaan diri.',
  'Protein hari ini adalah otot yang Anda selamatkan besok.',
  'Kemenangan besar dibangun dari sarapan yang rapi, air minum yang cukup, dan latihan yang tidak dilewatkan.',
  'Saat motivasi turun, disiplin mengambil alih.',
  'Lemak tubuh turun perlahan, tapi efeknya ke tidur, libido, dan stamina sering terasa lebih cepat.',
  'Jangan kejar sempurna. Kejar done, lalu ulangi besok.',
  'Setiap sesi jalan kaki adalah investasi untuk jantung, testosteron, dan pinggang yang lebih kecil.',
  'Progress pria dewasa jarang dramatis per hari, tapi sangat jelas setelah 12 minggu.',
  'Workout singkat yang dilakukan selalu mengalahkan program sempurna yang ditunda.',
  'Kegel yang benar membantu kontrol, aliran darah, dan kesadaran tubuh.',
  'Anda tidak sedang diet. Anda sedang membangun identitas baru yang lebih kuat.',
  'Meal plan yang sederhana sering lebih efektif daripada menu “sehat” yang terlalu rumit.',
  'Lingkar pinggang yang turun adalah salah satu indikator kesehatan pria paling penting.',
  'Fase sulit hanya sementara. Kebiasaan baik yang terbentuk bisa bertahan lama.',
  'Turun 1 cm di pinggang sering terasa lebih besar dampaknya daripada turun 1 kg di timbangan.',
  'Kalau hari ini berantakan, tutup dengan satu keputusan baik: jalan kaki, air putih, atau tidur lebih cepat.',
  'Tubuh merespons apa yang Anda ulangi, bukan apa yang Anda niatkan.',
  'Semakin sederhana sistem Anda, semakin mudah menang setiap hari.',
  'Bangun ritme. Ritme menciptakan hasil.',
  'Pria yang fit bukan yang paling ekstrem, tapi yang paling konsisten.'
];

export const DAYS_OF_WEEK: DayOfWeek[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
];
