-- ============================================================
-- 006_seed_meals_phase1_2_3.sql
-- Seed: daily_meal_plans + meals + meal_ingredients
-- Fase 1 (PSMF, Week 1), Fase 2 (VLCD, Week 3-6), Fase 3 (Defisit, Week 7-12)
-- ============================================================

-- Tambah foods yang belum ada (ID 70+)
insert into foods (id, name, name_en, calories_per_100g, protein_per_100g, fat_per_100g, carb_per_100g, fiber_per_100g, serving_size_g, serving_description, category)
overriding system value values
  (70, 'Putih telur', 'Egg white', 52, 10.9, 0.2, 0.7, 0, 33, '1 butir', 'protein_hewani'),
  (71, 'Ikan kembung', 'Indian mackerel', 121, 22.0, 3.7, 0, 0, 100, '100 g matang', 'protein_hewani'),
  (72, 'Ikan kakap', 'Red snapper', 100, 20.5, 1.5, 0, 0, 100, '100 g matang', 'protein_hewani'),
  (73, 'Cumi-cumi', 'Squid', 92, 15.6, 1.2, 3.1, 0, 100, '100 g matang', 'protein_hewani'),
  (74, 'Kemangi', 'Thai basil', 23, 3.2, 0.6, 2.7, 1.6, 10, 'segenggam', 'sayuran'),
  (75, 'Sawi hijau', 'Chinese mustard greens', 20, 1.8, 0.4, 3.6, 2.2, 100, '100 g', 'sayuran'),
  (76, 'Tauge', 'Bean sprouts', 30, 3.0, 0.2, 5.9, 1.8, 100, '100 g', 'sayuran'),
  (77, 'Labu siam', 'Chayote', 16, 0.8, 0.1, 3.7, 1.9, 100, '100 g', 'sayuran'),
  (78, 'Minyak wijen', 'Sesame oil', 884, 0, 100.0, 0, 0, 4, '½ sdt', 'lainnya'),
  (79, 'Kembang kol', 'Cauliflower', 25, 1.9, 0.3, 5.0, 2.0, 100, '100 g', 'sayuran'),
  (80, 'Seledri', 'Celery', 14, 0.7, 0.2, 3.0, 1.6, 20, '2 batang', 'sayuran'),
  (81, 'Daun bawang', 'Spring onion', 32, 1.8, 0.2, 7.3, 2.6, 20, '2 batang', 'sayuran')
on conflict (id) do nothing;

select setval(pg_get_serial_sequence('foods', 'id'), greatest((select max(id) from foods), 81));

-- ============================================================
-- FASE 1 — PSMF — WEEK 1 (Minggu 2 fallback ke Minggu 1 via hook)
-- Target: 750-850 kkal/hari, P:150-160g, K:<20g, L:<20g
-- ============================================================

insert into daily_meal_plans (id, phase_number, week_number, day_of_week)
overriding system value values
  (1,  1, 1, 'monday'),
  (2,  1, 1, 'tuesday'),
  (3,  1, 1, 'wednesday'),
  (4,  1, 1, 'thursday'),
  (5,  1, 1, 'friday'),
  (6,  1, 1, 'saturday'),
  (7,  1, 1, 'sunday'),
-- FASE 2 — VLCD — WEEK 3
  (8,  2, 3, 'monday'),
  (9,  2, 3, 'tuesday'),
  (10, 2, 3, 'wednesday'),
  (11, 2, 3, 'thursday'),
  (12, 2, 3, 'friday'),
  (13, 2, 3, 'saturday'),
  (14, 2, 3, 'sunday'),
-- FASE 2 — WEEK 4 (3 hari unik)
  (15, 2, 4, 'monday'),
  (16, 2, 4, 'wednesday'),
  (17, 2, 4, 'friday'),
-- FASE 2 — WEEK 5 (3 hari unik)
  (18, 2, 5, 'tuesday'),
  (19, 2, 5, 'thursday'),
  (20, 2, 5, 'saturday'),
-- FASE 2 — WEEK 6 (3 hari unik)
  (21, 2, 6, 'monday'),
  (22, 2, 6, 'wednesday'),
  (23, 2, 6, 'sunday'),
-- FASE 3 — WEEK 7 (7 hari)
  (24, 3, 7, 'monday'),
  (25, 3, 7, 'tuesday'),
  (26, 3, 7, 'wednesday'),
  (27, 3, 7, 'thursday'),
  (28, 3, 7, 'friday'),
  (29, 3, 7, 'saturday'),
  (30, 3, 7, 'sunday'),
-- FASE 3 — WEEK 8 (3 hari)
  (31, 3, 8, 'monday'),
  (32, 3, 8, 'wednesday'),
  (33, 3, 8, 'friday'),
-- FASE 3 — WEEK 9 (3 hari)
  (34, 3, 9, 'tuesday'),
  (35, 3, 9, 'thursday'),
  (36, 3, 9, 'saturday'),
-- FASE 3 — WEEK 10 (3 hari)
  (37, 3, 10, 'monday'),
  (38, 3, 10, 'wednesday'),
  (39, 3, 10, 'friday'),
-- FASE 3 — WEEK 11 (3 hari)
  (40, 3, 11, 'tuesday'),
  (41, 3, 11, 'thursday'),
  (42, 3, 11, 'saturday'),
-- FASE 3 — WEEK 12 (3 hari)
  (43, 3, 12, 'monday'),
  (44, 3, 12, 'wednesday'),
  (45, 3, 12, 'sunday')
on conflict (phase_number, week_number, day_of_week) do nothing;

select setval(pg_get_serial_sequence('daily_meal_plans', 'id'), greatest((select max(id) from daily_meal_plans), 45));

-- ============================================================
-- MEALS — FASE 1 SENIN (daily_meal_plan_id = 1)
-- ============================================================
insert into meals (id, daily_meal_plan_id, meal_type, time_scheduled, name, recipe_instructions, cooking_time_minutes, total_calories, total_protein_g, total_fat_g, total_carb_g)
overriding system value values
(1, 1, 'breakfast', '07:00', 'Omelet Putih Telur Bayam Jamur',
'1. Pisahkan kuning dan putih dari 6 butir telur, simpan hanya putih telurnya.
2. Kocok putih telur dengan sedikit garam dan merica bubuk hingga berbusa ringan.
3. Cuci bersih 80g bayam, tiriskan. Iris tipis 60g jamur kancing.
4. Panaskan teflon antilengket tanpa minyak di api sedang. Tumis bayam dan jamur dengan 1 sendok makan air selama 2 menit hingga layu, angkat dan sisihkan.
5. Tuang kocokan putih telur ke teflon yang sama, ratakan. Tutup dan masak api kecil 3-4 menit hingga hampir matang.
6. Letakkan isian bayam-jamur di setengah bagian omelet, lipat menjadi dua.
7. Masak 1 menit lagi hingga matang sempurna. Angkat dan sajikan hangat.',
15, 215, 42, 2, 6),

(2, 1, 'lunch', '12:00', 'Dada Ayam Panggang Bumbu Kuning dengan Brokoli dan Timun',
'1. Cuci bersih 250g dada ayam tanpa kulit, tipiskan dengan memukul perlahan menggunakan ulekan.
2. Haluskan bumbu: 4 siung bawang merah, 3 siung bawang putih, 1 ruas kunyit, ½ ruas jahe, ½ sdt ketumbar, garam secukupnya. Haluskan menggunakan cobek.
3. Lumuri ayam dengan bumbu halus secara merata, termasuk bagian bawah. Diamkan 20 menit.
4. Panggang ayam di teflon tanpa minyak api sedang-kecil selama 8 menit tiap sisi, tekan dengan spatula agar matang merata.
5. Sementara ayam dipanggang, potong 150g brokoli menjadi floret kecil. Rebus dalam air mendidih bergaram 3 menit, tiriskan.
6. Iris 100g timun serong tipis, taburi sedikit garam dan perasan jeruk nipis.
7. Sajikan ayam panggang bersama brokoli rebus dan irisan timun.',
35, 345, 72, 7, 10),

(3, 1, 'snack', '15:00', 'Putih Telur Rebus dengan Timun',
'1. Rebus 4 butir telur dalam air mendidih selama 12 menit hingga matang keras.
2. Dinginkan dalam air es 5 menit, kupas kulitnya.
3. Belah dua tiap telur, keluarkan kuning telur (tidak dipakai untuk PSMF).
4. Iris 100g timun memanjang seperti stik.
5. Taburi putih telur dengan sedikit garam dan cabai bubuk.
6. Sajikan bersama stik timun segar.',
15, 88, 18, 1, 4),

(4, 1, 'dinner', '18:00', 'Sup Udang Bening Sawi',
'1. Kupas dan bersihkan 200g udang, buang kepala dan kulitnya, bersihkan bagian punggung.
2. Didihkan 600ml air, masukkan 2 siung bawang putih yang digeprek, 1 ruas jahe diiris, dan 1 batang serai digeprek.
3. Masukkan udang, masak 3 menit hingga berubah warna merah-oranye, angkat.
4. Cuci bersih 150g sawi hijau, potong-potong 3 cm.
5. Masukkan sawi ke dalam kaldu, tambahkan 1 buah tomat yang dipotong-potong, dan 1 batang daun bawang iris.
6. Masak 4 menit, masukkan kembali udang, aduk, koreksi rasa dengan garam dan merica.
7. Tambahkan sedikit air perasan jeruk nipis, angkat dan sajikan panas.',
20, 112, 24, 1, 5),

-- ============================================================
-- FASE 1 SELASA (daily_meal_plan_id = 2)
-- ============================================================
(5, 2, 'breakfast', '07:00', 'Shake Whey Protein',
'1. Masukkan 30g whey isolate ke dalam shaker atau blender.
2. Tambahkan 250ml air dingin atau air es.
3. Kocok atau blend selama 20 detik hingga tercampur rata dan tidak bergerindil.
4. Minum segera setelah dicampur untuk hasil terbaik.
5. Opsional: tambahkan 1 sendok teh kayu manis untuk rasa tanpa kalori ekstra.',
3, 113, 25, 1, 2),

(6, 2, 'lunch', '12:00', 'Pepes Ikan Nila Kemangi dengan Kangkung Rebus',
'1. Haluskan bumbu: 3 siung bawang merah, 3 siung bawang putih, 1 sdt kunyit bubuk, 1 ruas jahe menggunakan cobek.
2. Cuci bersih 250g fillet ikan nila, lumuri bumbu halus secara merata. Diamkan 10 menit.
3. Siapkan 2 lembar daun pisang, layukan di atas api agar lentur.
4. Letakkan ikan di atas daun pisang. Tambahkan 1 batang serai iris tipis, segenggam kemangi (10g), 1 buah tomat iris, dan 2 cabai rawit utuh.
5. Bungkus rapat, sematkan lidi di kedua ujung.
6. Kukus dalam dandang selama 30 menit api sedang.
7. Rebus 100g kangkung dalam air mendidih 2 menit, tiriskan.
8. Angkat pepes, buka daun pisang, sajikan bersama kangkung rebus.',
40, 320, 66, 6, 8),

(7, 2, 'snack', '15:00', 'Timun Segar dengan Sambal Terasi',
'1. Cuci bersih 150g timun, potong-potong memanjang seperti stik.
2. Untuk sambal: ulek 2 buah cabai rawit, ½ sdt terasi bakar, ¼ sdt garam, dan sedikit perasan jeruk nipis.
3. Sajikan stik timun dengan sambal terasi di sisinya.',
5, 35, 2, 1, 8),

(8, 2, 'dinner', '18:00', 'Tahu Kukus Telur Wortel',
'1. Potong 200g tahu putih menjadi dadu 2cm.
2. Kocok 3 butir putih telur bersama garam, merica, dan 1 siung bawang putih parut.
3. Serut halus 1 buah wortel ukuran sedang (80g).
4. Campurkan tahu, wortel serut, dan irisan 2 batang daun bawang ke dalam kocokan telur. Aduk rata.
5. Tuang adonan ke dalam cetakan tahan panas yang sudah diolesi sedikit air.
6. Kukus selama 20 menit api sedang hingga matang dan padat.
7. Biarkan agak dingin, keluarkan dari cetakan, potong, dan sajikan dengan saus kecap rendah sodium.',
25, 172, 25, 4, 9),

-- ============================================================
-- FASE 1 RABU (daily_meal_plan_id = 3)
-- ============================================================
(9, 3, 'breakfast', '07:00', 'Putih Telur Ceplok Kecap dengan Tomat',
'1. Pisahkan putih telur dari 4 butir telur, buang kuningnya.
2. Panaskan teflon antilengket tanpa minyak di api kecil.
3. Tuang putih telur satu per satu dengan perlahan agar bentuk tetap bulat. Tutup dan masak 3-4 menit.
4. Teteskan 1 sdt kecap asin rendah sodium di atas putih telur.
5. Iris 2 buah tomat merah (150g) menjadi bulatan setebal 1 cm.
6. Sajikan putih telur ceplok bersama irisan tomat segar dan sedikit merica bubuk.',
10, 132, 23, 1, 9),

(10, 3, 'lunch', '12:00', 'Sop Dada Ayam Bening Wortel Buncis',
'1. Potong 250g dada ayam menjadi potongan 3-4 cm.
2. Didihkan 700ml air bersama 3 siung bawang putih geprek, ½ bawang bombay iris, 1 ruas jahe, dan 1 batang serai.
3. Masukkan ayam, masak 20 menit hingga kaldu keluar dan ayam empuk. Buang busa yang muncul.
4. Potong 100g wortel menjadi potongan dadu, masukkan ke sup, masak 10 menit.
5. Potong 100g buncis menjadi potongan 3cm, masukkan, masak 5 menit.
6. Koreksi rasa dengan garam, merica, dan sedikit gula (opsional). Taburi dengan daun seledri.
7. Sajikan panas tanpa nasi.',
40, 295, 62, 5, 14),

(11, 3, 'snack', '15:00', 'Shake Whey Protein',
'1. Masukkan 30g whey isolate ke dalam shaker atau blender.
2. Tambahkan 250ml air dingin.
3. Kocok selama 20 detik hingga rata.
4. Minum segera.',
3, 113, 25, 1, 2),

(12, 3, 'dinner', '18:00', 'Tuna Bumbu Rica di atas Selada',
'1. Tiriskan 150g tuna kaleng dalam air (bukan minyak), suwir kasar.
2. Haluskan bumbu rica-rica: 5 buah cabai merah, 3 cabai rawit, 4 siung bawang merah, 3 siung bawang putih, 1 ruas jahe, 1 ruas lengkuas, garam secukupnya.
3. Panaskan teflon antilengket, tumis bumbu dengan 2 sdm air hingga harum dan matang (5-7 menit).
4. Masukkan tuna suwir, aduk rata dengan bumbu. Masak 3 menit, koreksi rasa.
5. Cuci bersih 100g daun selada romaine, tiriskan. Tata di piring saji.
6. Letakkan tuna rica di atas selada. Tambahkan irisan tomat cherry jika ada.',
20, 208, 43, 4, 8),

-- ============================================================
-- FASE 1 KAMIS (daily_meal_plan_id = 4, tanpa snack)
-- ============================================================
(13, 4, 'breakfast', '07:00', 'Scrambled Putih Telur Paprika Jamur',
'1. Pisahkan 6 putih telur dari kuningnya.
2. Kocok putih telur dengan sedikit garam dan merica.
3. Potong dadu kecil ½ buah paprika merah (60g) dan potong-potong 60g jamur kancing.
4. Panaskan teflon antilengket tanpa minyak. Tumis paprika dan jamur 2 menit dengan sedikit air.
5. Tuang kocokan putih telur ke atas sayuran, aduk perlahan dengan spatula hingga telur matang tapi masih lembab.
6. Angkat, taburi sedikit bubuk paprika, sajikan hangat.',
12, 200, 40, 2, 8),

(14, 4, 'lunch', '12:00', 'Sate Udang Bakar Bumbu Kecap dengan Lalapan',
'1. Kupas 300g udang ukuran sedang-besar, sisakan ekornya. Bersihkan bagian punggung.
2. Marinasi udang dengan: 2 sdm kecap asin rendah sodium, 2 siung bawang putih parut, ½ sdt jahe parut, merica. Diamkan 15 menit.
3. Tusuk 5-6 udang per tusuk sate.
4. Panggang sate di teflon atau panggangan tanpa minyak, api sedang, 3 menit tiap sisi.
5. Siapkan lalapan: daun selada, irisan timun, dan tomat segar.
6. Sajikan sate udang dengan lalapan dan sambal kecap (kecap rendah sodium + irisan cabai rawit).',
30, 218, 45, 2, 12),

