-- 008_seed_meals_phase5.sql
-- Seed hasil sinkronisasi task spec untuk Fase 5 — Maintenance & Rekomposisi

insert into foods (id, name, name_en, calories_per_100g, protein_per_100g, fat_per_100g, carb_per_100g, fiber_per_100g, serving_size_g, serving_description, category)
values
  (91, 'Nasi uduk', 'Coconut rice', 178, 3.0, 5.0, 30.0, 0.5, 100, '100 g matang', 'karbohidrat'),
  (92, 'Kerupuk udang', 'Shrimp crackers', 450, 5.0, 22.0, 58.0, 0, 15, '3 keping', 'lainnya'),
  (93, 'Bakso sapi', 'Beef meatball', 202, 14.0, 10.0, 15.0, 0, 100, '100 g (5 biji)', 'protein_hewani'),
  (94, 'Mie telur matang', 'Cooked egg noodles', 138, 4.5, 2.0, 25.0, 1.0, 100, '100 g matang', 'karbohidrat'),
  (95, 'Tahu goreng', 'Fried tofu', 270, 17.0, 20.0, 6.0, 1.0, 100, '100 g', 'protein_nabati'),
  (96, 'Mangga', 'Mango', 60, 0.8, 0.4, 15.0, 1.6, 150, '1 buah sedang', 'lainnya'),
  (97, 'Nangka matang', 'Ripe jackfruit', 95, 1.7, 0.6, 23.3, 1.5, 100, '100 g', 'lainnya'),
  (98, 'Gula merah', 'Palm sugar', 375, 0.3, 0, 93.0, 0, 10, '1 sdm', 'bumbu'),
  (99, 'Kecap manis', 'Sweet soy sauce', 290, 1.0, 0, 68.0, 0, 15, '1 sdm', 'bumbu')
on conflict (id) do nothing;

with phase_ref as (
  select id as phase_id from phases where phase_number = 5 limit 1
), plan_seed(day_number, day_name) as (
values
  (1, 'Senin'),
  (2, 'Selasa'),
  (3, 'Rabu'),
  (4, 'Kamis'),
  (5, 'Jumat'),
  (6, 'Sabtu'),
  (7, 'Minggu')
)
insert into daily_meal_plans (phase_id, day_number, day_name)
select phase_ref.phase_id, plan_seed.day_number, plan_seed.day_name
from phase_ref cross join plan_seed
on conflict (phase_id, day_number)
do update set day_name = excluded.day_name;

with phase_ref as (
  select id as phase_id from phases where phase_number = 5 limit 1
)
delete from meals
where daily_meal_plan_id in (
  select id from daily_meal_plans where phase_id = (select phase_id from phase_ref)
);

