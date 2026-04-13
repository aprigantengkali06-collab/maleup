-- ============================================================
-- 009_seed_workouts_all_phases.sql
-- Seed: workout_plans + exercises untuk semua 5 fase MaleUp
-- Skema mengikuti: supabase/migrations/001_schema.sql
-- ============================================================

DO $$
DECLARE
  wp_id bigint;
BEGIN

-- ============================================================
-- FASE 1 (Minggu 1-2): Recovery & Foundation
-- 6 hari jalan kaki 30 menit + 1 hari mobility
-- ============================================================

-- Fase 1 - Senin: Jalan Kaki Dasar
INSERT INTO workout_plans (phase_number, day_of_week, workout_type, duration_minutes, description, warmup_description, cooldown_description)
VALUES (1, 'monday', 'walk', 30,
  'Jalan kaki santai 30 menit untuk membangkitkan metabolisme dan membiasakan tubuh bergerak aktif setiap hari. Fokus pada postur yang baik dan napas teratur.',
  'Mulai dengan 3 menit berdiri dan mengayunkan lengan lebar-lebar, dilanjutkan rotasi pergelangan kaki dan lutut pelan-pelan.',
  'Kurangi kecepatan secara bertahap 5 menit terakhir, akhiri dengan peregangan betis dan paha depan masing-masing 30 detik.')
RETURNING id INTO wp_id;

INSERT INTO exercises (workout_plan_id, name, sets, reps, work_seconds, rest_seconds, order_index, muscle_group, instructions, tips)
VALUES
(wp_id, 'Pemanasan Jalan Pelan', 1, '5 menit', 300, 0, 1, 'Full Body', 'Jalan dengan kecepatan sangat santai, ayunkan lengan secara alami, napas lewat hidung dan keluar lewat mulut.', 'Ini bukan olahraga keras, fokus pada ritme pernapasan.'),
(wp_id, 'Jalan Kaki Biasa', 1, '20 menit', 1200, 0, 2, 'Full Body', 'Jaga kecepatan stabil, dada tegak, pandangan lurus ke depan. Langkah alami tanpa memaksakan. Target 80-100 langkah per menit.', 'Pilih rute datar. Gunakan sepatu yang nyaman dan supportif.'),
(wp_id, 'Pendinginan Jalan Santai + Stretching', 1, '5 menit', 300, 0, 3, 'Full Body', 'Kurangi kecepatan, lanjut dengan peregangan betis, paha depan, dan bahu masing-masing 30 detik.', 'Jangan langsung duduk atau berbaring setelah jalan kaki.');

-- Fase 1 - Selasa: Jalan Kaki Cepat
INSERT INTO workout_plans (phase_number, day_of_week, workout_type, duration_minutes, description, warmup_description, cooldown_description)
VALUES (1, 'tuesday', 'walk', 30,
  'Variasi jalan kaki dengan sedikit peningkatan tempo untuk melatih sistem kardiovaskular dasar dan mengaktifkan pembakaran lemak.',
  'Jalan pelan 3 menit, lakukan 10 kali ankle roll kiri dan kanan, 10 arm circle masing-masing arah.',
  'Kurangi tempo selama 5 menit terakhir, lanjut peregangan hamstring dan hip flexor berdiri.')
RETURNING id INTO wp_id;

INSERT INTO exercises (workout_plan_id, name, sets, reps, work_seconds, rest_seconds, order_index, muscle_group, instructions, tips)
VALUES
(wp_id, 'Pemanasan Jalan Pelan', 1, '3 menit', 180, 0, 1, 'Full Body', 'Langkah santai, postur lurus, aktifkan inti tubuh secara ringan.', 'Bernapas secara alami dan rileks.'),
(wp_id, 'Jalan Kaki Cepat', 1, '22 menit', 1320, 0, 2, 'Full Body', 'Tingkatkan kecepatan hingga terasa sedikit ngos-ngosan tapi masih bisa berbicara. Ayunkan lengan lebih aktif dari biasanya.', 'Target 100-110 langkah per menit. Jaga bahu tidak tegang.'),
(wp_id, 'Pendinginan + Peregangan', 1, '5 menit', 300, 0, 3, 'Lower Body', 'Jalan pelan 2 menit, lalu peregangan hamstring berdiri dan hip flexor masing-masing 30 detik per sisi.', 'Tahan peregangan tanpa memantul-mantulkan.');

-- Fase 1 - Rabu: Jalan Kaki Biasa
INSERT INTO workout_plans (phase_number, day_of_week, workout_type, duration_minutes, description, warmup_description, cooldown_description)
VALUES (1, 'wednesday', 'walk', 30,
  'Sesi midweek – pertahankan konsistensi. Fokus pada postur dan napas, bukan kecepatan. Pilih rute yang sedikit berbeda agar tidak bosan.',
  'Peregangan leher, bahu, dan pergelangan tangan, dilanjutkan jalan pelan 3 menit.',
  'Jalan sangat pelan 5 menit, akhiri dengan peregangan dada dan lengan sambil berdiri.')
RETURNING id INTO wp_id;

INSERT INTO exercises (workout_plan_id, name, sets, reps, work_seconds, rest_seconds, order_index, muscle_group, instructions, tips)
VALUES
(wp_id, 'Pemanasan Ringan', 1, '3 menit', 180, 0, 1, 'Full Body', 'Jalan lambat sambil memutar bahu dan kepala perlahan untuk melonggarkan otot-otot tubuh atas.', 'Hindari gerakan patah-patah pada leher.'),
(wp_id, 'Jalan Kaki Tempo Sedang', 1, '22 menit', 1320, 0, 2, 'Full Body', 'Kecepatan sedang, lebih cepat dari santai tapi lebih pelan dari jalan cepat. Fokus pada postur tegak dan lengan mengayun.', 'Variasikan rute agar tidak monoton. Nikmati perjalanan.'),
(wp_id, 'Pendinginan', 1, '5 menit', 300, 0, 3, 'Upper Body', 'Jalan pelan, lalu peregangan dada (chest opener), bahu, dan lengan tricep masing-masing 30 detik.', 'Embuskan napas saat meregangkan otot.');

-- Fase 1 - Kamis: Jalan Kaki Interval Ringan
INSERT INTO workout_plans (phase_number, day_of_week, workout_type, duration_minutes, description, warmup_description, cooldown_description)
VALUES (1, 'thursday', 'walk', 30,
  'Variasi interval jalan: 2 menit jalan biasa diselingi 1 menit jalan lebih cepat. Pengenalan konsep interval sebelum masuk HIIT fase 2.',
  'Jalan pelan 3 menit, goyang pinggang dan rotasi torso pelan untuk menghangatkan otot core.',
  'Turunkan kecepatan bertahap, akhiri dengan peregangan betis dan quad berdiri.')
RETURNING id INTO wp_id;

INSERT INTO exercises (workout_plan_id, name, sets, reps, work_seconds, rest_seconds, order_index, muscle_group, instructions, tips)
VALUES
(wp_id, 'Pemanasan', 1, '3 menit', 180, 0, 1, 'Full Body', 'Jalan pelan dan rotasi pinggang perlahan, 5 kali kiri kanan.', 'Hangat-hangat dulu, jangan terburu-buru.'),
(wp_id, 'Jalan Interval Ringan (2:1)', 7, '3 menit per interval', 180, 0, 2, 'Full Body', 'Alternasi 2 menit jalan santai, 1 menit jalan lebih cepat. Ulangi 7 kali. Total 21 menit.', 'Jalan "lebih cepat" bukan lari – cukup tempo yang lebih sigap.'),
(wp_id, 'Pendinginan', 1, '6 menit', 360, 0, 3, 'Lower Body', 'Jalan sangat pelan 3 menit lalu peregangan betis dan quad berdiri, tahan 30 detik per sisi.', 'Pernapasan dalam, rileks sepenuhnya.');

-- Fase 1 - Jumat: Jalan Kaki Cepat
INSERT INTO workout_plans (phase_number, day_of_week, workout_type, duration_minutes, description, warmup_description, cooldown_description)
VALUES (1, 'friday', 'walk', 30,
  'Akhir minggu kerja – tingkatkan sedikit intensitas untuk menutup 5 hari pertama dengan capaian positif. Jalan cepat dengan postur terbaik.',
  'Jalan pelan 3 menit, arm swing lebar, hip circle 5 kali per sisi.',
  'Jalan santai 5 menit, peregangan seluruh tubuh: hamstring, hip flexor, bahu, dan betis.')
RETURNING id INTO wp_id;

INSERT INTO exercises (workout_plan_id, name, sets, reps, work_seconds, rest_seconds, order_index, muscle_group, instructions, tips)
VALUES
(wp_id, 'Pemanasan', 1, '3 menit', 180, 0, 1, 'Full Body', 'Jalan ringan sambil ayun lengan lebar dan rotasi pinggul 5 kali per sisi.', 'Siapkan mental untuk jalan lebih cepat dari biasanya.'),
(wp_id, 'Jalan Cepat Power Walking', 1, '22 menit', 1320, 0, 2, 'Full Body', 'Langkah aktif, tumit menyentuh tanah duluan lalu bergulir ke jari kaki. Lengan bengkok 90 derajat dan ayunkan aktif. Perut sedikit dikencangkan.', 'Power walking lebih efektif membakar kalori daripada jalan biasa. Target 110+ langkah/menit.'),
(wp_id, 'Pendinginan Full Body', 1, '5 menit', 300, 0, 3, 'Full Body', 'Kurangi kecepatan, lalu lakukan peregangan hamstring, hip flexor, bahu, dan betis masing-masing 30 detik.', 'Ini hari terakhir minggu aktif, jadi berikan apresiasi pada tubuh dengan pendinginan yang baik.');

-- Fase 1 - Sabtu: Jalan Kaki Santai
INSERT INTO workout_plans (phase_number, day_of_week, workout_type, duration_minutes, description, warmup_description, cooldown_description)
VALUES (1, 'saturday', 'walk', 30,
  'Sesi weekend – jalan santai di lingkungan yang menyenangkan. Tidak ada target kecepatan, nikmati prosesnya. Waktu untuk recovery aktif.',
  'Langsung mulai jalan santai, tidak perlu pemanasan khusus.',
  'Jalan sangat pelan 5 menit, akhiri dengan stretching ringan sambil berdiri.')
RETURNING id INTO wp_id;

INSERT INTO exercises (workout_plan_id, name, sets, reps, work_seconds, rest_seconds, order_index, muscle_group, instructions, tips)
VALUES
(wp_id, 'Jalan Santai Pagi/Sore', 1, '25 menit', 1500, 0, 1, 'Full Body', 'Jalan di tempo yang terasa nyaman tanpa memikirkan kecepatan. Boleh sambil menikmati pemandangan atau mendengarkan podcast.', 'Hari ini adalah recovery aktif. Santai tapi tetap bergerak.'),
(wp_id, 'Peregangan Ringan', 1, '5 menit', 300, 0, 2, 'Full Body', 'Peregangan bebas: bagian yang terasa tegang sepanjang minggu – bahu, punggung bawah, betis, atau paha.', 'Ikuti apa yang tubuh butuhkan hari ini.');

-- Fase 1 - Minggu: Istirahat Aktif / Mobility
INSERT INTO workout_plans (phase_number, day_of_week, workout_type, duration_minutes, description, warmup_description, cooldown_description)
VALUES (1, 'sunday', 'mobility', 15,
  'Hari istirahat aktif dengan stretching ringan seluruh tubuh. Membantu recovery dan mempersiapkan tubuh untuk minggu berikutnya.',
  'Napas dalam 5 kali, kemudian jalan di tempat pelan-pelan 2 menit.',
  'Akhiri dengan shavasana atau berbaring rileks 2 menit, napas dalam.')
RETURNING id INTO wp_id;