(15, 4, 'dinner', '18:00', 'Ayam Suwir Sambal Matah dengan Brokoli Kukus',
'1. Rebus 250g dada ayam dalam 500ml air bersama serai, daun salam, garam selama 25 menit. Angkat dan suwir halus saat masih hangat.
2. Buat sambal matah: iris tipis 5 siung bawang merah, 3 batang serai bagian putih, 4 buah cabai rawit, 1 buah cabai merah besar. Campur dengan ½ sdt terasi bakar, garam, dan perasan 1 jeruk nipis.
3. Panaskan 2 sdm air panas, siram ke atas campuran sambal matah, aduk rata.
4. Kukus 200g brokoli yang sudah dipotong floret selama 5 menit hingga matang tapi masih renyah.
5. Campur ayam suwir dengan sambal matah, aduk merata.
6. Sajikan ayam sambal matah bersama brokoli kukus.',
40, 290, 62, 5, 10),

-- ============================================================
-- FASE 1 JUMAT (daily_meal_plan_id = 5, tanpa snack)
-- ============================================================
(16, 5, 'breakfast', '07:00', 'Smoothie Whey Bayam',
'1. Masukkan ke blender: 30g whey isolate, 80g daun bayam segar yang sudah dicuci, 200ml air dingin, dan es batu secukupnya.
2. Blend selama 45 detik hingga halus dan rata.
3. Cicipi, jika kurang manis bisa tambah sedikit pemanis stevia (opsional).
4. Tuang ke gelas dan minum segera agar nutrisi tidak rusak.',
5, 138, 28, 2, 5),

(17, 5, 'lunch', '12:00', 'Ikan Kembung Bakar Sambal Dabu-dabu dengan Kangkung',
'1. Bersihkan 2 ekor ikan kembung (total 250g), belah perutnya, cuci bersih.
2. Lumuri ikan dengan: 1 sdt garam, ½ sdt kunyit bubuk, ½ sdt ketumbar. Diamkan 10 menit.
3. Panggang ikan di teflon/panggangan tanpa minyak, api sedang, 6-7 menit tiap sisi hingga matang dan sedikit kecokelatan.
4. Buat sambal dabu-dabu: potong dadu 2 buah tomat merah, 5 buah cabai rawit iris, 3 siung bawang merah iris, ½ sdt garam, perasan 2 jeruk nipis. Campur semua bahan.
5. Rebus 150g kangkung dalam air mendidih 2 menit, tiriskan.
6. Sajikan ikan kembung bakar bersama sambal dabu-dabu segar dan kangkung rebus.',
30, 278, 52, 7, 9),

(18, 5, 'dinner', '18:00', 'Sup Tahu Putih Telur Sawi Wortel',
'1. Potong 150g tahu putih menjadi dadu 2cm.
2. Pisahkan dan kocok 4 putih telur dengan garam dan merica.
3. Potong 100g sawi hijau menjadi 3cm, dan 80g wortel menjadi korek api.
4. Didihkan 600ml air bersama 2 siung bawang putih geprek, 1 ruas jahe, 1 batang serai.
5. Masukkan wortel terlebih dahulu, masak 5 menit. Masukkan tahu, masak 3 menit.
6. Masukkan sawi, aduk. Tuang perlahan kocokan putih telur sambil aduk membentuk egg drop.
7. Tambahkan garam, merica, dan irisan daun bawang. Sajikan panas.',
25, 168, 30, 4, 10),

-- ============================================================
-- FASE 1 SABTU (daily_meal_plan_id = 6, tanpa snack)
-- ============================================================
(19, 6, 'breakfast', '07:00', 'Dada Ayam Rebus Iris dengan Sambal Terasi',
'1. Rebus 250g dada ayam dalam air bergaram bersama 2 lembar daun salam dan 1 batang serai selama 25 menit.
2. Angkat, dinginkan 5 menit, iris tipis melawan serat.
3. Buat sambal terasi: ulek 5 cabai merah, 3 cabai rawit, 3 siung bawang merah, 2 siung bawang putih, 1 sdt terasi bakar, garam dan gula merah sedikit.
4. Panaskan sambal dengan 2 sdm air panas di teflon tanpa minyak selama 3 menit.
5. Siapkan lalapan: daun selada, timun iris, dan tomat segar.
6. Sajikan ayam iris bersama sambal terasi dan lalapan.',
35, 295, 65, 5, 10),

(20, 6, 'lunch', '12:00', 'Tempe Bacem Kukus dengan Lalapan',
'1. Potong 200g tempe menjadi irisan setebal 1 cm.
2. Haluskan bumbu bacem: 3 siung bawang merah, 2 siung bawang putih, 1 sdm kecap rendah sodium, ½ sdt ketumbar, sedikit gula aren, garam.
3. Campurkan tempe dengan bumbu halus, tambahkan 100ml air, aduk rata. Diamkan 15 menit.
4. Tata tempe berbumbu di atas daun pisang atau di kukusan berlubang.
5. Kukus selama 25 menit hingga bumbu meresap dan tempe matang.
6. Siapkan lalapan: daun selada segar, timun, dan tomat.
7. Sajikan tempe bacem kukus bersama lalapan.',
45, 250, 42, 12, 16),

(21, 6, 'dinner', '18:00', 'Nila Kukus Kemangi dengan Bayam Bening',
'1. Bersihkan 250g ikan nila, buat 3 sayatan di tiap sisi.
2. Lumuri dengan: 3 siung bawang putih parut, ½ sdt kunyit, ½ sdt jahe parut, garam. Diamkan 15 menit.
3. Letakkan ikan di atas daun pisang, taburi segenggam kemangi segar (10g) dan 2 buah tomat iris.
4. Kukus selama 20 menit di api sedang.
5. Sementara itu, didihkan 400ml air bersama 2 siung bawang putih dan sedikit garam. Masukkan 150g bayam, masak 3 menit. Sajikan sebagai sayur bening.
6. Angkat ikan kukus, sajikan bersama sayur bayam bening.',
30, 255, 55, 5, 7),

-- ============================================================
-- FASE 1 MINGGU (daily_meal_plan_id = 7, tanpa snack)
-- ============================================================
(22, 7, 'breakfast', '07:00', 'Omelet Putih Telur Isi Ayam Cincang',
'1. Cincang halus 100g dada ayam tanpa kulit.
2. Tumis ayam cincang di teflon tanpa minyak dengan bawang putih parut, garam, merica selama 5 menit. Sisihkan.
3. Pisahkan 5 putih telur dari kuningnya, kocok dengan sedikit garam.
4. Tuang putih telur ke teflon antilengket bersih, masak api kecil-sedang, tutup 3 menit.
5. Letakkan isian ayam cincang di setengah bagian, lipat omelet menjadi dua.
6. Masak 1 menit lagi. Sajikan dengan sedikit saus cabai (opsional).',
18, 252, 50, 3, 4),

(23, 7, 'lunch', '12:00', 'Capcay Udang Tanpa Minyak',
'1. Kupas 200g udang, bersihkan bagian punggung.
2. Potong-potong: 80g brokoli, 80g kembang kol, 60g wortel serong, 60g sawi hijau, 40g jamur kancing iris.
3. Didihkan 100ml air di wok, masukkan 3 siung bawang putih geprek dan 1 ruas jahe.
4. Tumis udang dengan air mendidih selama 3 menit, angkat dan sisihkan.
5. Masukkan wortel dan brokoli, tumis 3 menit. Tambahkan kembang kol dan jamur, masak 2 menit.
6. Masukkan sawi, tambahkan 1 sdm kecap asin rendah sodium, 1 sdm saus tiram, garam, merica, dan sedikit larutan tepung maizena untuk pengental.
7. Masukkan kembali udang, aduk rata, koreksi rasa. Sajikan panas.',
25, 210, 44, 2, 15),

(24, 7, 'dinner', '18:00', 'Ayam Panggang Bumbu Kecap dengan Timun dan Selada',
'1. Siapkan 250g dada ayam, belah tipis-tipis seperti butterfly.
2. Campurkan bumbu marinasi: 2 sdm kecap asin rendah sodium, 1 siung bawang putih parut, ½ sdt jahe parut, merica, sedikit perasan jeruk nipis.
3. Marinasi ayam dengan bumbu selama 20 menit di kulkas.
4. Panggang ayam di teflon panas tanpa minyak api sedang, 8 menit tiap sisi. Olesi sisa marinasi di akhir.
5. Iris tipis 100g timun serong dan cuci 80g daun selada, tata di piring.
6. Iris ayam panggang melawan serat, letakkan di atas selada dan timun.
7. Siram dengan sisa bumbu panggang yang sudah dipanaskan. Sajikan.',
35, 285, 65, 5, 8)
on conflict (id) do nothing;

-- ============================================================
-- FASE 2 — VLCD — MINGGU 3 SENIN (dmp_id = 8)
-- ============================================================
insert into meals (id, daily_meal_plan_id, meal_type, time_scheduled, name, recipe_instructions, cooking_time_minutes, total_calories, total_protein_g, total_fat_g, total_carb_g)
overriding system value values
(25, 8, 'breakfast', '07:00', 'Oatmeal Protein Kayu Manis',
'1. Masak 40g oatmeal dengan 250ml air panas atau susu skim 250ml di panci kecil selama 5 menit sambil diaduk.
2. Angkat dari api. Tambahkan 1 scoop (30g) whey isolate, aduk cepat hingga tercampur rata.
3. Taburi 1 sdt kayu manis bubuk dan sedikit garam.
4. Opsional: tambahkan potongan buah segar seperti pisang kecil (tidak dihitung makro) sebagai topping.
5. Sajikan segera saat hangat.',
8, 330, 42, 5, 38),

(26, 8, 'lunch', '12:00', 'Nasi Merah dengan Ayam Panggang Kunyit dan Tumis Kangkung',
'1. Masak 80g beras merah (kering) menjadi nasi merah. Hasil masak ±160g nasi merah matang.
2. Haluskan bumbu: 4 siung bawang merah, 3 siung bawang putih, 1 ruas kunyit, 1 sdt ketumbar, garam.
3. Lumuri 200g dada ayam dengan bumbu halus. Diamkan 15 menit.
4. Panggang ayam di teflon tanpa minyak, api sedang, 8 menit tiap sisi.
5. Rebus kangkung 100g sebentar 2 menit, tumis dengan 2 siung bawang putih geprek dan 1 sdm air panas tanpa minyak. Beri garam dan sedikit kecap.
6. Sajikan nasi merah bersama potongan ayam panggang dan tumis kangkung.',
45, 520, 52, 8, 60),

(27, 8, 'snack', '15:00', 'Putih Telur Rebus dengan Timun',
'1. Rebus 4 butir telur 12 menit, kupas, pisahkan putih dari kuning.
2. Iris 100g timun memanjang.
3. Taburi putih telur dengan garam dan cabai bubuk.
4. Sajikan bersama timun.',
12, 88, 18, 1, 4),

(28, 8, 'dinner', '18:00', 'Sup Ikan Nila Bening',
'1. Bersihkan 200g ikan nila, potong menjadi 3 bagian.
2. Didihkan 600ml air bersama: 3 siung bawang merah iris, 2 siung bawang putih geprek, 2 buah tomat potong, 1 ruas jahe, 1 batang serai geprek, 1 lembar daun salam.
3. Masukkan ikan, masak 12 menit hingga matang dan kaldu keluar.
4. Tambahkan 100g sawi hijau, masak 3 menit.
5. Koreksi rasa dengan garam, merica, dan perasan jeruk nipis.
6. Taburi irisan daun bawang dan seledri. Sajikan panas.',
25, 165, 35, 3, 8),

-- MINGGU 3 SELASA (dmp_id = 9)
(29, 9, 'breakfast', '07:00', 'Telur Rebus 2 dengan Tomat dan Timun',
'1. Rebus 2 butir telur utuh selama 10 menit (setengah matang) atau 12 menit (matang penuh).
2. Kupas telur, belah dua, taburi dengan sedikit garam dan merica.
3. Iris 2 buah tomat merah dan ½ buah timun serong tipis.
4. Sajikan telur bersama irisan tomat dan timun segar.',
12, 185, 16, 11, 8),

(30, 9, 'lunch', '12:00', 'Ubi Rebus dengan Tempe Panggang dan Lalapan Sambal',
'1. Kupas dan potong 150g ubi jalar menjadi potongan 3cm. Rebus dalam air mendidih 20 menit hingga empuk, tiriskan.
2. Iris 150g tempe setebal 1cm. Lumuri dengan sedikit kecap rendah sodium, bawang putih parut, garam.
3. Panggang tempe di teflon tanpa minyak, api sedang, 4 menit tiap sisi hingga kecokelatan.
4. Siapkan lalapan: daun selada, tomat, timun.
5. Buat sambal terasi sederhana: ulek 3 cabai rawit, 2 siung bawang merah, ¼ sdt terasi bakar, garam dan perasan jeruk nipis.
6. Sajikan ubi rebus, tempe panggang, lalapan, dan sambal.',
35, 465, 38, 17, 62),

(31, 9, 'snack', '15:00', 'Shake Whey Protein',
'1. Masukkan 30g whey isolate ke shaker dengan 250ml air dingin.
2. Kocok 20 detik. Minum segera.',
3, 113, 25, 1, 2),

(32, 9, 'dinner', '18:00', 'Ayam Suwir Sambal Hijau dengan Bayam Bening',
'1. Rebus 200g dada ayam 25 menit bersama serai dan daun salam. Suwir halus.
2. Buat sambal hijau: ulek 5 cabai hijau besar, 3 cabai rawit hijau, 3 siung bawang merah, 2 siung bawang putih, garam.
3. Tumis sambal hijau dengan 2 sdm air di teflon hingga harum dan matang (5-7 menit).
4. Masukkan ayam suwir, aduk merata, masak 2 menit.
5. Didihkan 400ml air bersama sedikit bawang putih dan garam. Masukkan 150g bayam, masak 3 menit.
6. Sajikan ayam sambal hijau bersama sayur bayam bening.',
40, 247, 48, 5, 9),

-- MINGGU 3 RABU (dmp_id = 10)
(33, 10, 'breakfast', '07:00', 'Oatmeal Campur Putih Telur',
'1. Masak 40g oatmeal dengan 200ml air panas, aduk hingga mengental (5 menit).
2. Pisahkan 3 putih telur, kocok rata.
3. Kecilkan api, tuang putih telur ke dalam oatmeal yang mendidih sambil diaduk cepat.
4. Masak 2-3 menit hingga putih telur matang dan menyatu dengan oatmeal.
5. Tambahkan garam, merica, dan sedikit bawang putih bubuk.
6. Sajikan hangat. Oatmeal menjadi lebih tinggi protein dan kenyang lebih lama.',
12, 280, 28, 5, 38),

(34, 10, 'lunch', '12:00', 'Nasi Merah dengan Pepes Tuna dan Buncis Rebus',
'1. Masak 80g beras merah menjadi nasi merah (±160g matang).
2. Haluskan bumbu pepes: 3 siung bawang merah, 3 siung bawang putih, 1 sdt kunyit, ½ sdt ketumbar, garam, 3 buah cabai rawit.
3. Campur 150g tuna kaleng (air, tiriskan) dengan bumbu halus, tambahkan segenggam kemangi dan 1 buah tomat iris.
4. Bungkus dalam daun pisang, sematkan lidi.
5. Kukus 25 menit atau panggang dalam oven 180°C selama 20 menit.
6. Rebus 100g buncis dalam air mendidih bergaram selama 5 menit, tiriskan.
7. Sajikan nasi merah bersama pepes tuna dan buncis rebus.',
45, 485, 52, 5, 72),

(35, 10, 'dinner', '18:00', 'Udang Tumis Bawang Putih Sawi',
'1. Kupas 200g udang, bersihkan. Balur dengan sedikit garam dan merica.
2. Panaskan teflon, tumis 4 siung bawang putih iris tipis dengan 2 sdm air hingga kekuningan.
3. Masukkan udang, masak 3 menit hingga merah-oranye.
4. Masukkan 150g sawi hijau yang sudah dipotong, tambahkan 1 sdm kecap asin, garam, dan sedikit gula.
5. Masak 3 menit lagi. Taburi merica dan irisan cabai merah.
6. Sajikan panas.',
20, 190, 40, 2, 12),

