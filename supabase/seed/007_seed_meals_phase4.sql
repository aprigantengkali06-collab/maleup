-- 007_seed_meals_phase4.sql
-- Seed hasil sinkronisasi task spec untuk Fase 4 — Cutting Final + IF 16:8

insert into foods (id, name, name_en, calories_per_100g, protein_per_100g, fat_per_100g, carb_per_100g, fiber_per_100g, serving_size_g, serving_description, category)
values
  (82, 'Tuna kaleng dalam air', 'Canned tuna in water', 116, 25.5, 0.8, 0, 0, 80, '1 kaleng 80g', 'protein_hewani'),
  (83, 'Terong', 'Eggplant', 25, 1.0, 0.2, 5.9, 3.0, 100, '100 g', 'sayuran'),
  (84, 'Pare', 'Bitter gourd', 17, 1.0, 0.2, 3.7, 2.8, 100, '100 g', 'sayuran'),
  (85, 'Petai', 'Stink bean', 108, 6.0, 0.4, 22.0, 1.5, 50, '50 g', 'sayuran'),
  (86, 'Soun matang', 'Cooked glass noodles', 82, 0.1, 0.1, 20.0, 0, 100, '100 g matang', 'karbohidrat'),
  (87, 'Santan encer', 'Thin coconut milk', 68, 0.7, 6.5, 2.0, 0, 50, '50 ml', 'lainnya'),
  (88, 'Daun salam', 'Bay leaf', 313, 7.6, 8.4, 49.0, 26.0, 2, '2 lembar', 'bumbu'),
  (89, 'Serai', 'Lemongrass', 99, 1.8, 0.5, 25.3, 0, 10, '1 batang', 'bumbu'),
  (90, 'Lengkuas', 'Galangal', 44, 1.0, 0.3, 9.0, 2.0, 10, '1 ruas', 'bumbu')
on conflict (id) do nothing;

with phase_ref as (
  select id as phase_id from phases where phase_number = 4 limit 1
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
  select id as phase_id from phases where phase_number = 4 limit 1
)
delete from meals
where daily_meal_plan_id in (
  select id from daily_meal_plans where phase_id = (select phase_id from phase_ref)
);