INSERT INTO exercises (workout_plan_id, name, sets, reps, work_seconds, rest_seconds, order_index, muscle_group, instructions, tips)
VALUES
(wp_id, 'Cat-Cow Stretch', 2, '10 repetisi', null, 15, 1, 'Core', 'Posisi merangkak. Saat tarik napas, cembungkan punggung ke bawah (cow). Saat buang napas, bulatkan punggung ke atas (cat). Gerakan lambat dan terkendali.', 'Sinkronkan napas dengan gerakan untuk relaksasi maksimal.'),
(wp_id, 'Child Pose', 1, '60 detik', 60, 10, 2, 'Full Body', 'Duduk di atas tumit, bentangkan tangan ke depan di lantai, dahi menyentuh lantai. Rasakan regangan di punggung dan bahu.', 'Napas dalam dan biarkan tubuh meleleh ke lantai.'),
(wp_id, 'Seated Hamstring Stretch', 2, '30 detik per sisi', 30, 10, 3, 'Lower Body', 'Duduk di lantai, satu kaki lurus ke depan, satu kaki ditekuk. Condongkan badan ke depan ke arah kaki yang lurus sambil jaga punggung lurus.', 'Jangan memaksa sampai sakit. Cukup terasa penarikan.'),
(wp_id, 'Hip Flexor Stretch', 2, '30 detik per sisi', 30, 10, 4, 'Lower Body', 'Satu lutut di lantai, kaki lain di depan membentuk sudut 90 derajat. Condongkan badan ke depan sedikit hingga terasa regangan di depan paha kaki belakang.', 'Jaga badan tegak, jangan membungkuk.'),
(wp_id, 'Shoulder Cross Body Stretch', 2, '30 detik per sisi', 30, 10, 5, 'Upper Body', 'Tarik satu lengan ke arah dada dengan lengan lain sebagai penahan. Tahan 30 detik, ganti sisi.', 'Rilekskan bahu saat melakukan peregangan ini.');

-- ============================================================
-- FASE 2 (Minggu 3-6): HIIT Pemula
-- 3 hari HIIT 20 menit + 3 hari jalan 40 menit + 1 hari mobility
-- ============================================================

-- Fase 2 - Senin: HIIT Pemula
INSERT INTO workout_plans (phase_number, day_of_week, workout_type, duration_minutes, description, warmup_description, cooldown_description)
VALUES (2, 'monday', 'hiit', 20,
  'HIIT pemula – 8 rounds × (20 detik kerja / 40 detik istirahat). Fokus pada gerakan yang benar daripada kecepatan. Pembakaran kalori efisien dalam waktu singkat.',
  'Jalan di tempat 2 menit, high knees pelan 30 detik, arm circle 10 kali per arah, butt kicks 30 detik.',
  'Jalan santai di tempat 2 menit, stretching hamstring, quad, dan bahu masing-masing 30 detik.')
RETURNING id INTO wp_id;

INSERT INTO exercises (workout_plan_id, name, sets, reps, work_seconds, rest_seconds, order_index, muscle_group, instructions, tips)
VALUES
(wp_id, 'Pemanasan', 1, '3 menit', 180, 0, 1, 'Full Body', 'Jalan di tempat 1 menit, high knees pelan 30 detik, arm circle 10 kali setiap arah, butt kicks 30 detik.', 'Jangan langsung masuk kerja keras tanpa pemanasan.'),
(wp_id, 'High Knees', 8, '20 detik', 20, 40, 2, 'Full Body', 'Angkat lutut bergantian setinggi pinggang sambil berlari di tempat. Lengan ikut mengayun sesuai irama. Jaga badan tegak dan core kencang.', 'Mulai dengan kecepatan 70% dulu – tidak perlu maksimal di round pertama.'),
(wp_id, 'Jumping Jacks', 8, '20 detik', 20, 40, 3, 'Full Body', 'Lompat membuka kaki selebar bahu sambil mengangkat kedua tangan ke atas hingga bertemu. Lompat lagi kembali ke posisi awal. Atur napas.', 'Jika lutut sensitif, lakukan versi low-impact: langkah kaki ke samping tanpa lompat.'),
(wp_id, 'Mountain Climbers', 8, '20 detik', 20, 40, 4, 'Core', 'Posisi push up, tarik lutut kanan ke dada secara bergantian dengan lutut kiri dalam tempo cepat. Jaga pinggul tidak terlalu tinggi atau terlalu rendah.', 'Kunci core dan jangan biarkan pinggang turun saat lelah.'),
(wp_id, 'Modifikasi Burpees', 8, '20 detik', 20, 40, 5, 'Full Body', 'Berdiri, condongkan ke depan dan taruh tangan ke lantai, lompat atau jalan kaki ke belakang ke posisi plank, kembali berdiri. Tidak perlu lompat di akhir.', 'Ini versi modifikasi – tidak ada lompatan vertikal. Fokus pada gerakan yang benar.'),
(wp_id, 'Pendinginan', 1, '4 menit', 240, 0, 6, 'Full Body', 'Jalan di tempat 2 menit pelan, lalu stretching hamstring duduk 30 detik, quad berdiri 30 detik per sisi, bahu cross-body 30 detik.', 'Jangan langsung duduk atau berbaring setelah HIIT.');

-- Fase 2 - Selasa: Jalan Kaki 40 menit
INSERT INTO workout_plans (phase_number, day_of_week, workout_type, duration_minutes, description, warmup_description, cooldown_description)
VALUES (2, 'tuesday', 'walk', 40,
  'Recovery aktif setelah HIIT – jalan kaki 40 menit membantu pemulihan otot sambil tetap membakar kalori di zona aerobik rendah.',
  'Langsung mulai jalan pelan selama 3 menit pertama.',
  'Kurangi kecepatan 5 menit terakhir, akhiri dengan peregangan betis dan paha.')
RETURNING id INTO wp_id;

INSERT INTO exercises (workout_plan_id, name, sets, reps, work_seconds, rest_seconds, order_index, muscle_group, instructions, tips)
VALUES
(wp_id, 'Jalan Santai Aktif', 1, '10 menit', 600, 0, 1, 'Full Body', 'Mulai dengan jalan santai, biarkan otot beradaptasi setelah sesi HIIT kemarin.', 'Ini hari recovery – jangan terlalu keras.'),
(wp_id, 'Jalan Tempo Sedang', 1, '25 menit', 1500, 0, 2, 'Full Body', 'Tingkatkan tempo ke kecepatan sedang. Ayun lengan, postur tegak, napas lewat hidung.', 'Zone 2 cardio – masih bisa berbicara kalimat pendek dengan nyaman.'),
(wp_id, 'Jalan Pelan + Stretching', 1, '5 menit', 300, 0, 3, 'Lower Body', 'Kurangi tempo selama 3 menit, lanjutkan peregangan betis berdiri dan fleksi paha 30 detik per sisi.', 'Betis sering kencang setelah jalan jauh – jangan skip stretching ini.');

-- Fase 2 - Rabu: HIIT
INSERT INTO workout_plans (phase_number, day_of_week, workout_type, duration_minutes, description, warmup_description, cooldown_description)
VALUES (2, 'wednesday', 'hiit', 20,
  'HIIT sesi 2 minggu ini dengan variasi gerakan. 8 rounds × (20 detik kerja / 40 detik istirahat). Intensitas sedikit ditingkatkan dari Senin.',
  'Marching 1 menit, hip circle 10 kali per sisi, leg swings 10 kali per sisi, jalan di tempat cepat 30 detik.',
  'Jalan pelan 2 menit, stretching full body: hamstring, hip flexor, dada, bahu.')
RETURNING id INTO wp_id;

INSERT INTO exercises (workout_plan_id, name, sets, reps, work_seconds, rest_seconds, order_index, muscle_group, instructions, tips)
VALUES
(wp_id, 'Pemanasan', 1, '3 menit', 180, 0, 1, 'Full Body', 'Marching di tempat 1 menit, hip circle 10 kali per sisi, leg swings ke depan-belakang 10 kali per sisi.', 'Fokus pada mobilitas pinggul sebelum sesi HIIT.'),
(wp_id, 'Squat Jumps (Modifikasi)', 8, '20 detik', 20, 40, 2, 'Lower Body', 'Squat biasa lalu berdiri dengan cepat dan angkat tumit dari lantai (tidak perlu lompat penuh). Jaga lutut tidak melewati ujung kaki saat squat.', 'Jika ingin lebih intensif, tambahkan lompatan penuh saat berdiri.'),
(wp_id, 'Butt Kicks', 8, '20 detik', 20, 40, 3, 'Lower Body', 'Lari di tempat sambil berusaha menyentuh bokong dengan tumit di setiap langkah. Condongkan sedikit ke depan dan ayunkan lengan.', 'Jaga kecepatan stabil, jangan hanya di awal round.'),
(wp_id, 'Plank to Downward Dog', 8, '20 detik', 20, 40, 4, 'Core', 'Mulai dari posisi plank, angkat pinggul ke atas membentuk segitiga (downward dog), kembali ke plank. Lakukan secara bergantian dalam tempo yang terkendali.', 'Gerakan ini melatih core sekaligus fleksibilitas – bagus untuk pemula.'),
(wp_id, 'Speed Skater', 8, '20 detik', 20, 40, 5, 'Lower Body', 'Lompat ke kanan, kaki kiri menyilang di belakang kaki kanan, tangan kiri menyentuh kaki kanan. Lompat ke kiri. Bergantian seperti atlet speed skate.', 'Jaga keseimbangan – jika perlu kurangi lompatan menjadi langkah lateral saja.'),
(wp_id, 'Pendinginan', 1, '4 menit', 240, 0, 6, 'Full Body', 'Jalan pelan 2 menit, kemudian hamstring stretch 30 detik, hip flexor stretch 30 detik per sisi, chest opener 30 detik.', 'Bernapas dalam dan perlahan saat stretching.');

-- Fase 2 - Kamis: Jalan Kaki 40 menit
INSERT INTO workout_plans (phase_number, day_of_week, workout_type, duration_minutes, description, warmup_description, cooldown_description)
VALUES (2, 'thursday', 'walk', 40,
  'Pemulihan aktif midweek – jalan kaki 40 menit dengan variasi rute atau kemiringan. Tubuh tetap aktif namun diberi waktu recover dari HIIT.',
  'Jalan pelan 3 menit, rotasi bahu dan leher ringan.',
  'Jalan sangat pelan 5 menit, stretching betis dan quad.')
RETURNING id INTO wp_id;

INSERT INTO exercises (workout_plan_id, name, sets, reps, work_seconds, rest_seconds, order_index, muscle_group, instructions, tips)
VALUES
(wp_id, 'Jalan Kaki 40 Menit', 1, '40 menit', 2400, 0, 1, 'Full Body', 'Variasikan jalan santai (10 menit), tempo sedang (20 menit), dan sedikit power walking (10 menit) dalam satu sesi.', 'Coba rute yang ada tanjakan ringan untuk membakar lebih banyak kalori.'),
(wp_id, 'Cool Down Stretch', 1, '5 menit', 300, 0, 2, 'Lower Body', 'Peregangan betis berdiri di tangga atau tembok, quad stretch berdiri, dan hamstring duduk.', 'Tahan tiap posisi 30 detik tanpa memantul.');

-- Fase 2 - Jumat: HIIT
INSERT INTO workout_plans (phase_number, day_of_week, workout_type, duration_minutes, description, warmup_description, cooldown_description)
VALUES (2, 'friday', 'hiit', 20,
  'HIIT penutup minggu – 8 rounds dengan kombinasi gerakan terbaik. Target: tingkatkan intensitas dari sesi sebelumnya jika tubuh sudah siap.',
  'High knees pelan 1 menit, arm circle, lateral shuffle ringan 30 detik per sisi.',
  'Jalan pelan 2 menit, full body stretching: hamstring, hip, bahu, betis.')