-- MINGGU 3 KAMIS (dmp_id = 11)
(36, 11, 'breakfast', '07:00', 'Tahu Telur Kukus',
'1. Potong 200g tahu putih menjadi potongan dadu.
2. Kocok 2 telur utuh bersama 2 putih telur, garam, merica, ½ sdt bawang putih bubuk.
3. Campurkan tahu ke dalam kocokan telur, lumatkan sedikit agar menyatu.
4. Tuang ke dalam wadah tahan panas berminyak sedikit.
5. Kukus selama 20 menit hingga matang.
6. Sajikan dengan siraman kecap rendah sodium dan irisan cabai rawit.',
25, 225, 25, 12, 8),

(37, 11, 'lunch', '12:00', 'Nasi Merah dengan Ikan Kembung Bakar dan Bayam Bening',
'1. Masak 80g beras merah menjadi nasi merah matang.
2. Lumuri 2 ekor ikan kembung (250g) dengan: 1 sdt garam, ½ sdt kunyit, ½ sdt ketumbar, dan 1 siung bawang putih parut. Diamkan 10 menit.
3. Panggang ikan di teflon antilengket tanpa minyak, api sedang, 7 menit tiap sisi.
4. Didihkan 400ml air, masukkan 150g bayam, sedikit garam, masak 3 menit. Sajikan sebagai sayur bening.
5. Siapkan lalapan timun dan tomat.
6. Sajikan nasi merah, ikan bakar, bayam bening, dan lalapan.',
40, 510, 56, 10, 50),

(38, 11, 'dinner', '18:00', 'Sop Sayur Dada Ayam',
'1. Potong 200g dada ayam menjadi potongan 3cm.
2. Didihkan 700ml air bersama bawang putih geprek, bawang bombay iris, jahe, dan serai.
3. Masukkan ayam, masak 20 menit. Buang busa.
4. Masukkan 80g wortel dadu, masak 8 menit.
5. Masukkan 80g kembang kol floret dan 80g buncis potong, masak 5 menit.
6. Tambahkan garam, merica, dan daun seledri.
7. Sajikan panas tanpa nasi.',
35, 230, 48, 4, 14),

-- MINGGU 3 JUMAT (dmp_id = 12)
(39, 12, 'breakfast', '07:00', 'Smoothie Whey Pisang Bayam',
'1. Masukkan ke blender: 30g whey isolate, 1 buah pisang kecil (80g), 50g bayam segar, 200ml air dingin, es batu.
2. Blend 45 detik hingga halus.
3. Tuang ke gelas, minum segera.',
5, 270, 32, 3, 35),

(40, 12, 'lunch', '12:00', 'Ubi Rebus dengan Ayam Panggang Kecap dan Selada',
'1. Kupas 150g ubi jalar, potong 3cm. Rebus 20 menit hingga empuk.
2. Siapkan 200g dada ayam. Marinasi dengan: 2 sdm kecap rendah sodium, 1 siung bawang putih parut, merica, perasan jeruk nipis. Diamkan 15 menit.
3. Panggang ayam di teflon tanpa minyak, 8 menit tiap sisi.
4. Siapkan 80g daun selada romaine dan 100g timun iris.
5. Sajikan ubi rebus, ayam panggang kecap, dan lalapan selada-timun bersama.',
40, 500, 50, 6, 62),

(41, 12, 'dinner', '18:00', 'Sup Udang Tahu',
'1. Kupas dan bersihkan 150g udang.
2. Potong dadu 150g tahu putih.
3. Didihkan 600ml air bersama bawang putih geprek, jahe, dan serai.
4. Masukkan udang, masak 3 menit. Angkat udang, sisihkan.
5. Masukkan tahu, 80g wortel potong, dan 80g sawi hijau. Masak 8 menit.
6. Masukkan kembali udang. Tambahkan garam, merica, dan perasan jeruk nipis.
7. Taburi daun bawang dan seledri. Sajikan panas.',
25, 225, 38, 4, 14),

-- MINGGU 3 SABTU (dmp_id = 13)
(42, 13, 'breakfast', '07:00', 'Telur Dadar Putih Telur Campur Tempe Cincang',
'1. Cincang halus 80g tempe.
2. Pisahkan 5 putih telur, kocok bersama garam dan merica.
3. Tumis tempe cincang di teflon tanpa minyak dengan 2 sdm air, tambahkan 1 siung bawang putih parut dan 1 sdm kecap rendah sodium selama 3 menit. Sisihkan.
4. Campur tempe ke dalam kocokan putih telur.
5. Tuang ke teflon antilengket, masak api sedang, tutup 3 menit.
6. Balik dan masak 2 menit lagi. Sajikan hangat.',
15, 280, 42, 10, 12),

(43, 13, 'lunch', '12:00', 'Nasi Merah dengan Ikan Nila Panggang dan Tumis Kangkung',
'1. Masak 80g beras merah menjadi nasi merah.
2. Lumuri 200g ikan nila (fillet) dengan bumbu: ½ sdt kunyit, ½ sdt ketumbar, 2 siung bawang putih parut, garam. Diamkan 10 menit.
3. Panggang nila di teflon tanpa minyak, api sedang, 6 menit tiap sisi.
4. Tumis 150g kangkung dengan bawang putih dan 2 sdm air panas tanpa minyak. Beri garam dan kecap sedikit.
5. Sajikan nasi merah bersama ikan nila panggang dan tumis kangkung.',
40, 485, 52, 8, 58),

(44, 13, 'snack', '15:00', 'Shake Whey',
'1. Masukkan 30g whey isolate ke shaker dengan 250ml air dingin.
2. Kocok 20 detik. Minum segera.',
3, 113, 25, 1, 2),

(45, 13, 'dinner', '18:00', 'Tuna Selada Wrap',
'1. Tiriskan 150g tuna kaleng (air), suwir kasar.
2. Campurkan tuna dengan: ½ buah tomat potong dadu kecil, ¼ buah paprika merah potong dadu, 1 sdt mustard, sedikit perasan jeruk nipis, garam dan merica.
3. Cuci bersih 4-5 lembar daun selada romaine besar, tiriskan.
4. Sendokkan isian tuna ke tengah setiap lembar selada.
5. Gulung selada membungkus isian.
6. Sajikan segera sebelum selada layu.',
10, 185, 36, 3, 8),

-- MINGGU 3 MINGGU (dmp_id = 14)
(46, 14, 'breakfast', '07:00', 'Oatmeal Protein',
'1. Masak 40g oatmeal dengan 250ml air selama 5 menit.
2. Campurkan 1 scoop whey isolate (30g) ke dalam oatmeal hangat, aduk cepat.
3. Tambahkan kayu manis dan sedikit garam.
4. Sajikan hangat.',
8, 330, 42, 5, 38),

(47, 14, 'lunch', '12:00', 'Soto Ayam Tanpa Santan',
'1. Rebus 250g dada ayam dalam 1 liter air bersama: 1 batang serai geprek, 2 lembar daun salam, 3 lembar daun jeruk, 1 ruas kunyit geprek, 1 ruas jahe geprek.
2. Masak 25 menit. Angkat ayam, suwir kasar. Saring kaldu.
3. Haluskan bumbu kuning: 5 siung bawang merah, 4 siung bawang putih, 1 ruas kunyit, 1 sdt ketumbar, garam. Tumis bumbu di teflon dengan 3 sdm air hingga harum.
4. Masukkan bumbu ke kaldu, didihkan kembali. Masukkan ayam suwir.
5. Siapkan isian: 80g tauge, seledri cincang, irisan daun bawang.
6. Sajikan soto dalam mangkuk: tuang kuah, tata ayam suwir, tauge, dan taburkan seledri.',
45, 350, 55, 7, 20),

(48, 14, 'dinner', '18:00', 'Tempe Panggang dengan Capcay Udang',
'1. Iris 150g tempe setebal 1cm, marinasi dengan kecap rendah sodium, bawang putih parut, merica. Panggang di teflon tanpa minyak 4 menit tiap sisi.
2. Kupas 150g udang. Potong-potong 60g brokoli, 60g wortel, 60g sawi, 40g jamur.
3. Tumis bawang putih dengan 2 sdm air di wok. Masukkan udang 3 menit.
4. Masukkan semua sayuran secara berurutan dari yang paling lama matang. Tambahkan sedikit kecap asin, garam, merica.
5. Masak total 8 menit. Sajikan bersama tempe panggang.',
35, 368, 56, 14, 20),

-- ============================================================
-- FASE 2 MINGGU 4 — 3 hari unik: bumbu balado, ikan kakap
-- ============================================================
-- SENIN W4 (dmp_id = 15)
(49, 15, 'breakfast', '07:00', 'Oatmeal Protein Kayu Manis',
'1. Masak 40g oatmeal dengan 250ml air panas selama 5 menit sambil diaduk.
2. Tambahkan 30g whey isolate, aduk cepat.
3. Taburi 1 sdt kayu manis. Sajikan hangat.',
8, 330, 42, 5, 38),

(50, 15, 'lunch', '12:00', 'Nasi Merah dengan Ayam Balado dan Tumis Kangkung',
'1. Masak 80g beras merah menjadi nasi merah matang.
2. Haluskan bumbu balado: 8 buah cabai merah keriting, 4 siung bawang merah, 3 siung bawang putih, 1 buah tomat, garam.
3. Lumuri 200g dada ayam (sudah dipanggang matang terlebih dahulu 15 menit) dengan bumbu balado.
4. Tumis bumbu balado sisa di teflon dengan 2 sdm air hingga harum. Masukkan ayam panggang berbumbu, aduk hingga merata dan bumbu mengering.
5. Tumis kangkung 100g dengan bawang putih dan sedikit air.
6. Sajikan nasi merah, ayam balado, dan tumis kangkung.',
45, 510, 52, 8, 62),

(51, 15, 'snack', '15:00', 'Putih Telur Rebus dengan Timun',
'1. Rebus 4 butir telur 12 menit, pisahkan putih dari kuning.
2. Sajikan dengan timun iris dan sedikit garam.',
12, 88, 18, 1, 4),

(52, 15, 'dinner', '18:00', 'Sup Ikan Kakap Bening',
'1. Bersihkan 200g ikan kakap, potong menjadi 3 bagian besar.
2. Didihkan 600ml air bersama bawang merah iris, bawang putih geprek, jahe, serai, dan tomat.
3. Masukkan ikan kakap, masak 15 menit. Tambahkan 100g sawi.
4. Koreksi rasa dengan garam dan perasan jeruk nipis.
5. Taburi daun bawang dan seledri.',
25, 165, 35, 3, 8),

-- RABU W4 (dmp_id = 16)
(53, 16, 'breakfast', '07:00', 'Oatmeal Campur Putih Telur',
'1. Masak 40g oatmeal dengan 200ml air.
2. Kocok 3 putih telur, tuang ke oatmeal mendidih sambil aduk.
3. Masak 2-3 menit. Tambahkan garam dan merica.',
12, 280, 28, 5, 38),

(54, 16, 'lunch', '12:00', 'Nasi Merah dengan Pepes Ikan Kakap dan Buncis Rebus',
'1. Masak 80g beras merah.
2. Haluskan bumbu: bawang merah, bawang putih, kunyit, ketumbar, cabai, garam.
3. Bersihkan 200g fillet ikan kakap, lumuri bumbu halus. Tambahkan kemangi dan tomat iris.
4. Bungkus dalam daun pisang, kukus 30 menit.
5. Rebus 100g buncis 5 menit, tiriskan.
6. Sajikan nasi merah, pepes kakap, dan buncis rebus.',
50, 480, 55, 5, 68),

(55, 16, 'dinner', '18:00', 'Udang Tumis Balado Sawi',
'1. Kupas 200g udang. Haluskan bumbu balado: 6 cabai merah, 3 siung bawang merah, 2 siung bawang putih, tomat, garam.
2. Tumis bumbu balado dengan 2 sdm air di teflon hingga matang.
3. Masukkan udang, masak 4 menit. Tambahkan 150g sawi, masak 3 menit.
4. Koreksi rasa. Sajikan panas.',
20, 198, 42, 3, 14),

-- JUMAT W4 (dmp_id = 17)
(56, 17, 'breakfast', '07:00', 'Smoothie Whey Pisang Bayam',
'1. Blend 30g whey isolate + 80g pisang + 50g bayam + 200ml air dingin + es batu.
2. Blend 45 detik. Minum segera.',
5, 270, 32, 3, 35),

(57, 17, 'lunch', '12:00', 'Ubi Rebus dengan Ikan Kakap Bakar dan Selada Timun',
'1. Rebus 150g ubi jalar 20 menit.
2. Lumuri 200g ikan kakap dengan kunyit, garam, bawang putih parut. Panggang 7 menit tiap sisi.
3. Sajikan bersama 80g selada dan 100g timun iris.',
40, 475, 50, 5, 62),

(58, 17, 'dinner', '18:00', 'Sup Ikan Kakap Tahu Sayuran',
'1. Potong 150g ikan kakap, 150g tahu putih dadu.
2. Didihkan 600ml air bersama bumbu aromatik.
3. Masukkan ikan, tahu, 80g wortel, dan 80g sawi. Masak 12 menit.
4. Garam, merica, perasan jeruk nipis. Sajikan panas.',
25, 235, 42, 5, 14),

-- ============================================================
-- FASE 2 MINGGU 5 — 3 hari unik: cumi, bumbu rica-rica
-- ============================================================
-- SELASA W5 (dmp_id = 18)
(59, 18, 'breakfast', '07:00', 'Telur Rebus 2 dengan Tomat dan Timun',
'1. Rebus 2 telur utuh 10-12 menit, kupas dan belah dua.
2. Iris 2 tomat merah dan ½ timun serong. Sajikan bersama.',
12, 185, 16, 11, 8),

(60, 18, 'lunch', '12:00', 'Ubi Rebus dengan Cumi Rica-Rica dan Lalapan',
'1. Rebus 150g ubi jalar 20 menit hingga empuk.
2. Bersihkan 250g cumi-cumi, buang tulang, potong cincin 1cm.
3. Haluskan bumbu rica-rica: 6 cabai merah, 4 cabai rawit, 4 siung bawang merah, 3 siung bawang putih, 1 ruas jahe, 1 ruas lengkuas, garam.
4. Tumis bumbu dengan 3 sdm air di teflon hingga harum dan minyak terpisah.
5. Masukkan cumi, aduk. Masak 5 menit (jangan terlalu lama agar tidak alot).
6. Koreksi rasa, sajikan dengan ubi rebus dan lalapan selada-timun.',
35, 480, 50, 10, 62),

(61, 18, 'snack', '15:00', 'Shake Whey',
'1. Campur 30g whey dengan 250ml air dingin. Kocok dan minum.',
3, 113, 25, 1, 2),

(62, 18, 'dinner', '18:00', 'Ayam Suwir Sambal Terasi dengan Bayam Bening',
'1. Rebus 200g dada ayam, suwir halus.
2. Buat sambal terasi: ulek 5 cabai merah, 3 cabai rawit, 3 siung bawang merah, 1 sdt terasi bakar, garam, sedikit gula merah.
3. Tumis sambal dengan 2 sdm air di teflon hingga matang.
4. Campur ayam suwir dengan sambal. Aduk rata.
5. Sajikan dengan sayur bayam bening.',
35, 245, 48, 6, 9),

-- KAMIS W5 (dmp_id = 19)
(63, 19, 'breakfast', '07:00', 'Tahu Telur Kukus',
'1. Potong 200g tahu putih dadu.
2. Kocok 2 telur + 2 putih telur + garam + merica + bawang putih bubuk.
3. Campur tahu ke telur, tuang ke cetakan, kukus 20 menit.',
25, 225, 25, 12, 8),

(64, 19, 'lunch', '12:00', 'Nasi Merah dengan Cumi Rica-Rica dan Bayam Bening',
'1. Masak 80g beras merah.
2. Bersihkan 200g cumi, potong cincin.
3. Haluskan bumbu rica-rica dan tumis dengan 3 sdm air hingga harum.
4. Masukkan cumi, masak 4-5 menit saja agar tidak keras.
5. Sajikan nasi merah, cumi rica, dan sayur bayam bening.',
35, 500, 45, 10, 65),

(65, 19, 'dinner', '18:00', 'Sop Sayur Dada Ayam',
'1. Rebus 200g dada ayam potong dengan bumbu aromatik 20 menit.
2. Masukkan wortel, kembang kol, buncis. Masak hingga empuk.
3. Koreksi rasa. Sajikan panas.',
35, 230, 48, 4, 14),

-- SABTU W5 (dmp_id = 20)
(66, 20, 'breakfast', '07:00', 'Telur Dadar Putih Telur Tempe Cincang',
'1. Cincang 80g tempe, tumis tanpa minyak dengan kecap dan bawang putih.
2. Kocok 5 putih telur, campur dengan tempe. Dadar di teflon tanpa minyak.',
15, 280, 42, 10, 12),