with phase_ref as (
  select id as phase_id from phases where phase_number = 5 limit 1
), meal_seed(day_number, meal_type, time_scheduled, sort_order, meal_name, description, recipe_instructions, prep_time_minutes, calories, protein, carbs, fat, image_url) as (
values
  (1, 'breakfast', '07:00', 1, 'Nasi Goreng Telur Sayur', 'Sarapan khas Indonesia untuk fase 5 dengan fokus maintenance dan rekomposisi tubuh. Menu: Nasi Goreng Telur Sayur.', '1. Panaskan 5ml minyak zaitun di wajan, tumis bawang merah dan bawang putih iris.
2. Masukkan 100g sayur campur (wortel, buncis, kol iris), tumis 2 menit.
3. Kocok 2 butir telur, tuang ke wajan, orak-arik hingga matang.
4. Masukkan 150g nasi putih dingin, 1 sdm kecap manis, garam, merica.
5. Aduk rata api besar 2-3 menit. Sajikan dengan irisan timun.', 15, 520, 26, 62, 18, null),
  (1, 'snack', '10:00', 2, 'Smoothie Pisang Oat', 'Snack khas Indonesia untuk fase 5 dengan fokus maintenance dan rekomposisi tubuh. Menu: Smoothie Pisang Oat.', '1. Kupas 1 pisang sedang (100g), potong-potong.
2. Masukkan pisang, 40g oatmeal, 200ml susu skim ke blender.
3. Tambahkan 1 sdm madu (5g) dan 3 es batu.
4. Blender 30 detik hingga halus.
5. Tuang ke gelas besar dan nikmati.', 5, 340, 16, 62, 4, null),
  (1, 'lunch', '12:30', 3, 'Nasi Pepes Ikan Nila dengan Lalapan', 'Makan siang khas Indonesia untuk fase 5 dengan fokus maintenance dan rekomposisi tubuh. Menu: Nasi Pepes Ikan Nila dengan Lalapan.', '1. Bersihkan 200g ikan nila, lumuri garam dan perasan jeruk nipis.
2. Haluskan bumbu: 4 bawang merah, 3 bawang putih, 3 cabai, 1 ruas kunyit, jahe, kemiri.
3. Campurkan bumbu dengan ikan, tambah kemangi. Bungkus daun pisang.
4. Kukus 30 menit hingga matang. Masak 150g nasi putih.
5. Sajikan pepes dengan nasi, lalapan (timun, kemangi, kol), dan sambal.', 40, 530, 48, 56, 10, null),
  (1, 'snack', '15:30', 4, 'Roti Gandum Selai Kacang Pisang', 'Snack khas Indonesia untuk fase 5 dengan fokus maintenance dan rekomposisi tubuh. Menu: Roti Gandum Selai Kacang Pisang.', '1. Panggang 2 lembar roti gandum (60g) hingga renyah.
2. Oleskan 1 sdm selai kacang (16g) di satu sisi.
3. Iris ½ pisang tipis, tata di atas selai kacang.
4. Tutup dengan roti kedua, tekan perlahan.
5. Potong diagonal dan sajikan.', 5, 310, 16, 40, 12, null),
  (1, 'dinner', '19:00', 5, 'Soto Ayam Lengkap', 'Makan malam khas Indonesia untuk fase 5 dengan fokus maintenance dan rekomposisi tubuh. Menu: Soto Ayam Lengkap.', '1. Rebus 150g dada ayam dalam 500ml air bersama serai, daun salam, lengkuas, 20 menit.
2. Angkat ayam, suwir. Tumis bumbu halus (kunyit, bawang putih, bawang merah) dengan 5ml minyak.
3. Masukkan tumisan ke kuah. Tambahkan 50g soun rendam, tauge, kol iris.
4. Rebus 1 telur, kupas, belah dua.
5. Sajikan soto dengan suwiran ayam, telur, perasan jeruk nipis, bawang goreng, 80g nasi.', 35, 400, 30, 20, 14, null),
  (2, 'breakfast', '07:00', 1, 'Oatmeal Telur dan Pisang', 'Sarapan khas Indonesia untuk fase 5 dengan fokus maintenance dan rekomposisi tubuh. Menu: Oatmeal Telur dan Pisang.', '1. Masak 50g oatmeal dengan 200ml susu skim hingga mengental.
2. Goreng 1 telur mata sapi dengan 5ml minyak zaitun di teflon terpisah.
3. Iris 1 pisang sedang (100g).
4. Sajikan oatmeal, tata pisang iris di atas, letakkan telur mata sapi di samping.
5. Taburi dengan sedikit kayu manis dan madu.', 10, 460, 24, 62, 14, null),
  (2, 'snack', '10:00', 2, 'Edamame Rebus', 'Snack khas Indonesia untuk fase 5 dengan fokus maintenance dan rekomposisi tubuh. Menu: Edamame Rebus.', '1. Rebus 150g edamame berkulit dalam air bergaram mendidih 5 menit.
2. Tiriskan dan biarkan hangat.
3. Taburi garam laut dan sedikit cabai bubuk.
4. Sajikan dalam mangkuk.
5. Makan langsung dari kulit.', 10, 180, 18, 13, 8, null),
  (2, 'lunch', '12:30', 3, 'Nasi Ayam Bumbu Kuning dengan Sayur Asem', 'Makan siang khas Indonesia untuk fase 5 dengan fokus maintenance dan rekomposisi tubuh. Menu: Nasi Ayam Bumbu Kuning dengan Sayur Asem.', '1. Masak 150g nasi putih.
2. Marinasi 200g paha ayam tanpa kulit dengan bumbu kunyit, bawang putih, garam. Panggang di teflon 5ml minyak.
3. Buat sayur asem: rebus 100ml air, masukkan 50g jagung, 50g kacang panjang, 30g labu siam, asam jawa, gula merah.
4. Masak sayur 15 menit hingga empuk.
5. Sajikan nasi, ayam bumbu kuning, dan sayur asem.', 35, 640, 48, 68, 18, null),
  (2, 'snack', '15:30', 4, 'Greek Yogurt Madu Almond', 'Snack khas Indonesia untuk fase 5 dengan fokus maintenance dan rekomposisi tubuh. Menu: Greek Yogurt Madu Almond.', '1. Tuang 150g Greek yogurt ke mangkuk.
2. Teteskan 1 sdt madu.
3. Taburkan 20g kacang almond cincang.
4. Aduk ringan.
5. Sajikan dingin.', 3, 220, 18, 15, 12, null),
  (2, 'dinner', '19:00', 5, 'Tumis Tahu Tempe Kecap dengan Nasi Merah', 'Makan malam khas Indonesia untuk fase 5 dengan fokus maintenance dan rekomposisi tubuh. Menu: Tumis Tahu Tempe Kecap dengan Nasi Merah.', '1. Potong 100g tahu dan 100g tempe dadu.
2. Goreng tanpa minyak di teflon antilengket hingga kecokelatan.
3. Tumis bawang merah, bawang putih, cabai dengan 5ml minyak. Masukkan tahu-tempe.
4. Tambah 2 sdm kecap manis, 1 sdm kecap asin, sedikit air. Masak hingga mengering.
5. Sajikan dengan 130g nasi merah dan tumis kangkung 100g.', 20, 580, 30, 70, 8, null),
  (3, 'breakfast', '07:00', 1, 'Bubur Ayam Komplit', 'Sarapan khas Indonesia untuk fase 5 dengan fokus maintenance dan rekomposisi tubuh. Menu: Bubur Ayam Komplit.', '1. Masak 100g beras dengan 500ml air api kecil, aduk terus hingga menjadi bubur lembut (~20 menit).
2. Rebus 100g dada ayam, suwir halus.
3. Goreng 10g bawang merah iris tipis hingga kering.
4. Rebus 1 telur 12 menit, kupas, belah dua.
5. Sajikan bubur dengan suwiran ayam, telur, bawang goreng, kecap, dan daun bawang.', 30, 440, 34, 50, 12, null),
  (3, 'snack', '10:00', 2, 'Pisang dan Selai Kacang', 'Snack khas Indonesia untuk fase 5 dengan fokus maintenance dan rekomposisi tubuh. Menu: Pisang dan Selai Kacang.', '1. Kupas 1 pisang sedang (100g).
2. Iris pisang memanjang menjadi 2 bagian.
3. Oleskan 1 sdm selai kacang (16g) di satu sisi.
4. Tutup dengan sisi pisang lainnya.
5. Sajikan sebagai sandwich pisang.', 3, 200, 6, 27, 9, null),
  (3, 'lunch', '12:30', 3, 'Nasi Putih Udang Saus Padang', 'Makan siang khas Indonesia untuk fase 5 dengan fokus maintenance dan rekomposisi tubuh. Menu: Nasi Putih Udang Saus Padang.', '1. Masak 150g nasi putih.
2. Kupas 200g udang, bersihkan.
3. Haluskan bumbu: 5 cabai merah, 4 bawang merah, 3 bawang putih, 1 ruas jahe, tomat.
4. Tumis bumbu dengan 10ml minyak, masukkan udang, 50ml air. Masak 5 menit.
5. Sajikan udang saus padang dengan nasi dan irisan timun.', 20, 590, 52, 64, 14, null),
  (3, 'snack', '15:30', 4, 'Ubi Rebus dan Susu Skim', 'Snack khas Indonesia untuk fase 5 dengan fokus maintenance dan rekomposisi tubuh. Menu: Ubi Rebus dan Susu Skim.', '1. Kupas 150g ubi jalar, potong-potong.
2. Kukus 15-20 menit hingga empuk.
3. Tuang 250ml susu skim ke gelas.
4. Sajikan ubi kukus bersama segelas susu skim.
5. Taburi sedikit kayu manis pada ubi jika suka.', 20, 220, 12, 44, 0, null),
  (3, 'dinner', '19:00', 5, 'Ikan Bakar Jimbaran dengan Nasi dan Plecing Kangkung', 'Makan malam khas Indonesia untuk fase 5 dengan fokus maintenance dan rekomposisi tubuh. Menu: Ikan Bakar Jimbaran dengan Nasi dan Plecing Kangkung.', '1. Marinasi 200g ikan nila dengan bumbu: bawang putih, kunyit, garam, jeruk nipis, 15 menit.
2. Bakar/panggang ikan di teflon dengan 5ml minyak, 5 menit tiap sisi.
3. Buat sambal: ulek cabai, bawang merah, tomat, terasi, garam, gula, perasan jeruk.
4. Rebus 100g kangkung, tiriskan. Siram dengan sambal.
5. Sajikan ikan bakar, plecing kangkung, dan 120g nasi putih.', 30, 670, 36, 53, 23, null),
  (4, 'breakfast', '07:00', 1, 'Roti Gandum Telur Alpukat', 'Sarapan khas Indonesia untuk fase 5 dengan fokus maintenance dan rekomposisi tubuh. Menu: Roti Gandum Telur Alpukat.', '1. Panggang 2 lembar roti gandum (60g) hingga kecokelatan.
2. Hancurkan ½ buah alpukat (50g) dengan garpu, tambah garam, merica, perasan jeruk nipis.
3. Oleskan alpukat di atas roti.
4. Goreng 2 butir telur mata sapi dengan 5ml minyak zaitun.
5. Letakkan telur di atas roti alpukat. Taburi cabai bubuk.', 10, 490, 26, 42, 24, null),
  (4, 'snack', '10:00', 2, 'Smoothie Whey Mangga', 'Snack khas Indonesia untuk fase 5 dengan fokus maintenance dan rekomposisi tubuh. Menu: Smoothie Whey Mangga.', '1. Potong 100g mangga matang.
2. Masukkan mangga, 1 scoop whey (30g), 200ml susu skim ke blender.
3. Tambahkan 3 es batu.
4. Blender 30 detik hingga halus.
5. Tuang dan sajikan segera.', 5, 280, 30, 36, 2, null),
  (4, 'lunch', '12:30', 3, 'Nasi Rendang Sapi dengan Daun Singkong', 'Makan siang khas Indonesia untuk fase 5 dengan fokus maintenance dan rekomposisi tubuh. Menu: Nasi Rendang Sapi dengan Daun Singkong.', '1. Masak 150g nasi putih.
2. Potong 150g daging sapi tipis. Haluskan bumbu rendang (cabai, bawang, jahe, lengkuas, kunyit).
3. Tumis bumbu dengan 5ml minyak, masukkan daging, 50ml santan encer, serai, daun salam.
4. Masak api kecil 40 menit hingga bumbu kering.
5. Rebus 100g daun singkong hingga empuk. Sajikan rendang, nasi, daun singkong.', 50, 660, 42, 74, 22, null),
  (4, 'snack', '15:30', 4, 'Kentang Rebus dengan Telur', 'Snack khas Indonesia untuk fase 5 dengan fokus maintenance dan rekomposisi tubuh. Menu: Kentang Rebus dengan Telur.', '1. Potong 100g kentang, rebus 15 menit.
2. Rebus 1 telur 10 menit, kupas.
3. Tata kentang dan telur di piring.
4. Taburi garam dan merica.
5. Sajikan hangat.', 20, 220, 10, 24, 6, null),
  (4, 'dinner', '19:00', 5, 'Sup Ikan Salmon Sayuran', 'Makan malam khas Indonesia untuk fase 5 dengan fokus maintenance dan rekomposisi tubuh. Menu: Sup Ikan Salmon Sayuran.', '1. Potong 150g salmon menjadi kubus besar.
2. Rebus 400ml air dengan 1 ruas jahe, daun bawang, garam.
3. Masukkan 80g wortel potong, 80g brokoli floret, masak 5 menit.
4. Masukkan salmon, masak 5 menit lagi api kecil.
5. Bumbui dengan garam, merica, perasan jeruk nipis. Sajikan dengan 100g nasi.', 20, 450, 26, 66, 6, null),
  (5, 'breakfast', '07:00', 1, 'Lontong Sayur Telur', 'Sarapan khas Indonesia untuk fase 5 dengan fokus maintenance dan rekomposisi tubuh. Menu: Lontong Sayur Telur.', '1. Siapkan 150g lontong (nasi padat).
2. Buat kuah: tumis bumbu halus (bawang merah, bawang putih, kunyit, lengkuas) dengan 5ml minyak.
3. Tambah 100ml santan encer, 200ml air, daun salam, serai. Masak 10 menit.
4. Masukkan 50g labu siam iris, 50g kacang panjang potong, masak 10 menit.
5. Rebus 1 telur, kupas, belah dua. Sajikan lontong dengan kuah sayur dan telur.', 30, 480, 22, 56, 18, null),
  (5, 'snack', '10:00', 2, 'Oatmeal Pisang Madu', 'Snack khas Indonesia untuk fase 5 dengan fokus maintenance dan rekomposisi tubuh. Menu: Oatmeal Pisang Madu.', '1. Masak 40g oatmeal dengan 150ml air hingga mengental.
2. Iris 1 pisang (80g).
3. Tata pisang di atas oatmeal.
4. Teteskan 1 sdt madu.
5. Sajikan hangat.', 5, 270, 8, 54, 4, null),
  (5, 'lunch', '12:30', 3, 'Nasi Ayam Geprek Sambal', 'Makan siang khas Indonesia untuk fase 5 dengan fokus maintenance dan rekomposisi tubuh. Menu: Nasi Ayam Geprek Sambal.', '1. Masak 150g nasi putih.
2. Goreng 200g dada ayam tepung tipis di 10ml minyak, tiriskan.
3. Geprek ayam dengan ulekan.
4. Buat sambal: ulek 5 cabai, bawang merah, bawang putih, tomat, garam, gula.
5. Siram ayam geprek dengan sambal. Sajikan dengan nasi dan lalapan (timun, kol, kemangi).', 25, 640, 54, 64, 18, null),
  (5, 'snack', '15:30', 4, 'Tempe Bacem Panggang', 'Snack khas Indonesia untuk fase 5 dengan fokus maintenance dan rekomposisi tubuh. Menu: Tempe Bacem Panggang.', '1. Potong 100g tempe tipis-tipis.
2. Rebus tempe dengan 100ml air, 1 sdm kecap manis, bawang putih, daun salam, gula merah 10 menit.
3. Tiriskan, biarkan bumbu meresap.
4. Panggang tempe di teflon tanpa minyak hingga kecokelatan kedua sisi.
5. Sajikan sebagai camilan.', 20, 240, 22, 12, 12, null),
  (5, 'dinner', '19:00', 5, 'Mie Ayam Bakso', 'Makan malam khas Indonesia untuk fase 5 dengan fokus maintenance dan rekomposisi tubuh. Menu: Mie Ayam Bakso.', '1. Rebus 150g mie telur hingga matang, tiriskan.
2. Rebus 100g dada ayam, suwir.
3. Buat kuah: rebus 300ml air kaldu ayam, daun bawang, garam, merica.
4. Potong 80g bakso sapi menjadi dua, masukkan ke kuah.
5. Tata mie di mangkuk, tambah suwiran ayam, bakso, kuah. Taburi bawang goreng dan daun seledri.', 20, 450, 32, 44, 6, null),
  (6, 'breakfast', '07:00', 1, 'Nasi Uduk Telur Tempe', 'Sarapan khas Indonesia untuk fase 5 dengan fokus maintenance dan rekomposisi tubuh. Menu: Nasi Uduk Telur Tempe.', '1. Masak 150g nasi uduk (beras + santan encer + daun salam + serai).
2. Goreng 1 telur dadar dengan 5ml minyak.
3. Goreng 50g tempe iris tipis di teflon tanpa minyak hingga kering.
4. Iris timun dan tomat sebagai pelengkap.
5. Sajikan nasi uduk dengan telur dadar, tempe, timun, tomat, dan sambal.', 25, 520, 24, 62, 20, null),
  (6, 'snack', '10:00', 2, 'Apel dan Kacang Almond', 'Snack khas Indonesia untuk fase 5 dengan fokus maintenance dan rekomposisi tubuh. Menu: Apel dan Kacang Almond.', '1. Cuci 1 buah apel sedang (150g).
2. Potong apel menjadi irisan tipis.
3. Siapkan 25g kacang almond.
4. Tata apel dan almond di piring.
5. Nikmati sebagai camilan.', 3, 220, 6, 22, 13, null),
  (6, 'lunch', '12:30', 3, 'Nasi Putih Ayam Bakar Taliwang', 'Makan siang khas Indonesia untuk fase 5 dengan fokus maintenance dan rekomposisi tubuh. Menu: Nasi Putih Ayam Bakar Taliwang.', '1. Masak 150g nasi putih.
2. Marinasi 200g paha ayam tanpa kulit: cabai, bawang merah, bawang putih, terasi, gula merah, garam. Diamkan 30 menit.
3. Panggang ayam di teflon dengan 5ml minyak, 7 menit tiap sisi, olesi bumbu.
4. Buat plecing: rebus 100g kangkung, siram sambal tomat.
5. Sajikan ayam bakar dengan nasi dan plecing kangkung.', 40, 640, 50, 72, 16, null),
  (6, 'snack', '15:30', 4, 'Ubi Bakar Madu', 'Snack khas Indonesia untuk fase 5 dengan fokus maintenance dan rekomposisi tubuh. Menu: Ubi Bakar Madu.', '1. Kupas 150g ubi jalar, potong memanjang.
2. Panggang di teflon antilengket api kecil, bolak-balik 15 menit.
3. Teteskan 1 sdt madu saat hampir matang.
4. Panggang 1-2 menit lagi hingga sedikit karamel.
5. Sajikan hangat.', 20, 220, 4, 50, 0, null),
  (6, 'dinner', '19:00', 5, 'Capcay Seafood Nasi Merah', 'Makan malam khas Indonesia untuk fase 5 dengan fokus maintenance dan rekomposisi tubuh. Menu: Capcay Seafood Nasi Merah.', '1. Masak 130g nasi merah.
2. Panaskan 5ml minyak, tumis bawang putih iris.
3. Masukkan 100g udang kupas, 100g cumi potong. Masak 2 menit.
4. Tambah 80g wortel, 80g brokoli, 50g jagung pipil, 50ml air, garam, merica, saus tiram.
5. Masak 5 menit hingga sayur matang. Sajikan dengan nasi merah.', 20, 500, 48, 42, 7, null),
  (7, 'breakfast', '07:00', 1, 'Pancake Oat Pisang Madu', 'Sarapan khas Indonesia untuk fase 5 dengan fokus maintenance dan rekomposisi tubuh. Menu: Pancake Oat Pisang Madu.', '1. Blender 50g oatmeal, 1 pisang (100g), 1 telur, 50ml susu skim hingga halus.
2. Panaskan teflon antilengket dengan sedikit minyak.
3. Tuang adonan, buat 3-4 pancake kecil. Masak 2 menit tiap sisi.
4. Tata pancake, teteskan 1 sdm madu.
5. Taburi irisan pisang tambahan jika suka.', 15, 420, 20, 66, 10, null),
  (7, 'snack', '10:00', 2, 'Smoothie Mangga Yogurt', 'Snack khas Indonesia untuk fase 5 dengan fokus maintenance dan rekomposisi tubuh. Menu: Smoothie Mangga Yogurt.', '1. Potong 100g mangga matang.
2. Masukkan mangga, 100g Greek yogurt, 100ml susu skim ke blender.
3. Tambahkan es batu.
4. Blender hingga halus dan creamy.
5. Tuang ke gelas dan sajikan.', 5, 200, 14, 32, 2, null),
  (7, 'lunch', '12:30', 3, 'Nasi Putih Sate Ayam Lontong', 'Makan siang khas Indonesia untuk fase 5 dengan fokus maintenance dan rekomposisi tubuh. Menu: Nasi Putih Sate Ayam Lontong.', '1. Potong 200g dada ayam dadu 2cm, tusukkan ke tusuk sate.
2. Marinasi dengan kecap manis, bawang putih halus, garam 15 menit.
3. Panggang sate di teflon dengan 5ml minyak, bolak-balik hingga matang.
4. Buat bumbu kacang: haluskan 30g kacang tanah, cabai, bawang putih, kecap, air.
5. Sajikan sate dengan 150g nasi/lontong, bumbu kacang, dan acar (timun, bawang merah).', 30, 640, 52, 64, 20, null),
  (7, 'snack', '15:30', 4, 'Kacang Hijau Santan', 'Snack khas Indonesia untuk fase 5 dengan fokus maintenance dan rekomposisi tubuh. Menu: Kacang Hijau Santan.', '1. Rendam 50g kacang hijau 2 jam (atau semalam).
2. Rebus dengan 300ml air, 1 lembar daun pandan, hingga empuk (~30 menit).
3. Tambahkan 30ml santan encer dan 10g gula merah.
4. Aduk rata, masak 5 menit lagi.
5. Sajikan hangat atau dingin.', 35, 250, 10, 42, 4, null),
  (7, 'dinner', '19:00', 5, 'Bakso Sapi Kuah Komplit (Cheat Meal)', 'Makan malam khas Indonesia untuk fase 5 dengan fokus maintenance dan rekomposisi tubuh. Menu: Bakso Sapi Kuah Komplit (Cheat Meal).', '1. Siapkan 150g bakso sapi (7-8 butir), potong beberapa menjadi dua.
2. Rebus 400ml kaldu sapi, masukkan bakso, masak 10 menit.
3. Rebus 100g mie telur, tiriskan.
4. Tambahkan 50g tahu goreng potong ke kuah.
5. Tata mie di mangkuk besar, tuang kuah bakso, tahu. Taburi bawang goreng, seledri, kecap, sambal, dan perasan jeruk nipis.', 20, 670, 34, 46, 26, null)
)
insert into meals (daily_meal_plan_id, meal_type, time_scheduled, sort_order, meal_name, description, recipe_instructions, prep_time_minutes, calories, protein, carbs, fat, image_url)
select dmp.id, ms.meal_type, ms.time_scheduled, ms.sort_order, ms.meal_name, ms.description, ms.recipe_instructions, ms.prep_time_minutes, ms.calories, ms.protein, ms.carbs, ms.fat, ms.image_url
from meal_seed ms
join phase_ref pr on true
join daily_meal_plans dmp on dmp.phase_id = pr.phase_id and dmp.day_number = ms.day_number
order by ms.day_number, ms.sort_order;

with phase_ref as (
  select id as phase_id from phases where phase_number = 5 limit 1
), ingredient_seed(day_number, sort_order, food_id, quantity, unit, notes) as (
values
  (1, 1, 16, 150, 'g', '150g nasi putih'),
  (1, 1, 1, 2, 'butir', '2 telur'),
  (1, 1, 37, 40, 'g', '40g wortel'),
  (1, 1, 38, 30, 'g', '30g buncis'),
  (1, 1, 39, 30, 'g', '30g kol'),
  (1, 1, 53, 1, 'sdt', '1 sdt minyak zaitun'),
  (1, 2, 33, 1, 'buah', '1 pisang'),
  (1, 2, 24, 40, 'g', '40g oatmeal'),
  (1, 2, 12, 200, 'ml', '200ml susu skim'),
  (1, 2, 63, 1, 'sdt', '1 sdt madu'),
  (1, 3, 5, 200, 'g', '200g ikan nila'),
  (1, 3, 16, 150, 'g', '150g nasi putih'),
  (1, 3, 47, 30, 'g', 'bawang merah'),
  (1, 3, 74, 10, 'g', 'kemangi'),
  (1, 3, 42, 50, 'g', 'timun'),
  (1, 4, 19, 2, 'lembar', '2 lembar roti gandum'),
  (1, 4, 55, 1, 'sdm', '1 sdm selai kacang'),
  (1, 4, 33, 0.5, 'buah', '½ pisang'),
  (1, 5, 2, 150, 'g', '150g dada ayam'),
  (1, 5, 86, 50, 'g', 'soun'),
  (1, 5, 1, 1, 'butir', '1 telur rebus'),
  (1, 5, 76, 50, 'g', 'tauge'),
  (1, 5, 16, 80, 'g', '80g nasi'),
  (2, 1, 24, 50, 'g', '50g oatmeal'),
  (2, 1, 12, 200, 'ml', '200ml susu skim'),
  (2, 1, 1, 1, 'butir', '1 telur'),
  (2, 1, 33, 1, 'buah', '1 pisang'),
  (2, 1, 53, 5, 'g', 'minyak'),
  (2, 2, 11, 150, 'g', '150g edamame'),
  (2, 3, 16, 150, 'g', '150g nasi putih'),
  (2, 3, 3, 200, 'g', '200g paha ayam'),
  (2, 3, 21, 50, 'g', '50g jagung'),
  (2, 3, 45, 50, 'g', '50g kacang panjang'),
  (2, 3, 53, 5, 'g', 'minyak'),
  (2, 4, 67, 150, 'g', '150g Greek yogurt'),
  (2, 4, 63, 1, 'sdt', '1 sdt madu'),
  (2, 4, 56, 20, 'g', '20g almond'),
  (2, 5, 10, 100, 'g', '100g tahu'),
  (2, 5, 9, 100, 'g', '100g tempe'),
  (2, 5, 23, 130, 'g', '130g nasi merah'),
  (2, 5, 35, 100, 'g', '100g kangkung'),
  (2, 5, 53, 5, 'g', 'minyak'),
  (3, 1, 16, 100, 'g', '100g beras → bubur'),
  (3, 1, 2, 100, 'g', '100g dada ayam suwir'),
  (3, 1, 1, 1, 'butir', '1 telur rebus'),
  (3, 1, 47, 10, 'g', 'bawang goreng'),
  (3, 2, 33, 1, 'buah', '1 pisang'),
  (3, 2, 55, 1, 'sdm', '1 sdm selai kacang'),
  (3, 3, 16, 150, 'g', '150g nasi putih'),
  (3, 3, 8, 200, 'g', '200g udang'),
  (3, 3, 48, 5, 'buah', '5 cabai merah'),
  (3, 3, 47, 30, 'g', 'bawang merah'),
  (3, 3, 53, 2, 'sdt', '2 sdt minyak'),
  (3, 4, 25, 150, 'g', '150g ubi jalar'),
  (3, 4, 12, 250, 'ml', '250ml susu skim'),
  (3, 5, 5, 200, 'g', '200g ikan nila'),
  (3, 5, 16, 120, 'g', '120g nasi putih'),
  (3, 5, 35, 100, 'g', '100g kangkung'),
  (3, 5, 53, 5, 'g', 'minyak'),
  (4, 1, 19, 2, 'lembar', '2 roti gandum'),
  (4, 1, 1, 2, 'butir', '2 telur'),
  (4, 1, 28, 0.5, 'buah', '½ alpukat'),
  (4, 1, 53, 5, 'g', 'minyak'),
  (4, 2, 66, 1, 'scoop', '1 scoop whey'),
  (4, 2, 96, 100, 'g', '100g mangga'),
  (4, 2, 12, 200, 'ml', '200ml susu skim'),
  (4, 3, 16, 150, 'g', '150g nasi putih'),
  (4, 3, 4, 150, 'g', '150g daging sapi'),
  (4, 3, 87, 50, 'g', 'santan encer'),
  (4, 3, 18, 100, 'g', '100g daun singkong rebus'),
  (4, 3, 53, 5, 'g', 'minyak'),
  (4, 4, 17, 100, 'g', '100g kentang'),
  (4, 4, 1, 1, 'butir', '1 telur rebus'),
  (4, 5, 7, 150, 'g', '150g salmon'),
  (4, 5, 37, 80, 'g', '80g wortel'),
  (4, 5, 36, 80, 'g', '80g brokoli'),
  (4, 5, 16, 100, 'g', '100g nasi'),
  (5, 1, 16, 150, 'g', '150g lontong/nasi'),
  (5, 1, 87, 100, 'ml', '100ml santan encer'),
  (5, 1, 77, 50, 'g', '50g labu siam'),
  (5, 1, 45, 50, 'g', '50g kacang panjang'),
  (5, 1, 1, 1, 'butir', '1 telur rebus'),
  (5, 1, 53, 5, 'g', 'minyak'),
  (5, 2, 24, 40, 'g', '40g oatmeal'),
  (5, 2, 33, 1, 'buah', '1 pisang'),
  (5, 2, 63, 1, 'sdt', '1 sdt madu'),
  (5, 3, 16, 150, 'g', '150g nasi putih'),
  (5, 3, 2, 200, 'g', '200g dada ayam'),
  (5, 3, 53, 2, 'sdt', '2 sdt minyak'),
  (5, 3, 42, 50, 'g', 'timun'),
  (5, 4, 9, 100, 'g', '100g tempe'),
  (5, 4, 99, 1, 'sdm', '1 sdm kecap manis'),
  (5, 5, 94, 150, 'g', '150g mie telur'),
  (5, 5, 2, 100, 'g', '100g dada ayam suwir'),
  (5, 5, 93, 80, 'g', '80g bakso sapi'),
  (6, 1, 91, 150, 'g', '150g nasi uduk'),
  (6, 1, 1, 1, 'butir', '1 telur dadar'),
  (6, 1, 9, 50, 'g', '50g tempe'),
  (6, 1, 53, 5, 'g', 'minyak'),
  (6, 2, 29, 1, 'buah', '1 apel'),
  (6, 2, 56, 25, 'g', '25g almond'),
  (6, 3, 16, 150, 'g', '150g nasi putih'),
  (6, 3, 3, 200, 'g', '200g paha ayam'),
  (6, 3, 35, 100, 'g', '100g kangkung'),
  (6, 3, 53, 5, 'g', 'minyak'),
  (6, 4, 25, 150, 'g', '150g ubi jalar'),
  (6, 4, 63, 1, 'sdm', '1 sdm madu'),
  (6, 5, 23, 130, 'g', '130g nasi merah'),
  (6, 5, 8, 100, 'g', '100g udang'),
  (6, 5, 73, 100, 'g', '100g cumi'),
  (6, 5, 37, 80, 'g', '80g wortel'),
  (6, 5, 36, 80, 'g', '80g brokoli'),
  (6, 5, 21, 50, 'g', '50g jagung pipil'),
  (7, 1, 24, 50, 'g', '50g oatmeal'),
  (7, 1, 33, 1, 'buah', '1 pisang'),
  (7, 1, 1, 1, 'butir', '1 telur'),
  (7, 1, 12, 50, 'ml', '50ml susu skim'),
  (7, 1, 63, 1, 'sdm', '1 sdm madu'),
  (7, 2, 96, 100, 'g', '100g mangga'),
  (7, 2, 67, 100, 'g', '100g Greek yogurt'),
  (7, 2, 12, 100, 'ml', '100ml susu skim'),
  (7, 3, 2, 200, 'g', '200g dada ayam'),
  (7, 3, 16, 150, 'g', '150g nasi/lontong'),
  (7, 3, 57, 30, 'g', '30g kacang tanah'),
  (7, 3, 53, 5, 'g', 'minyak'),
  (7, 4, 61, 50, 'g', '50g kacang hijau kering'),
  (7, 4, 87, 30, 'ml', '30ml santan encer'),
  (7, 4, 98, 1, 'sdm', '1 sdm gula merah'),
  (7, 5, 93, 150, 'g', '150g bakso sapi'),
  (7, 5, 94, 100, 'g', '100g mie telur'),
  (7, 5, 95, 50, 'g', '50g tahu goreng')
)
insert into meal_ingredients (meal_id, food_id, quantity, unit, notes)
select m.id, isd.food_id, isd.quantity, isd.unit, isd.notes
from ingredient_seed isd
join phase_ref pr on true
join daily_meal_plans dmp on dmp.phase_id = pr.phase_id and dmp.day_number = isd.day_number
join meals m on m.daily_meal_plan_id = dmp.id and m.sort_order = isd.sort_order
order by isd.day_number, isd.sort_order;