RETURNING id INTO wp_id;

INSERT INTO exercises (workout_plan_id, name, sets, reps, work_seconds, rest_seconds, order_index, muscle_group, instructions, tips)
VALUES
(wp_id, 'Pemanasan', 1, '3 menit', 180, 0, 1, 'Full Body', 'High knees pelan 1 menit, arm circle 10 kali per arah, lateral shuffle ringan 30 detik per sisi.', 'Fokus pada mobilitas pinggul dan bahu.'),
(wp_id, 'High Knees', 4, '20 detik', 20, 40, 2, 'Full Body', 'Angkat lutut bergantian setinggi pinggang, kecepatan ditingkatkan dari sesi Senin. Jaga postur tegak dan core aktif.', 'Ini round terakhir minggu ini – berikan yang terbaik.'),
(wp_id, 'Jumping Jacks', 4, '20 detik', 20, 40, 3, 'Full Body', 'Lompat membuka kaki dan angkat tangan. Lakukan lebih cepat dan eksplosif dari biasanya.', 'Jaga napas teratur meski tempo lebih tinggi.'),
(wp_id, 'Mountain Climbers', 4, '20 detik', 20, 40, 4, 'Core', 'Posisi push up, tarik lutut bergantian ke dada secepat mungkin. Core dikunci ketat, pinggul tidak goyang.', 'Ini latihan core sekaligus cardio – double benefit.'),
(wp_id, 'Burpees Modifikasi', 4, '20 detik', 20, 40, 5, 'Full Body', 'Turun ke posisi plank, push up satu kali (opsional), kembali berdiri. Ini modifikasi tanpa lompatan – tetap efektif untuk pemula.', 'Jika sudah mampu, tambahkan lompatan vertikal di akhir setiap burpee.'),
(wp_id, 'Pendinginan', 1, '4 menit', 240, 0, 6, 'Full Body', 'Jalan pelan 2 menit, hamstring stretch, hip flexor, bahu, dan betis masing-masing 30 detik.', 'Apresiasi tubuh atas 3 sesi HIIT yang berhasil diselesaikan minggu ini!');

-- Fase 2 - Sabtu: Jalan Kaki 40 menit
INSERT INTO workout_plans (phase_number, day_of_week, workout_type, duration_minutes, description, warmup_description, cooldown_description)
VALUES (2, 'saturday', 'walk', 40,
  'Sesi weekend – jalan kaki 40 menit dengan tempo nyaman. Recovery sebelum hari istirahat penuh. Boleh ajak teman atau keluarga.',
  'Langsung jalan pelan 3-5 menit sebagai pemanasan.',
  'Jalan sangat pelan 5 menit, peregangan seluruh tubuh bebas.')
RETURNING id INTO wp_id;

INSERT INTO exercises (workout_plan_id, name, sets, reps, work_seconds, rest_seconds, order_index, muscle_group, instructions, tips)
VALUES
(wp_id, 'Jalan Kaki Aktif Weekend', 1, '35 menit', 2100, 0, 1, 'Full Body', 'Jalan di tempo yang menyenangkan. Variasikan antara santai dan sedang sesuai keinginan. Nikmati lingkungan sekitar.', 'Weekend adalah waktu untuk menikmati proses, bukan hanya menyelesaikan target.'),
(wp_id, 'Peregangan Bebas', 1, '5 menit', 300, 0, 2, 'Full Body', 'Regangkan bagian tubuh yang terasa perlu – biasanya betis, paha, dan punggung bawah setelah minggu penuh latihan.', 'Dengarkan tubuh Anda.');

-- Fase 2 - Minggu: Istirahat Aktif
INSERT INTO workout_plans (phase_number, day_of_week, workout_type, duration_minutes, description, warmup_description, cooldown_description)
VALUES (2, 'sunday', 'mobility', 20,
  'Hari penuh istirahat aktif – 15 menit stretching dan mobilitas ringan. Persiapkan tubuh untuk minggu 4-6 yang lebih intensif.',
  'Napas dalam 5 kali, jalan di tempat 2 menit.',
  'Berbaring rileks, napas dalam, shavasana 3 menit.')
RETURNING id INTO wp_id;

INSERT INTO exercises (workout_plan_id, name, sets, reps, work_seconds, rest_seconds, order_index, muscle_group, instructions, tips)
VALUES
(wp_id, 'Cat-Cow Stretch', 2, '10 repetisi', null, 15, 1, 'Core', 'Merangkak di lantai, sinkronkan gerakan punggung cembung-cekung dengan napas. Lambat dan terkendali.', 'Gerakan ini sangat efektif untuk punggung bawah dan core.'),
(wp_id, 'World''s Greatest Stretch', 2, '30 detik per sisi', 30, 10, 2, 'Full Body', 'Langkah besar ke depan (lunge), taruh tangan sisi dalam kaki di lantai, putar badan ke atas dengan lengan terangkat. Tahan 30 detik.', 'Ini peregangan multi-sendi yang sangat efisien untuk seluruh tubuh.'),
(wp_id, 'Figure 4 Hip Stretch', 2, '45 detik per sisi', 45, 10, 3, 'Lower Body', 'Berbaring telentang. Silangkan pergelangan kaki kiri ke lutut kanan, tarik kaki kanan ke dada. Rasakan regangan di glute dan hip luar.', 'Sempurna untuk melepaskan ketegangan setelah banyak berjalan.'),
(wp_id, 'Thread the Needle', 2, '30 detik per sisi', 30, 10, 4, 'Upper Body', 'Posisi merangkak, selipkan satu lengan di bawah tubuh ke arah berlawanan hingga bahu dan telinga menyentuh lantai. Tahan dan ganti sisi.', 'Efektif untuk thoracic spine dan bahu.');

-- ============================================================
-- FASE 3 (Minggu 7-12): HIIT Menengah + Beban
-- 3 hari HIIT 25 menit + 2 hari strength + 1 hari jalan + 1 hari mobility
-- ============================================================

-- Fase 3 - Senin: HIIT Menengah
INSERT INTO workout_plans (phase_number, day_of_week, workout_type, duration_minutes, description, warmup_description, cooldown_description)
VALUES (3, 'monday', 'hiit', 25,
  'HIIT menengah – 10 rounds × (30 detik kerja / 30 detik istirahat). Rasio kerja:istirahat 1:1. Intensitas lebih tinggi dari fase 2.',
  'Jalan cepat di tempat 2 menit, high knees pelan 1 menit, inchworm 3 repetisi, jumping jacks ringan 30 detik.',
  'Jalan pelan 3 menit, stretching hamstring, hip flexor, bahu, dan rotasi torso masing-masing 30 detik.')
RETURNING id INTO wp_id;

INSERT INTO exercises (workout_plan_id, name, sets, reps, work_seconds, rest_seconds, order_index, muscle_group, instructions, tips)
VALUES
(wp_id, 'Pemanasan', 1, '5 menit', 300, 0, 1, 'Full Body', 'Jalan cepat di tempat 2 menit, high knees pelan 1 menit, inchworm walk 3 kali, jumping jacks ringan 30 detik.', 'Fase 3 dimulai – pemanasan yang benar sangat penting untuk mencegah cedera.'),
(wp_id, 'Burpees Penuh', 10, '30 detik', 30, 30, 2, 'Full Body', 'Squat, taruh tangan di lantai, lompat ke posisi plank, push up (opsional), lompat kaki ke arah tangan, lompat vertikal dengan tangan ke atas. Satu gerakan mengalir.', 'Ini burpees penuh – lebih intensif dari modifikasi fase 2. Turunkan tempo jika perlu tapi jangan hentikan gerakan.'),
(wp_id, 'Tuck Jumps', 10, '30 detik', 30, 30, 3, 'Lower Body', 'Lompat setinggi mungkin sambil menarik lutut ke dada di udara. Mendarat dengan lutut sedikit bengkok untuk menyerap benturan.', 'Ini latihan eksplosif – sangat efektif untuk power dan pembakaran kalori.'),
(wp_id, 'Sprint di Tempat', 10, '30 detik', 30, 30, 4, 'Full Body', 'Lari di tempat secepat mungkin dengan angkat kaki tinggi. Pompa lengan secara aktif. Ini adalah sprint – keluarkan energi maksimal 30 detik.', 'Jaga punggung tetap lurus, jangan membungkuk ke depan saat capek.'),
(wp_id, 'Mountain Climbers Cepat', 10, '30 detik', 30, 30, 5, 'Core', 'Posisi push up, alternasikan lutut ke dada secepat mungkin. Bayangkan sedang berlari dalam posisi horizontal. Jaga pinggul setinggi bahu.', 'Ini lebih cepat dari fase 2 – pertahankan bentuk gerakan meski lelah.'),
(wp_id, 'Pendinginan', 1, '5 menit', 300, 0, 6, 'Full Body', 'Jalan pelan 3 menit, hamstring stretch 30 detik, hip flexor 30 detik per sisi, rotasi torso duduk 30 detik per sisi.', 'Pendinginan yang baik mempercepat pemulihan untuk sesi beban esok hari.');

-- Fase 3 - Selasa: Latihan Beban Full Body
INSERT INTO workout_plans (phase_number, day_of_week, workout_type, duration_minutes, description, warmup_description, cooldown_description)
VALUES (3, 'tuesday', 'full_body', 45,
  'Latihan beban full body compound – 5 gerakan utama yang melatih seluruh tubuh. Fokus pada teknik yang benar sebelum menambah beban.',
  'Jalan di tempat 2 menit, arm circle, bodyweight squat 10 kali pelan, push up lutut 5 kali, inchworm 3 kali.',
  'Stretching lengkap: chest opener, lat stretch, quad, hamstring, hip flexor, masing-masing 30-45 detik.')
RETURNING id INTO wp_id;

INSERT INTO exercises (workout_plan_id, name, sets, reps, work_seconds, rest_seconds, order_index, muscle_group, instructions, tips)
VALUES
(wp_id, 'Pemanasan', 1, '5 menit', 300, 0, 1, 'Full Body', 'Jalan di tempat 2 menit, arm circle 10 kali tiap arah, bodyweight squat 10 kali pelan, inchworm walk 3 kali.', 'Aktifkan semua sendi yang akan dipakai dalam latihan ini.'),
(wp_id, 'Push Up', 4, '12', null, 60, 2, 'Upper Body', 'Posisi plank dengan tangan selebar bahu. Turunkan dada ke lantai dengan siku 45 derajat dari badan (bukan 90 derajat). Dorong kembali ke atas dengan eksplosif. Jaga tubuh lurus dari kepala hingga tumit.', 'Jika belum bisa full push up, mulai dari lutut. Prioritaskan range of motion penuh atas beban tinggi.'),
(wp_id, 'Dumbbell Row', 4, '10 per sisi', null, 60, 3, 'Upper Body', 'Satu tangan dan lutut di bangku atau kursi. Tangan lain memegang dumbbell dengan lengan menjuntai. Tarik siku ke atas sejajar badan, peras otot punggung di puncak. Turunkan perlahan.', 'Jangan gunakan momentum badan untuk menarik – isolasi gerakan di punggung.'),
(wp_id, 'Goblet Squat', 4, '12', null, 60, 4, 'Lower Body', 'Pegang dumbbell dengan kedua tangan di depan dada. Kaki selebar bahu. Squat dalam sambil jaga dada tegak dan lutut searah jari kaki. Berdiri kembali dengan mendorong tumit ke lantai.', 'Goblet squat adalah squat terbaik untuk pemula karena beban di depan membantu keseimbangan.'),
(wp_id, 'Lunges', 3, '10 per kaki', null, 60, 5, 'Lower Body', 'Berdiri tegak, langkah besar ke depan dengan satu kaki. Turunkan lutut belakang mendekati lantai. Lutut depan tidak melewati ujung kaki. Dorong balik ke posisi awal.', 'Jaga torso tegak selama gerakan. Alternasi kaki kiri-kanan.'),
(wp_id, 'Plank', 3, '45 detik', 45, 30, 6, 'Core', 'Posisi push up dengan bertumpu pada siku. Siku di bawah bahu, lengan sejajar. Kencangkan perut, bokong, dan paha. Jaga tubuh lurus dari kepala ke tumit seperti papan.', 'Jangan biarkan pinggul naik atau turun. Fokus pada pernapasan yang stabil.'),
(wp_id, 'Dumbbell Press (Shoulder)', 3, '10', null, 60, 7, 'Upper Body', 'Duduk atau berdiri dengan punggung lurus. Pegang dumbbell setinggi bahu, siku bengkok 90 derajat. Dorong ke atas hingga lengan hampir lurus, turunkan perlahan.', 'Jaga core aktif dan punggung tidak melengkung saat menekan ke atas.'),
(wp_id, 'Pendinginan', 1, '5 menit', 300, 0, 8, 'Full Body', 'Chest opener 45 detik, lat stretch 30 detik per sisi, quad stretch 30 detik per sisi, hamstring duduk 45 detik.', 'Otot yang baru dilatih perlu peregangan untuk recovery optimal.');