(67, 20, 'lunch', '12:00', 'Nasi Merah dengan Cumi Bumbu Kecap dan Tumis Kangkung',
'1. Masak 80g beras merah.
2. Bersihkan 200g cumi, potong cincin.
3. Tumis bawang putih dan jahe dengan sedikit air. Masukkan cumi.
4. Tambahkan 2 sdm kecap asin, 1 sdm saus tiram, merica. Masak 5 menit.
5. Tumis kangkung 100g dengan bawang putih.
6. Sajikan nasi merah, cumi kecap, dan kangkung.',
35, 490, 48, 8, 65),

(68, 20, 'snack', '15:00', 'Shake Whey',
'1. Campur 30g whey dengan 250ml air dingin. Kocok dan minum.',
3, 113, 25, 1, 2),

(69, 20, 'dinner', '18:00', 'Udang Tumis Bawang Putih Sawi',
'1. Kupas 200g udang.
2. Tumis bawang putih 4 siung iris tipis dengan 2 sdm air.
3. Masukkan udang, masak 3 menit.
4. Masukkan 150g sawi, kecap asin, garam, merica. Masak 3 menit.
5. Sajikan panas.',
20, 190, 40, 2, 12),

-- ============================================================
-- FASE 2 MINGGU 6 — 3 hari kombinasi
-- ============================================================
-- SENIN W6 (dmp_id = 21)
(70, 21, 'breakfast', '07:00', 'Oatmeal Protein Kayu Manis',
'1. Masak 40g oatmeal dengan 250ml air 5 menit. Tambahkan 30g whey, aduk. Taburi kayu manis.',
8, 330, 42, 5, 38),

(71, 21, 'lunch', '12:00', 'Nasi Merah dengan Ayam Rica-Rica dan Tumis Brokoli',
'1. Masak 80g beras merah.
2. Haluskan bumbu rica-rica, lumuri 200g dada ayam panggang. Masak dengan bumbu di teflon + 3 sdm air.
3. Tumis 150g brokoli floret dengan bawang putih dan sedikit air.
4. Sajikan nasi merah, ayam rica, dan brokoli.',
45, 510, 52, 8, 62),

(72, 21, 'dinner', '18:00', 'Sup Udang Tahu Sawi',
'1. Kupas 150g udang. Potong dadu 150g tahu. Potong 100g sawi.
2. Didihkan 600ml air dengan bumbu aromatik.
3. Masukkan udang, tahu, sawi. Masak 10 menit. Koreksi rasa.',
20, 195, 38, 4, 12),

-- RABU W6 (dmp_id = 22)
(73, 22, 'breakfast', '07:00', 'Smoothie Whey Bayam',
'1. Blend 30g whey + 80g bayam + 200ml air dingin + es. Blend 45 detik.',
5, 138, 28, 2, 5),

(74, 22, 'lunch', '12:00', 'Nasi Merah dengan Pepes Nila Kemangi dan Buncis Rebus',
'1. Masak 80g beras merah.
2. Buat pepes nila 250g dengan bumbu kuning + kemangi + tomat. Kukus 30 menit.
3. Rebus 100g buncis 5 menit.
4. Sajikan nasi merah, pepes nila, buncis.',
50, 500, 60, 7, 62),

(75, 22, 'dinner', '18:00', 'Cumi Tumis Sawi Putih',
'1. Bersihkan 200g cumi, potong cincin.
2. Tumis 3 siung bawang putih dan 1 buah cabai merah iris dengan 2 sdm air.
3. Masukkan cumi, kecap asin, merica. Masak 5 menit.
4. Masukkan 100g sawi, masak 3 menit. Koreksi rasa.',
20, 185, 34, 3, 14),

-- MINGGU W6 (dmp_id = 23)
(76, 23, 'breakfast', '07:00', 'Oatmeal Protein',
'1. Masak 40g oatmeal + 30g whey + kayu manis. Sajikan hangat.',
8, 330, 42, 5, 38),

(77, 23, 'lunch', '12:00', 'Soto Ayam Tanpa Santan',
'1. Rebus 250g dada ayam dengan bumbu kuning, serai, daun salam. Suwir ayam.
2. Saring kaldu, tumis bumbu kuning terpisah, masukkan ke kaldu.
3. Sajikan soto dengan tauge, seledri, daun bawang.',
45, 350, 55, 7, 20),

(78, 23, 'dinner', '18:00', 'Tempe Panggang dengan Capcay Udang',
'1. Panggang 150g tempe iris tanpa minyak dengan bumbu kecap.
2. Buat capcay: udang 150g + berbagai sayur (brokoli, wortel, sawi) ditumis dengan air + kecap.
3. Sajikan bersama tempe panggang.',
35, 368, 56, 14, 20),

-- ============================================================
-- FASE 3 — DEFISIT MODERAT — MINGGU 7
-- Target: 1400-1700 kkal/hari, P:140-150g, K:120-150g, L:40-55g
-- ============================================================
-- SENIN W7 (dmp_id = 24)
(79, 24, 'breakfast', '07:00', 'Oatmeal Telur Pisang',
'1. Masak 50g oatmeal dengan 300ml susu skim atau air. Aduk selama 5 menit.
2. Rebus 1 telur utuh (10 menit) dan pisahkan 4 putih telur dari telur lain.
3. Kocok putih telur bersama garam, dadar tipis di teflon tanpa minyak. Gulung dan iris.
4. Potong 1 buah pisang kecil serong.
5. Sajikan oatmeal dalam mangkuk, tata dadar putih telur dan pisang di atasnya.
6. Tambahkan kayu manis bubuk di atasnya.',
15, 420, 38, 8, 62),

(80, 24, 'lunch', '12:00', 'Nasi Merah Ayam Panggang Balado Tumis Brokoli Timun',
'1. Masak 120g beras merah menjadi nasi merah (±240g matang).
2. Haluskan bumbu balado: 8 cabai merah, 4 siung bawang merah, 3 siung bawang putih, 1 tomat, garam. Tumis dengan 1 sdt minyak zaitun hingga harum.
3. Panggang 200g dada ayam di teflon, 8 menit tiap sisi. Masukkan ayam ke tumisan bumbu balado, aduk merata, masak 3 menit lagi.
4. Tumis 150g brokoli floret dengan 1 sdt minyak zaitun dan 2 siung bawang putih, 4 menit. Beri garam.
5. Iris 100g timun serong.
6. Sajikan nasi merah dengan ayam balado, tumis brokoli, dan timun.',
45, 590, 52, 16, 72),

(81, 24, 'dinner', '18:00', 'Pepes Nila Bayam Bening Tahu Kukus',
'1. Buat pepes ikan nila 200g: lumuri bumbu kuning + kemangi + tomat. Bungkus daun pisang, kukus 30 menit.
2. Didihkan 400ml air, masukkan 150g bayam segar, garam. Masak 3 menit. Sajikan sebagai sayur bening.
3. Kukus 150g tahu putih bersama bumbu sederhana (bawang putih, garam) selama 15 menit.
4. Sajikan ketiganya bersama.',
45, 325, 45, 8, 20),

(82, 24, 'snack', '15:00', 'Greek Yogurt Whey',
'1. Campurkan 150g Greek yogurt plain dengan 15g whey isolate (setengah scoop).
2. Aduk rata hingga creamy.
3. Opsional: tambahkan sedikit kayu manis atau vanila extract.',
3, 175, 28, 3, 12),

-- SELASA W7 (dmp_id = 25)
(83, 25, 'breakfast', '07:00', 'Roti Gandum Telur Rebus Tomat',
'1. Panggang 2 lembar roti gandum (60g) hingga kecokelatan.
2. Rebus 2 telur utuh 10 menit hingga matang, kupas dan belah dua.
3. Iris 2 buah tomat merah menjadi bulatan tebal.
4. Tata di piring: roti gandum, telur rebus (setengah-setengah), dan irisan tomat.
5. Taburi telur dengan sedikit garam, merica, dan paprika bubuk.
6. Opsional: oleskan sedikit mustard di roti tanpa kalori ekstra.',
10, 400, 30, 14, 44),

(84, 25, 'lunch', '12:00', 'Nasi Merah Tempe Orek Kering Sayur Asem',
'1. Masak 120g beras merah menjadi nasi merah.
2. Potong 200g tempe menjadi dadu kecil 1cm.
3. Buat tempe orek: tumis 3 siung bawang merah, 2 siung bawang putih, 3 cabai merah iris, 1 lembar daun salam di teflon dengan 2 sdm air. Masukkan tempe, tambahkan 2 sdm kecap rendah sodium, sedikit gula merah, garam. Masak api kecil aduk terus hingga kering (15 menit).
4. Sayur asem: didihkan 500ml air dengan: 1 potong asam jawa, 3 siung bawang merah, 2 siung bawang putih, 1 lembar daun salam, 1 batang serai. Masukkan 80g kacang panjang, 60g jagung manis, 60g labu siam, dan 80g daun melinjo (boleh diganti bayam). Masak 10 menit tanpa santan.
5. Sajikan nasi merah, tempe orek, dan sayur asem.',
50, 580, 40, 18, 76),

(85, 25, 'dinner', '18:00', 'Dada Ayam Bakar Madu dengan Selada Timun Sambal',
'1. Campurkan marinade: 1 sdm madu, 2 sdm kecap rendah sodium, 2 siung bawang putih parut, ½ sdt jahe parut, merica. Lumuri 200g dada ayam dan diamkan 30 menit.
2. Panggang ayam di teflon tanpa minyak, api sedang, 8 menit tiap sisi. Olesi sisa marinade tiap 3 menit.
3. Siapkan 80g selada romaine, 100g timun iris, dan 1 buah tomat potong.
4. Buat sambal: ulek 3 cabai rawit + 2 siung bawang merah + garam + jeruk nipis.
5. Sajikan ayam bakar madu dengan salad dan sambal.',
40, 355, 50, 7, 22),

(86, 25, 'snack', '15:00', 'Shake Whey Pisang',
'1. Blend 30g whey + 1 buah pisang kecil + 200ml air dingin. Minum segera.',
5, 195, 26, 2, 24),

-- RABU W7 (dmp_id = 26)
(87, 26, 'breakfast', '07:00', 'Oatmeal Whey Kayu Manis',
'1. Masak 50g oatmeal dengan 300ml air 5 menit.
2. Tambahkan 30g whey isolate, 1 sdt kayu manis, sedikit garam. Aduk rata.
3. Sajikan hangat.',
8, 380, 44, 6, 48),

(88, 26, 'lunch', '12:00', 'Gado-Gado Tanpa Lontong',
'1. Rebus masing-masing: 100g kangkung (2 menit), 100g tauge (1 menit), 100g buncis (4 menit). Tiriskan semua.
2. Potong dadu dan rebus 100g tahu putih. Kukus 100g tempe iris.
3. Rebus 1 telur utuh 10 menit, belah 2.
4. Iris 100g timun dan 1 buah tomat.
5. Buat saus kacang: blender atau ulek 2 sdm selai kacang (30g), 2 siung bawang putih, 1 sdm kecap rendah sodium, 3 buah cabai rawit, garam, sedikit gula merah, dan air secukupnya hingga kental.
6. Tata semua sayuran, tahu, tempe, dan telur di piring. Siram dengan saus kacang.',
35, 540, 38, 22, 52),

(89, 26, 'dinner', '18:00', 'Ikan Kakap Kukus dengan Nasi Merah dan Brokoli',
'1. Bersihkan 200g ikan kakap, buat sayatan di sisi ikan. Lumuri dengan garam, jahe parut, dan sedikit kecap asin.
2. Letakkan di atas daun pisang atau piring tahan panas. Beri irisan jahe, serai, dan daun bawang di atasnya.
3. Kukus 20 menit hingga matang.
4. Masak 80g beras merah menjadi nasi merah (±160g matang).
5. Kukus 150g brokoli floret 5 menit.
6. Sajikan ikan kakap kukus dengan nasi merah dan brokoli.',
40, 450, 48, 6, 58),

(90, 26, 'snack', '15:00', 'Putih Telur Rebus Timun',
'1. Rebus 4 butir telur, ambil hanya putihnya.
2. Iris 100g timun. Sajikan dengan garam dan cabai bubuk.',
12, 88, 18, 1, 4),

-- KAMIS W7 (dmp_id = 27)
(91, 27, 'breakfast', '07:00', 'Nasi Goreng Diet',
'1. Gunakan 120g nasi merah dingin (sisa semalam).
2. Tumis 2 siung bawang putih + 1 siung bawang merah iris + 2 cabai rawit iris di teflon dengan 1 sdt minyak zaitun.
3. Masukkan 100g dada ayam cincang, masak 5 menit.
4. Buat lubang di tengah, masukkan 1 telur utuh, orak-arik. Campur dengan nasi.
5. Tambahkan 60g wortel parut, 40g daun bawang iris. Aduk rata.
6. Beri kecap rendah sodium, garam, merica. Masak 5 menit.
7. Sajikan dengan irisan timun dan tomat.',
20, 450, 40, 10, 52),

(92, 27, 'lunch', '12:00', 'Ubi Rebus dengan Udang Bakar dan Lalapan Sambal',
'1. Rebus 150g ubi jalar 20 menit hingga empuk.
2. Kupas 250g udang besar, belah punggung, bersihkan.
3. Marinasi udang: 2 sdm kecap rendah sodium, 2 siung bawang putih parut, ½ sdt jahe, merica.
4. Bakar/panggang udang di teflon tanpa minyak, 3 menit tiap sisi.
5. Siapkan lalapan: daun selada, timun, tomat.
6. Buat sambal terasi: ulek 4 cabai merah + 3 rawit + 2 siung bawang merah + terasi + garam + jeruk nipis.
7. Sajikan ubi, udang bakar, lalapan, dan sambal.',
40, 450, 52, 5, 55),

(93, 27, 'dinner', '18:00', 'Soto Ayam dengan Nasi Merah dan Tauge',
'1. Rebus 200g dada ayam dengan bumbu kuning dan serai. Suwir. Saring kaldu.
2. Tumis bumbu kuning dengan sedikit minyak zaitun. Masukkan ke kaldu. Didihkan.
3. Masak 80g beras merah (sedikit = 120g matang).
4. Siapkan: tauge 80g, seledri, daun bawang, dan perasan jeruk nipis.
5. Sajikan soto dengan nasi merah, tauge, dan topping.',
50, 430, 48, 8, 45),

(94, 27, 'snack', '15:00', 'Greek Yogurt',
'1. Ambil 150g Greek yogurt plain.
2. Taburi sedikit kayu manis. Sajikan.',
2, 100, 15, 1, 7),

-- JUMAT W7 (dmp_id = 28)
(95, 28, 'breakfast', '07:00', 'Telur Orak-Arik dengan Roti Gandum dan Tomat',
'1. Kocok 2 telur utuh bersama garam, merica, dan sedikit susu skim.
2. Panaskan teflon dengan ½ sdt minyak zaitun. Tuang telur, aduk perlahan dengan spatula hingga matang lembut.
3. Panggang 2 lembar roti gandum.
4. Iris 2 buah tomat menjadi bulatan.
5. Sajikan telur orak-arik, roti gandum, dan irisan tomat.',
10, 395, 28, 16, 40),

(96, 28, 'lunch', '12:00', 'Nasi Merah Ayam Panggang Kecap dengan Capcay Sayur',
'1. Masak 120g beras merah.
2. Marinasi 200g dada ayam dengan kecap rendah sodium, bawang putih, merica. Panggang 8 menit tiap sisi.
3. Capcay: tumis bawang putih dengan ½ sdt minyak wijen. Masukkan 60g brokoli, 60g wortel, 60g sawi, 40g jamur secara berurutan. Tambahkan sedikit kecap asin dan saus tiram. Masak 8 menit.
4. Sajikan nasi merah, ayam panggang kecap, dan capcay.',
45, 550, 52, 12, 65),

(97, 28, 'dinner', '18:00', 'Sup Tahu Udang',
'1. Kupas 150g udang, potong dadu 150g tahu putih.
2. Didihkan 600ml air dengan bumbu aromatik.
3. Masukkan udang 3 menit, angkat. Masukkan tahu, 80g wortel, dan 80g sawi. Masak 10 menit.
4. Kembalikan udang. Garam, merica, jeruk nipis. Sajikan.',
25, 225, 38, 4, 14),

(98, 28, 'snack', '15:00', 'Shake Whey',
'1. Campur 30g whey dengan 250ml air. Kocok dan minum.',
3, 113, 25, 1, 2),