with phase_ref as (
  select id as phase_id from phases where phase_number = 4 limit 1
), meal_seed(day_number, meal_type, time_scheduled, sort_order, meal_name, description, recipe_instructions, prep_time_minutes, calories, protein, carbs, fat, image_url) as (
values
  (1, 'lunch', '12:00', 1, 'Nasi Merah Ayam Rica-Rica', 'Makan siang khas Indonesia untuk fase 4 dengan fokus cutting final dengan pola intermittent fasting 16:8. Menu: Nasi Merah Ayam Rica-Rica.', '1. Masak 130g nasi merah hingga matang pulen.
2. Marinasi 200g dada ayam fillet dengan 1 sdm kecap asin, garam, merica 10 menit.
3. Haluskan 5 cabai merah, 4 bawang merah, 3 bawang putih, 1 ruas jahe, 1 buah tomat.
4. Tumis bumbu halus dengan 5ml minyak zaitun hingga harum. Masukkan ayam, aduk rata.
5. Tambah 50ml air, masak api sedang 15 menit hingga bumbu meresap dan ayam matang. Sajikan dengan nasi merah.', 25, 620, 62, 52, 16, null),
  (1, 'snack', '15:30', 2, 'Ubi Rebus dengan Tuna Suwir', 'Snack khas Indonesia untuk fase 4 dengan fokus cutting final dengan pola intermittent fasting 16:8. Menu: Ubi Rebus dengan Tuna Suwir.', '1. Kupas dan potong 150g ubi jalar, kukus 20 menit hingga empuk.
2. Buka 1 kaleng tuna dalam air (80g), tiriskan.
3. Tumis tuna dengan 1 siung bawang putih cincang, sedikit cabai rawit iris, tanpa minyak di teflon.
4. Aduk hingga tuna kering dan harum sekitar 3 menit.
5. Sajikan ubi rebus bersama tuna suwir tumis.', 25, 270, 25, 35, 2, null),
  (1, 'dinner', '19:00', 3, 'Udang Tumis Brokoli Bawang Putih', 'Makan malam khas Indonesia untuk fase 4 dengan fokus cutting final dengan pola intermittent fasting 16:8. Menu: Udang Tumis Brokoli Bawang Putih.', '1. Kupas dan bersihkan 200g udang segar, buang kepala dan usus.
2. Potong 150g brokoli jadi floret kecil, rebus 2 menit, tiriskan.
3. Panaskan 5ml minyak zaitun, tumis 4 siung bawang putih iris hingga keemasan.
4. Masukkan udang, aduk api besar 2 menit hingga berubah warna pink.
5. Tambahkan brokoli, 1 sdm kecap asin, merica. Aduk rata 1 menit. Angkat dan sajikan.', 15, 640, 61, 51, 26, null),
  (2, 'lunch', '12:00', 1, 'Nasi Merah Pepes Tahu Jamur', 'Makan siang khas Indonesia untuk fase 4 dengan fokus cutting final dengan pola intermittent fasting 16:8. Menu: Nasi Merah Pepes Tahu Jamur.', '1. Masak 150g nasi merah.
2. Hancurkan 200g tahu putih, campurkan 80g jamur kancing iris, 1 butir telur, daun bawang iris, garam, merica.
3. Bungkus adonan dalam daun pisang, semat dengan tusuk gigi.
4. Kukus 25 menit hingga matang.
5. Sajikan pepes dengan nasi merah dan irisan timun.', 35, 560, 42, 62, 18, null),
  (2, 'snack', '15:30', 2, 'Edamame Rebus dengan Jeruk', 'Snack khas Indonesia untuk fase 4 dengan fokus cutting final dengan pola intermittent fasting 16:8. Menu: Edamame Rebus dengan Jeruk.', '1. Rebus 150g edamame berkulit dalam air bergaram 5 menit.
2. Tiriskan dan taburi sedikit garam laut.
3. Kupas 1 buah jeruk sedang, pisahkan ruasnya.
4. Sajikan edamame bersama jeruk sebagai camilan segar.
5. Makan edamame langsung dari kulitnya.', 10, 240, 20, 22, 8, null),
  (2, 'dinner', '19:00', 3, 'Sup Dada Ayam Sayuran', 'Makan malam khas Indonesia untuk fase 4 dengan fokus cutting final dengan pola intermittent fasting 16:8. Menu: Sup Dada Ayam Sayuran.', '1. Rebus 200g dada ayam utuh dalam 500ml air bersama 2 lembar daun salam, 1 batang serai geprek.
2. Setelah 20 menit, angkat ayam, suwir-suwir.
3. Masukkan 80g wortel potong dadu, 80g buncis potong, 50g kol iris ke kuah.
4. Masak 10 menit hingga sayuran empuk. Kembalikan ayam suwir.
5. Bumbui garam, merica, bawang goreng. Sajikan hangat dengan 150g nasi merah.', 35, 750, 84, 58, 20, null),
  (3, 'lunch', '12:00', 1, 'Nasi Merah Ikan Nila Bakar Sambal Matah', 'Makan siang khas Indonesia untuk fase 4 dengan fokus cutting final dengan pola intermittent fasting 16:8. Menu: Nasi Merah Ikan Nila Bakar Sambal Matah.', '1. Masak 130g nasi merah.
2. Lumuri 200g ikan nila dengan garam, kunyit bubuk, perasan jeruk nipis. Diamkan 15 menit.
3. Panggang ikan di teflon dengan 5ml minyak zaitun, 5 menit tiap sisi.
4. Buat sambal matah: iris tipis 5 bawang merah, 2 cabai rawit, 1 batang serai, perasan jeruk nipis, garam.
5. Sajikan ikan bakar dengan nasi merah dan sambal matah di atasnya.', 30, 570, 58, 48, 14, null),
  (3, 'snack', '15:30', 2, 'Greek Yogurt dengan Pisang', 'Snack khas Indonesia untuk fase 4 dengan fokus cutting final dengan pola intermittent fasting 16:8. Menu: Greek Yogurt dengan Pisang.', '1. Tuang 150g Greek yogurt plain ke dalam mangkuk.
2. Iris 1 buah pisang sedang (80g).
3. Tata irisan pisang di atas yogurt.
4. Taburi dengan 10g chia seed.
5. Aduk ringan dan sajikan dingin.', 5, 280, 18, 36, 6, null),
  (3, 'dinner', '19:00', 3, 'Tempe Orek Pedas dengan Kangkung Tumis', 'Makan malam khas Indonesia untuk fase 4 dengan fokus cutting final dengan pola intermittent fasting 16:8. Menu: Tempe Orek Pedas dengan Kangkung Tumis.', '1. Potong 150g tempe dadu kecil. Goreng tanpa minyak di teflon antilengket hingga kecokelatan.
2. Tumis bawang merah, bawang putih, cabai di 5ml minyak zaitun. Masukkan tempe.
3. Tambah 1 sdm kecap manis, 1 sdm kecap asin, sedikit air. Masak hingga mengering.
4. Tumis 150g kangkung dengan bawang putih di teflon terpisah, tambah garam.
5. Sajikan tempe orek dengan kangkung tumis dan 120g nasi merah.', 20, 670, 69, 51, 25, null),
  (4, 'lunch', '12:00', 1, 'Nasi Merah Rendang Daging Sapi', 'Makan siang khas Indonesia untuk fase 4 dengan fokus cutting final dengan pola intermittent fasting 16:8. Menu: Nasi Merah Rendang Daging Sapi.', '1. Masak 130g nasi merah.
2. Potong 200g daging sapi has luar tipis-tipis melawan serat.
3. Haluskan bumbu: 5 bawang merah, 3 bawang putih, 3 cabai merah, 1 ruas jahe, 1 ruas lengkuas, 1 ruas kunyit.
4. Tumis bumbu dengan 5ml minyak zaitun, masukkan daging, 50ml santan encer, daun salam, serai.
5. Masak api kecil 40 menit hingga bumbu mengering dan daging empuk. Sajikan dengan nasi merah.', 50, 630, 62, 50, 20, null),
  (4, 'snack', '15:30', 2, 'Roti Gandum Selai Kacang dengan Apel', 'Snack khas Indonesia untuk fase 4 dengan fokus cutting final dengan pola intermittent fasting 16:8. Menu: Roti Gandum Selai Kacang dengan Apel.', '1. Panggang 1 lembar roti gandum (30g) hingga renyah.
2. Oleskan 1 sdm selai kacang (16g) merata.
3. Cuci dan iris 1 buah apel sedang menjadi potongan tipis.
4. Tata apel di atas roti atau sajikan di samping.
5. Nikmati sebagai camilan berenergi.', 5, 270, 10, 38, 10, null),
  (4, 'dinner', '19:00', 3, 'Ikan Salmon Panggang Sayur Paprika', 'Makan malam khas Indonesia untuk fase 4 dengan fokus cutting final dengan pola intermittent fasting 16:8. Menu: Ikan Salmon Panggang Sayur Paprika.', '1. Marinasi 150g fillet salmon dengan perasan lemon, garam, merica, 15 menit.
2. Panggang salmon di teflon dengan 5ml minyak zaitun, 4 menit tiap sisi.
3. Iris 100g paprika merah dan 100g brokoli floret.
4. Tumis paprika dan brokoli dengan bawang putih, garam, sedikit air, 3 menit.
5. Sajikan salmon panggang bersama tumisan sayur dan 130g nasi merah.', 25, 660, 78, 52, 14, null),
  (5, 'lunch', '12:00', 1, 'Soto Ayam Nasi Merah', 'Makan siang khas Indonesia untuk fase 4 dengan fokus cutting final dengan pola intermittent fasting 16:8. Menu: Soto Ayam Nasi Merah.', '1. Rebus 200g dada ayam dalam 600ml air bersama serai, daun salam, lengkuas, 20 menit.
2. Angkat ayam, suwir-suwir halus. Saring kuah.
3. Tumis bumbu halus (kunyit, bawang putih, bawang merah, jahe) dengan 5ml minyak.
4. Masukkan tumisan ke kuah, tambah 50g soun kering (rendam dulu), 80g tauge, daun bawang.
5. Sajikan soto dengan 100g nasi merah, suwiran ayam, perasan jeruk nipis.', 35, 590, 58, 56, 14, null),
  (5, 'snack', '15:30', 2, 'Smoothie Whey Pisang', 'Snack khas Indonesia untuk fase 4 dengan fokus cutting final dengan pola intermittent fasting 16:8. Menu: Smoothie Whey Pisang.', '1. Kupas 1 buah pisang sedang (80g), potong-potong.
2. Masukkan pisang, 1 scoop whey isolate (30g), 200ml susu skim ke blender.
3. Tambahkan 3 es batu.
4. Blender hingga halus dan creamy sekitar 30 detik.
5. Tuang ke gelas dan sajikan segera.', 5, 310, 32, 34, 2, null),
  (5, 'dinner', '19:00', 3, 'Cumi Tumis Hitam dengan Nasi Merah', 'Makan malam khas Indonesia untuk fase 4 dengan fokus cutting final dengan pola intermittent fasting 16:8. Menu: Cumi Tumis Hitam dengan Nasi Merah.', '1. Bersihkan 250g cumi, potong cincin. Simpan tinta hitamnya.
2. Tumis bawang merah iris, bawang putih, cabai dengan 5ml minyak zaitun.
3. Masukkan cumi, tinta hitam, 1 sdm kecap asin, 1 sdm kecap manis.
4. Aduk api besar 3-4 menit hingga cumi matang (jangan terlalu lama).
5. Sajikan dengan 120g nasi merah dan irisan timun.', 15, 640, 54, 46, 30, null),
  (6, 'lunch', '12:00', 1, 'Gado-Gado Lontong Telur', 'Makan siang khas Indonesia untuk fase 4 dengan fokus cutting final dengan pola intermittent fasting 16:8. Menu: Gado-Gado Lontong Telur.', '1. Rebus 2 butir telur 12 menit, kupas, belah dua.
2. Rebus 100g kentang potong, 80g buncis, 80g tauge, 50g kol hingga matang. Tiriskan.
3. Buat bumbu kacang: haluskan 40g kacang tanah goreng, 2 bawang putih, 2 cabai, gula merah, garam, air.
4. Tata sayuran dan telur di piring, siram bumbu kacang.
5. Sajikan dengan 100g nasi merah.', 30, 600, 40, 64, 22, null),
  (6, 'snack', '15:30', 2, 'Oatmeal Protein dengan Apel', 'Snack khas Indonesia untuk fase 4 dengan fokus cutting final dengan pola intermittent fasting 16:8. Menu: Oatmeal Protein dengan Apel.', '1. Masak 40g oatmeal dengan 150ml air, aduk hingga mengental 3 menit.
2. Biarkan sedikit dingin. Campurkan 1 scoop whey isolate (30g).
3. Iris ½ buah apel tipis-tipis.
4. Tata irisan apel di atas oatmeal.
5. Taburi kayu manis bubuk dan sajikan.', 10, 320, 32, 40, 5, null),
  (6, 'dinner', '19:00', 3, 'Ayam Bakar Kecap dengan Tumis Kangkung', 'Makan malam khas Indonesia untuk fase 4 dengan fokus cutting final dengan pola intermittent fasting 16:8. Menu: Ayam Bakar Kecap dengan Tumis Kangkung.', '1. Marinasi 200g dada ayam dengan 2 sdm kecap manis, 1 sdm kecap asin, bawang putih halus, merica, 30 menit.
2. Panggang ayam di teflon api sedang-kecil 7 menit tiap sisi, olesi sisa marinasi.
3. Tumis 150g kangkung dengan bawang putih dan sedikit terasi di 5ml minyak.
4. Masak 100g nasi merah.
5. Sajikan ayam bakar kecap dengan kangkung tumis dan nasi merah.', 25, 630, 76, 36, 15, null),
  (7, 'lunch', '12:00', 1, 'Nasi Goreng Kampung Tinggi Protein', 'Makan siang khas Indonesia untuk fase 4 dengan fokus cutting final dengan pola intermittent fasting 16:8. Menu: Nasi Goreng Kampung Tinggi Protein.', '1. Panaskan 5ml minyak zaitun, tumis bawang merah, bawang putih, cabai iris.
2. Masukkan 150g dada ayam potong dadu, masak hingga matang.
3. Tambahkan 130g nasi merah dingin, 1 sdm kecap manis, garam.
4. Buat lubang di tengah, masukkan 1 butir telur, orak-arik lalu campur rata.
5. Taburi daun bawang iris. Sajikan dengan irisan timun dan tomat.', 15, 610, 56, 56, 18, null),
  (7, 'snack', '15:30', 2, 'Kentang Rebus dengan Keju Cottage', 'Snack khas Indonesia untuk fase 4 dengan fokus cutting final dengan pola intermittent fasting 16:8. Menu: Kentang Rebus dengan Keju Cottage.', '1. Cuci bersih 150g kentang, potong menjadi 4 bagian.
2. Rebus kentang dalam air bergaram 15 menit hingga empuk.
3. Tiriskan, tata di piring.
4. Tambahkan 100g keju cottage di atas kentang.
5. Taburi merica hitam dan daun bawang iris.', 20, 280, 18, 38, 6, null),
  (7, 'dinner', '19:00', 3, 'Ikan Tuna Sambal Terong', 'Makan malam khas Indonesia untuk fase 4 dengan fokus cutting final dengan pola intermittent fasting 16:8. Menu: Ikan Tuna Sambal Terong.', '1. Potong 200g tuna steak 2cm tebal, marinasi garam, merica, perasan jeruk nipis.
2. Panggang tuna di teflon dengan 5ml minyak 3 menit tiap sisi (medium).
3. Potong 150g terong panjang, bakar/panggang di teflon hingga layu.
4. Buat sambal: ulek 5 cabai, bawang merah, bawang putih, tomat, garam, gula.
5. Campurkan terong bakar dengan sambal. Sajikan tuna dengan sambal terong dan 100g nasi merah.', 25, 630, 68, 38, 20, null)
)
insert into meals (daily_meal_plan_id, meal_type, time_scheduled, sort_order, meal_name, description, recipe_instructions, prep_time_minutes, calories, protein, carbs, fat, image_url)
select dmp.id, ms.meal_type, ms.time_scheduled, ms.sort_order, ms.meal_name, ms.description, ms.recipe_instructions, ms.prep_time_minutes, ms.calories, ms.protein, ms.carbs, ms.fat, ms.image_url
from meal_seed ms
join phase_ref pr on true
join daily_meal_plans dmp on dmp.phase_id = pr.phase_id and dmp.day_number = ms.day_number
order by ms.day_number, ms.sort_order;

with phase_ref as (
  select id as phase_id from phases where phase_number = 4 limit 1
), ingredient_seed(day_number, sort_order, food_id, quantity, unit, notes) as (
values
  (1, 1, 23, 130, 'g', '130g nasi merah'),
  (1, 1, 2, 200, 'g', '200g dada ayam'),
  (1, 1, 48, 3, 'buah', '3 cabai merah'),
  (1, 1, 47, 5, 'siung', '5 bawang merah'),
  (1, 1, 46, 3, 'siung', '3 bawang putih'),
  (1, 1, 53, 1, 'sdt', '1 sdt minyak zaitun'),
  (1, 1, 41, 1, 'buah', '1 tomat'),
  (1, 2, 25, 150, 'g', '150g ubi jalar'),
  (1, 2, 82, 1, 'kaleng', '1 kaleng tuna'),
  (1, 2, 46, 1, 'siung', '1 siung bawang putih'),
  (1, 3, 8, 200, 'g', '200g udang'),
  (1, 3, 36, 150, 'g', '150g brokoli'),
  (1, 3, 23, 130, 'g', '130g nasi merah'),
  (1, 3, 46, 4, 'siung', '4 siung bawang putih'),
  (1, 3, 53, 1, 'sdt', '1 sdt minyak zaitun'),
  (2, 1, 23, 150, 'g', '150g nasi merah'),
  (2, 1, 10, 200, 'g', '200g tahu'),
  (2, 1, 44, 80, 'g', '80g jamur kancing'),
  (2, 1, 1, 1, 'butir', '1 telur'),
  (2, 1, 81, 20, 'g', 'daun bawang'),
  (2, 2, 11, 150, 'g', '150g edamame'),
  (2, 2, 30, 1, 'buah', '1 jeruk'),
  (2, 3, 2, 200, 'g', '200g dada ayam suwir'),
  (2, 3, 37, 80, 'g', '80g wortel'),
  (2, 3, 38, 80, 'g', '80g buncis'),
  (2, 3, 39, 50, 'g', '50g kol'),
  (2, 3, 23, 150, 'g', '150g nasi merah'),
  (3, 1, 23, 130, 'g', '130g nasi merah'),
  (3, 1, 5, 200, 'g', '200g ikan nila'),
  (3, 1, 47, 5, 'siung', '5 bawang merah'),
  (3, 1, 48, 2, 'buah', '2 cabai rawit'),
  (3, 1, 89, 1, 'batang', '1 batang serai'),
  (3, 1, 53, 1, 'sdt', '1 sdt minyak zaitun'),
  (3, 2, 67, 150, 'g', '150g Greek yogurt'),
  (3, 2, 33, 1, 'buah', '1 pisang'),
  (3, 2, 58, 10, 'g', '10g chia seed'),
  (3, 3, 9, 150, 'g', '150g tempe'),
  (3, 3, 35, 150, 'g', '150g kangkung'),
  (3, 3, 23, 120, 'g', '120g nasi merah'),
  (3, 3, 51, 1, 'sdm', '1 sdm kecap asin'),
  (3, 3, 53, 1, 'sdt', '1 sdt minyak zaitun'),
  (4, 1, 23, 130, 'g', '130g nasi merah'),
  (4, 1, 4, 200, 'g', '200g daging sapi'),
  (4, 1, 87, 50, 'ml', '50ml santan encer'),
  (4, 1, 47, 5, 'siung', '5 bawang merah'),
  (4, 1, 53, 1, 'sdt', '1 sdt minyak zaitun'),
  (4, 2, 19, 1, 'lembar', '1 lembar roti gandum'),
  (4, 2, 55, 1, 'sdm', '1 sdm selai kacang'),
  (4, 2, 29, 1, 'buah', '1 apel'),
  (4, 3, 7, 150, 'g', '150g salmon'),
  (4, 3, 43, 100, 'g', '100g paprika merah'),
  (4, 3, 36, 100, 'g', '100g brokoli'),
  (4, 3, 23, 130, 'g', '130g nasi merah'),
  (4, 3, 53, 1, 'sdt', '1 sdt minyak zaitun'),
  (5, 1, 2, 200, 'g', '200g dada ayam'),
  (5, 1, 86, 50, 'g', '50g soun'),
  (5, 1, 76, 80, 'g', '80g tauge'),
  (5, 1, 23, 100, 'g', '100g nasi merah'),
  (5, 1, 53, 1, 'sdt', '1 sdt minyak zaitun'),
  (5, 2, 66, 1, 'scoop', '1 scoop whey'),
  (5, 2, 33, 1, 'buah', '1 pisang'),
  (5, 2, 12, 250, 'ml', '250ml susu skim'),
  (5, 3, 73, 250, 'g', '250g cumi'),
  (5, 3, 23, 120, 'g', '120g nasi merah'),
  (5, 3, 47, 20, 'g', 'bawang merah'),
  (5, 3, 53, 1, 'sdt', '1 sdt minyak zaitun'),
  (6, 1, 1, 2, 'butir', '2 telur rebus'),
  (6, 1, 17, 100, 'g', '100g kentang'),
  (6, 1, 38, 80, 'g', '80g buncis'),
  (6, 1, 76, 80, 'g', '80g tauge'),
  (6, 1, 57, 40, 'g', '40g kacang tanah'),
  (6, 1, 23, 100, 'g', '100g nasi merah'),
  (6, 2, 24, 40, 'g', '40g oatmeal'),
  (6, 2, 66, 1, 'scoop', '1 scoop whey'),
  (6, 2, 29, 0.5, 'buah', '½ apel'),
  (6, 3, 2, 200, 'g', '200g dada ayam'),
  (6, 3, 35, 150, 'g', '150g kangkung'),
  (6, 3, 23, 100, 'g', '100g nasi merah'),
  (6, 3, 53, 1, 'sdt', '1 sdt minyak zaitun'),
  (7, 1, 23, 130, 'g', '130g nasi merah'),
  (7, 1, 2, 150, 'g', '150g dada ayam dadu'),
  (7, 1, 1, 1, 'butir', '1 telur'),
  (7, 1, 53, 1, 'sdt', '1 sdt minyak zaitun'),
  (7, 2, 17, 150, 'g', '150g kentang'),
  (7, 2, 14, 100, 'g', '100g keju cottage'),
  (7, 3, 6, 200, 'g', '200g tuna steak'),
  (7, 3, 83, 150, 'g', '150g terong'),
  (7, 3, 23, 100, 'g', '100g nasi merah'),
  (7, 3, 53, 1, 'sdt', '1 sdt minyak zaitun')
)
insert into meal_ingredients (meal_id, food_id, quantity, unit, notes)
select m.id, isd.food_id, isd.quantity, isd.unit, isd.notes
from ingredient_seed isd
join phase_ref pr on true
join daily_meal_plans dmp on dmp.phase_id = pr.phase_id and dmp.day_number = isd.day_number
join meals m on m.daily_meal_plan_id = dmp.id and m.sort_order = isd.sort_order
order by isd.day_number, isd.sort_order;