-- Fase 3 - Rabu: HIIT Menengah
INSERT INTO workout_plans (phase_number, day_of_week, workout_type, duration_minutes, description, warmup_description, cooldown_description)
VALUES (3, 'wednesday', 'hiit', 25,
  'HIIT menengah sesi 2 – variasi gerakan baru untuk mencegah plateau. 10 rounds × (30 detik kerja / 30 detik istirahat).',
  'Lateral shuffle 30 detik, leg swings 10 per sisi, hip circle, jalan cepat di tempat 1 menit.',
  'Jalan santai 3 menit, rotasi torso, hip stretch, dan shoulder stretch.')
RETURNING id INTO wp_id;

INSERT INTO exercises (workout_plan_id, name, sets, reps, work_seconds, rest_seconds, order_index, muscle_group, instructions, tips)
VALUES
(wp_id, 'Pemanasan', 1, '4 menit', 240, 0, 1, 'Full Body', 'Lateral shuffle 30 detik, leg swings ke depan-belakang 10 per sisi, hip circle 10 kali, jalan cepat di tempat 1 menit.', 'Panaskan sendi pinggul dan lutut yang akan banyak dipakai.'),
(wp_id, 'Star Jumps', 10, '30 detik', 30, 30, 2, 'Full Body', 'Lompat dari posisi squat ke bentuk bintang (kaki dan tangan terbuka lebar di udara), kembali ke posisi squat mendarat. Gerakan eksplosif dan penuh.', 'Lebih intens dari jumping jacks biasa. Mendarat dengan lutut sedikit bengkok.'),
(wp_id, 'Burpees Penuh', 10, '30 detik', 30, 30, 3, 'Full Body', 'Squat bawah – plank – push up – kembali – lompat vertikal dengan tangan di atas kepala. Gerakan mengalir tanpa jeda di setiap fase.', 'Target: minimal 5-6 burpees dalam 30 detik dengan teknik yang benar.'),
(wp_id, 'Plank Jacks', 10, '30 detik', 30, 30, 4, 'Core', 'Posisi plank tinggi (tangan lurus), lompat-kan kaki ke samping kiri-kanan bergantian seperti jumping jack dalam posisi plank. Jaga pinggul stabil.', 'Kombinasi core dan cardio yang efektif. Jaga tangan tepat di bawah bahu.'),
(wp_id, 'Reverse Lunges dengan Jump', 10, '30 detik', 30, 30, 5, 'Lower Body', 'Langkah ke belakang dengan satu kaki (reverse lunge), saat kembali berdiri lompat kecil. Alternasi kaki kiri-kanan. Jaga torso tegak.', 'Jika terlalu berat, hilangkan lompatan – jadikan reverse lunge biasa.'),
(wp_id, 'Pendinginan', 1, '5 menit', 300, 0, 6, 'Full Body', 'Jalan santai 3 menit, rotasi torso duduk 30 detik per sisi, pigeon pose 30 detik per sisi jika bisa, shoulder cross-body stretch.', 'Wedge hari ini HIIT lagi – istirahatkan tubuh dengan pendinginan yang lengkap.');

-- Fase 3 - Kamis: Latihan Beban Full Body
INSERT INTO workout_plans (phase_number, day_of_week, workout_type, duration_minutes, description, warmup_description, cooldown_description)
VALUES (3, 'thursday', 'full_body', 45,
  'Sesi beban kedua minggu ini – variasi gerakan untuk melatih otot dari sudut berbeda. Fokus pada kontrol gerakan dan mind-muscle connection.',
  'Band pull-apart 10 kali (atau arm circle), hip hinge bodyweight 10 kali, goblet squat tanpa beban 10 kali.',
  'Foam rolling (jika ada) atau stretching statis lengkap selama 5 menit.')
RETURNING id INTO wp_id;

INSERT INTO exercises (workout_plan_id, name, sets, reps, work_seconds, rest_seconds, order_index, muscle_group, instructions, tips)
VALUES
(wp_id, 'Pemanasan', 1, '5 menit', 300, 0, 1, 'Full Body', 'Arm circle 10 kali tiap arah, hip hinge bodyweight 10 kali, goblet squat tanpa beban 10 kali pelan.', 'Aktifkan pola gerakan hip hinge sebelum deadlift atau RDL.'),
(wp_id, 'Incline Push Up', 4, '12', null, 60, 2, 'Upper Body', 'Taruh tangan di meja atau kursi (sudut lebih mudah dari lantai). Turunkan dada ke arah tepi permukaan, dorong kembali. Variasi ini lebih mudah dari push up lantai tapi masih efektif untuk dada dan trisep.', 'Alternasi dengan push up normal tiap sesi untuk variasi stimulus.'),
(wp_id, 'Dumbbell Goblet Squat', 4, '12', null, 60, 3, 'Lower Body', 'Pegang dumbbell setinggi dada. Kaki selebar bahu atau sedikit lebih lebar. Squat dalam, duduk di antara kaki. Jaga dada tegak dan lutut mengikuti arah jari kaki.', 'Gunakan beban yang membuat set ke-3 dan ke-4 terasa menantang tapi masih bisa diselesaikan dengan teknik baik.'),
(wp_id, 'Dumbbell Romanian Deadlift', 4, '10', null, 75, 4, 'Lower Body', 'Berdiri tegak pegang dumbbell di depan paha. Condongkan badan ke depan dari pinggang (bukan dari punggung), turunkan dumbbell dekat kaki hingga terasa regangan hamstring. Kembali tegak dengan mendorong pinggul ke depan.', 'Ini latihan hip hinge – punggung harus tetap LURUS selama gerakan. Tekuk lutut sedikit saja.'),
(wp_id, 'Dumbbell Bicep Curl', 3, '12', null, 45, 5, 'Upper Body', 'Berdiri atau duduk, pegang dumbbell dengan telapak menghadap ke depan. Angkat dumbbell ke bahu dengan menekuk siku, jangan ayunkan tubuh. Turunkan perlahan.', 'Siku tetap di sisi tubuh. Gerakan hanya di sendi siku.'),
(wp_id, 'Glute Bridge', 4, '15', null, 45, 6, 'Lower Body', 'Berbaring telentang, lutut ditekuk, kaki di lantai. Angkat pinggul setinggi mungkin dengan mengencangkan glute di puncak. Tahan 1 detik di atas, turunkan perlahan.', 'Ini latihan glute terbaik tanpa peralatan. Fokus pada kontraksi glute, bukan punggung bawah.'),
(wp_id, 'Dead Bug', 3, '10 per sisi', null, 45, 7, 'Core', 'Berbaring telentang, angkat tangan lurus ke langit-langit dan lutut 90 derajat. Turunkan lengan kanan dan kaki kiri secara bersamaan mendekati lantai (tidak menyentuh), kembali ke posisi awal. Alternasi.', 'Jaga punggung bawah menempel di lantai sepanjang gerakan. Bernapas secara teratur.'),
(wp_id, 'Pendinginan', 1, '5 menit', 300, 0, 8, 'Full Body', 'Pigeon pose 30 detik per sisi, hamstring stretch berbaring 45 detik per sisi, child pose 60 detik, thoracic rotation 10 kali per sisi.', 'Punggung, paha belakang, dan glute biasanya paling butuh peregangan setelah sesi ini.');

-- Fase 3 - Jumat: HIIT Menengah
INSERT INTO workout_plans (phase_number, day_of_week, workout_type, duration_minutes, description, warmup_description, cooldown_description)
VALUES (3, 'friday', 'hiit', 25,
  'HIIT sesi ketiga minggu ini – ini yang terberat di minggu ini. Kombinasi semua gerakan terbaik. 10 rounds × (30 detik / 30 detik).',
  'Marching cepat 1 menit, inchworm 3 kali, squat jump pelan 5 kali, arm swing besar 1 menit.',
  'Jalan pelan 3 menit, full body stretch: hamstring, hip flexor, dada, punggung, betis.')
RETURNING id INTO wp_id;

INSERT INTO exercises (workout_plan_id, name, sets, reps, work_seconds, rest_seconds, order_index, muscle_group, instructions, tips)
VALUES
(wp_id, 'Pemanasan', 1, '5 menit', 300, 0, 1, 'Full Body', 'Marching cepat 1 menit, inchworm 3 kali, squat jump pelan 5 kali, arm swing besar 1 menit.', 'Ini sesi ketiga – tubuh sudah lebih terbiasa, gunakan itu sebagai keuntungan.'),
(wp_id, 'Burpees Penuh', 5, '30 detik', 30, 30, 2, 'Full Body', 'Full burpee: squat – plank – push up – squat – jump. Kecepatan dan teknik yang benar. Ini gerakan andalan HIIT fase 3.', 'Target 6-8 burpees per 30 detik di sesi ini.'),
(wp_id, 'Tuck Jumps', 5, '30 detik', 30, 30, 3, 'Lower Body', 'Lompat eksplosif, lutut ke dada di udara, mendarat lembut. Langsung lompat lagi tanpa istirahat panjang.', 'Mendarat dengan lutut bengkok untuk lindungi sendi.'),
(wp_id, 'Sprint di Tempat', 5, '30 detik', 30, 30, 4, 'Full Body', 'Berlari di tempat secepat mungkin. Angkat lutut tinggi, pompa lengan keras. 30 detik penuh upaya maksimal.', 'Ini adalah sprint – 100% intensitas.'),
(wp_id, 'Squat Jumps', 5, '30 detik', 30, 30, 5, 'Lower Body', 'Squat dengan kaki selebar bahu, lompat setinggi mungkin, mendarat kembali dalam posisi squat. Kurangi waktu kontak dengan lantai.', 'Power adalah kunci – prioritaskan ketinggian lompatan.'),
(wp_id, 'Pendinginan', 1, '5 menit', 300, 0, 6, 'Full Body', 'Jalan pelan 3 menit, hamstring, hip flexor, chest opener, dan betis masing-masing 30 detik.', 'Selamat – tiga sesi HIIT dan dua sesi beban dalam satu minggu. Luar biasa!');

-- Fase 3 - Sabtu: Jalan Kaki 45 menit
INSERT INTO workout_plans (phase_number, day_of_week, workout_type, duration_minutes, description, warmup_description, cooldown_description)
VALUES (3, 'saturday', 'walk', 45,
  'Active recovery dan Zone 2 cardio – jalan kaki 45 menit membantu tubuh memulihkan diri setelah minggu yang intensif sambil tetap membakar lemak.',
  'Langsung mulai jalan pelan 5 menit pertama.',
  'Jalan pelan 5 menit, peregangan full body bebas.')