-- SABTU W7 (dmp_id = 29)
(99, 29, 'breakfast', '07:00', 'Bubur Oatmeal Telur Pisang',
'1. Masak 50g oatmeal dengan 300ml air hingga bubur kental (7 menit).
2. Rebus 1 telur utuh 10 menit, belah dua.
3. Potong 1 pisang serong.
4. Sajikan bubur oatmeal dengan telur di samping dan pisang di atasnya.
5. Taburi sedikit kayu manis dan garam di atas bubur.',
15, 380, 18, 9, 60),

(100, 29, 'lunch', '12:00', 'Nasi Merah Ikan Kembung Goreng Airfryer Sambal Terasi Bayam Bening',
'1. Masak 120g beras merah.
2. Lumuri 2 ekor ikan kembung (250g) dengan kunyit, garam, bawang putih. Masak di airfryer 180°C selama 15 menit (balik di 8 menit), atau panggang di teflon tanpa minyak.
3. Didihkan 400ml air, masukkan 150g bayam, garam. Masak 3 menit. Sajikan sebagai sayur bening.
4. Buat sambal terasi: ulek semua bahan, beri perasan jeruk nipis.
5. Siapkan lalapan timun dan tomat.
6. Sajikan nasi merah, ikan kembung, bayam bening, sambal terasi, dan lalapan.',
40, 550, 52, 10, 65),

(101, 29, 'dinner', '18:00', 'Dada Ayam Suwir Sambal Matah dengan Timun dan Selada',
'1. Rebus 200g dada ayam bersama serai dan daun salam 25 menit. Suwir saat hangat.
2. Buat sambal matah: iris tipis 5 siung bawang merah, 3 cabai merah, 4 cabai rawit, 2 batang serai bagian putih, 1 lembar daun jeruk (buang tulang). Campur dengan ½ sdt terasi bakar, garam, perasan 2 jeruk nipis. Siram 2 sdm air mendidih, aduk.
3. Campur ayam suwir dengan sambal matah, aduk rata.
4. Sajikan dengan 80g daun selada dan 100g timun iris.',
35, 275, 50, 6, 10),

(102, 29, 'snack', '15:00', 'Shake Whey',
'1. Campur 30g whey dengan 250ml air. Kocok dan minum.',
3, 113, 25, 1, 2),

-- MINGGU W7 (dmp_id = 30)
(103, 30, 'breakfast', '07:00', 'Lontong Sayur Diet',
'1. Siapkan 120g nasi merah matang, cetak dalam plastik kecil menjadi bentuk lonjong sebagai pengganti lontong.
2. Potong dadu 100g tahu, rebus hingga matang.
3. Rebus 1 telur utuh 12 menit, kupas.
4. Potong 100g labu siam menjadi korek api.
5. Didihkan 300ml air bersama 50ml santan encer, masukkan labu siam, 1 lembar daun salam, 1 batang serai, garam. Masak 10 menit.
6. Masukkan tahu, aduk perlahan. Koreksi rasa.
7. Sajikan kuah labu dengan telur rebus dan nasi merah terpisah.',
35, 420, 25, 10, 58),

(104, 30, 'lunch', '12:00', 'Nasi Merah dengan Pepes Nila dan Tumis Kangkung',
'1. Masak 120g beras merah.
2. Buat pepes ikan nila 200g dengan bumbu kuning + kemangi + tomat. Kukus 30 menit.
3. Tumis kangkung 150g dengan bawang putih dan ½ sdt minyak zaitun. Beri garam dan kecap sedikit.
4. Sajikan bersama.',
50, 510, 48, 10, 62),

(105, 30, 'dinner', '18:00', 'Sop Dada Ayam Sayuran',
'1. Potong 200g dada ayam.
2. Didihkan 700ml air bersama bumbu aromatik dan bawang bombay.
3. Masukkan ayam, buang busa, masak 20 menit.
4. Tambahkan wortel, buncis, kembang kol. Masak 10 menit.
5. Koreksi rasa. Sajikan panas.',
40, 265, 48, 5, 14),

(106, 30, 'snack', '15:00', 'Greek Yogurt Kayu Manis',
'1. Ambil 150g Greek yogurt.
2. Taburi kayu manis dan sedikit madu (½ sdt opsional).
3. Sajikan.',
2, 110, 15, 2, 10),

-- ============================================================
-- FASE 3 MINGGU 8 — 3 hari unik: Ayam Penyet Panggang, Ikan Bakar Kecap, Rawon
-- ============================================================
-- SENIN W8 (dmp_id = 31)
(107, 31, 'breakfast', '07:00', 'Oatmeal Telur Pisang',
'1. Masak 50g oatmeal dengan 300ml air. Tambahkan 30g whey, kayu manis. Sajikan dengan 1 pisang kecil.',
12, 420, 38, 8, 62),

(108, 31, 'lunch', '12:00', 'Ayam Penyet Panggang',
'1. Lumuri 250g dada ayam dengan bumbu: 4 siung bawang putih, 1 ruas kunyit, 1 sdt ketumbar, garam. Panggang 8 menit tiap sisi di teflon tanpa minyak.
2. Sementara ayam dipanggang, buat sambal penyet: ulek 6 cabai merah, 4 cabai rawit, 4 siung bawang merah, 3 siung bawang putih, terasi, garam, dan perasan jeruk nipis. Tumbuk hingga agak kasar.
3. Setelah ayam matang, "penyet" (tekan dan gilas) ayam di atas sambal menggunakan ulekan agar bumbu meresap.
4. Masak 120g beras merah, sajikan dengan lalapan (daun selada, timun, tomat, kacang panjang mentah).',
45, 600, 60, 10, 65),

(109, 31, 'dinner', '18:00', 'Sup Tahu Udang Sawi',
'1. Siapkan 150g udang kupas dan 150g tahu dadu.
2. Didihkan 600ml air dengan bumbu aromatik.
3. Masukkan semua bahan, tambahkan sawi. Masak 10 menit. Koreksi rasa.',
20, 225, 38, 4, 14),

(110, 31, 'snack', '15:00', 'Greek Yogurt Whey',
'1. Campur 150g Greek yogurt + 15g whey. Aduk.',
3, 175, 28, 3, 12),

-- RABU W8 (dmp_id = 32)
(111, 32, 'breakfast', '07:00', 'Roti Gandum Telur Orak-Arik Tomat',
'1. Buat telur orak-arik dari 2 telur utuh dengan ½ sdt minyak zaitun.
2. Panggang 2 lembar roti gandum. Sajikan dengan tomat iris.',
10, 395, 28, 16, 40),

(112, 32, 'lunch', '12:00', 'Ikan Bakar Bumbu Kecap',
'1. Bersihkan 300g ikan kakap/nila. Buat sayatan.
2. Campurkan bumbu bakar kecap: 3 sdm kecap rendah sodium, 2 siung bawang putih parut, 1 sdm saus tiram, ½ sdt jahe parut, 1 sdm air jeruk nipis, merica.
3. Lumuri ikan dengan bumbu, diamkan 20 menit.
4. Bakar/panggang di teflon tanpa minyak, 8 menit tiap sisi. Sambil membakar, olesi sisa bumbu.
5. Sajikan dengan 120g nasi merah, lalapan, dan sambal kecap.',
45, 570, 58, 8, 62),

(113, 32, 'dinner', '18:00', 'Sop Ayam Sayuran',
'1. Rebus 200g dada ayam potong dengan bumbu aromatik 20 menit.
2. Masukkan wortel, buncis, kembang kol. Masak 10 menit.
3. Garam, merica, seledri.',
35, 230, 48, 4, 14),

(114, 32, 'snack', '15:00', 'Shake Whey Pisang',
'1. Blend 30g whey + 1 pisang + 200ml air. Minum segera.',
5, 195, 26, 2, 24),

-- JUMAT W8 (dmp_id = 33)
(115, 33, 'breakfast', '07:00', 'Oatmeal Whey Kayu Manis',
'1. Masak 50g oatmeal + 30g whey + kayu manis. Sajikan hangat.',
8, 380, 44, 6, 48),

(116, 33, 'lunch', '12:00', 'Rawon Kuah dengan Nasi Merah',
'1. Potong 250g dada ayam menjadi dadu besar.
2. Haluskan bumbu rawon: 5 buah kluwek (ambil isinya), 5 siung bawang merah, 4 siung bawang putih, 1 ruas lengkuas, 1 ruas kunyit, 1 ruas jahe, 2 sdt ketumbar, garam.
3. Tumis bumbu rawon dengan ½ sdt minyak zaitun hingga harum (5 menit).
4. Masukkan 1 liter air dan ayam. Masak 40 menit hingga kaldu hitam pekat dan ayam empuk.
5. Koreksi rasa dengan garam dan merica.
6. Sajikan rawon dengan 80g nasi merah dan tauge, telur asin ½ butir, dan sambal terasi.',
60, 550, 55, 12, 55),

(117, 33, 'dinner', '18:00', 'Pepes Nila dengan Bayam Bening',
'1. Buat pepes nila 200g dengan bumbu kuning + kemangi + tomat. Kukus 30 menit.
2. Sayur bayam bening: didihkan air + bayam + garam. Masak 3 menit.',
40, 240, 40, 5, 12),

(118, 33, 'snack', '15:00', 'Greek Yogurt',
'1. Sajikan 150g Greek yogurt dengan kayu manis.',
2, 100, 15, 1, 7),

-- ============================================================
-- FASE 3 MINGGU 9 — 3 hari: Udang Saus Padang, Tempe Mendoan Airfryer, Sop Iga
-- ============================================================
-- SELASA W9 (dmp_id = 34)
(119, 34, 'breakfast', '07:00', 'Roti Gandum Telur Rebus Tomat',
'1. Rebus 2 telur 10 menit. Panggang 2 lembar roti gandum.
2. Iris tomat. Sajikan bersama.',
10, 400, 30, 14, 44),

(120, 34, 'lunch', '12:00', 'Nasi Merah Udang Saus Padang',
'1. Masak 120g beras merah.
2. Kupas 250g udang besar.
3. Haluskan bumbu saus padang: 6 cabai merah, 3 cabai rawit, 4 siung bawang merah, 3 siung bawang putih, 1 buah tomat, 1 ruas jahe, 1 ruas lengkuas, garam.
4. Tumis bumbu dengan ½ sdt minyak zaitun hingga harum. Masukkan udang, masak 5 menit.
5. Tambahkan 2 sdm saus tiram dan sedikit air. Masak 3 menit lagi.
6. Sajikan dengan nasi merah dan lalapan.',
35, 590, 55, 12, 68),

(121, 34, 'dinner', '18:00', 'Sup Tahu Sawi Putih Telur',
'1. Potong tahu 150g dadu, kocok 4 putih telur.
2. Didihkan 600ml air dengan bumbu. Masukkan tahu.
3. Tuang putih telur perlahan sambil diaduk (egg drop). Masukkan sawi.
4. Koreksi rasa.',
20, 195, 32, 4, 12),

(122, 34, 'snack', '15:00', 'Shake Whey',
'1. 30g whey + 250ml air. Kocok dan minum.',
3, 113, 25, 1, 2),

-- KAMIS W9 (dmp_id = 35)
(123, 35, 'breakfast', '07:00', 'Oatmeal Telur Pisang',
'1. Masak 50g oatmeal + 30g whey. Sajikan dengan 1 pisang kecil.',
12, 420, 38, 8, 62),

(124, 35, 'lunch', '12:00', 'Tempe Mendoan Airfryer dengan Nasi Merah dan Sayuran',
'1. Potong 200g tempe tipis-tipis (mendoan). Celupkan ke adonan tepung: 50g tepung gandum utuh + air + bawang putih bubuk + ketumbar + garam + daun bawang iris. Adonan tidak terlalu kental.
2. Masak di airfryer 180°C selama 12 menit, balik di menit ke-6, semprot sedikit air/minyak spray di awal.
3. Masak 120g beras merah.
4. Rebus 100g kangkung 2 menit.
5. Sajikan tempe mendoan, nasi merah, dan kangkung rebus bersama sambal kecap.',
40, 580, 42, 16, 70),

(125, 35, 'dinner', '18:00', 'Sop Ayam Sayuran',
'1. Rebus 200g dada ayam dengan bumbu aromatik. Tambahkan wortel, buncis, kembang kol. Masak hingga empuk.',
35, 230, 48, 4, 14),

(126, 35, 'snack', '15:00', 'Greek Yogurt Whey',
'1. Campur 150g Greek yogurt + 15g whey. Aduk.',
3, 175, 28, 3, 12),

-- SABTU W9 (dmp_id = 36)
(127, 36, 'breakfast', '07:00', 'Bubur Oatmeal Telur Pisang',
'1. Masak 50g oatmeal menjadi bubur kental. Sajikan dengan 1 telur rebus dan 1 pisang.',
15, 380, 18, 9, 60),

(128, 36, 'lunch', '12:00', 'Sop Iga Kuah Bening dengan Nasi Merah',
'1. Gunakan 400g iga ayam (bukan sapi) atau ganti dengan tulang ayam agar lebih diet-friendly.
2. Rebus iga dengan 1,5 liter air bersama bawang putih geprek, bawang bombay, 1 ruas jahe, 1 batang serai, 2 lembar daun salam. Rebus 45-60 menit hingga empuk. Buang busa secara berkala.
3. Masukkan 100g wortel potong, 100g kentang kecil (atau ubi sebagai pengganti untuk lebih sehat), dan 80g daun bawang. Masak 15 menit.
4. Koreksi rasa dengan garam dan merica. Sajikan panas dengan 80g nasi merah terpisah.',
80, 580, 50, 14, 55),

(129, 36, 'dinner', '18:00', 'Ayam Bakar Kecap dengan Selada dan Brokoli',
'1. Marinasi 200g dada ayam dengan kecap + bawang putih + merica. Panggang 8 menit tiap sisi.
2. Kukus 150g brokoli. Siapkan 80g selada romaine.
3. Sajikan bersama.',
35, 355, 50, 7, 22),

(130, 36, 'snack', '15:00', 'Shake Whey Pisang',
'1. Blend 30g whey + 1 pisang + 200ml air.',
5, 195, 26, 2, 24),

-- ============================================================
-- FASE 3 MINGGU 10 — 3 hari: Ayam Rica-Rica, Pecel Sayur, Gurame Bakar
-- ============================================================
-- SENIN W10 (dmp_id = 37)
(131, 37, 'breakfast', '07:00', 'Oatmeal Whey Kayu Manis',
'1. Masak 50g oatmeal + 30g whey + kayu manis. Sajikan.',
8, 380, 44, 6, 48),

(132, 37, 'lunch', '12:00', 'Nasi Merah Ayam Rica-Rica dengan Tumis Brokoli',
'1. Masak 120g beras merah.
2. Haluskan bumbu rica-rica: 8 cabai merah, 5 cabai rawit, 4 siung bawang merah, 3 siung bawang putih, 1 ruas jahe, 1 ruas lengkuas, 1 batang serai, garam.
3. Panggang 250g dada ayam 8 menit tiap sisi.
4. Tumis bumbu rica dengan ½ sdt minyak zaitun hingga harum dan berminyak. Masukkan ayam panggang, aduk merata. Masak 5 menit.
5. Tumis brokoli 150g dengan bawang putih dan ½ sdt minyak zaitun.
6. Sajikan nasi merah, ayam rica, dan tumis brokoli.',
50, 600, 60, 14, 68),

(133, 37, 'dinner', '18:00', 'Sup Udang Tahu Sawi',
'1. Kupas 150g udang, potong 150g tahu dadu, siapkan 100g sawi.
2. Didihkan 600ml air dengan bumbu. Masukkan semua. Masak 10 menit.',
20, 225, 38, 4, 14),

(134, 37, 'snack', '15:00', 'Greek Yogurt',
'1. Sajikan 150g Greek yogurt dengan kayu manis dan sesendok madu.',
2, 110, 15, 2, 10),

-- RABU W10 (dmp_id = 38)
(135, 38, 'breakfast', '07:00', 'Roti Gandum Telur Rebus Tomat',
'1. Rebus 2 telur 10 menit. Panggang 2 lembar roti gandum. Sajikan dengan tomat.',
10, 400, 30, 14, 44),

