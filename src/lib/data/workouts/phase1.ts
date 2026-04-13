// /src/lib/data/workouts/phase1.ts
// Workout plan data Phase 1 (Minggu 1-2): Recovery & Foundation
// Matching WorkoutPlan & Exercise interfaces dari types/index.ts

import type { WorkoutPlan } from '@/lib/types';

export const phase1WorkoutData: WorkoutPlan[] = [
  {
    id: 101,
    phase_number: 1,
    day_of_week: 'monday',
    workout_type: 'walk',
    duration_minutes: 30,
    description: 'Jalan kaki santai 30 menit untuk membangkitkan metabolisme dan membiasakan tubuh bergerak aktif setiap hari. Fokus pada postur yang baik dan napas teratur.',
    warmup_description: 'Mulai dengan 3 menit berdiri dan mengayunkan lengan lebar-lebar, dilanjutkan rotasi pergelangan kaki dan lutut pelan-pelan.',
    cooldown_description: 'Kurangi kecepatan secara bertahap 5 menit terakhir, akhiri dengan peregangan betis dan paha depan masing-masing 30 detik.',
    exercises: [
      { id: 1001, workout_plan_id: 101, name: 'Pemanasan Jalan Pelan', sets: 1, reps: '5 menit', work_seconds: 300, rest_seconds: 0, order_index: 1, muscle_group: 'Full Body', instructions: 'Jalan dengan kecepatan sangat santai, ayunkan lengan secara alami, napas lewat hidung dan keluar lewat mulut.', tips: 'Ini bukan olahraga keras, fokus pada ritme pernapasan.' },
      { id: 1002, workout_plan_id: 101, name: 'Jalan Kaki Biasa', sets: 1, reps: '20 menit', work_seconds: 1200, rest_seconds: 0, order_index: 2, muscle_group: 'Full Body', instructions: 'Jaga kecepatan stabil, dada tegak, pandangan lurus ke depan. Langkah alami tanpa memaksakan. Target 80-100 langkah per menit.', tips: 'Pilih rute datar. Gunakan sepatu yang nyaman dan supportif.' },
      { id: 1003, workout_plan_id: 101, name: 'Pendinginan + Stretching', sets: 1, reps: '5 menit', work_seconds: 300, rest_seconds: 0, order_index: 3, muscle_group: 'Full Body', instructions: 'Kurangi kecepatan, lanjut dengan peregangan betis, paha depan, dan bahu masing-masing 30 detik.', tips: 'Jangan langsung duduk atau berbaring setelah jalan kaki.' },
    ],
  },
  {
    id: 102,
    phase_number: 1,
    day_of_week: 'tuesday',
    workout_type: 'walk',
    duration_minutes: 30,
    description: 'Variasi jalan kaki dengan sedikit peningkatan tempo untuk melatih sistem kardiovaskular dasar dan mengaktifkan pembakaran lemak.',
    warmup_description: 'Jalan pelan 3 menit, lakukan 10 kali ankle roll kiri dan kanan, 10 arm circle masing-masing arah.',
    cooldown_description: 'Kurangi tempo selama 5 menit terakhir, lanjut peregangan hamstring dan hip flexor berdiri.',
    exercises: [
      { id: 1004, workout_plan_id: 102, name: 'Pemanasan Jalan Pelan', sets: 1, reps: '3 menit', work_seconds: 180, rest_seconds: 0, order_index: 1, muscle_group: 'Full Body', instructions: 'Langkah santai, postur lurus, aktifkan inti tubuh secara ringan.', tips: 'Bernapas secara alami dan rileks.' },
      { id: 1005, workout_plan_id: 102, name: 'Jalan Kaki Cepat', sets: 1, reps: '22 menit', work_seconds: 1320, rest_seconds: 0, order_index: 2, muscle_group: 'Full Body', instructions: 'Tingkatkan kecepatan hingga terasa sedikit ngos-ngosan tapi masih bisa berbicara. Ayunkan lengan lebih aktif dari biasanya.', tips: 'Target 100-110 langkah per menit. Jaga bahu tidak tegang.' },
      { id: 1006, workout_plan_id: 102, name: 'Pendinginan + Peregangan', sets: 1, reps: '5 menit', work_seconds: 300, rest_seconds: 0, order_index: 3, muscle_group: 'Lower Body', instructions: 'Jalan pelan 2 menit, lalu peregangan hamstring berdiri dan hip flexor masing-masing 30 detik per sisi.', tips: 'Tahan peregangan tanpa memantul-mantulkan.' },
    ],
  },
  {
    id: 103,
    phase_number: 1,
    day_of_week: 'wednesday',
    workout_type: 'walk',
    duration_minutes: 30,
    description: 'Sesi midweek – pertahankan konsistensi. Fokus pada postur dan napas, bukan kecepatan. Pilih rute yang sedikit berbeda agar tidak bosan.',
    warmup_description: 'Peregangan leher, bahu, dan pergelangan tangan, dilanjutkan jalan pelan 3 menit.',
    cooldown_description: 'Jalan sangat pelan 5 menit, akhiri dengan peregangan dada dan lengan sambil berdiri.',
    exercises: [
      { id: 1007, workout_plan_id: 103, name: 'Pemanasan Ringan', sets: 1, reps: '3 menit', work_seconds: 180, rest_seconds: 0, order_index: 1, muscle_group: 'Full Body', instructions: 'Jalan lambat sambil memutar bahu dan kepala perlahan untuk melonggarkan otot-otot tubuh atas.', tips: 'Hindari gerakan patah-patah pada leher.' },
      { id: 1008, workout_plan_id: 103, name: 'Jalan Kaki Tempo Sedang', sets: 1, reps: '22 menit', work_seconds: 1320, rest_seconds: 0, order_index: 2, muscle_group: 'Full Body', instructions: 'Kecepatan sedang, lebih cepat dari santai tapi lebih pelan dari jalan cepat. Fokus pada postur tegak dan lengan mengayun.', tips: 'Variasikan rute agar tidak monoton. Nikmati perjalanan.' },
      { id: 1009, workout_plan_id: 103, name: 'Pendinginan', sets: 1, reps: '5 menit', work_seconds: 300, rest_seconds: 0, order_index: 3, muscle_group: 'Upper Body', instructions: 'Jalan pelan, lalu peregangan dada, bahu, dan lengan tricep masing-masing 30 detik.', tips: 'Embuskan napas saat meregangkan otot.' },
    ],
  },
  {
    id: 104,
    phase_number: 1,
    day_of_week: 'thursday',
    workout_type: 'walk',
    duration_minutes: 30,
    description: 'Variasi interval jalan: 2 menit jalan biasa diselingi 1 menit jalan lebih cepat. Pengenalan konsep interval sebelum masuk HIIT fase 2.',
    warmup_description: 'Jalan pelan 3 menit, goyang pinggang dan rotasi torso pelan untuk menghangatkan otot core.',
    cooldown_description: 'Turunkan kecepatan bertahap, akhiri dengan peregangan betis dan quad berdiri.',
    exercises: [
      { id: 1010, workout_plan_id: 104, name: 'Pemanasan', sets: 1, reps: '3 menit', work_seconds: 180, rest_seconds: 0, order_index: 1, muscle_group: 'Full Body', instructions: 'Jalan pelan dan rotasi pinggang perlahan, 5 kali kiri kanan.', tips: 'Hangat-hangat dulu, jangan terburu-buru.' },
      { id: 1011, workout_plan_id: 104, name: 'Jalan Interval Ringan (2:1)', sets: 7, reps: '3 menit per interval', work_seconds: 120, rest_seconds: 60, order_index: 2, muscle_group: 'Full Body', instructions: 'Alternasi 2 menit jalan santai, 1 menit jalan lebih cepat. Ulangi 7 kali. Total 21 menit.', tips: 'Jalan "lebih cepat" bukan lari – cukup tempo yang lebih sigap.' },
      { id: 1012, workout_plan_id: 104, name: 'Pendinginan', sets: 1, reps: '6 menit', work_seconds: 360, rest_seconds: 0, order_index: 3, muscle_group: 'Lower Body', instructions: 'Jalan sangat pelan 3 menit lalu peregangan betis dan quad berdiri, tahan 30 detik per sisi.', tips: 'Pernapasan dalam, rileks sepenuhnya.' },
    ],
  },
  {
    id: 105,
    phase_number: 1,
    day_of_week: 'friday',
    workout_type: 'walk',
    duration_minutes: 30,
    description: 'Akhir minggu kerja – tingkatkan sedikit intensitas untuk menutup 5 hari pertama dengan capaian positif. Jalan cepat dengan postur terbaik.',
    warmup_description: 'Jalan pelan 3 menit, arm swing lebar, hip circle 5 kali per sisi.',
    cooldown_description: 'Jalan santai 5 menit, peregangan seluruh tubuh: hamstring, hip flexor, bahu, dan betis.',
    exercises: [
      { id: 1013, workout_plan_id: 105, name: 'Pemanasan', sets: 1, reps: '3 menit', work_seconds: 180, rest_seconds: 0, order_index: 1, muscle_group: 'Full Body', instructions: 'Jalan ringan sambil ayun lengan lebar dan rotasi pinggul 5 kali per sisi.', tips: 'Siapkan mental untuk jalan lebih cepat dari biasanya.' },
      { id: 1014, workout_plan_id: 105, name: 'Jalan Cepat Power Walking', sets: 1, reps: '22 menit', work_seconds: 1320, rest_seconds: 0, order_index: 2, muscle_group: 'Full Body', instructions: 'Langkah aktif, tumit menyentuh tanah duluan lalu bergulir ke jari kaki. Lengan bengkok 90 derajat dan ayunkan aktif. Perut sedikit dikencangkan.', tips: 'Power walking lebih efektif membakar kalori daripada jalan biasa. Target 110+ langkah/menit.' },
      { id: 1015, workout_plan_id: 105, name: 'Pendinginan Full Body', sets: 1, reps: '5 menit', work_seconds: 300, rest_seconds: 0, order_index: 3, muscle_group: 'Full Body', instructions: 'Kurangi kecepatan, lalu lakukan peregangan hamstring, hip flexor, bahu, dan betis masing-masing 30 detik.', tips: 'Ini hari terakhir minggu aktif, berikan apresiasi pada tubuh dengan pendinginan yang baik.' },
    ],
  },
  {
    id: 106,
    phase_number: 1,
    day_of_week: 'saturday',
    workout_type: 'walk',
    duration_minutes: 30,
    description: 'Sesi weekend – jalan santai di lingkungan yang menyenangkan. Tidak ada target kecepatan, nikmati prosesnya. Waktu untuk recovery aktif.',
    warmup_description: 'Langsung mulai jalan santai, tidak perlu pemanasan khusus.',
    cooldown_description: 'Jalan sangat pelan 5 menit, akhiri dengan stretching ringan sambil berdiri.',
    exercises: [
      { id: 1016, workout_plan_id: 106, name: 'Jalan Santai Pagi/Sore', sets: 1, reps: '25 menit', work_seconds: 1500, rest_seconds: 0, order_index: 1, muscle_group: 'Full Body', instructions: 'Jalan di tempo yang terasa nyaman tanpa memikirkan kecepatan. Boleh sambil menikmati pemandangan atau mendengarkan podcast.', tips: 'Hari ini adalah recovery aktif. Santai tapi tetap bergerak.' },
      { id: 1017, workout_plan_id: 106, name: 'Peregangan Ringan', sets: 1, reps: '5 menit', work_seconds: 300, rest_seconds: 0, order_index: 2, muscle_group: 'Full Body', instructions: 'Peregangan bebas: bagian yang terasa tegang sepanjang minggu – bahu, punggung bawah, betis, atau paha.', tips: 'Ikuti apa yang tubuh butuhkan hari ini.' },
    ],
  },
  {
    id: 107,
    phase_number: 1,
    day_of_week: 'sunday',
    workout_type: 'mobility',
    duration_minutes: 15,
    description: 'Hari istirahat aktif dengan stretching ringan seluruh tubuh. Membantu recovery dan mempersiapkan tubuh untuk minggu berikutnya.',
    warmup_description: 'Napas dalam 5 kali, kemudian jalan di tempat pelan-pelan 2 menit.',
    cooldown_description: 'Akhiri dengan shavasana atau berbaring rileks 2 menit, napas dalam.',
    exercises: [
      { id: 1018, workout_plan_id: 107, name: 'Cat-Cow Stretch', sets: 2, reps: '10 repetisi', work_seconds: null, rest_seconds: 15, order_index: 1, muscle_group: 'Core', instructions: 'Posisi merangkak. Saat tarik napas, cembungkan punggung ke bawah (cow). Saat buang napas, bulatkan punggung ke atas (cat). Gerakan lambat dan terkendali.', tips: 'Sinkronkan napas dengan gerakan untuk relaksasi maksimal.' },
      { id: 1019, workout_plan_id: 107, name: 'Child Pose', sets: 1, reps: '60 detik', work_seconds: 60, rest_seconds: 10, order_index: 2, muscle_group: 'Full Body', instructions: 'Duduk di atas tumit, bentangkan tangan ke depan di lantai, dahi menyentuh lantai. Rasakan regangan di punggung dan bahu.', tips: 'Napas dalam dan biarkan tubuh meleleh ke lantai.' },
      { id: 1020, workout_plan_id: 107, name: 'Seated Hamstring Stretch', sets: 2, reps: '30 detik per sisi', work_seconds: 30, rest_seconds: 10, order_index: 3, muscle_group: 'Lower Body', instructions: 'Duduk di lantai, satu kaki lurus ke depan, satu ditekuk. Condongkan badan ke depan ke arah kaki yang lurus sambil jaga punggung lurus.', tips: 'Jangan memaksa sampai sakit. Cukup terasa penarikan.' },
      { id: 1021, workout_plan_id: 107, name: 'Hip Flexor Stretch', sets: 2, reps: '30 detik per sisi', work_seconds: 30, rest_seconds: 10, order_index: 4, muscle_group: 'Lower Body', instructions: 'Satu lutut di lantai, kaki lain di depan membentuk sudut 90 derajat. Condongkan badan ke depan sedikit hingga terasa regangan di depan paha kaki belakang.', tips: 'Jaga badan tegak, jangan membungkuk.' },
      { id: 1022, workout_plan_id: 107, name: 'Shoulder Cross Body Stretch', sets: 2, reps: '30 detik per sisi', work_seconds: 30, rest_seconds: 10, order_index: 5, muscle_group: 'Upper Body', instructions: 'Tarik satu lengan ke arah dada dengan lengan lain sebagai penahan. Tahan 30 detik, ganti sisi.', tips: 'Rilekskan bahu saat melakukan peregangan ini.' },
    ],
  },
];