RETURNING id INTO wp_id;

INSERT INTO exercises (workout_plan_id, name, sets, reps, work_seconds, rest_seconds, order_index, muscle_group, instructions, tips)
VALUES
(wp_id, 'Jalan Kaki Zone 2', 1, '40 menit', 2400, 0, 1, 'Full Body', 'Jaga kecepatan di zona nyaman – bisa berbicara kalimat penuh namun masih bernapas lebih cepat dari normal. Ini zona pembakaran lemak optimal.', 'Boleh dengarkan podcast atau musik. Pilih rute yang menyenangkan.'),
(wp_id, 'Cool Down & Stretch', 1, '5 menit', 300, 0, 2, 'Full Body', 'Jalan sangat pelan, lanjut peregangan betis, quad, hamstring, dan hip sesuai kebutuhan.', 'Setelah minggu berat, tubuh sangat mengapresiasi peregangan yang baik.');

-- Fase 3 - Minggu: Stretching & Mobility 20 menit
INSERT INTO workout_plans (phase_number, day_of_week, workout_type, duration_minutes, description, warmup_description, cooldown_description)
VALUES (3, 'sunday', 'mobility', 20,
  'Mobility dan stretching 20 menit untuk pemulihan otot dan peningkatan fleksibilitas. Persiapkan tubuh untuk minggu berikutnya.',
  'Napas dalam 5 kali, jalan di tempat 2 menit pelan.',
  'Shavasana 3 menit – berbaring rileks dan napas dalam.')
RETURNING id INTO wp_id;

INSERT INTO exercises (workout_plan_id, name, sets, reps, work_seconds, rest_seconds, order_index, muscle_group, instructions, tips)
VALUES
(wp_id, 'Foam Rolling / Self-massage', 1, '5 menit', 300, 0, 1, 'Full Body', 'Gulirkan berat badan di atas roller (atau bisa gunakan botol minum) di area paha, betis, punggung atas. Tahan di titik yang sakit 30 detik.', 'Jika tidak punya foam roller, gunakan bola tenis atau botol plastik.'),
(wp_id, 'Pigeon Pose', 2, '60 detik per sisi', 60, 10, 2, 'Lower Body', 'Satu kaki ditekuk di depan (seperti duduk menyilang), kaki lain lurus ke belakang. Condongkan badan ke depan hingga terasa regangan dalam di glute dan hip.', 'Ini peregangan terbaik untuk hip flexor dan glute – sangat penting setelah banyak latihan kaki.'),
(wp_id, 'Thoracic Rotation', 2, '10 per sisi', null, 15, 3, 'Core', 'Berbaring miring dengan lutut 90 derajat. Buka lengan atas ke sisi berlawanan, biarkan dada mengikuti. Kepala mengikuti gerakan. Tahan sejenak, kembali.', 'Mobilitas thoracic spine sangat penting untuk performa push dan pull.'),
(wp_id, 'Doorway Chest Stretch', 2, '30 detik per sisi', 30, 10, 4, 'Upper Body', 'Taruh satu lengan di pintu (siku 90 derajat), putar badan ke arah berlawanan hingga terasa regangan di dada dan bahu depan.', 'Setelah banyak push up, dada butuh peregangan seperti ini.'),
(wp_id, 'Deep Squat Hold', 2, '45 detik', 45, 15, 5, 'Lower Body', 'Squat sedalam mungkin dengan kaki selebar bahu atau lebih. Tahan beban dengan tumit di lantai, gunakan siku untuk mendorong lutut ke luar. Ini mobility, bukan strength.', 'Jika tumit terangkat, taruh buku di bawah tumit. Tujuannya mobilitas hip dan pergelangan kaki.');

-- ============================================================
-- FASE 4 (Minggu 13-18): Tabata + Beban Lanjutan
-- 4 hari Tabata (HIIT) + 3 hari beban
-- ============================================================

-- Fase 4 - Senin: Tabata
INSERT INTO workout_plans (phase_number, day_of_week, workout_type, duration_minutes, description, warmup_description, cooldown_description)
VALUES (4, 'monday', 'tabata', 30,
  'Tabata 30 menit – 6 rounds, setiap round berisi 4 exercise × (20 detik max / 10 detik rest). Intensitas tertinggi dalam program ini. Siapkan mental.',
  'Jumping jacks 1 menit, high knees 30 detik, arm circle, hip circle, inchworm 3 kali, sprint di tempat 20 detik.',
  'Jalan pelan 5 menit, full body stretch lengkap selama 5 menit.')
RETURNING id INTO wp_id;

INSERT INTO exercises (workout_plan_id, name, sets, reps, work_seconds, rest_seconds, order_index, muscle_group, instructions, tips)
VALUES
(wp_id, 'Pemanasan Dinamis', 1, '5 menit', 300, 0, 1, 'Full Body', 'Jumping jacks 1 menit, high knees 30 detik, arm circle besar, hip circle, inchworm 3 kali, sprint di tempat 20 detik.', 'Tabata membutuhkan pemanasan yang benar-benar thorough.'),
(wp_id, 'Tabata: Burpees', 6, '20 detik MAX / 10 detik rest', 20, 10, 2, 'Full Body', 'Full burpees dengan intensitas maksimal selama 20 detik, istirahat 10 detik. Ulangi 6 rounds. Tidak ada kompromi intensitas – ini Tabata.', 'Tabata Giichi Tabata terbukti lebih efektif dari 60 menit cardio biasa untuk VO2max. Berikan segalanya.'),
(wp_id, 'Tabata: Mountain Climbers', 6, '20 detik MAX / 10 detik rest', 20, 10, 3, 'Core', 'Mountain climbers secepat mungkin selama 20 detik, istirahat 10 detik. 6 rounds. Jaga pinggul stabil meski bergerak sangat cepat.', 'Pernapasan ritmikal: embuskan saat lutut masuk ke dada.'),
(wp_id, 'Tabata: Squat Jumps', 6, '20 detik MAX / 10 detik rest', 20, 10, 4, 'Lower Body', 'Squat ke posisi rendah, lompat eksplosif setinggi mungkin, mendarat lembut kembali ke squat. 20 detik non-stop, 10 detik istirahat. 6 rounds.', 'Mendarat dengan lutut bengkok untuk absorb benturan. Kualitas landing sama pentingnya dengan ketinggian lompatan.'),
(wp_id, 'Tabata: Push Ups', 6, '20 detik MAX / 10 detik rest', 20, 10, 5, 'Upper Body', 'Push up secepat mungkin selama 20 detik. Jika tidak bisa full push up, turunkan ke lutut saat tubuh mulai gagal. 10 detik istirahat, ulangi 6 rounds.', 'Kualitas lebih dari kuantitas – lebih baik push up di lutut dengan benar daripada full push up dengan form buruk.'),
(wp_id, 'Pendinginan', 1, '5 menit', 300, 0, 6, 'Full Body', 'Jalan pelan 5 menit, kemudian stretch dada, bahu, quad, hamstring, hip, dan betis masing-masing 30 detik.', 'Tubuh baru saja bekerja sangat keras – berikan pendinginan yang layak.');

-- Fase 4 - Selasa: Upper Body Strength
INSERT INTO workout_plans (phase_number, day_of_week, workout_type, duration_minutes, description, warmup_description, cooldown_description)
VALUES (4, 'tuesday', 'strength_upper', 50,
  'Latihan upper body fokus – push dan pull dengan volume lebih tinggi dari fase 3. Ini sesi hypertrophy pertama untuk tubuh bagian atas.',
  'Band pull-apart 15 kali, push up lambat 5 kali, arm circle 15 kali per arah, wall slide 10 kali.',
  'Chest doorway stretch 45 detik, lat overhead stretch 45 detik, tricep stretch 30 detik per sisi.')
RETURNING id INTO wp_id;

INSERT INTO exercises (workout_plan_id, name, sets, reps, work_seconds, rest_seconds, order_index, muscle_group, instructions, tips)
VALUES
(wp_id, 'Pemanasan', 1, '5 menit', 300, 0, 1, 'Upper Body', 'Push up lambat 5 kali, arm circle 15 kali per arah, wall slide 10 kali (berdiri di tembok, gerakkan lengan ke atas).', 'Aktifkan rotator cuff dan scapular stabilizers sebelum pressing.'),
(wp_id, 'Push Up', 4, '15', null, 75, 2, 'Upper Body', 'Full push up dengan tempo 2 detik turun, 1 detik di bawah, eksplosif naik. Volume lebih tinggi dari fase 3. Jika tidak bisa 15, turunkan ke lutut untuk reps terakhir.', 'Target: semua 4 set selesai 15 reps. Jika mudah, gunakan elevated feet (kaki di kursi).'),
(wp_id, 'Dumbbell Chest Press (di lantai)', 4, '12', null, 75, 3, 'Upper Body', 'Berbaring di lantai, dumbbell di samping dada dengan siku 45 derajat. Dorong ke atas hingga lengan hampir lurus. Turunkan perlahan sampai siku menyentuh lantai. Ini floor press – aman untuk bahu.', 'Floor press membatasi range of motion, sehingga lebih aman untuk bahu pemula.'),
(wp_id, 'Dumbbell Row', 4, '12 per sisi', null, 60, 4, 'Upper Body', 'Teknik sama seperti fase 3. Tingkatkan beban jika 12 reps terasa terlalu mudah di set ke-4. Fokus pada peras di puncak gerakan.', 'Volume naik dari fase 3 – ini stimulus baru untuk pertumbuhan otot punggung.'),
(wp_id, 'Pike Push Up', 3, '10', null, 60, 5, 'Upper Body', 'Posisi downward dog (panggul tinggi). Tekuk siku dan turunkan kepala ke arah lantai antara tangan. Dorong kembali ke atas. Ini melatih bahu seperti overhead press.', 'Jika terlalu mudah, naikkan kaki di kursi untuk membuat lebih vertikal.'),
(wp_id, 'Dumbbell Bicep Curl', 3, '12', null, 45, 6, 'Upper Body', 'Berdiri atau duduk, curl dumbbell secara alternasi atau bersamaan. Supinasi (putar telapak ke atas) di puncak untuk peak contraction.', 'Kontrol fase eksentrik (turun) – jangan biarkan jatuh bebas.'),
(wp_id, 'Tricep Dips', 3, '10', null, 45, 7, 'Upper Body', 'Gunakan kursi atau permukaan stabil di belakang. Tangan di tepi kursi, kaki lurus ke depan. Tekuk siku hingga 90 derajat, dorong kembali.', 'Jaga siku menunjuk ke belakang, bukan ke samping.'),
(wp_id, 'Pendinginan', 1, '5 menit', 300, 0, 8, 'Upper Body', 'Chest stretch di pintu 45 detik, lat stretch dengan tangan di pintu 45 detik, tricep overhead stretch 30 detik per sisi.', 'Upper body sering diabaikan saat stretching – jangan skip ini.');

-- Fase 4 - Rabu: Tabata
INSERT INTO workout_plans (phase_number, day_of_week, workout_type, duration_minutes, description, warmup_description, cooldown_description)
VALUES (4, 'wednesday', 'tabata', 30,
  'Tabata sesi 2 – variasi gerakan baru untuk mencegah adaptasi. 6 rounds, 4 exercise per round.',
  'High knees 1 menit, lateral shuffle 30 detik, leg swings, hip opener, inchworm 3 kali.',
  'Jalan pelan 4 menit, hip stretch, hamstring, dan bahu masing-masing 30 detik.')
RETURNING id INTO wp_id;