(136, 38, 'lunch', '12:00', 'Pecel Sayur dengan Nasi Merah',
'1. Rebus: 100g kangkung, 100g tauge, 100g bayam, 80g buncis. Masing-masing 2-5 menit. Tiriskan.
2. Kukus 100g tahu dan 100g tempe.
3. Rebus 1 telur utuh, belah dua.
4. Buat saus kacang pecel: tumbuk 3 sdm selai kacang (45g), 2 buah cabai merah, 1 siung bawang putih, 2 lembar daun jeruk, 1 sdm kecap rendah sodium, garam, gula merah sedikit, air jeruk nipis, dan air secukupnya hingga kental.
5. Masak 120g beras merah.
6. Tata semua sayuran, tahu, tempe, telur di piring. Siram saus kacang. Sajikan dengan nasi merah.',
40, 610, 45, 22, 68),

(137, 38, 'dinner', '18:00', 'Ayam Suwir Sambal Hijau Brokoli',
'1. Rebus dan suwir 200g dada ayam.
2. Tumis sambal hijau, campur dengan ayam suwir.
3. Kukus 150g brokoli.
4. Sajikan bersama.',
40, 295, 50, 8, 14),

(138, 38, 'snack', '15:00', 'Shake Whey',
'1. 30g whey + 250ml air. Kocok.',
3, 113, 25, 1, 2),

-- JUMAT W10 (dmp_id = 39)
(139, 39, 'breakfast', '07:00', 'Oatmeal Telur Pisang',
'1. Masak 50g oatmeal + 30g whey. Sajikan dengan pisang kecil.',
12, 420, 38, 8, 62),

(140, 39, 'lunch', '12:00', 'Ikan Gurame Bakar dengan Nasi Merah dan Lalapan',
'1. Bersihkan 1 ekor ikan gurame (350g utuh, ±200g daging). Buat sayatan melintang.
2. Haluskan bumbu: 4 siung bawang merah, 3 siung bawang putih, 1 ruas kunyit, 1 ruas jahe, ½ sdt ketumbar, garam. Lumuri ikan bagian luar dan dalam. Diamkan 20 menit.
3. Bakar ikan di teflon besar tanpa minyak atau di panggangan arang (lebih enak), 10 menit tiap sisi.
4. Buat sambal dabu-dabu atau sambal terasi sebagai pelengkap.
5. Masak 120g beras merah.
6. Siapkan lalapan: selada, timun, tomat, kacang panjang mentah.
7. Sajikan ikan bakar, nasi merah, sambal, dan lalapan.',
50, 590, 58, 10, 66),

(141, 39, 'dinner', '18:00', 'Sop Dada Ayam Sayuran',
'1. Potong 200g dada ayam. Rebus dengan bumbu aromatik. Tambahkan wortel, buncis, kembang kol. Masak hingga empuk.',
40, 265, 48, 5, 14),

(142, 39, 'snack', '15:00', 'Greek Yogurt Whey',
'1. Campur 150g Greek yogurt + 15g whey.',
3, 175, 28, 3, 12),

-- ============================================================
-- FASE 3 MINGGU 11 — 3 hari: Nasi Uduk, Mie Rebus Ayam, Cumi Tumis Hitam
-- ============================================================
-- SELASA W11 (dmp_id = 40)
(143, 40, 'breakfast', '07:00', 'Roti Gandum Telur Orak-Arik Tomat',
'1. Buat telur orak-arik dari 2 telur dengan ½ sdt minyak zaitun. Panggang 2 roti gandum. Sajikan dengan tomat.',
10, 395, 28, 16, 40),

(144, 40, 'lunch', '12:00', 'Nasi Uduk Santan Encer dengan Ayam Panggang dan Tempe',
'1. Masak nasi uduk: cuci 120g beras merah, rebus dengan 200ml air + 80ml santan encer + 1 batang serai geprek + 1 lembar daun pandan + sedikit garam. Masak tutup api kecil-sedang hingga matang.
2. Panggang 150g dada ayam dengan bumbu kunyit-bawang putih.
3. Kukus atau panggang 80g tempe iris dengan bumbu kecap.
4. Buat sambal kecap: iris 3 cabai rawit, 1 siung bawang merah, + kecap rendah sodium.
5. Sajikan nasi uduk dengan ayam panggang, tempe, dan sambal kecap. Tambahkan kerupuk kulit rendah kalori jika ada.',
60, 620, 48, 18, 68),

(145, 40, 'dinner', '18:00', 'Sup Tahu Udang Sawi',
'1. Kupas 150g udang, potong 150g tahu, siapkan 100g sawi. Rebus dengan bumbu aromatik 10 menit.',
20, 225, 38, 4, 14),

(146, 40, 'snack', '15:00', 'Shake Whey Pisang',
'1. Blend 30g whey + 1 pisang + 200ml air.',
5, 195, 26, 2, 24),

-- KAMIS W11 (dmp_id = 41)
(147, 41, 'breakfast', '07:00', 'Oatmeal Whey Kayu Manis',
'1. Masak 50g oatmeal + 30g whey + kayu manis. Sajikan.',
8, 380, 44, 6, 48),

(148, 41, 'lunch', '12:00', 'Mie Rebus Ayam Sehat',
'1. Gunakan 100g mi gandum utuh kering atau shirataki sebagai pengganti mi biasa.
2. Rebus mi sesuai petunjuk kemasan, tiriskan.
3. Buat kuah: tumis 3 siung bawang putih iris + 1 ruas jahe dengan ½ sdt minyak wijen. Tambahkan 600ml kaldu ayam atau air, 2 sdm kecap asin rendah sodium, 1 sdm saus tiram, garam, merica. Didihkan.
4. Masukkan 200g dada ayam suwir rebus, 80g bayam, dan 80g tauge.
5. Tambahkan irisan daun bawang dan seledri.
6. Sajikan mi dalam kuah panas, masak 120g beras merah sebagai pendamping opsional (atau cukup mi saja).',
35, 560, 48, 12, 62),

(149, 41, 'dinner', '18:00', 'Ayam Rica-Rica dengan Brokoli Kukus',
'1. Haluskan bumbu rica, lumuri dan masak 200g dada ayam panggang bersama bumbu.
2. Kukus 150g brokoli.
3. Sajikan bersama.',
40, 330, 52, 9, 18),

(150, 41, 'snack', '15:00', 'Greek Yogurt',
'1. Sajikan 150g Greek yogurt dengan kayu manis.',
2, 100, 15, 1, 7),

-- SABTU W11 (dmp_id = 42)
(151, 42, 'breakfast', '07:00', 'Bubur Oatmeal Telur Pisang',
'1. Masak 50g oatmeal jadi bubur kental. Sajikan dengan 1 telur rebus dan 1 pisang.',
15, 380, 18, 9, 60),

(152, 42, 'lunch', '12:00', 'Cumi Tumis Hitam (Tinta Cumi) dengan Nasi Merah',
'1. Bersihkan 300g cumi-cumi, pisahkan kantung tinta, potong badan menjadi cincin.
2. Haluskan bumbu: 4 siung bawang merah, 3 siung bawang putih, 3 cabai merah, 1 ruas jahe, garam.
3. Tumis bumbu dengan ½ sdt minyak zaitun hingga harum.
4. Masukkan cumi beserta tinta hitamnya. Aduk rata. Tambahkan sedikit air, 1 sdm kecap, garam.
5. Masak 6-8 menit. Jangan terlalu lama agar cumi tidak alot.
6. Masak 120g beras merah. Sajikan cumi tumis hitam bersama nasi merah dan lalapan.',
35, 590, 52, 14, 65),

(153, 42, 'dinner', '18:00', 'Sup Ayam Sayuran',
'1. Rebus 200g dada ayam potong dengan bumbu aromatik. Tambahkan sayuran. Masak hingga empuk.',
35, 265, 48, 5, 14),

(154, 42, 'snack', '15:00', 'Shake Whey',
'1. 30g whey + 250ml air. Kocok.',
3, 113, 25, 1, 2),

-- ============================================================
-- FASE 3 MINGGU 12 — 3 hari kombinasi favorit
-- ============================================================
-- SENIN W12 (dmp_id = 43)
(155, 43, 'breakfast', '07:00', 'Oatmeal Telur Pisang',
'1. Masak 50g oatmeal + 30g whey. Sajikan dengan 1 pisang kecil dan kayu manis.',
12, 420, 38, 8, 62),

(156, 43, 'lunch', '12:00', 'Nasi Merah Ayam Penyet Panggang Lalapan',
'1. Lumuri dan panggang 250g dada ayam dengan bumbu lengkap. Penyet di atas sambal seperti Minggu 8.
2. Masak 120g beras merah. Sajikan dengan lalapan lengkap.',
45, 600, 60, 10, 65),

(157, 43, 'dinner', '18:00', 'Pepes Nila Bayam Bening',
'1. Buat pepes ikan nila 200g + kemangi + bumbu kuning. Kukus 30 menit. Sajikan dengan bayam bening.',
40, 280, 45, 6, 14),

(158, 43, 'snack', '15:00', 'Greek Yogurt Whey',
'1. Campur 150g Greek yogurt + 15g whey. Sajikan.',
3, 175, 28, 3, 12),

-- RABU W12 (dmp_id = 44)
(159, 44, 'breakfast', '07:00', 'Roti Gandum Telur Rebus Tomat',
'1. Rebus 2 telur. Panggang 2 roti gandum. Sajikan dengan tomat iris.',
10, 400, 30, 14, 44),

(160, 44, 'lunch', '12:00', 'Gado-Gado Tanpa Lontong dengan Nasi Merah',
'1. Siapkan semua sayuran rebus: kangkung, tauge, buncis, bayam.
2. Tahu kukus, tempe kukus, telur rebus, irisan timun.
3. Buat saus kacang dengan selai kacang 2 sdm, kecap, bawang putih, cabai, jeruk nipis, air.
4. Masak 80g beras merah.
5. Tata semua bahan, siram saus kacang. Sajikan dengan nasi merah.',
35, 595, 42, 22, 62),

(161, 44, 'dinner', '18:00', 'Ikan Gurame Bakar dengan Sayuran',
'1. Bakar 1 ekor gurame dengan bumbu kunyit-bawang, 10 menit tiap sisi.
2. Sajikan dengan tumis kangkung dan sambal terasi.',
50, 340, 52, 8, 20),

(162, 44, 'snack', '15:00', 'Shake Whey Pisang',
'1. Blend 30g whey + 1 pisang + 200ml air.',
5, 195, 26, 2, 24),

-- MINGGU W12 (dmp_id = 45)
(163, 45, 'breakfast', '07:00', 'Nasi Goreng Diet',
'1. Gunakan 120g nasi merah dingin.
2. Tumis bawang + cabai + 1 sdt minyak zaitun. Masukkan 100g ayam cincang, 1 telur orak-arik.
3. Campur nasi, tambahkan sayuran dan kecap. Masak 5 menit.',
20, 450, 40, 10, 52),

(164, 45, 'lunch', '12:00', 'Soto Ayam Lengkap dengan Nasi Merah',
'1. Rebus 250g dada ayam dengan bumbu kuning dan rempah. Suwir.
2. Tumis bumbu kuning tersendiri, masukkan ke kaldu.
3. Masak 80g beras merah.
4. Sajikan soto dengan tauge, seledri, daun bawang, nasi merah, dan perasan jeruk nipis.',
50, 485, 52, 9, 52),

(165, 45, 'dinner', '18:00', 'Rawon Ayam Kuah dengan Nasi Merah',
'1. Buat rawon ayam: tumis bumbu rawon (kluwek, bawang, rempah) dengan sedikit minyak zaitun.
2. Masukkan 250g dada ayam potong + 1 liter air. Rebus 40 menit.
3. Sajikan kuah rawon hitam dengan 80g nasi merah, tauge, dan sambal.',
60, 520, 52, 12, 55),

(166, 45, 'snack', '15:00', 'Greek Yogurt Kayu Manis',
'1. Sajikan 150g Greek yogurt dengan kayu manis dan madu sedikit.',
2, 110, 15, 2, 10)
on conflict (id) do nothing;

select setval(pg_get_serial_sequence('meals', 'id'), greatest((select max(id) from meals), 166));

-- ============================================================
-- MEAL INGREDIENTS — FASE 1 SENIN (meal_id 1-4)
-- ============================================================
insert into meal_ingredients (meal_id, food_id, quantity_g, quantity_description, calories_portion, protein_portion, fat_portion, carb_portion) values
-- Meal 1: Omelet Putih Telur Bayam Jamur
(1, 70, 198, '6 putih telur', 103, 65, 0, 0),
(1, 34, 80,  '1 genggam', 18, 2, 0, 3),
(1, 44, 60,  'setengah mangkuk', 13, 2, 0, 2),
-- Meal 2: Dada Ayam Panggang Bumbu Kuning
(2, 2, 250, '250g dada ayam', 468, 75, 18, 0),
(2, 47, 30, '4 siung bawang merah', 22, 0, 0, 5),
(2, 46, 15, '3 siung bawang putih', 22, 1, 0, 5),
(2, 50, 5,  '1 ruas kunyit', 18, 0, 1, 3),
(2, 49, 10, '1 ruas jahe', 8, 0, 0, 2),
(2, 36, 150,'150g brokoli', 53, 4, 1, 11),
(2, 42, 100,'100g timun', 15, 1, 0, 4),
-- Meal 3: Putih Telur Rebus Timun
(3, 70, 132, '4 putih telur', 69, 29, 0, 0),
(3, 42, 100, '100g timun', 15, 1, 0, 4),
-- Meal 4: Sup Udang Bening Sawi
(4, 8, 200, '200g udang', 198, 48, 1, 0),
(4, 75, 150,'150g sawi hijau', 30, 3, 1, 5),
(4, 41, 50, '1 buah tomat', 9, 0, 0, 2),
(4, 81, 20, '2 batang daun bawang', 6, 0, 0, 1),
-- Meal 5: Shake Whey (selasa sarapan)
(5, 66, 30, '1 scoop whey isolate', 110, 25, 1, 1),
-- Meal 6: Pepes Nila Kemangi
(6, 5, 250, '250g ikan nila', 320, 65, 7, 0),
(6, 47, 15, '3 siung bawang merah', 11, 0, 0, 3),
(6, 46, 10, '3 siung bawang putih', 15, 1, 0, 3),
(6, 50, 3,  '1 sdt kunyit', 11, 0, 0, 2),
(6, 49, 10, '1 ruas jahe', 8, 0, 0, 2),
(6, 74, 10, 'segenggam kemangi', 2, 0, 0, 0),
(6, 41, 50, '1 buah tomat', 9, 0, 0, 2),
(6, 35, 100,'100g kangkung rebus', 19, 3, 0, 3),
-- Meal 7: Timun Sambal Terasi (snack selasa)
(7, 42, 150, '150g timun', 23, 1, 0, 5),
-- Meal 8: Tahu Kukus Telur Wortel
(8, 10, 200,'200g tahu putih', 152, 16, 10, 4),
(8, 70, 99, '3 putih telur', 52, 11, 0, 1),
(8, 37, 80, '1 wortel sedang', 33, 1, 0, 8),
-- Meal 9: Putih Telur Ceplok Kecap (rabu sarapan)
(9, 70, 132,'4 putih telur', 69, 29, 0, 0),
(9, 41, 150,'2 buah tomat', 27, 1, 0, 6),
(9, 51, 10, '1 sdt kecap', 5, 1, 0, 0),
-- Meal 10: Sop Dada Ayam Bening
(10, 2, 250,'250g dada ayam', 468, 75, 18, 0),
(10, 37, 100,'100g wortel',41, 1, 0, 10),
(10, 38, 100,'100g buncis',31, 2, 0, 7),
-- Meal 11: Shake Whey (snack rabu)
(11, 66, 30,'1 scoop whey', 110, 25, 1, 1),
-- Meal 12: Tuna Rica atas Selada
(12, 6, 150, '150g tuna', 198, 44, 2, 0),
(12, 40, 100,'100g selada romaine', 17, 1, 0, 3),
(12, 41, 50, 'irisan tomat', 9, 0, 0, 2),
-- Meal 13: Scrambled Putih Telur Paprika
(13, 70, 198,'6 putih telur', 103, 22, 0, 0),
(13, 43, 60, 'setengah paprika', 19, 1, 0, 4),
(13, 44, 60, '60g jamur', 13, 2, 0, 2),
-- Meal 14: Sate Udang Bakar
(14, 8, 300,'300g udang', 297, 72, 1, 1),
(14, 51, 30,'2 sdm kecap', 16, 2, 0, 1),
(14, 40, 80,'daun selada', 14, 1, 0, 3),
(14, 42, 100,'timun',15, 1, 0, 4),
-- Meal 15: Ayam Suwir Sambal Matah
(15, 2, 250,'250g dada ayam', 468, 75, 18, 0),
(15, 47, 25,'5 siung bawang merah', 18, 1, 0, 4),
(15, 36, 200,'200g brokoli kukus', 70, 5, 1, 14),
-- Meal 16: Smoothie Whey Bayam (jumat sarapan)
(16, 66, 30,'1 scoop whey', 110, 25, 1, 1),
(16, 34, 80,'80g bayam', 18, 2, 0, 3),
-- Meal 17: Ikan Kembung Bakar
(17, 71, 250,'250g ikan kembung', 303, 55, 9, 0),
(17, 41, 80,'2 tomat', 14, 1, 0, 3),
(17, 35, 150,'150g kangkung', 29, 4, 0, 5),
-- Meal 18: Sup Tahu Putih Telur Sawi
(18, 10, 150,'150g tahu', 114, 12, 7, 3),
(18, 70, 132,'4 putih telur', 69, 14, 0, 0),
(18, 75, 100,'100g sawi', 20, 2, 0, 4),
(18, 37, 80, '80g wortel', 33, 1, 0, 8),
-- Meal 19: Dada Ayam Rebus Sambal Terasi (sabtu sarapan)
(19, 2, 250,'250g dada ayam', 468, 75, 18, 0),
(19, 40, 80,'selada', 14, 1, 0, 3),
(19, 42, 100,'timun', 15, 1, 0, 4),
-- Meal 20: Tempe Bacem Kukus
(20, 9, 200,'200g tempe', 386, 41, 22, 18),
(20, 51, 15,'1 sdm kecap', 8, 1, 0, 1),
(20, 40, 80,'selada', 14, 1, 0, 3),
-- Meal 21: Nila Kukus Kemangi
(21, 5, 250,'250g nila', 320, 65, 7, 0),
(21, 74, 10,'kemangi', 2, 0, 0, 0),
(21, 34, 150,'150g bayam', 35, 4, 1, 5),
-- Meal 22: Omelet Putih Telur Isi Ayam Cincang (minggu sarapan)
(22, 70, 165,'5 putih telur', 86, 18, 0, 0),
(22, 2, 100,'100g ayam cincang', 187, 30, 7, 0),
-- Meal 23: Capcay Udang Tanpa Minyak
(23, 8, 200,'200g udang', 198, 48, 1, 0),
(23, 36, 80,'80g brokoli', 28, 2, 0, 6),
(23, 79, 80,'80g kembang kol', 20, 2, 0, 4),
(23, 37, 60,'60g wortel', 25, 1, 0, 6),
(23, 75, 60,'60g sawi', 12, 1, 0, 2),
(23, 44, 40,'40g jamur', 9, 1, 0, 1),
-- Meal 24: Ayam Panggang Bumbu Kecap Selada Timun (minggu malam)
(24, 2, 250,'250g dada ayam', 468, 75, 18, 0),
(24, 51, 30,'2 sdm kecap', 16, 2, 0, 1),
(24, 40, 80,'selada', 14, 1, 0, 3),
(24, 42, 100,'timun', 15, 1, 0, 4);

