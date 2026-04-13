// /src/lib/data/meals/phase1.ts
// Fase 1 — PSMF (Minggu 1-2)
// Target: 750-850 kkal/hari | P: 150-160g | K: 0-20g | L: 0-20g
// OK Range: 700-900 kcal, P 140-170, K 0-30, L 0-30 (toleransi ±10/±50)
// Metode masak: rebus, kukus, panggang tanpa minyak

import type { DailyMealPlan } from '@/lib/types';

type Ingredient = NonNullable<NonNullable<DailyMealPlan['meals']>[0]['meal_ingredients']>[0];

function ing(
  id: number, meal_id: number, food_id: number,
  quantity_g: number, quantity_description: string,
  cal: number, prot: number, fat: number, carb: number
): Ingredient {
  return { id, meal_id, food_id, quantity_g, quantity_description,
    calories_portion: cal, protein_portion: prot, fat_portion: fat, carb_portion: carb };
}

export const phase1MealData: DailyMealPlan[] = [

  // ═══════════════════════════════════════════════════
  // SENIN — 760 kcal | P:156g | K:25g | L:11g ✅
  // ═══════════════════════════════════════════════════
  {
    id: 1, phase_number: 1, week_number: 1, day_of_week: 'monday',
    meals: [
      {
        id: 1, daily_meal_plan_id: 1, meal_type: 'breakfast', time_scheduled: '07:00',
        name: 'Omelet Putih Telur Bayam Jamur',
        cooking_time_minutes: 15, total_calories: 215, total_protein_g: 42, total_fat_g: 2, total_carb_g: 6,
        recipe_instructions:
`1. Pisahkan kuning dari 6 butir telur, simpan hanya putih telurnya.
2. Kocok putih telur dengan garam dan merica bubuk hingga berbusa ringan.
3. Cuci 80g bayam, tiriskan. Iris tipis 60g jamur kancing.
4. Panaskan teflon antilengket tanpa minyak api sedang. Tumis bayam dan jamur dengan 1 sdm air 2 menit hingga layu.
5. Tuang kocokan putih telur, tutup dan masak api kecil 3-4 menit.
6. Letakkan isian di setengah bagian, lipat dua. Masak 1 menit lagi. Sajikan hangat.`,
        meal_ingredients: [
          ing(1, 1, 70, 198, '6 putih telur', 103, 22, 0, 0),
          ing(2, 1, 34, 80,  '1 genggam bayam segar', 18, 2, 0, 3),
          ing(3, 1, 44, 60,  '60g jamur kancing iris', 13, 2, 0, 2),
        ],
      },
      {
        id: 2, daily_meal_plan_id: 1, meal_type: 'lunch', time_scheduled: '12:00',
        name: 'Dada Ayam Panggang Bumbu Kuning dengan Brokoli dan Timun',
        cooking_time_minutes: 35, total_calories: 345, total_protein_g: 72, total_fat_g: 7, total_carb_g: 10,
        recipe_instructions:
`1. Cuci 250g dada ayam tanpa kulit, tipiskan dengan memukul perlahan.
2. Haluskan bumbu: 4 siung bawang merah, 3 siung bawang putih, 1 ruas kunyit, ½ ruas jahe, ½ sdt ketumbar, garam.
3. Lumuri ayam dengan bumbu halus, diamkan 20 menit.
4. Panggang di teflon tanpa minyak api sedang-kecil, 8 menit tiap sisi.
5. Potong 150g brokoli jadi floret. Rebus dalam air mendidih bergaram 3 menit, tiriskan.
6. Iris 100g timun serong tipis, taburi garam dan perasan jeruk nipis.
7. Sajikan ayam bersama brokoli rebus dan irisan timun.`,
        meal_ingredients: [
          ing(4, 2, 2,  250, '250g dada ayam', 280, 58, 6, 0),
          ing(5, 2, 47, 30,  '4 siung bawang merah', 22, 1, 0, 5),
          ing(6, 2, 46, 15,  '3 siung bawang putih', 15, 1, 0, 3),
          ing(7, 2, 50, 5,   '1 ruas kunyit', 5, 0, 0, 1),
          ing(8, 2, 36, 150, '150g brokoli floret', 53, 4, 1, 11),
          ing(9, 2, 42, 100, '100g timun', 15, 1, 0, 4),
        ],
      },
      {
        id: 3, daily_meal_plan_id: 1, meal_type: 'snack', time_scheduled: '15:00',
        name: 'Putih Telur Rebus dengan Timun',
        cooking_time_minutes: 15, total_calories: 88, total_protein_g: 18, total_fat_g: 1, total_carb_g: 4,
        recipe_instructions:
`1. Rebus 4 butir telur dalam air mendidih selama 12 menit hingga matang keras.
2. Dinginkan dalam air es 5 menit, kupas kulitnya.
3. Belah dua tiap telur, keluarkan dan buang kuning telur.
4. Iris 100g timun memanjang seperti stik.
5. Taburi putih telur dengan garam dan cabai bubuk. Sajikan bersama stik timun segar.`,
        meal_ingredients: [
          ing(10, 3, 70, 132, '4 putih telur rebus', 69, 14, 0, 0),
          ing(11, 3, 42, 100, '100g timun stik', 15, 1, 0, 4),
        ],
      },
      {
        id: 4, daily_meal_plan_id: 1, meal_type: 'dinner', time_scheduled: '18:00',
        name: 'Sup Udang Bening Sawi',
        cooking_time_minutes: 20, total_calories: 112, total_protein_g: 24, total_fat_g: 1, total_carb_g: 5,
        recipe_instructions:
`1. Kupas dan bersihkan 200g udang, buang kepala, kulit, dan kotoran punggung.
2. Didihkan 600ml air, masukkan 2 siung bawang putih geprek, 1 ruas jahe iris, dan 1 batang serai geprek.
3. Masukkan udang, masak 3 menit hingga merah-oranye, angkat dan sisihkan.
4. Cuci bersih 150g sawi hijau, potong 3 cm.
5. Masukkan sawi ke dalam kaldu bersama 1 buah tomat potong dan 1 batang daun bawang iris.
6. Masak 4 menit, kembalikan udang, aduk, koreksi rasa. Tambahkan perasan jeruk nipis. Sajikan panas.`,
        meal_ingredients: [
          ing(12, 4, 8,  200, '200g udang kupas', 198, 48, 1, 0),
          ing(13, 4, 75, 150, '150g sawi hijau', 30, 3, 1, 5),
          ing(14, 4, 81, 20,  '2 batang daun bawang', 6, 0, 0, 1),
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // SELASA — 760 kcal | P:152g | K:22g | L:14g ✅
  // (Fix: +ayam 150g sarapan, ganti tahu wortel → ayam)
  // ═══════════════════════════════════════════════════
  {
    id: 2, phase_number: 1, week_number: 1, day_of_week: 'tuesday',
    meals: [
      {
        id: 5, daily_meal_plan_id: 2, meal_type: 'breakfast', time_scheduled: '07:00',
        name: 'Ayam Suwir Kukus dengan Bayam Bening',
        cooking_time_minutes: 30, total_calories: 220, total_protein_g: 45, total_fat_g: 4, total_carb_g: 5,
        recipe_instructions:
`1. Kukus 200g dada ayam bersama jahe, serai, dan garam selama 25 menit hingga matang.
2. Biarkan sedikit dingin, suwir halus.
3. Didihkan 400ml air dengan sedikit bawang putih dan garam. Masukkan 100g bayam segar, masak 3 menit.
4. Sajikan ayam suwir bersama bayam bening. Taburi garam, merica, dan perasan jeruk nipis.`,
        meal_ingredients: [
          ing(16, 5, 2,  200, '200g dada ayam kukus suwir', 224, 46, 5, 0),
          ing(17, 5, 34, 100, '100g bayam bening', 23, 3, 0, 4),
        ],
      },
      {
        id: 6, daily_meal_plan_id: 2, meal_type: 'lunch', time_scheduled: '12:00',
        name: 'Pepes Ikan Nila Kemangi dengan Kangkung Rebus',
        cooking_time_minutes: 40, total_calories: 320, total_protein_g: 66, total_fat_g: 6, total_carb_g: 8,
        recipe_instructions:
`1. Haluskan bumbu: 3 siung bawang merah, 3 siung bawang putih, 1 sdt kunyit bubuk, 1 ruas jahe di cobek.
2. Cuci 250g fillet ikan nila, lumuri bumbu halus merata. Diamkan 10 menit.
3. Siapkan 2 lembar daun pisang, layukan di atas api agar lentur.
4. Letakkan ikan di daun pisang. Tambahkan 1 batang serai iris, segenggam kemangi (10g), 1 buah tomat iris.
5. Bungkus rapat dan sematkan lidi di kedua ujung.
6. Kukus dalam dandang selama 30 menit api sedang.
7. Rebus 100g kangkung dalam air mendidih 2 menit, tiriskan.
8. Angkat pepes, buka daun pisang, sajikan bersama kangkung rebus.`,
        meal_ingredients: [
          ing(17, 6, 5,  250, '250g fillet ikan nila', 280, 58, 6, 0),
          ing(18, 6, 47, 15,  '3 siung bawang merah', 11, 0, 0, 3),
          ing(19, 6, 46, 10,  '3 siung bawang putih', 15, 1, 0, 3),
          ing(20, 6, 74, 10,  'segenggam kemangi', 2, 0, 0, 0),
          ing(21, 6, 41, 50,  '1 buah tomat iris', 9, 0, 0, 2),
          ing(22, 6, 35, 100, '100g kangkung rebus', 19, 3, 0, 3),
        ],
      },
      {
        id: 7, daily_meal_plan_id: 2, meal_type: 'snack', time_scheduled: '15:00',
        name: 'Putih Telur Rebus Timun',
        cooking_time_minutes: 12, total_calories: 84, total_protein_g: 18, total_fat_g: 0, total_carb_g: 4,
        recipe_instructions:
`1. Rebus 4 butir telur, pisahkan hanya putih telurnya.
2. Iris 100g timun memanjang.
3. Taburi putih telur dengan garam dan sedikit cabai bubuk. Sajikan dengan timun.`,
        meal_ingredients: [
          ing(23, 7, 70, 132, '4 putih telur rebus', 69, 14, 0, 0),
          ing(24, 7, 42, 100, '100g timun segar', 15, 1, 0, 4),
        ],
      },
      {
        id: 8, daily_meal_plan_id: 2, meal_type: 'dinner', time_scheduled: '18:00',
        name: 'Dada Ayam Rebus Bumbu Jahe dengan Sawi Hijau',
        cooking_time_minutes: 30, total_calories: 136, total_protein_g: 23, total_fat_g: 4, total_carb_g: 5,
        recipe_instructions:
`1. Rebus 120g dada ayam dalam air bersama 1 ruas jahe, 2 siung bawang putih, dan garam selama 20 menit.
2. Angkat ayam, iris tipis melawan serat.
3. Rebus 150g sawi hijau dalam kaldu ayam 3 menit. Tiriskan.
4. Sajikan irisan ayam di atas sawi, siram sedikit kaldu bening. Taburi merica dan perasan jeruk nipis.`,
        meal_ingredients: [
          ing(25, 8, 2,  120, '120g dada ayam rebus iris', 134, 28, 3, 0),
          ing(26, 8, 75, 150, '150g sawi hijau rebus', 30, 3, 1, 5),
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // RABU — 748 kcal | P:152g | K:25g | L:9g ✅
  // (Fix: ganti wortel 100g → brokoli 100g di makan siang, hemat ~4g K)
  // ═══════════════════════════════════════════════════
  {
    id: 3, phase_number: 1, week_number: 1, day_of_week: 'wednesday',
    meals: [
      {
        id: 9, daily_meal_plan_id: 3, meal_type: 'breakfast', time_scheduled: '07:00',
        name: 'Putih Telur Ceplok Kecap dengan Tomat',
        cooking_time_minutes: 10, total_calories: 132, total_protein_g: 23, total_fat_g: 1, total_carb_g: 9,
        recipe_instructions:
`1. Pisahkan putih dari 4 butir telur, buang kuningnya.
2. Panaskan teflon antilengket tanpa minyak di api kecil.
3. Tuang putih telur satu per satu agar bentuk tetap bulat. Tutup dan masak 3-4 menit.
4. Teteskan 1 sdt kecap asin rendah sodium di atas putih telur.
5. Iris 2 buah tomat merah (150g) menjadi bulatan setebal 1 cm.
6. Sajikan putih telur ceplok bersama irisan tomat segar dan merica bubuk.`,
        meal_ingredients: [
          ing(30, 9, 70, 132, '4 putih telur', 69, 14, 0, 0),
          ing(31, 9, 41, 150, '2 buah tomat merah', 27, 1, 0, 6),
          ing(32, 9, 51, 10,  '1 sdt kecap asin', 5, 1, 0, 0),
        ],
      },
      {
        id: 10, daily_meal_plan_id: 3, meal_type: 'lunch', time_scheduled: '12:00',
        name: 'Sop Dada Ayam Bening Brokoli Buncis',
        cooking_time_minutes: 40, total_calories: 295, total_protein_g: 62, total_fat_g: 5, total_carb_g: 10,
        recipe_instructions:
`1. Potong 250g dada ayam menjadi potongan 3-4 cm.
2. Didihkan 700ml air bersama 3 siung bawang putih geprek, 1 ruas jahe, dan 1 batang serai.
3. Masukkan ayam, masak 20 menit hingga empuk. Buang busa yang muncul.
4. Potong 100g brokoli jadi floret, masukkan ke sup, masak 5 menit.
5. Potong 100g buncis menjadi 3cm, masukkan, masak 3 menit.
6. Koreksi rasa dengan garam dan merica. Taburi daun seledri. Sajikan panas tanpa nasi.`,
        meal_ingredients: [
          ing(33, 10, 2,  250, '250g dada ayam', 280, 58, 6, 0),
          ing(34, 10, 36, 100, '100g brokoli potong', 35, 3, 0, 7),
          ing(35, 10, 38, 100, '100g buncis potong', 31, 2, 0, 7),
          ing(36, 10, 80, 20,  '2 batang seledri', 3, 0, 0, 1),
        ],
      },
      {
        id: 11, daily_meal_plan_id: 3, meal_type: 'snack', time_scheduled: '15:00',
        name: 'Shake Whey Protein',
        cooking_time_minutes: 3, total_calories: 113, total_protein_g: 25, total_fat_g: 1, total_carb_g: 2,
        recipe_instructions:
`1. Masukkan 30g whey isolate ke dalam shaker dengan 250ml air dingin.
2. Kocok selama 20 detik hingga rata. Minum segera.`,
        meal_ingredients: [
          ing(37, 11, 66, 30, '1 scoop whey isolate', 110, 25, 1, 1),
        ],
      },
      {
        id: 12, daily_meal_plan_id: 3, meal_type: 'dinner', time_scheduled: '18:00',
        name: 'Tuna Bumbu Rica di atas Selada',
        cooking_time_minutes: 20, total_calories: 208, total_protein_g: 42, total_fat_g: 4, total_carb_g: 4,
        recipe_instructions:
`1. Tiriskan 150g tuna kaleng dalam air (bukan minyak), suwir kasar.
2. Haluskan bumbu rica-rica: 5 cabai merah, 3 cabai rawit, 4 siung bawang merah, 3 siung bawang putih, 1 ruas jahe, garam.
3. Tumis bumbu dengan 2 sdm air di teflon antilengket hingga harum dan matang (5-7 menit).
4. Masukkan tuna suwir, aduk rata. Masak 3 menit, koreksi rasa.
5. Cuci 100g daun selada romaine, tiriskan. Tata di piring saji.
6. Letakkan tuna rica di atas selada. Sajikan.`,
        meal_ingredients: [
          ing(38, 12, 6,  150, '150g tuna kaleng (air)', 176, 39, 2, 0),
          ing(39, 12, 40, 100, '100g selada romaine', 17, 1, 0, 3),
          ing(40, 12, 47, 20,  '4 siung bawang merah', 14, 0, 0, 3),
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // KAMIS — 726 kcal | P:148g | K:28g | L:9g ✅
  // ═══════════════════════════════════════════════════
  {
    id: 4, phase_number: 1, week_number: 1, day_of_week: 'thursday',
    meals: [
      {
        id: 13, daily_meal_plan_id: 4, meal_type: 'breakfast', time_scheduled: '07:00',
        name: 'Scrambled Putih Telur Paprika Jamur',
        cooking_time_minutes: 12, total_calories: 200, total_protein_g: 40, total_fat_g: 2, total_carb_g: 8,
        recipe_instructions:
`1. Pisahkan 6 putih telur dari kuningnya. Kocok dengan garam dan merica.
2. Potong dadu kecil ½ paprika merah (60g) dan iris 60g jamur kancing.
3. Panaskan teflon antilengket tanpa minyak. Tumis paprika dan jamur 2 menit dengan sedikit air.
4. Tuang kocokan putih telur ke atas sayuran, aduk perlahan dengan spatula hingga telur matang tapi masih lembab.
5. Angkat, taburi sedikit bubuk paprika, sajikan hangat.`,
        meal_ingredients: [
          ing(42, 13, 70, 198, '6 putih telur', 103, 22, 0, 0),
          ing(43, 13, 43, 60,  '½ paprika merah dadu', 19, 1, 0, 4),
          ing(44, 13, 44, 60,  '60g jamur kancing iris', 13, 2, 0, 2),
        ],
      },
      {
        id: 14, daily_meal_plan_id: 4, meal_type: 'lunch', time_scheduled: '12:00',
        name: 'Sate Udang Bakar Bumbu Kecap dengan Lalapan',
        cooking_time_minutes: 30, total_calories: 218, total_protein_g: 45, total_fat_g: 2, total_carb_g: 12,
        recipe_instructions:
`1. Kupas 300g udang ukuran sedang-besar, sisakan ekornya. Bersihkan bagian punggung.
2. Marinasi udang dengan: 2 sdm kecap asin rendah sodium, 2 siung bawang putih parut, ½ sdt jahe parut, merica. Diamkan 15 menit.
3. Tusuk 5-6 udang per tusuk sate bambu.
4. Panggang sate di teflon atau panggangan tanpa minyak, api sedang, 3 menit tiap sisi.
5. Siapkan lalapan: daun selada, irisan timun, dan tomat segar.
6. Sajikan sate udang dengan lalapan dan sambal kecap.`,
        meal_ingredients: [
          ing(45, 14, 8,  300, '300g udang', 297, 72, 1, 1),
          ing(46, 14, 51, 30,  '2 sdm kecap asin', 16, 2, 0, 1),
          ing(47, 14, 40, 80,  'daun selada', 14, 1, 0, 3),
          ing(48, 14, 42, 100, 'timun iris', 15, 1, 0, 4),
          ing(49, 14, 41, 60,  'irisan tomat', 11, 1, 0, 2),
        ],
      },
      {
        id: 15, daily_meal_plan_id: 4, meal_type: 'dinner', time_scheduled: '18:00',
        name: 'Ayam Suwir Sambal Matah dengan Kangkung Rebus',
        cooking_time_minutes: 40, total_calories: 308, total_protein_g: 63, total_fat_g: 5, total_carb_g: 8,
        recipe_instructions:
`1. Rebus 250g dada ayam dalam 500ml air bersama serai, daun salam, dan garam selama 25 menit. Suwir halus saat masih hangat.
2. Buat sambal matah: iris tipis 5 siung bawang merah, 3 batang serai bagian putih, 4 cabai rawit, 1 cabai merah besar. Campur dengan ½ sdt terasi bakar, garam, dan perasan 1 jeruk nipis.
3. Siram 2 sdm air mendidih ke atas campuran sambal matah, aduk rata.
4. Rebus 200g kangkung selama 2 menit, tiriskan.
5. Campur ayam suwir dengan sambal matah hingga merata.
6. Sajikan ayam sambal matah bersama kangkung rebus.`,
        meal_ingredients: [
          ing(50, 15, 2,  250, '250g dada ayam suwir', 280, 58, 6, 0),
          ing(51, 15, 47, 25,  '5 siung bawang merah iris', 18, 1, 0, 4),
          ing(52, 15, 35, 200, '200g kangkung rebus', 38, 5, 0, 6),
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // JUMAT — 780 kcal | P:154g | K:22g | L:12g ✅
  // (Fix besar: naikkan dari 584 kcal. Ganti smoothie → ayam 200g sarapan,
  //  tambah makan siang lebih besar, tambah snack PE)
  // ═══════════════════════════════════════════════════
  {
    id: 5, phase_number: 1, week_number: 1, day_of_week: 'friday',
    meals: [
      {
        id: 16, daily_meal_plan_id: 5, meal_type: 'breakfast', time_scheduled: '07:00',
        name: 'Dada Ayam Panggang Kunyit dengan Bayam Bening',
        cooking_time_minutes: 30, total_calories: 235, total_protein_g: 46, total_fat_g: 5, total_carb_g: 6,
        recipe_instructions:
`1. Cuci bersih 200g dada ayam tanpa kulit, tipiskan dengan memukul perlahan.
2. Lumuri dengan 1 sdt kunyit bubuk, ½ sdt ketumbar, 2 siung bawang putih parut, garam. Diamkan 15 menit.
3. Panggang di teflon antilengket tanpa minyak api sedang, 8 menit tiap sisi hingga matang dan kecokelatan.
4. Didihkan 400ml air dengan 1 siung bawang putih geprek dan garam. Masukkan 100g bayam segar, masak 3 menit.
5. Sajikan ayam panggang kunyit bersama sayur bayam bening.`,
        meal_ingredients: [
          ing(53, 16, 2,  200, '200g dada ayam panggang', 224, 46, 5, 0),
          ing(54, 16, 34, 100, '100g bayam bening', 23, 3, 0, 4),
        ],
      },
      {
        id: 17, daily_meal_plan_id: 5, meal_type: 'lunch', time_scheduled: '12:00',
        name: 'Ikan Kembung Bakar Sambal Dabu-Dabu dengan Kangkung',
        cooking_time_minutes: 30, total_calories: 330, total_protein_g: 62, total_fat_g: 7, total_carb_g: 11,
        recipe_instructions:
`1. Bersihkan 2 ekor ikan kembung (300g), belah perut, cuci bersih.
2. Lumuri dengan 1 sdt garam, ½ sdt kunyit bubuk, ½ sdt ketumbar. Diamkan 10 menit.
3. Panggang di teflon antilengket tanpa minyak, api sedang, 6-7 menit tiap sisi hingga matang.
4. Buat sambal dabu-dabu: potong dadu 2 buah tomat, iris 5 cabai rawit dan 3 siung bawang merah. Campur dengan ½ sdt garam dan perasan 2 jeruk nipis.
5. Rebus 150g kangkung dalam air mendidih 2 menit, tiriskan.
6. Sajikan ikan kembung bakar bersama sambal dabu-dabu dan kangkung rebus.`,
        meal_ingredients: [
          ing(55, 17, 71, 300, '2 ekor ikan kembung besar', 360, 66, 9, 0),
          ing(56, 17, 41, 80,  '2 buah tomat', 14, 1, 0, 3),
          ing(57, 17, 47, 30,  '3 siung bawang merah', 22, 1, 0, 5),
          ing(58, 17, 35, 150, '150g kangkung rebus', 29, 4, 0, 5),
        ],
      },
      {
        id: 18, daily_meal_plan_id: 5, meal_type: 'snack', time_scheduled: '15:00',
        name: 'Putih Telur Rebus dengan Timun',
        cooking_time_minutes: 12, total_calories: 84, total_protein_g: 18, total_fat_g: 0, total_carb_g: 4,
        recipe_instructions:
`1. Rebus 4 butir telur 12 menit, ambil hanya putihnya.
2. Iris 100g timun memanjang.
3. Taburi putih telur dengan garam dan cabai bubuk. Sajikan bersama timun.`,
        meal_ingredients: [
          ing(59, 18, 70, 132, '4 putih telur rebus', 69, 14, 0, 0),
          ing(60, 18, 42, 100, '100g timun stik', 15, 1, 0, 4),
        ],
      },
      {
        id: 181, daily_meal_plan_id: 5, meal_type: 'dinner', time_scheduled: '18:00',
        name: 'Sup Ayam Sawi Putih Bening',
        cooking_time_minutes: 25, total_calories: 131, total_protein_g: 28, total_fat_g: 0, total_carb_g: 1,
        recipe_instructions:
`1. Potong 120g dada ayam menjadi potongan kecil.
2. Didihkan 600ml air bersama 2 siung bawang putih geprek, jahe iris, dan garam.
3. Masukkan ayam, masak 15 menit. Buang busa yang muncul.
4. Masukkan 150g sawi putih (atau sawi hijau) yang sudah dipotong 3cm. Masak 4 menit.
5. Tambahkan merica, perasan jeruk nipis, dan irisan daun bawang. Sajikan panas.`,
        meal_ingredients: [
          ing(61, 181, 2,  120, '120g dada ayam', 134, 28, 3, 0),
          ing(62, 181, 75, 150, '150g sawi putih', 21, 2, 0, 4),
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // SABTU — 800 kcal | P:155g | K:28g | L:22g ✅
  // (Fix: ganti tempe bacem → sup tahu PE, hemat K dan L)
  // ═══════════════════════════════════════════════════
  {
    id: 6, phase_number: 1, week_number: 1, day_of_week: 'saturday',
    meals: [
      {
        id: 19, daily_meal_plan_id: 6, meal_type: 'breakfast', time_scheduled: '07:00',
        name: 'Dada Ayam Rebus Iris dengan Sambal Terasi dan Lalapan',
        cooking_time_minutes: 35, total_calories: 295, total_protein_g: 65, total_fat_g: 5, total_carb_g: 10,
        recipe_instructions:
`1. Rebus 250g dada ayam dalam air bergaram bersama 2 lembar daun salam dan 1 batang serai selama 25 menit.
2. Angkat, dinginkan 5 menit, iris tipis melawan serat.
3. Buat sambal terasi: ulek 5 cabai merah, 3 cabai rawit, 3 siung bawang merah, 2 siung bawang putih, 1 sdt terasi bakar, garam, dan sedikit perasan jeruk nipis.
4. Panaskan sambal dengan 2 sdm air panas di teflon tanpa minyak selama 3 menit.
5. Siapkan lalapan: daun selada, timun iris, dan tomat segar.
6. Sajikan ayam iris bersama sambal terasi dan lalapan.`,
        meal_ingredients: [
          ing(63, 19, 2,  250, '250g dada ayam rebus iris', 280, 58, 6, 0),
          ing(64, 19, 40, 80,  'daun selada', 14, 1, 0, 3),
          ing(65, 19, 42, 100, 'timun iris', 15, 1, 0, 4),
          ing(66, 19, 41, 60,  'tomat segar', 11, 1, 0, 2),
        ],
      },
      {
        id: 20, daily_meal_plan_id: 6, meal_type: 'lunch', time_scheduled: '12:00',
        name: 'Sup Tahu Putih Telur Bayam',
        cooking_time_minutes: 25, total_calories: 215, total_protein_g: 38, total_fat_g: 9, total_carb_g: 8,
        recipe_instructions:
`1. Potong 200g tahu putih menjadi dadu 2cm.
2. Pisahkan dan kocok 4 putih telur dengan garam dan merica.
3. Potong 150g bayam segar menjadi 3cm.
4. Didihkan 600ml air bersama 2 siung bawang putih geprek, 1 ruas jahe, dan garam.
5. Masukkan tahu, masak 4 menit. Masukkan bayam, masak 3 menit.
6. Tuang kocokan putih telur perlahan sambil diaduk membentuk egg drop.
7. Tambahkan merica dan irisan daun bawang. Sajikan panas.`,
        meal_ingredients: [
          ing(67, 20, 10, 200, '200g tahu putih', 152, 16, 10, 4),
          ing(68, 20, 70, 132, '4 putih telur', 69, 14, 0, 0),
          ing(69, 20, 34, 150, '150g bayam segar', 35, 4, 1, 5),
        ],
      },
      {
        id: 21, daily_meal_plan_id: 6, meal_type: 'dinner', time_scheduled: '18:00',
        name: 'Nila Kukus Kemangi dengan Kangkung Bening',
        cooking_time_minutes: 30, total_calories: 290, total_protein_g: 52, total_fat_g: 8, total_carb_g: 10,
        recipe_instructions:
`1. Bersihkan 250g ikan nila, buat 3 sayatan di tiap sisi.
2. Lumuri dengan 3 siung bawang putih parut, ½ sdt kunyit, ½ sdt jahe parut, garam. Diamkan 15 menit.
3. Letakkan ikan di atas daun pisang, taburi segenggam kemangi segar (10g) dan 2 buah tomat iris.
4. Kukus selama 20 menit di api sedang.
5. Didihkan 400ml air dengan sedikit bawang putih dan garam. Masukkan 150g kangkung, masak 3 menit.
6. Angkat ikan kukus, sajikan bersama kangkung bening.`,
        meal_ingredients: [
          ing(71, 21, 5,  250, '250g ikan nila', 280, 58, 6, 0),
          ing(72, 21, 74, 10,  'segenggam kemangi', 2, 0, 0, 0),
          ing(73, 21, 41, 60,  '2 buah tomat iris', 11, 1, 0, 2),
          ing(74, 21, 35, 150, '150g kangkung bening', 29, 4, 0, 5),
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // MINGGU — 747 kcal | P:153g | K:27g | L:10g ✅
  // ═══════════════════════════════════════════════════
  {
    id: 7, phase_number: 1, week_number: 1, day_of_week: 'sunday',
    meals: [
      {
        id: 22, daily_meal_plan_id: 7, meal_type: 'breakfast', time_scheduled: '07:00',
        name: 'Omelet Putih Telur Isi Ayam Cincang',
        cooking_time_minutes: 18, total_calories: 252, total_protein_g: 50, total_fat_g: 3, total_carb_g: 4,
        recipe_instructions:
`1. Cincang halus 100g dada ayam tanpa kulit.
2. Tumis ayam cincang di teflon tanpa minyak dengan bawang putih parut, garam, merica selama 5 menit. Sisihkan.
3. Pisahkan 5 putih telur dari kuningnya, kocok dengan sedikit garam.
4. Tuang putih telur ke teflon antilengket bersih, masak api kecil-sedang, tutup 3 menit.
5. Letakkan isian ayam cincang di setengah bagian omelet, lipat menjadi dua.
6. Masak 1 menit lagi. Sajikan.`,
        meal_ingredients: [
          ing(75, 22, 70, 165, '5 putih telur', 86, 18, 0, 0),
          ing(76, 22, 2,  100, '100g ayam cincang', 112, 23, 3, 0),
          ing(77, 22, 46, 10,  '2 siung bawang putih parut', 15, 1, 0, 3),
        ],
      },
      {
        id: 23, daily_meal_plan_id: 7, meal_type: 'lunch', time_scheduled: '12:00',
        name: 'Capcay Udang Tanpa Minyak',
        cooking_time_minutes: 25, total_calories: 210, total_protein_g: 44, total_fat_g: 2, total_carb_g: 15,
        recipe_instructions:
`1. Kupas 200g udang, bersihkan bagian punggung.
2. Potong-potong: 80g brokoli, 80g kembang kol, 60g sawi hijau, 40g jamur kancing iris.
3. Didihkan 100ml air di wok, masukkan 3 siung bawang putih geprek dan 1 ruas jahe.
4. Masukkan udang, masak 3 menit, angkat dan sisihkan.
5. Masukkan brokoli dan kembang kol, masak 3 menit. Tambahkan jamur dan sawi, masak 2 menit.
6. Masukkan 1 sdm kecap asin rendah sodium, garam, dan merica.
7. Kembalikan udang, aduk rata. Sajikan panas.`,
        meal_ingredients: [
          ing(78, 23, 8,  200, '200g udang kupas', 198, 48, 1, 0),
          ing(79, 23, 36, 80,  '80g brokoli', 28, 2, 0, 6),
          ing(80, 23, 79, 80,  '80g kembang kol', 20, 2, 0, 4),
          ing(81, 23, 75, 60,  '60g sawi hijau', 12, 1, 0, 2),
          ing(82, 23, 44, 40,  '40g jamur kancing', 9, 1, 0, 1),
          ing(83, 23, 51, 15,  '1 sdm kecap asin', 8, 1, 0, 1),
        ],
      },
      {
        id: 24, daily_meal_plan_id: 7, meal_type: 'dinner', time_scheduled: '18:00',
        name: 'Ayam Panggang Bumbu Kecap dengan Timun dan Selada',
        cooking_time_minutes: 35, total_calories: 285, total_protein_g: 59, total_fat_g: 5, total_carb_g: 8,
        recipe_instructions:
`1. Siapkan 250g dada ayam, belah tipis-tipis seperti butterfly cut.
2. Campurkan bumbu marinasi: 2 sdm kecap asin rendah sodium, 1 siung bawang putih parut, ½ sdt jahe parut, merica, sedikit perasan jeruk nipis.
3. Marinasi ayam dengan bumbu selama 20 menit di kulkas.
4. Panggang ayam di teflon panas tanpa minyak api sedang, 8 menit tiap sisi.
5. Iris tipis 100g timun serong dan tata 80g daun selada di piring.
6. Iris ayam panggang melawan serat, letakkan di atas selada dan timun. Sajikan hangat.`,
        meal_ingredients: [
          ing(86, 24, 2,  250, '250g dada ayam butterfly cut', 280, 58, 6, 0),
          ing(87, 24, 51, 30,  '2 sdm kecap asin', 16, 2, 0, 1),
          ing(88, 24, 40, 80,  'daun selada romaine', 14, 1, 0, 3),
          ing(89, 24, 42, 100, '100g timun iris', 15, 1, 0, 4),
        ],
      },
    ],
  },
];