INSERT INTO exercises (workout_plan_id, name, sets, reps, work_seconds, rest_seconds, order_index, muscle_group, instructions, tips)
VALUES
(wp_id, 'Pemanasan', 1, '5 menit', 300, 0, 1, 'Full Body', 'High knees 1 menit, lateral shuffle 30 detik, leg swings 10 per sisi, hip opener, inchworm 3 kali.', 'Sesi tabata kedua – variasi gerakan, sama intensnya.'),
(wp_id, 'Tabata: High Knees', 6, '20 detik MAX / 10 detik rest', 20, 10, 2, 'Full Body', 'Angkat lutut ke pinggang secepat mungkin, pompa lengan aktif. Maksimal 20 detik, istirahat 10 detik. 6 rounds.', 'Bayangkan berlari sprint di atas treadmill – itu intensitasnya.'),
(wp_id, 'Tabata: Plank Jacks', 6, '20 detik MAX / 10 detik rest', 20, 10, 3, 'Core', 'Posisi plank tinggi, lompat kaki ke samping dan kembali secepat mungkin. Pinggul stabil. 20/10. 6 rounds.', 'Core harus aktif sepanjang waktu – jangan biarkan pinggang turun.'),
(wp_id, 'Tabata: Lateral Jumps', 6, '20 detik MAX / 10 detik rest', 20, 10, 4, 'Lower Body', 'Lompat ke kanan dan ke kiri melompati garis imajiner, mendarat lembut dengan satu atau dua kaki. Cepat dan eksplosif. 6 rounds.', 'Latihan agility dan power lateral – beda dari squat jump yang vertikal.'),
(wp_id, 'Tabata: Tuck Jumps', 6, '20 detik MAX / 10 detik rest', 20, 10, 5, 'Full Body', 'Lompat dan bawa lutut ke dada di udara. Mendarat lembut, langsung lompat lagi. Minimal waktu di lantai.', 'Ini latihan paling melelahkan tapi juga paling efektif untuk power dan kardio.'),
(wp_id, 'Pendinginan', 1, '5 menit', 300, 0, 6, 'Full Body', 'Jalan pelan 4 menit, pigeon pose 30 detik per sisi, hamstring 30 detik, bahu 30 detik.', 'Istirahatkan sistem kardiovaskular secara bertahap.');

-- Fase 4 - Kamis: Lower Body Strength
INSERT INTO workout_plans (phase_number, day_of_week, workout_type, duration_minutes, description, warmup_description, cooldown_description)
VALUES (4, 'thursday', 'strength_lower', 50,
  'Lower body fokus – squat, lunges, hip hinge, dan calf. Volume dan intensitas lebih tinggi dari fase 3 untuk stimulus hypertrophy kaki.',
  'Leg swings 10 kali per arah per sisi, hip circle, bodyweight squat 15 kali pelan, glute bridge 10 kali.',
  'Pigeon pose 60 detik per sisi, hamstring stretch 45 detik, calf stretch di tembok 30 detik per sisi.')
RETURNING id INTO wp_id;

INSERT INTO exercises (workout_plan_id, name, sets, reps, work_seconds, rest_seconds, order_index, muscle_group, instructions, tips)
VALUES
(wp_id, 'Pemanasan', 1, '5 menit', 300, 0, 1, 'Lower Body', 'Leg swings depan-belakang dan lateral 10 kali per sisi, hip circle, bodyweight squat 15 kali, glute bridge 10 kali.', 'Aktifkan glute, quad, dan hamstring sebelum latihan berat.'),
(wp_id, 'Goblet Squat', 4, '15', null, 75, 2, 'Lower Body', 'Pegang dumbbell berat di dada. Squat dalam – paha sejajar lantai atau lebih dalam jika bisa. Berdiri dengan mendorong seluruh permukaan kaki ke lantai.', 'Volume naik ke 15 reps. Gunakan beban yang membuat set 4 terasa berat tapi bisa diselesaikan.'),
(wp_id, 'Reverse Lunges', 4, '12 per kaki', null, 75, 3, 'Lower Body', 'Langkah mundur, lutut belakang turun mendekati lantai, torso tegak. Dorong kembali ke posisi awal. Alternasi kaki atau lakukan satu kaki dulu.', 'Reverse lunges lebih aman untuk lutut daripada forward lunges karena lebih sedikit shear force.'),
(wp_id, 'Calf Raise', 4, '20', null, 45, 4, 'Lower Body', 'Berdiri di tepi tangga atau lantai datar. Angkat tumit setinggi mungkin, tahan 1 detik di puncak, turunkan perlahan. Gunakan satu kaki untuk intensitas lebih.', 'Betis perlu volume tinggi untuk bertumbuh. 20 reps per set adalah minimum.'),
(wp_id, 'Glute Bridge (Single Leg)', 4, '15 per sisi', null, 60, 5, 'Lower Body', 'Berbaring telentang, satu kaki lurus ke atas, kaki lain di lantai. Angkat pinggul dengan satu kaki, kencangkan glute di puncak. Ini lebih sulit dari glute bridge biasa.', 'Jika terlalu sulit, kembali ke glute bridge biasa dan tambahkan dumbbell di pinggul.'),
(wp_id, 'Wall Sit', 3, '45 detik', 45, 60, 6, 'Lower Body', 'Berdiri membelakangi tembok, geser ke bawah hingga lutut 90 derajat. Punggung menempel tembok. Tahan posisi ini selama 45 detik. Jaga lutut tidak melewati ujung kaki.', 'Wall sit adalah isometric exercise yang sangat efektif untuk quad dan daya tahan mental.'),
(wp_id, 'Pendinginan', 1, '5 menit', 300, 0, 7, 'Lower Body', 'Pigeon pose 60 detik per sisi, hamstring stretch berbaring 45 detik per sisi, calf stretch di tembok 30 detik per sisi.', 'Kaki adalah grup otot terbesar – berikan peregangan yang thorough.');

-- Fase 4 - Jumat: Tabata
INSERT INTO workout_plans (phase_number, day_of_week, workout_type, duration_minutes, description, warmup_description, cooldown_description)
VALUES (4, 'friday', 'tabata', 30,
  'Tabata sesi 3 – penutup minggu latihan yang berat. Berikan semua yang tersisa. 6 rounds kombinasi gerakan favorit.',
  'Jumping jacks 1 menit, marching tinggi 1 menit, arm swing, inchworm.',
  'Jalan pelan 5 menit, full body stretching lengkap.')
RETURNING id INTO wp_id;

INSERT INTO exercises (workout_plan_id, name, sets, reps, work_seconds, rest_seconds, order_index, muscle_group, instructions, tips)
VALUES
(wp_id, 'Pemanasan', 1, '5 menit', 300, 0, 1, 'Full Body', 'Jumping jacks 1 menit, marching tinggi 1 menit, arm swing besar, inchworm 3 kali.', 'Ini hari Jumat – berikan yang terbaik untuk mengakhiri minggu dengan kuat.'),
(wp_id, 'Tabata: Burpees', 6, '20 detik MAX / 10 detik rest', 20, 10, 2, 'Full Body', 'Full burpees intensitas maksimal. 6 rounds non-stop kecuali saat 10 detik istirahat.', 'Selalu ada burpees di hari Jumat – ini latihan andalan.'),
(wp_id, 'Tabata: Squat Jumps', 6, '20 detik MAX / 10 detik rest', 20, 10, 3, 'Lower Body', 'Squat jumps eksplosif. Setelah lower body hari Kamis, ini akan terasa berat – itulah tantangannya.', 'Adaptasi terjadi saat kita mendorong batas kemampuan.'),
(wp_id, 'Tabata: Push Ups', 6, '20 detik MAX / 10 detik rest', 20, 10, 4, 'Upper Body', 'Push ups secepat dan sebanyak mungkin dalam 20 detik. Turun ke lutut saat perlu.', 'Setelah upper body hari Selasa, kekuatan push up seharusnya meningkat.'),
(wp_id, 'Tabata: High Knees', 6, '20 detik MAX / 10 detik rest', 20, 10, 5, 'Full Body', 'Sprint di tempat dengan lutut tinggi. Ini cardio finisher terbaik – keluarkan semua sisa energi.', 'Ini gerakan terakhir sebelum pendinginan – habiskan semua yang ada!'),
(wp_id, 'Pendinginan Total', 1, '5 menit', 300, 0, 6, 'Full Body', 'Jalan pelan 5 menit, kemudian hamstring, hip flexor, chest, lat, quad, betis – masing-masing 30 detik.', 'Penghargaan untuk tubuh setelah minggu yang luar biasa berat.');

-- Fase 4 - Sabtu: Full Body Strength
INSERT INTO workout_plans (phase_number, day_of_week, workout_type, duration_minutes, description, warmup_description, cooldown_description)
VALUES (4, 'saturday', 'full_body', 50,
  'Full body compound akhir minggu – combinasi deadlift, push, pull, dan squat. Volume moderat untuk recovery sebelum Minggu.',
  'Cat-cow 10 kali, hip hinge bodyweight 10 kali, arm circle, goblet squat tanpa beban 10 kali.',
  'Child pose 60 detik, thoracic rotation 10 per sisi, hamstring dan hip flexor stretch.')
RETURNING id INTO wp_id;

INSERT INTO exercises (workout_plan_id, name, sets, reps, work_seconds, rest_seconds, order_index, muscle_group, instructions, tips)
VALUES
(wp_id, 'Pemanasan', 1, '5 menit', 300, 0, 1, 'Full Body', 'Cat-cow 10 kali, hip hinge bodyweight 10 kali, goblet squat tanpa beban 10 kali pelan, arm circle.', 'Aktifkan pola hip hinge sebelum deadlift.'),
(wp_id, 'Romanian Deadlift', 4, '10', null, 90, 2, 'Lower Body', 'Dumbbell di depan paha, hip hinge ke depan dengan punggung lurus, turunkan beban mendekati lantai, kembali tegak dengan mendorong pinggul ke depan. Ini raja latihan posterior chain.', 'Punggung HARUS lurus – jangan biarkan membulat. Rasakan hamstring teregang di bawah.'),
(wp_id, 'Push Up', 3, '15', null, 75, 3, 'Upper Body', 'Full push up dengan kecepatan terkontrol. Set 3 yang harus dicapai 15 reps – jika belum bisa, turunkan ke lutut untuk sisa reps.', 'Ini latihan integratif – dada, bahu, trisep, dan core sekaligus.'),
(wp_id, 'Dumbbell Row', 3, '12 per sisi', null, 75, 4, 'Upper Body', 'One arm dumbbell row – fokus pada tarikan dari siku, peras di puncak. Variasi: lakukan dengan badan horizontal di meja untuk lebih isolasi.', 'Keseimbangan push dan pull penting untuk postur dan kesehatan bahu.'),
(wp_id, 'Goblet Squat', 3, '15', null, 75, 5, 'Lower Body', 'Pegang dumbbell di dada, squat dalam. Volume sedikit lebih rendah dari Kamis karena ini full body – tapi tetap challengin.', 'Teknik lebih penting dari beban. Kualitas setiap rep.'),
(wp_id, 'Plank', 3, '60 detik', 60, 60, 6, 'Core', 'Plank siku dengan durasi 60 detik – peningkatan dari 45 detik fase 3. Jaga tubuh lurus dari kepala ke tumit, bernapas secara teratur.', 'Bayangkan tubuh adalah papan yang tidak bisa ditekuk.'),
(wp_id, 'Pendinginan', 1, '5 menit', 300, 0, 7, 'Full Body', 'Child pose 60 detik, thoracic rotation berbaring 10 per sisi, hamstring stretch dan hip flexor masing-masing 30 detik per sisi.', 'Full body workout membutuhkan pendinginan yang full body juga.');