-- FASE 2 key ingredient records (abbreviated per meal, full macro coverage)
insert into meal_ingredients (meal_id, food_id, quantity_g, quantity_description, calories_portion, protein_portion, fat_portion, carb_portion) values
-- Meal 25: Oatmeal Protein W3 Senin sarapan
(25, 24, 40,'40g oatmeal', 152, 5, 3, 27),
(25, 66, 30,'1 scoop whey', 110, 25, 1, 1),
-- Meal 26: Nasi Merah + Ayam Kunyit + Kangkung
(26, 23, 160,'nasi merah matang', 197, 4, 1, 41),
(26, 2, 200,'200g dada ayam', 374, 60, 14, 0),
(26, 47, 30,'bawang merah', 22, 1, 0, 5),
(26, 46, 15,'bawang putih', 22, 1, 0, 5),
(26, 35, 100,'kangkung', 19, 3, 0, 3),
-- Meal 27: Putih Telur Rebus Timun (snack)
(27, 70, 132,'4 putih telur', 69, 14, 0, 0),
(27, 42, 100,'timun', 15, 1, 0, 4),
-- Meal 28: Sup Nila Bening
(28, 5, 200,'200g nila', 256, 52, 5, 0),
(28, 75, 100,'100g sawi', 20, 2, 0, 4),
(28, 41, 60,'tomat', 11, 1, 0, 2),
-- Meal 29: Telur Rebus Tomat Timun
(29, 1, 110,'2 telur utuh', 157, 14, 10, 0),
(29, 41, 100,'2 tomat', 18, 1, 0, 4),
(29, 42, 100,'timun', 15, 1, 0, 4),
-- Meal 30: Ubi Rebus + Tempe Panggang + Lalapan
(30, 25, 150,'150g ubi jalar', 135, 3, 0, 31),
(30, 9, 150,'150g tempe', 290, 30, 16, 13),
(30, 40, 60,'selada', 10, 1, 0, 2),
-- Meal 31: Shake Whey (snack selasa)
(31, 66, 30,'1 scoop whey', 110, 25, 1, 1),
-- Meal 32: Ayam Suwir Sambal Hijau
(32, 2, 200,'200g dada ayam', 374, 60, 14, 0),
(32, 34, 150,'150g bayam', 35, 4, 1, 5),
-- Meal 33: Oatmeal Campur Putih Telur
(33, 24, 40,'40g oatmeal', 152, 5, 3, 27),
(33, 70, 99,'3 putih telur', 52, 11, 0, 0),
-- Meal 34: Nasi Merah Pepes Tuna Buncis
(34, 23, 160,'nasi merah', 197, 4, 1, 41),
(34, 6, 150,'150g tuna', 198, 44, 2, 0),
(34, 74, 10,'kemangi', 2, 0, 0, 0),
(34, 38, 100,'buncis', 31, 2, 0, 7),
-- Meal 35: Udang Tumis Bawang Putih Sawi
(35, 8, 200,'200g udang', 198, 48, 1, 0),
(35, 75, 150,'150g sawi', 30, 3, 1, 5),
(35, 46, 20,'bawang putih', 30, 1, 0, 7),
-- Meal 36: Tahu Telur Kukus
(36, 10, 200,'200g tahu', 152, 16, 10, 4),
(36, 1, 110,'2 telur + 2 putih telur', 157, 14, 10, 0),
(36, 70, 66,'2 putih telur', 34, 7, 0, 0),
-- Meal 37: Nasi Merah Kembung Bakar Bayam
(37, 23, 160,'nasi merah', 197, 4, 1, 41),
(37, 71, 250,'250g kembung', 303, 55, 9, 0),
(37, 34, 150,'bayam', 35, 4, 1, 5),
-- Meal 38: Sop Sayur Dada Ayam
(38, 2, 200,'200g dada ayam', 374, 60, 14, 0),
(38, 37, 80,'wortel', 33, 1, 0, 8),
(38, 79, 80,'kembang kol', 20, 2, 0, 4),
(38, 38, 80,'buncis', 25, 1, 0, 6),
-- Meal 39: Smoothie Whey Pisang Bayam (jumat sarapan)
(39, 66, 30,'1 scoop whey', 110, 25, 1, 1),
(39, 33, 80,'1 pisang kecil', 71, 1, 0, 18),
(39, 34, 50,'50g bayam', 12, 1, 0, 2),
-- Meal 40: Ubi Rebus Ayam Kecap Selada
(40, 25, 150,'150g ubi', 135, 3, 0, 31),
(40, 2, 200,'200g dada ayam', 374, 60, 14, 0),
(40, 51, 30,'kecap', 16, 2, 0, 1),
(40, 40, 80,'selada', 14, 1, 0, 3),
-- Meal 41: Sup Udang Tahu
(41, 8, 150,'150g udang', 149, 36, 0, 0),
(41, 10, 150,'150g tahu', 114, 12, 7, 3),
(41, 37, 80,'wortel', 33, 1, 0, 8),
(41, 75, 80,'sawi', 16, 1, 0, 3),
-- Meal 42: Telur Dadar Putih Telur Tempe Cincang (sabtu sarapan)
(42, 70, 165,'5 putih telur', 86, 18, 0, 0),
(42, 9, 80,'80g tempe', 154, 16, 9, 7),
(42, 51, 10,'kecap', 5, 1, 0, 0),
-- Meal 43: Nasi Merah Nila Panggang Kangkung
(43, 23, 160,'nasi merah', 197, 4, 1, 41),
(43, 5, 200,'200g nila', 256, 52, 5, 0),
(43, 35, 150,'kangkung', 29, 4, 0, 5),
-- Meal 44: Shake Whey (sabtu snack)
(44, 66, 30,'1 scoop whey', 110, 25, 1, 1),
-- Meal 45: Tuna Selada Wrap
(45, 6, 150,'150g tuna', 198, 44, 2, 0),
(45, 40, 100,'selada', 17, 1, 0, 3),
(45, 41, 50,'tomat', 9, 0, 0, 2),
-- Meal 46: Oatmeal Protein (minggu sarapan)
(46, 24, 40,'40g oatmeal', 152, 5, 3, 27),
(46, 66, 30,'1 scoop whey', 110, 25, 1, 1),
-- Meal 47: Soto Ayam Tanpa Santan
(47, 2, 250,'250g dada ayam', 468, 75, 18, 0),
(47, 76, 80,'tauge', 24, 2, 0, 5),
(47, 80, 20,'seledri', 3, 0, 0, 1),
-- Meal 48: Tempe Panggang Capcay Udang
(48, 9, 150,'150g tempe', 290, 30, 16, 13),
(48, 8, 150,'150g udang', 149, 36, 0, 0),
(48, 36, 60,'brokoli', 21, 1, 0, 4),
(48, 37, 60,'wortel', 25, 1, 0, 6),
(48, 75, 60,'sawi', 12, 1, 0, 2);

-- Fase 2 Minggu 4-6 ingredients (simplified key items)
insert into meal_ingredients (meal_id, food_id, quantity_g, quantity_description, calories_portion, protein_portion, fat_portion, carb_portion) values
(49, 24, 40,'oatmeal', 152, 5, 3, 27),(49, 66, 30,'whey', 110, 25, 1, 1),
(50, 23, 160,'nasi merah', 197, 4, 1, 41),(50, 2, 200,'dada ayam', 374, 60, 14, 0),(50, 35, 100,'kangkung', 19, 3, 0, 3),
(51, 70, 132,'4 putih telur', 69, 14, 0, 0),(51, 42, 100,'timun', 15, 1, 0, 4),
(52, 72, 200,'200g ikan kakap', 200, 41, 3, 0),(52, 75, 100,'sawi', 20, 2, 0, 4),
(53, 24, 40,'oatmeal', 152, 5, 3, 27),(53, 70, 99,'3 putih telur', 52, 11, 0, 0),
(54, 23, 160,'nasi merah', 197, 4, 1, 41),(54, 72, 200,'200g ikan kakap', 200, 41, 3, 0),(54, 38, 100,'buncis', 31, 2, 0, 7),
(55, 8, 200,'udang', 198, 48, 1, 0),(55, 75, 150,'sawi', 30, 3, 1, 5),
(56, 66, 30,'whey', 110, 25, 1, 1),(56, 33, 80,'pisang', 71, 1, 0, 18),(56, 34, 50,'bayam', 12, 1, 0, 2),
(57, 25, 150,'ubi jalar', 135, 3, 0, 31),(57, 72, 200,'ikan kakap', 200, 41, 3, 0),(57, 40, 80,'selada', 14, 1, 0, 3),
(58, 72, 150,'ikan kakap', 150, 31, 2, 0),(58, 10, 150,'tahu', 114, 12, 7, 3),(58, 75, 80,'sawi', 16, 1, 0, 3),
(59, 1, 110,'2 telur', 157, 14, 10, 0),(59, 41, 100,'tomat', 18, 1, 0, 4),(59, 42, 100,'timun', 15, 1, 0, 4),
(60, 25, 150,'ubi jalar', 135, 3, 0, 31),(60, 73, 250,'250g cumi', 230, 39, 3, 8),
(61, 66, 30,'whey', 110, 25, 1, 1),
(62, 2, 200,'dada ayam', 374, 60, 14, 0),(62, 34, 150,'bayam', 35, 4, 1, 5),
(63, 10, 200,'tahu', 152, 16, 10, 4),(63, 1, 55,'1 telur', 79, 7, 5, 0),(63, 70, 66,'2 putih telur', 34, 7, 0, 0),
(64, 23, 160,'nasi merah', 197, 4, 1, 41),(64, 73, 200,'200g cumi', 184, 31, 2, 6),
(65, 2, 200,'dada ayam', 374, 60, 14, 0),(65, 37, 80,'wortel', 33, 1, 0, 8),(65, 38, 80,'buncis', 25, 1, 0, 6),
(66, 70, 165,'5 putih telur', 86, 18, 0, 0),(66, 9, 80,'tempe', 154, 16, 9, 7),
(67, 23, 160,'nasi merah', 197, 4, 1, 41),(67, 73, 200,'cumi', 184, 31, 2, 6),(67, 35, 100,'kangkung', 19, 3, 0, 3),
(68, 66, 30,'whey', 110, 25, 1, 1),
(69, 8, 200,'udang', 198, 48, 1, 0),(69, 75, 150,'sawi', 30, 3, 1, 5),
(70, 24, 40,'oatmeal', 152, 5, 3, 27),(70, 66, 30,'whey', 110, 25, 1, 1),
(71, 23, 160,'nasi merah', 197, 4, 1, 41),(71, 2, 200,'dada ayam', 374, 60, 14, 0),(71, 36, 150,'brokoli', 53, 4, 1, 11),
(72, 8, 150,'udang', 149, 36, 0, 0),(72, 10, 150,'tahu', 114, 12, 7, 3),(72, 75, 100,'sawi', 20, 2, 0, 4),
(73, 66, 30,'whey', 110, 25, 1, 1),(73, 34, 80,'bayam', 18, 2, 0, 3),
(74, 23, 160,'nasi merah', 197, 4, 1, 41),(74, 5, 250,'nila', 320, 65, 7, 0),(74, 74, 10,'kemangi', 2, 0, 0, 0),
(75, 73, 200,'cumi', 184, 31, 2, 6),(75, 75, 100,'sawi', 20, 2, 0, 4),
(76, 24, 40,'oatmeal', 152, 5, 3, 27),(76, 66, 30,'whey', 110, 25, 1, 1),
(77, 2, 250,'dada ayam', 468, 75, 18, 0),(77, 76, 80,'tauge', 24, 2, 0, 5),
(78, 9, 150,'tempe', 290, 30, 16, 13),(78, 8, 150,'udang', 149, 36, 0, 0),(78, 36, 60,'brokoli', 21, 1, 0, 4);