-- Fase 4 - Minggu: Tabata
INSERT INTO workout_plans (phase_number, day_of_week, workout_type, duration_minutes, description, warmup_description, cooldown_description)
VALUES (4, 'sunday', 'tabata', 30,
  'Tabata Minggu – sesi ke-4 dalam seminggu. Intensitas lebih rendah dari Senin/Rabu/Jumat karena setelah sesi beban Sabtu. 4 rounds recovery tabata.',
  'Jalan di tempat 2 menit, arm swing, hip circle, leg swings.',
  'Jalan santai 5 menit, full body stretching dan relaksasi.')
RETURNING id INTO wp_id;

INSERT INTO exercises (workout_plan_id, name, sets, reps, work_seconds, rest_seconds, order_index, muscle_group, instructions, tips)
VALUES
(wp_id, 'Pemanasan Ringan', 1, '5 menit', 300, 0, 1, 'Full Body', 'Jalan di tempat 2 menit, arm swing, hip circle 10 kali per sisi, leg swings 10 kali per sisi.', 'Ini tabata ringan setelah sesi beban Sabtu – jangan terlalu keras.'),
(wp_id, 'Tabata: Jumping Jacks', 4, '20 detik / 10 detik rest', 20, 10, 2, 'Full Body', 'Jumping jacks standar, intensitas moderat. 4 rounds saja. Ini lebih sebagai cardio dan mobility daripada max effort.', 'Hari Minggu adalah waktu recovery tabata – pertahankan intensitas tapi jangan hancurkan tubuh.'),
(wp_id, 'Tabata: Mountain Climbers', 4, '20 detik / 10 detik rest', 20, 10, 3, 'Core', 'Mountain climbers dengan kecepatan moderat. Fokus pada teknik dan pernapasan. 4 rounds.', 'Core tetap dilatih meski ini sesi recovery.'),
(wp_id, 'Tabata: Bodyweight Squats', 4, '20 detik / 10 detik rest', 20, 10, 4, 'Lower Body', 'Squat tanpa beban, kecepatan terkontrol. Ini membantu flush metabolic waste dari otot kaki yang baru dilatih kemarin.', 'Active recovery untuk kaki – gerakkan darah, jangan stres otot.'),
(wp_id, 'Tabata: High Knees (Moderat)', 4, '20 detik / 10 detik rest', 20, 10, 5, 'Full Body', 'High knees di intensitas 70% – tidak perlu maksimal. Jaga napas dan nikmati gerakan.', 'Selesaikan minggu dengan rasa pencapaian, bukan kelelahan total.'),
(wp_id, 'Pendinginan + Relaksasi', 1, '8 menit', 480, 0, 6, 'Full Body', 'Jalan santai 4 menit, kemudian stretching bebas seluruh tubuh selama 4 menit. Bernapas dalam dan rilekskan semua otot.', 'Selamat telah menyelesaikan minggu fase 4. Recovery yang baik = pertumbuhan yang baik.');

-- ============================================================
-- FASE 5 (Minggu 19-24): Hypertrophy + Maintenance
-- 4 hari hypertrophy strength + 2 hari HIIT ringan + 1 hari mobility
-- ============================================================

-- Fase 5 - Senin: Push (Upper Hypertrophy)
INSERT INTO workout_plans (phase_number, day_of_week, workout_type, duration_minutes, description, warmup_description, cooldown_description)
VALUES (5, 'monday', 'strength_upper', 55,
  'Push day – latihan mendorong untuk dada, bahu, dan trisep. Volume hypertrophy: 3-4 set × 8-12 reps dengan beban yang menantang.',
  'Band pull-apart 15 kali, push up pelan 8 kali, shoulder rotation, wall slide 10 kali.',
  'Chest doorway stretch 60 detik, tricep stretch 30 detik per sisi, shoulder cross-body 30 detik.')
RETURNING id INTO wp_id;

INSERT INTO exercises (workout_plan_id, name, sets, reps, work_seconds, rest_seconds, order_index, muscle_group, instructions, tips)
VALUES
(wp_id, 'Pemanasan', 1, '5 menit', 300, 0, 1, 'Upper Body', 'Band pull-apart 15 kali, push up pelan 8 kali, shoulder rotation 10 kali per arah, wall slide 10 kali.', 'Aktifkan rotator cuff dan scapular muscles sebelum heavy pressing.'),
(wp_id, 'Push Up (Weighted / Elevated)', 4, '10', null, 90, 2, 'Upper Body', 'Jika bisa, gunakan beban di punggung (tas berisi buku). Atau naikkan kaki di kursi untuk lebih menyasar dada atas. 4 set × 10 reps berat.', 'Fase 5 adalah hypertrophy – gunakan beban yang membuat reps 8-10 terasa benar-benar berat.'),
(wp_id, 'Dumbbell Floor Press', 4, '10', null, 90, 3, 'Upper Body', 'Berbaring di lantai dengan dumbbell berat. Dorong ke atas, turunkan perlahan sampai siku menyentuh lantai. Kontrol total.', 'Tempo: 1 detik dorong, 3 detik turun. Fase eksentrik lambat = lebih banyak stimulus.'),
(wp_id, 'Incline Push Up (Feet Elevated)', 3, '12', null, 75, 4, 'Upper Body', 'Naikkan kaki di kursi, tangan di lantai. Ini menargetkan dada atas (upper chest) seperti incline press di gym.', 'Upper chest sering kurang terlatih – gerakan ini penting untuk proporsi yang baik.'),
(wp_id, 'Lateral Raise', 3, '15', null, 60, 5, 'Upper Body', 'Berdiri dengan dumbbell ringan di sisi tubuh. Angkat ke samping hingga sejajar bahu, turunkan perlahan. Siku sedikit bengkok. Jangan ayunkan tubuh.', 'Gunakan beban yang ringan – otot bahu lateral kecil dan mudah diinjury.'),
(wp_id, 'Tricep Dips', 3, '12', null, 60, 6, 'Upper Body', 'Di kursi atau bangku. Siku menunjuk ke belakang, turunkan badan hingga siku 90 derajat, dorong kembali. Kaki lebih lurus = lebih sulit.', 'Trisep adalah 2/3 dari ukuran lengan atas – jangan abaikan.'),
(wp_id, 'Pike Push Up', 3, '10', null, 60, 7, 'Upper Body', 'Posisi V terbalik (panggul tinggi). Tekuk siku dan turunkan kepala di antara tangan, dorong kembali. Ini pengganti overhead press.', 'Semakin vertikal posisi tubuh, semakin banyak bahu yang bekerja dan semakin sedikit dada.'),
(wp_id, 'Pendinginan', 1, '5 menit', 300, 0, 8, 'Upper Body', 'Chest stretch di pintu 60 detik, tricep overhead stretch 30 detik per sisi, shoulder cross-body 30 detik, wrist stretch 30 detik.', 'Push day yang berat – dada, bahu, dan trisep butuh peregangan thorough.');

-- Fase 5 - Selasa: Pull (Upper Hypertrophy)
INSERT INTO workout_plans (phase_number, day_of_week, workout_type, duration_minutes, description, warmup_description, cooldown_description)
VALUES (5, 'tuesday', 'strength_upper', 55,
  'Pull day – latihan menarik untuk punggung dan bisep. Keseimbangan dengan Push hari Senin. Fokus pada mind-muscle connection ke punggung.',
  'Cat-cow 10 kali, arm circle 15 kali per arah, band pull-apart 15 kali (atau towel pull-apart).',
  'Lat stretch with arm overhead 45 detik per sisi, thoracic rotation 10 per sisi, bicep stretch 30 detik per sisi.')
RETURNING id INTO wp_id;

INSERT INTO exercises (workout_plan_id, name, sets, reps, work_seconds, rest_seconds, order_index, muscle_group, instructions, tips)
VALUES
(wp_id, 'Pemanasan', 1, '5 menit', 300, 0, 1, 'Upper Body', 'Cat-cow 10 kali, arm circle 15 kali tiap arah, band pull-apart 15 kali atau towel pull-apart.', 'Aktifkan rhomboid dan mid-trap sebelum rowing.'),
(wp_id, 'Pull Up / Australian Pull Up', 4, '10', null, 90, 2, 'Upper Body', 'Jika ada pull up bar: pull up penuh atau partial. Jika tidak ada: Australian pull up (kaki di lantai, miring 45 derajat, tarik dada ke tangan). 4 set × maksimum yang bisa.', 'Pull up adalah raja latihan punggung. Jika belum bisa, gunakan bantuan kursi atau lakukan negatives (turun perlahan saja).'),
(wp_id, 'Dumbbell Row', 4, '10 per sisi', null, 75, 3, 'Upper Body', 'One arm row dengan badan horizontal. Fokus pada menarik siku lurus ke belakang – bayangkan menyodok panggul dengan siku. Peras punggung atas di puncak.', 'Fase 5 – gunakan beban lebih berat dari fase sebelumnya. Progressive overload kunci hypertrophy.'),
(wp_id, 'Bent Over Row (Kedua Tangan)', 3, '12', null, 75, 4, 'Upper Body', 'Condongkan badan 45 derajat, kedua tangan memegang dumbbell. Tarik ke arah perut dengan siku close ke tubuh. Peras di puncak, turunkan perlahan.', 'Ini melatih seluruh punggung tengah – beda dari one-arm row yang lebih mengisolasi.'),
(wp_id, 'Face Pull (dengan resistance band)', 3, '15', null, 60, 5, 'Upper Body', 'Ikat resistance band di titik setinggi wajah. Tarik ke arah wajah dengan siku setinggi bahu, putar tangan ke luar di akhir gerakan. Peras rear delt.', 'Face pull adalah asuransi untuk kesehatan bahu jangka panjang. Selalu latih rear delt.'),
(wp_id, 'Dumbbell Bicep Curl', 3, '12', null, 60, 6, 'Upper Body', 'Curl dumbbell dengan telapak tangan menghadap ke depan. Alternasi kiri-kanan. Kontrol fase eksentrik 2-3 detik.', 'Setelah semua compound pull, bisep sudah lelah. Isolasi ini untuk finishing pump.'),
(wp_id, 'Shrug', 3, '15', null, 45, 7, 'Upper Body', 'Pegang dumbbell di sisi tubuh. Angkat bahu lurus ke atas setinggi mungkin (jangan putar), tahan 1 detik, turunkan perlahan. Ini melatih trapezius atas.', 'Shrug sering dilupakan tapi penting untuk tampilan bahu dan leher yang kuat.'),
(wp_id, 'Pendinginan', 1, '5 menit', 300, 0, 8, 'Upper Body', 'Lat stretch 45 detik per sisi, thoracic rotation 10 per sisi, bicep stretch (tangan di pintu, putar menjauh) 30 detik.', 'Pull day yang berat – punggung dan bisep butuh peregangan menyeluruh.');

-- Fase 5 - Rabu: HIIT Ringan Maintenance
INSERT INTO workout_plans (phase_number, day_of_week, workout_type, duration_minutes, description, warmup_description, cooldown_description)
VALUES (5, 'wednesday', 'hiit', 20,
  'HIIT maintenance 20 menit – 8 rounds × (30 detik kerja / 30 detik istirahat). Lebih ringan dari fase 4 untuk mempertahankan kardio sambil fokus pada hypertrophy.',
  'Jalan di tempat 2 menit, high knees pelan 30 detik, arm swing, jumping jacks ringan 30 detik.',
  'Jalan pelan 3 menit, hamstring dan hip stretch 30 detik masing-masing.')
RETURNING id INTO wp_id;