-- Fase 3 Minggu 7 ingredients (key items)
insert into meal_ingredients (meal_id, food_id, quantity_g, quantity_description, calories_portion, protein_portion, fat_portion, carb_portion) values
(79, 24, 50,'50g oatmeal', 190, 7, 3, 34),(79, 1, 55,'1 telur utuh', 79, 7, 5, 0),(79, 70, 132,'4 putih telur', 69, 14, 0, 0),(79, 33, 80,'1 pisang kecil', 71, 1, 0, 18),
(80, 23, 240,'nasi merah', 295, 6, 2, 61),(80, 2, 200,'dada ayam', 374, 60, 14, 0),(80, 36, 150,'brokoli', 53, 4, 1, 11),(80, 42, 100,'timun', 15, 1, 0, 4),(80, 53, 5,'minyak zaitun', 44, 0, 5, 0),
(81, 5, 200,'nila', 256, 52, 5, 0),(81, 34, 150,'bayam', 35, 4, 1, 5),(81, 10, 150,'tahu', 114, 12, 7, 3),
(82, 67, 150,'Greek yogurt', 89, 15, 1, 5),(82, 66, 15,'setengah scoop whey', 55, 12, 0, 1),
(83, 19, 60,'2 lembar roti gandum', 148, 7, 2, 25),(83, 1, 110,'2 telur', 157, 14, 10, 0),(83, 41, 100,'2 tomat', 18, 1, 0, 4),
(84, 23, 240,'nasi merah', 295, 6, 2, 61),(84, 9, 200,'tempe', 386, 41, 22, 18),(84, 38, 80,'kacang panjang', 38, 2, 0, 7),(84, 21, 60,'jagung', 58, 2, 1, 13),(84, 77, 80,'labu siam', 13, 1, 0, 3),
(85, 2, 200,'dada ayam', 374, 60, 14, 0),(85, 63, 15,'1 sdm madu', 46, 0, 0, 12),(85, 40, 80,'selada', 14, 1, 0, 3),(85, 42, 100,'timun', 15, 1, 0, 4),
(86, 66, 30,'whey', 110, 25, 1, 1),(86, 33, 80,'pisang', 71, 1, 0, 18),
(87, 24, 50,'50g oatmeal', 190, 7, 3, 34),(87, 66, 30,'whey', 110, 25, 1, 1),
(88, 35, 100,'kangkung', 19, 3, 0, 3),(88, 76, 100,'tauge', 30, 3, 0, 6),(88, 38, 100,'buncis', 31, 2, 0, 7),(88, 10, 100,'tahu', 76, 8, 5, 2),(88, 9, 100,'tempe', 193, 20, 11, 9),(88, 1, 55,'1 telur', 79, 7, 5, 0),(88, 55, 32,'2 sdm selai kacang', 188, 8, 16, 6),(88, 42, 100,'timun', 15, 1, 0, 4),
(89, 72, 200,'ikan kakap', 200, 41, 3, 0),(89, 23, 160,'nasi merah', 197, 4, 1, 41),(89, 36, 150,'brokoli', 53, 4, 1, 11),
(90, 70, 132,'4 putih telur', 69, 14, 0, 0),(90, 42, 100,'timun', 15, 1, 0, 4),
(91, 23, 120,'nasi merah dingin', 148, 3, 1, 31),(91, 2, 100,'ayam cincang', 187, 30, 7, 0),(91, 1, 55,'1 telur', 79, 7, 5, 0),(91, 37, 60,'wortel', 25, 1, 0, 6),(91, 53, 5,'minyak zaitun', 44, 0, 5, 0),
(92, 25, 150,'ubi jalar', 135, 3, 0, 31),(92, 8, 250,'250g udang', 248, 60, 1, 1),(92, 40, 60,'selada', 10, 1, 0, 2),
(93, 2, 200,'dada ayam', 374, 60, 14, 0),(93, 23, 120,'sedikit nasi merah', 148, 3, 1, 31),(93, 76, 80,'tauge', 24, 2, 0, 5),
(94, 67, 150,'Greek yogurt', 89, 15, 1, 5),
(95, 1, 110,'2 telur', 157, 14, 10, 0),(95, 19, 60,'2 roti gandum', 148, 7, 2, 25),(95, 41, 100,'tomat', 18, 1, 0, 4),(95, 53, 5,'minyak zaitun', 44, 0, 5, 0),
(96, 23, 240,'nasi merah', 295, 6, 2, 61),(96, 2, 200,'dada ayam', 374, 60, 14, 0),(96, 51, 30,'kecap', 16, 2, 0, 1),(96, 36, 60,'brokoli', 21, 1, 0, 4),(96, 37, 60,'wortel', 25, 1, 0, 6),(96, 75, 60,'sawi', 12, 1, 0, 2),(96, 78, 4,'minyak wijen', 35, 0, 4, 0),
(97, 8, 150,'udang', 149, 36, 0, 0),(97, 10, 150,'tahu', 114, 12, 7, 3),(97, 37, 80,'wortel', 33, 1, 0, 8),(97, 75, 80,'sawi', 16, 1, 0, 3),
(98, 66, 30,'whey', 110, 25, 1, 1),
(99, 24, 50,'50g oatmeal', 190, 7, 3, 34),(99, 1, 55,'1 telur', 79, 7, 5, 0),(99, 33, 80,'pisang', 71, 1, 0, 18),
(100, 23, 240,'nasi merah', 295, 6, 2, 61),(100, 71, 250,'kembung', 303, 55, 9, 0),(100, 34, 150,'bayam', 35, 4, 1, 5),
(101, 2, 200,'dada ayam', 374, 60, 14, 0),(101, 47, 25,'bawang merah', 18, 1, 0, 4),(101, 40, 80,'selada', 14, 1, 0, 3),(101, 42, 100,'timun', 15, 1, 0, 4),
(102, 66, 30,'whey', 110, 25, 1, 1),
(103, 23, 120,'nasi merah', 148, 3, 1, 31),(103, 10, 100,'tahu', 76, 8, 5, 2),(103, 1, 55,'1 telur', 79, 7, 5, 0),(103, 77, 100,'labu siam', 16, 1, 0, 4),
(104, 23, 240,'nasi merah', 295, 6, 2, 61),(104, 5, 200,'nila', 256, 52, 5, 0),(104, 74, 10,'kemangi', 2, 0, 0, 0),(104, 35, 150,'kangkung', 29, 4, 0, 5),(104, 53, 5,'minyak zaitun', 44, 0, 5, 0),
(105, 2, 200,'dada ayam', 374, 60, 14, 0),(105, 37, 80,'wortel', 33, 1, 0, 8),(105, 38, 80,'buncis', 25, 1, 0, 6),(105, 79, 80,'kembang kol', 20, 2, 0, 4),
(106, 67, 150,'Greek yogurt', 89, 15, 1, 5);

-- Fase 3 Minggu 8-12 key ingredients (abbreviated)
insert into meal_ingredients (meal_id, food_id, quantity_g, quantity_description, calories_portion, protein_portion, fat_portion, carb_portion) values
(107, 24, 50,'oatmeal', 190, 7, 3, 34),(107, 66, 30,'whey', 110, 25, 1, 1),(107, 33, 80,'pisang', 71, 1, 0, 18),
(108, 2, 250,'dada ayam', 468, 75, 18, 0),(108, 23, 240,'nasi merah', 295, 6, 2, 61),(108, 40, 60,'selada', 10, 1, 0, 2),
(109, 8, 150,'udang', 149, 36, 0, 0),(109, 10, 150,'tahu', 114, 12, 7, 3),(109, 75, 100,'sawi', 20, 2, 0, 4),
(110, 67, 150,'Greek yogurt', 89, 15, 1, 5),(110, 66, 15,'whey', 55, 12, 0, 1),
(111, 1, 110,'2 telur', 157, 14, 10, 0),(111, 19, 60,'2 roti gandum', 148, 7, 2, 25),(111, 41, 100,'tomat', 18, 1, 0, 4),(111, 53, 5,'minyak zaitun', 44, 0, 5, 0),
(112, 72, 300,'300g ikan kakap', 300, 62, 5, 0),(112, 51, 45,'3 sdm kecap', 24, 2, 0, 2),(112, 23, 240,'nasi merah', 295, 6, 2, 61),
(113, 2, 200,'dada ayam', 374, 60, 14, 0),(113, 37, 80,'wortel', 33, 1, 0, 8),(113, 38, 80,'buncis', 25, 1, 0, 6),
(114, 66, 30,'whey', 110, 25, 1, 1),(114, 33, 80,'pisang', 71, 1, 0, 18),
(115, 24, 50,'oatmeal', 190, 7, 3, 34),(115, 66, 30,'whey', 110, 25, 1, 1),
(116, 2, 250,'dada ayam (rawon)', 468, 75, 18, 0),(116, 23, 160,'nasi merah', 197, 4, 1, 41),(116, 76, 80,'tauge', 24, 2, 0, 5),
(117, 5, 200,'nila', 256, 52, 5, 0),(117, 34, 150,'bayam', 35, 4, 1, 5),
(118, 67, 150,'Greek yogurt', 89, 15, 1, 5),
(119, 19, 60,'2 roti gandum', 148, 7, 2, 25),(119, 1, 110,'2 telur', 157, 14, 10, 0),(119, 41, 100,'tomat', 18, 1, 0, 4),
(120, 23, 240,'nasi merah', 295, 6, 2, 61),(120, 8, 250,'udang saus padang', 248, 60, 1, 1),(120, 52, 30,'saus tiram', 15, 0, 0, 3),(120, 53, 5,'minyak zaitun', 44, 0, 5, 0),
(121, 10, 150,'tahu', 114, 12, 7, 3),(121, 70, 132,'4 putih telur', 69, 14, 0, 0),(121, 75, 100,'sawi', 20, 2, 0, 4),
(122, 66, 30,'whey', 110, 25, 1, 1),
(123, 24, 50,'oatmeal', 190, 7, 3, 34),(123, 66, 30,'whey', 110, 25, 1, 1),(123, 33, 80,'pisang', 71, 1, 0, 18),
(124, 9, 200,'tempe', 386, 41, 22, 18),(124, 23, 240,'nasi merah', 295, 6, 2, 61),(124, 35, 100,'kangkung', 19, 3, 0, 3),
(125, 2, 200,'dada ayam', 374, 60, 14, 0),(125, 37, 80,'wortel', 33, 1, 0, 8),(125, 38, 80,'buncis', 25, 1, 0, 6),
(126, 67, 150,'Greek yogurt', 89, 15, 1, 5),(126, 66, 15,'whey', 55, 12, 0, 1),
(127, 24, 50,'oatmeal', 190, 7, 3, 34),(127, 1, 55,'1 telur', 79, 7, 5, 0),(127, 33, 80,'pisang', 71, 1, 0, 18),
(128, 3, 400,'iga/paha ayam', 836, 104, 44, 0),(128, 37, 100,'wortel', 41, 1, 0, 10),(128, 23, 160,'sedikit nasi merah', 197, 4, 1, 41),
(129, 2, 200,'dada ayam', 374, 60, 14, 0),(129, 51, 30,'kecap', 16, 2, 0, 1),(129, 36, 150,'brokoli', 53, 4, 1, 11),(129, 40, 80,'selada', 14, 1, 0, 3),
(130, 66, 30,'whey', 110, 25, 1, 1),(130, 33, 80,'pisang', 71, 1, 0, 18),
(131, 24, 50,'oatmeal', 190, 7, 3, 34),(131, 66, 30,'whey', 110, 25, 1, 1),
(132, 23, 240,'nasi merah', 295, 6, 2, 61),(132, 2, 250,'dada ayam rica', 468, 75, 18, 0),(132, 36, 150,'brokoli', 53, 4, 1, 11),(132, 53, 5,'minyak zaitun', 44, 0, 5, 0),
(133, 8, 150,'udang', 149, 36, 0, 0),(133, 10, 150,'tahu', 114, 12, 7, 3),(133, 75, 100,'sawi', 20, 2, 0, 4),
(134, 67, 150,'Greek yogurt', 89, 15, 1, 5),(134, 63, 5,'madu sedikit', 15, 0, 0, 4),
(135, 19, 60,'2 roti gandum', 148, 7, 2, 25),(135, 1, 110,'2 telur', 157, 14, 10, 0),(135, 41, 100,'tomat', 18, 1, 0, 4),
(136, 35, 100,'kangkung', 19, 3, 0, 3),(136, 76, 100,'tauge', 30, 3, 0, 6),(136, 34, 100,'bayam', 23, 3, 0, 4),(136, 38, 80,'buncis', 25, 1, 0, 6),(136, 10, 100,'tahu', 76, 8, 5, 2),(136, 9, 100,'tempe', 193, 20, 11, 9),(136, 1, 55,'1 telur', 79, 7, 5, 0),(136, 55, 45,'3 sdm selai kacang', 265, 11, 23, 9),(136, 23, 240,'nasi merah', 295, 6, 2, 61),
(137, 2, 200,'dada ayam', 374, 60, 14, 0),(137, 36, 150,'brokoli', 53, 4, 1, 11),
(138, 66, 30,'whey', 110, 25, 1, 1),
(139, 24, 50,'oatmeal', 190, 7, 3, 34),(139, 66, 30,'whey', 110, 25, 1, 1),(139, 33, 80,'pisang', 71, 1, 0, 18),
(140, 23, 240,'nasi merah', 295, 6, 2, 61),(140, 5, 200,'gurame/nila', 256, 52, 5, 0),(140, 40, 60,'selada', 10, 1, 0, 2),
(141, 2, 200,'dada ayam', 374, 60, 14, 0),(141, 37, 80,'wortel', 33, 1, 0, 8),(141, 38, 80,'buncis', 25, 1, 0, 6),(141, 79, 80,'kembang kol', 20, 2, 0, 4),
(142, 67, 150,'Greek yogurt', 89, 15, 1, 5),(142, 66, 15,'whey', 55, 12, 0, 1),
(143, 19, 60,'2 roti gandum', 148, 7, 2, 25),(143, 1, 110,'2 telur', 157, 14, 10, 0),(143, 41, 100,'tomat', 18, 1, 0, 4),(143, 53, 5,'minyak zaitun', 44, 0, 5, 0),
(144, 23, 240,'nasi uduk merah', 295, 6, 2, 61),(144, 2, 150,'dada ayam', 281, 45, 11, 0),(144, 9, 80,'tempe', 154, 16, 9, 7),(144, 51, 30,'kecap', 16, 2, 0, 1),
(145, 8, 150,'udang', 149, 36, 0, 0),(145, 10, 150,'tahu', 114, 12, 7, 3),(145, 75, 100,'sawi', 20, 2, 0, 4),
(146, 66, 30,'whey', 110, 25, 1, 1),(146, 33, 80,'pisang', 71, 1, 0, 18),
(147, 24, 50,'oatmeal', 190, 7, 3, 34),(147, 66, 30,'whey', 110, 25, 1, 1),
(148, 2, 200,'dada ayam suwir', 374, 60, 14, 0),(148, 34, 80,'bayam', 18, 2, 0, 3),(148, 76, 80,'tauge', 24, 2, 0, 5),(148, 78, 4,'minyak wijen', 35, 0, 4, 0),
(149, 2, 200,'dada ayam', 374, 60, 14, 0),(149, 36, 150,'brokoli', 53, 4, 1, 11),
(150, 67, 150,'Greek yogurt', 89, 15, 1, 5),
(151, 24, 50,'oatmeal', 190, 7, 3, 34),(151, 1, 55,'1 telur', 79, 7, 5, 0),(151, 33, 80,'pisang', 71, 1, 0, 18),
(152, 73, 300,'300g cumi', 276, 47, 4, 9),(152, 23, 240,'nasi merah', 295, 6, 2, 61),(152, 53, 5,'minyak zaitun', 44, 0, 5, 0),
(153, 2, 200,'dada ayam', 374, 60, 14, 0),(153, 37, 80,'wortel', 33, 1, 0, 8),(153, 75, 80,'sawi', 16, 1, 0, 3),
(154, 66, 30,'whey', 110, 25, 1, 1),
(155, 24, 50,'oatmeal', 190, 7, 3, 34),(155, 66, 30,'whey', 110, 25, 1, 1),(155, 33, 80,'pisang', 71, 1, 0, 18),
(156, 2, 250,'dada ayam', 468, 75, 18, 0),(156, 23, 240,'nasi merah', 295, 6, 2, 61),(156, 40, 60,'selada', 10, 1, 0, 2),
(157, 5, 200,'nila', 256, 52, 5, 0),(157, 34, 150,'bayam', 35, 4, 1, 5),(157, 74, 10,'kemangi', 2, 0, 0, 0),
(158, 67, 150,'Greek yogurt', 89, 15, 1, 5),(158, 66, 15,'whey', 55, 12, 0, 1),
(159, 19, 60,'2 roti gandum', 148, 7, 2, 25),(159, 1, 110,'2 telur', 157, 14, 10, 0),(159, 41, 100,'tomat', 18, 1, 0, 4),
(160, 35, 100,'kangkung', 19, 3, 0, 3),(160, 76, 100,'tauge', 30, 3, 0, 6),(160, 10, 100,'tahu', 76, 8, 5, 2),(160, 9, 100,'tempe', 193, 20, 11, 9),(160, 1, 55,'1 telur', 79, 7, 5, 0),(160, 55, 32,'2 sdm selai kacang', 188, 8, 16, 6),(160, 23, 160,'sedikit nasi merah', 197, 4, 1, 41),
(161, 5, 200,'gurame/nila', 256, 52, 5, 0),(161, 35, 100,'kangkung', 19, 3, 0, 3),
(162, 66, 30,'whey', 110, 25, 1, 1),(162, 33, 80,'pisang', 71, 1, 0, 18),
(163, 23, 120,'nasi merah', 148, 3, 1, 31),(163, 2, 100,'ayam cincang', 187, 30, 7, 0),(163, 1, 55,'1 telur', 79, 7, 5, 0),(163, 53, 5,'minyak zaitun', 44, 0, 5, 0),
(164, 2, 250,'dada ayam', 468, 75, 18, 0),(164, 23, 160,'nasi merah', 197, 4, 1, 41),(164, 76, 80,'tauge', 24, 2, 0, 5),
(165, 2, 250,'dada ayam rawon', 468, 75, 18, 0),(165, 23, 160,'nasi merah', 197, 4, 1, 41),(165, 76, 80,'tauge', 24, 2, 0, 5),
(166, 67, 150,'Greek yogurt', 89, 15, 1, 5),(166, 63, 5,'madu sedikit', 15, 0, 0, 4);