INSERT INTO exercises (workout_plan_id, name, sets, reps, work_seconds, rest_seconds, order_index, muscle_group, instructions, tips)
VALUES
(wp_id, 'Pemanasan', 1, '3 menit', 180, 0, 1, 'Full Body', 'Jalan di tempat 2 menit, high knees pelan 30 detik, jumping jacks 30 detik.', 'Ini HIIT ringan – tidak perlu pemanasan sepanjang fase 4.'),
(wp_id, 'High Knees', 8, '30 detik', 30, 30, 2, 'Full Body', 'High knees dengan intensitas 80% – lebih ringan dari tabata fase 4. Fokus pada teknik dan pernapasan.', 'Maintenance cardio – pertahankan kemampuan yang sudah dibangun.'),
(wp_id, 'Jumping Jacks', 4, '30 detik', 30, 30, 3, 'Full Body', 'Jumping jacks ritmis di intensitas sedang. 4 dari 8 rounds tersebar di antara gerakan lain.', 'Ini interval cardio bukan tabata – bisa bicara sedikit saat kerja.'),
(wp_id, 'Mountain Climbers', 4, '30 detik', 30, 30, 4, 'Core', 'Mountain climbers di kecepatan yang bisa dipertahankan 30 detik. Jaga teknik.', 'Core tetap diaktifkan di hari HIIT.'),
(wp_id, 'Pendinginan', 1, '4 menit', 240, 0, 5, 'Full Body', 'Jalan pelan 3 menit, hamstring stretch 30 detik, hip stretch 30 detik, bahu 30 detik.', 'Recovery setelah HIIT singkat – besok latihan kaki berat.');

-- Fase 5 - Kamis: Legs (Lower Hypertrophy)
INSERT INTO workout_plans (phase_number, day_of_week, workout_type, duration_minutes, description, warmup_description, cooldown_description)
VALUES (5, 'thursday', 'strength_lower', 55,
  'Leg day hypertrophy – squat, Romanian deadlift, lunges, calf. Volume paling tinggi dalam program ini untuk bawah tubuh. Bersiap untuk DOMS.',
  'Leg swings 10 kali semua arah, hip circle, bodyweight squat 15 kali pelan, glute bridge 12 kali.',
  'Pigeon pose 60 detik per sisi, hamstring stretch 60 detik, calf stretch 30 detik per sisi, quad stretch 30 detik per sisi.')
RETURNING id INTO wp_id;

INSERT INTO exercises (workout_plan_id, name, sets, reps, work_seconds, rest_seconds, order_index, muscle_group, instructions, tips)
VALUES
(wp_id, 'Pemanasan', 1, '5 menit', 300, 0, 1, 'Lower Body', 'Leg swings depan-belakang dan lateral 10 kali per sisi, hip circle besar, bodyweight squat 15 kali, glute bridge 12 kali tahan.', 'Leg day paling berat – pemanasan yang benar sangat penting.'),
(wp_id, 'Goblet Squat (Berat)', 4, '10', null, 90, 2, 'Lower Body', 'Pegang dumbbell terberat yang bisa. Squat dalam penuh. 4 set × 10 reps dengan beban hypertrophy. Berdiri kuat dari paha bawah dan glute.', 'Fase 5 hypertrophy – kalau bisa 12 reps, tambah beban. Berat adalah kuncinya.'),
(wp_id, 'Romanian Deadlift', 4, '10', null, 90, 3, 'Lower Body', 'Hip hinge dengan dumbbell berat. Punggung HARUS lurus. Turunkan sampai terasa hamstring kencang teregang, kembali dengan mendorong pinggul ke depan. Ini mengejar hamstring hypertrophy.', 'RDL adalah salah satu latihan terbaik yang ada. Kuasai teknik ini dengan sempurna.'),
(wp_id, 'Lunges (Walking / Stationary)', 3, '12 per kaki', null, 75, 4, 'Lower Body', 'Lunge maju atau di tempat. 12 reps per kaki. Jaga torso tegak, lutut depan tidak melewati ujung kaki. Dorong dengan tumit untuk kembali berdiri.', 'Lunges melatih kaki secara unilateral – memastikan kedua kaki berkembang seimbang.'),
(wp_id, 'Calf Raise Single Leg', 4, '20', null, 45, 5, 'Lower Body', 'Berdiri di tepi tangga satu kaki. Turunkan tumit penuh (stretch), angkat setinggi mungkin (contract). 20 reps per kaki, tahan 1 detik di puncak.', 'Calf butuh banyak volume dan ROM penuh untuk bertumbuh. Jangan cheat dengan tidak menurunkan tumit.'),
(wp_id, 'Leg Curl (Prone dengan Resistance Band)', 3, '12', null, 60, 6, 'Lower Body', 'Berbaring tengkurap, ikat resistance band di pergelangan kaki dan di titik tetap. Tekuk lutut, tarik tumit ke arah bokong. Tahan di puncak. Ini melatih hamstring secara isolasi.', 'Hamstring isolation penting untuk keseimbangan anterior-posterior dan mencegah cedera.'),
(wp_id, 'Pendinginan', 1, '6 menit', 360, 0, 7, 'Lower Body', 'Pigeon pose 60 detik per sisi, hamstring stretch berbaring 60 detik per sisi, calf stretch di tembok 30 detik, quad stretch berdiri 30 detik per sisi.', 'Leg day yang berat membutuhkan pendinginan yang paling lengkap. Jangan skip!');

-- Fase 5 - Jumat: Full Body Compound
INSERT INTO workout_plans (phase_number, day_of_week, workout_type, duration_minutes, description, warmup_description, cooldown_description)
VALUES (5, 'friday', 'full_body', 55,
  'Full body compound penutup minggu – deadlift, bench/push, row, squat, plank. Volume moderat untuk integrasikan semua pola gerak.',
  'Hip hinge bodyweight 10 kali, push up 8 kali, inchworm 3 kali, arm circle.',
  'Full body stretching 5 menit: hamstring, hip flexor, dada, lat, betis.')
RETURNING id INTO wp_id;

INSERT INTO exercises (workout_plan_id, name, sets, reps, work_seconds, rest_seconds, order_index, muscle_group, instructions, tips)
VALUES
(wp_id, 'Pemanasan', 1, '5 menit', 300, 0, 1, 'Full Body', 'Hip hinge bodyweight 10 kali, push up 8 kali pelan, inchworm 3 kali, arm circle 15 kali tiap arah.', 'Full body day butuh aktivasi semua pola gerak dalam pemanasan.'),
(wp_id, 'Romanian Deadlift (Heavy)', 3, '8', null, 120, 2, 'Lower Body', 'Ini latihan utama dengan beban terberat minggu ini. 3 set × 8 reps dengan dumbbell paling berat. Fokus total pada teknik dan kekuatan.', 'Deadlift adalah raja semua latihan. Kuasai dan tubuh akan berubah.'),
(wp_id, 'Push Up (Berat)', 3, '10', null, 90, 3, 'Upper Body', 'Full push up atau versi weighted jika mampu. 3 set × 10 reps. Tempo terkontrol – turun 2 detik, dorong 1 detik.', 'Integrasi push ke dalam full body komponen penting keseimbangan tubuh atas.'),
(wp_id, 'Dumbbell Row (Berat)', 3, '10 per sisi', null, 90, 4, 'Upper Body', 'One arm row berat. Setelah pull day Selasa, kekuatan row seharusnya sudah meningkat. Gunakan beban lebih berat dari minggu sebelumnya.', 'Progressive overload: naik beban atau reps setiap minggu untuk hypertrophy yang konsisten.'),
(wp_id, 'Goblet Squat', 3, '10', null, 90, 5, 'Lower Body', 'Goblet squat berat untuk integrasikan lower body ke dalam sesi ini. Setelah leg day Kamis ini akan berat – itulah tantangannya.', 'Volume lebih rendah dari Kamis tapi tetap menantang karena akumulasi fatigue.'),
(wp_id, 'Plank', 3, '60 detik', 60, 60, 6, 'Core', 'Plank siku 60 detik dengan kualitas sempurna. Ini cap dari minggu training yang berat – jaga form di setiap detik.', 'Core kuat melindungi spine saat deadlift dan squat – selalu prioritaskan.'),
(wp_id, 'Pendinginan Full Body', 1, '6 menit', 360, 0, 7, 'Full Body', 'Hamstring 45 detik, hip flexor 30 detik per sisi, chest stretch 45 detik, lat stretch 30 detik per sisi, betis 30 detik per sisi.', 'Selamat menyelesaikan 4 sesi strength dan 2 HIIT dalam satu minggu!');

-- Fase 5 - Sabtu: HIIT Ringan
INSERT INTO workout_plans (phase_number, day_of_week, workout_type, duration_minutes, description, warmup_description, cooldown_description)
VALUES (5, 'saturday', 'hiit', 20,
  'HIIT maintenance weekend – 8 rounds × (30 detik / 30 detik). Mempertahankan kemampuan kardiovaskular yang telah dibangun sepanjang 24 minggu.',
  'Jalan di tempat 2 menit, arm swing, jumping jacks ringan 1 menit.',
  'Jalan pelan 3 menit, stretching ringan hamstring dan bahu.')
RETURNING id INTO wp_id;

INSERT INTO exercises (workout_plan_id, name, sets, reps, work_seconds, rest_seconds, order_index, muscle_group, instructions, tips)
VALUES
(wp_id, 'Pemanasan', 1, '3 menit', 180, 0, 1, 'Full Body', 'Jalan di tempat 2 menit, arm swing besar, jumping jacks ringan 1 menit.', 'HIIT ringan weekend – tidak perlu pemanasan terlalu panjang.'),
(wp_id, 'HIIT Freestyle', 8, '30 detik / 30 detik rest', 30, 30, 2, 'Full Body', 'Pilih 2-3 gerakan favorit dari seluruh program (burpees, high knees, mountain climbers, jumping jacks, squat jumps). Alternasi sesuai keinginan. 8 rounds total.', 'Fase 5 adalah maintenance – kamu sudah tahu tubuhmu. Pilih yang paling kamu suka dan lakukan dengan penuh.'),
(wp_id, 'Pendinginan', 1, '4 menit', 240, 0, 3, 'Full Body', 'Jalan pelan 3 menit, hamstring stretch 30 detik, bahu cross-body 30 detik.', 'Ini mungkin sesi HIIT terakhirmu dalam program ini. Bangga dengan seberapa jauh kamu sudah berkembang!');

-- Fase 5 - Minggu: Istirahat + Stretching
INSERT INTO workout_plans (phase_number, day_of_week, workout_type, duration_minutes, description, warmup_description, cooldown_description)
VALUES (5, 'sunday', 'mobility', 15,
  'Hari istirahat total + stretching 15 menit. Recovery penuh sebelum memulai siklus berikutnya. Refleksikan perjalanan 24 minggu.',
  'Napas dalam 5 kali. Mulai stretching dari duduk atau berbaring.',
  'Shavasana 5 menit – berbaring rileks sepenuhnya, napas sangat dalam.')
RETURNING id INTO wp_id;

INSERT INTO exercises (workout_plan_id, name, sets, reps, work_seconds, rest_seconds, order_index, muscle_group, instructions, tips)
VALUES
(wp_id, 'Full Body Stretching Santai', 1, '10 menit', 600, 0, 1, 'Full Body', 'Regangkan seluruh tubuh secara berurutan: leher, bahu, dada, punggung, core, pinggul, paha, betis. Tahan setiap posisi 30-60 detik. Tidak ada terburu-buru hari ini.', 'Ini hari terakhir program 24 minggu. Berikan tubuh penghargaan yang layak.'),
(wp_id, 'Refleksi Gerakan Tubuh', 1, '5 menit', 300, 0, 2, 'Full Body', 'Duduk atau berbaring dalam posisi nyaman. Lakukan napas dalam 10 kali. Rasakan perbedaan tubuh sekarang vs 24 minggu lalu. Ini bukan meditasi wajib – cukup istirahat dengan sadar.', 'Perubahan fisik yang kamu capai adalah bukti konsistensi dan kerja keras.');

END $$;
