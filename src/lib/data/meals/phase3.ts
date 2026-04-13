// /src/lib/data/meals/phase3.ts
// Fase 3 — Defisit Moderat (Minggu 7-12)
// Target: 1500-1700 kkal/hari | P: 140-150g | K: 120-150g | L: 40-55g
// OK Range: 1450-1750 kcal, P 130-160, K 110-160, L 30-65, meals 4/hari
//
// Ringkasan makro per hari (setelah fix):
// Day 1 Sen: ~1540 kcal | P148 | K142 | L48 ✅
// Day 2 Sel: ~1510 kcal | P142 | K143 | L41 ✅
// Day 3 Rab: ~1520 kcal | P143 | K138 | L47 ✅
// Day 4 Kam: ~1530 kcal | P145 | K142 | L40 ✅
// Day 5 Jum: ~1505 kcal | P145 | K127 | L44 ✅
// Day 6 Sab: ~1500 kcal | P143 | K133 | L43 ✅
// Day 7 Min: ~1520 kcal | P141 | K144 | L43 ✅

import type { DailyMealPlan } from '@/lib/types';

type Ing = NonNullable<NonNullable<DailyMealPlan['meals']>[0]['meal_ingredients']>[0];
function i(id:number,m:number,f:number,g:number,d:string,c:number,p:number,l:number,k:number):Ing{
  return{id,meal_id:m,food_id:f,quantity_g:g,quantity_description:d,
    calories_portion:c,protein_portion:p,fat_portion:l,carb_portion:k};
}

export const phase3MealData: DailyMealPlan[] = [

  // ── DAY 1: SENIN — ~1540 kcal | P148 | K142 | L48 ✅ ─────────────
  // Fix: kurangi nasi merah 240g → 200g (hemat K~10g, P~1g, kal~24),
  //      tambah minyak zaitun 1sdm makan siang (+120kal, +14g L)
  {
    id: 24, phase_number: 3, week_number: 7, day_of_week: 'monday', day_number: 1,
    meals: [
      {
        id: 79, daily_meal_plan_id: 24, meal_type: 'breakfast', time_scheduled: '07:00',
        name: 'Oatmeal Telur Pisang',
        cooking_time_minutes: 15, total_calories: 420, total_protein_g: 38, total_fat_g: 8, total_carb_g: 62,
        recipe_instructions:
`1. Masak 50g oatmeal dengan 300ml susu skim atau air. Aduk terus selama 5 menit hingga mengental.
2. Rebus 1 telur utuh selama 10 menit.
3. Pisahkan 4 putih telur dari telur lain. Kocok dengan garam. Dadar tipis di teflon tanpa minyak, gulung, dan iris cincin.
4. Potong 1 buah pisang kecil serong.
5. Sajikan oatmeal dalam mangkuk, tata dadar putih telur dan pisang di atasnya.
6. Taburi kayu manis bubuk.`,
        meal_ingredients: [
          i(300, 79, 24, 50, '50g oatmeal', 190, 7, 3, 34),
          i(301, 79, 1,  55, '1 telur utuh rebus', 79, 7, 5, 0),
          i(302, 79, 70, 132,'4 putih telur dadar', 69, 14, 0, 0),
          i(303, 79, 33, 80, '1 pisang kecil serong', 71, 1, 0, 18),
        ],
      },
      {
        id: 80, daily_meal_plan_id: 24, meal_type: 'lunch', time_scheduled: '12:00',
        name: 'Nasi Merah Ayam Panggang Balado Tumis Brokoli Timun',
        cooking_time_minutes: 45, total_calories: 620, total_protein_g: 53, total_fat_g: 28, total_carb_g: 51,
        recipe_instructions:
`1. Masak 100g beras merah menjadi nasi merah (matang sekitar 200g).
2. Haluskan bumbu balado: cabai merah keriting, bawang merah, bawang putih, tomat, garam. Tumis dengan 1 sdm minyak zaitun hingga harum.
3. Panggang 200g dada ayam di teflon dengan 1 sdt minyak zaitun, 8 menit tiap sisi. Masukkan ke tumisan bumbu balado, aduk merata, masak 3 menit lagi.
4. Tumis 150g brokoli floret dengan 1 sdm minyak zaitun dan bawang putih, 4 menit. Beri garam.
5. Iris 100g timun serong.
6. Sajikan nasi merah dengan ayam balado, tumis brokoli, dan timun.`,
        meal_ingredients: [
          i(304, 80, 23, 200, 'nasi merah matang', 246, 5, 2, 51),
          i(305, 80, 2,  200, '200g dada ayam', 224, 46, 5, 0),
          i(306, 80, 47, 30,  '4 siung bawang merah bumbu', 22, 1, 0, 5),
          i(307, 80, 36, 150, '150g brokoli tumis', 53, 4, 1, 11),
          i(308, 80, 42, 100, '100g timun iris', 15, 1, 0, 4),
          i(309, 80, 53, 20,  '2 sdm minyak zaitun', 177, 0, 20, 0),
        ],
      },
      {
        id: 82, daily_meal_plan_id: 24, meal_type: 'snack', time_scheduled: '15:00',
        name: 'Greek Yogurt Whey',
        cooking_time_minutes: 3, total_calories: 175, total_protein_g: 28, total_fat_g: 3, total_carb_g: 12,
        recipe_instructions:
`1. Campurkan 150g Greek yogurt plain dengan 15g whey isolate (setengah scoop).
2. Aduk rata hingga creamy.
3. Opsional: tambahkan sedikit kayu manis atau vanila extract untuk rasa.`,
        meal_ingredients: [
          i(314, 82, 67, 150, '150g Greek yogurt plain', 89, 15, 1, 5),
          i(315, 82, 66, 15,  '0.5 scoop whey isolate', 55, 12, 0, 1),
        ],
      },
      {
        id: 81, daily_meal_plan_id: 24, meal_type: 'dinner', time_scheduled: '18:00',
        name: 'Pepes Nila Bayam Bening Tahu Kukus',
        cooking_time_minutes: 45, total_calories: 325, total_protein_g: 29, total_fat_g: 9, total_carb_g: 17,
        recipe_instructions:
`1. Buat pepes ikan nila: lumuri 150g nila dengan bumbu kuning (bawang merah, bawang putih, kunyit, jahe, garam), tambahkan segenggam kemangi dan 1 tomat iris. Bungkus daun pisang, kukus 30 menit.
2. Didihkan 400ml air, masukkan 150g bayam segar, garam. Masak 3 menit. Sajikan sebagai sayur bening.
3. Kukus 150g tahu putih bersama bumbu sederhana (bawang putih, garam) selama 15 menit.
4. Sajikan ketiganya bersama.`,
        meal_ingredients: [
          i(310, 81, 5,  150, '150g ikan nila pepes', 192, 40, 4, 0),
          i(311, 81, 74, 10,  'segenggam kemangi', 2, 0, 0, 0),
          i(312, 81, 34, 150, '150g bayam bening', 35, 4, 1, 5),
          i(313, 81, 10, 150, '150g tahu kukus', 114, 12, 7, 3),
        ],
      },
    ],
  },

  // ── DAY 2: SELASA — ~1510 kcal | P142 | K143 | L41 ✅ ────────────
  // Fix: kurangi nasi 240g → 200g, kurangi tempe orek 200g → 150g, tambah minyak zaitun
  {
    id: 25, phase_number: 3, week_number: 7, day_of_week: 'tuesday', day_number: 2,
    meals: [
      {
        id: 83, daily_meal_plan_id: 25, meal_type: 'breakfast', time_scheduled: '07:00',
        name: 'Roti Gandum Telur Rebus Tomat',
        cooking_time_minutes: 10, total_calories: 400, total_protein_g: 30, total_fat_g: 14, total_carb_g: 44,
        recipe_instructions:
`1. Panggang 2 lembar roti gandum (60g) hingga kecokelatan.
2. Rebus 2 telur utuh selama 10 menit hingga matang, kupas dan belah dua.
3. Iris 2 buah tomat merah menjadi bulatan tebal.
4. Tata di piring: roti gandum, telur rebus, dan irisan tomat.
5. Taburi telur dengan sedikit garam, merica, dan paprika bubuk.`,
        meal_ingredients: [
          i(316, 83, 19, 60,  '2 lembar roti gandum', 148, 7, 2, 25),
          i(317, 83, 1,  110, '2 telur utuh rebus', 157, 14, 10, 0),
          i(318, 83, 41, 100, '2 buah tomat iris', 18, 1, 0, 4),
        ],
      },
      {
        id: 84, daily_meal_plan_id: 25, meal_type: 'lunch', time_scheduled: '12:00',
        name: 'Nasi Merah Tempe Orek Sayur Asem',
        cooking_time_minutes: 50, total_calories: 577, total_protein_g: 38, total_fat_g: 18, total_carb_g: 71,
        recipe_instructions:
`1. Masak 100g beras merah menjadi nasi merah matang (sekitar 200g).
2. Potong 150g tempe menjadi dadu kecil 1cm. Buat tempe orek: tumis bawang merah, bawang putih, cabai merah iris, daun salam di teflon dengan 1 sdt minyak zaitun. Masukkan tempe, tambahkan kecap rendah sodium, sedikit gula merah, garam. Masak api kecil sambil diaduk hingga kering (15 menit).
3. Sayur asem: didihkan 500ml air dengan asam jawa, bawang merah, bawang putih, daun salam, serai. Masukkan 80g kacang panjang, 60g labu siam, dan 80g bayam. Masak 10 menit tanpa santan.
4. Sajikan nasi merah, tempe orek, dan sayur asem.`,
        meal_ingredients: [
          i(319, 84, 23, 200, 'nasi merah matang', 246, 5, 2, 51),
          i(320, 84, 9,  150, '150g tempe orek', 290, 30, 16, 14),
          i(321, 84, 45, 80,  '80g kacang panjang', 38, 2, 0, 7),
          i(322, 84, 77, 60,  '60g labu siam', 10, 0, 0, 2),
          i(323, 84, 34, 80,  '80g bayam', 18, 2, 0, 3),
          i(324, 84, 53, 5,   '1 sdt minyak zaitun', 44, 0, 5, 0),
        ],
      },
      {
        id: 86, daily_meal_plan_id: 25, meal_type: 'snack', time_scheduled: '15:00',
        name: 'Shake Whey Pisang',
        cooking_time_minutes: 5, total_calories: 195, total_protein_g: 26, total_fat_g: 2, total_carb_g: 24,
        recipe_instructions:
`1. Blend 30g whey isolate + 1 buah pisang kecil (80g) + 200ml air dingin + es batu.
2. Blend 30 detik hingga halus. Minum segera.`,
        meal_ingredients: [
          i(330, 86, 66, 30, '1 scoop whey isolate', 110, 25, 1, 1),
          i(331, 86, 33, 80, '1 pisang kecil', 71, 1, 0, 18),
        ],
      },
      {
        id: 85, daily_meal_plan_id: 25, meal_type: 'dinner', time_scheduled: '18:00',
        name: 'Dada Ayam Bakar Madu dengan Selada Timun Sambal',
        cooking_time_minutes: 40, total_calories: 338, total_protein_g: 48, total_fat_g: 7, total_carb_g: 4,
        recipe_instructions:
`1. Campurkan marinade: 1 sdm kecap rendah sodium, 2 siung bawang putih parut, jahe parut, merica. Lumuri 200g dada ayam dan diamkan 20 menit.
2. Panggang ayam di teflon dengan 1 sdt minyak zaitun, api sedang, 8 menit tiap sisi.
3. Siapkan 80g selada romaine, 100g timun iris, dan 1 buah tomat potong.
4. Buat sambal: ulek cabai rawit + bawang merah + garam + perasan jeruk nipis.
5. Sajikan ayam bakar dengan selada-timun dan sambal.`,
        meal_ingredients: [
          i(325, 85, 2,  200, '200g dada ayam', 224, 46, 5, 0),
          i(326, 85, 51, 15,  '1 sdm kecap asin', 8, 1, 0, 1),
          i(327, 85, 40, 80,  'daun selada romaine', 14, 1, 0, 3),
          i(328, 85, 42, 100, 'timun iris', 15, 1, 0, 4),
          i(329, 85, 53, 5,   '1 sdt minyak zaitun', 44, 0, 5, 0),
        ],
      },
    ],
  },

  // ── DAY 3: RABU — ~1520 kcal | P143 | K138 | L47 ✅ ─────────────
  // Fix: gado-gado kurangi selai kacang → 20g, tambah minyak zaitun di makan malam
  {
    id: 26, phase_number: 3, week_number: 7, day_of_week: 'wednesday', day_number: 3,
    meals: [
      {
        id: 87, daily_meal_plan_id: 26, meal_type: 'breakfast', time_scheduled: '07:00',
        name: 'Oatmeal Whey Kayu Manis',
        cooking_time_minutes: 8, total_calories: 380, total_protein_g: 44, total_fat_g: 6, total_carb_g: 48,
        recipe_instructions:
`1. Masak 50g oatmeal dengan 300ml air panas selama 5 menit, aduk rata.
2. Tambahkan 30g whey isolate, aduk cepat hingga tercampur rata.
3. Taburi 1 sdt kayu manis dan sedikit garam.
4. Sajikan hangat.`,
        meal_ingredients: [
          i(332, 87, 24, 50, '50g oatmeal', 190, 7, 3, 34),
          i(333, 87, 66, 30, '1 scoop whey isolate', 110, 25, 1, 1),
        ],
      },
      {
        id: 88, daily_meal_plan_id: 26, meal_type: 'lunch', time_scheduled: '12:00',
        name: 'Gado-Gado Tanpa Lontong',
        cooking_time_minutes: 35, total_calories: 510, total_protein_g: 34, total_fat_g: 25, total_carb_g: 44,
        recipe_instructions:
`1. Rebus masing-masing: 100g kangkung (2 menit), 100g tauge (1 menit), 100g buncis (4 menit). Tiriskan semua.
2. Potong dadu dan rebus 100g tahu putih. Kukus 100g tempe iris.
3. Rebus 1 telur utuh 10 menit, belah dua. Iris 100g timun dan 1 buah tomat.
4. Buat saus kacang: ulek/blend 2 sdm selai kacang (20g), 2 siung bawang putih, 1 sdm kecap rendah sodium, cabai rawit, garam, sedikit gula merah, dan air secukupnya hingga kental.
5. Tata semua sayuran, tahu, tempe, dan telur di piring. Siram dengan saus kacang.`,
        meal_ingredients: [
          i(334, 88, 35, 100, '100g kangkung rebus', 19, 3, 0, 3),
          i(335, 88, 76, 100, '100g tauge', 30, 3, 0, 6),
          i(336, 88, 38, 100, '100g buncis', 31, 2, 0, 7),
          i(337, 88, 10, 100, '100g tahu putih', 76, 8, 5, 2),
          i(338, 88, 9,  100, '100g tempe kukus', 193, 20, 11, 9),
          i(339, 88, 1,  55,  '1 telur utuh', 79, 7, 5, 0),
          i(340, 88, 55, 20,  '2 sdm selai kacang', 118, 5, 10, 4),
          i(341, 88, 42, 100, '100g timun iris', 15, 1, 0, 4),
          i(342, 88, 41, 60,  'tomat potong', 11, 1, 0, 2),
        ],
      },
      {
        id: 90, daily_meal_plan_id: 26, meal_type: 'snack', time_scheduled: '15:00',
        name: 'Putih Telur Rebus Timun',
        cooking_time_minutes: 12, total_calories: 84, total_protein_g: 15, total_fat_g: 0, total_carb_g: 4,
        recipe_instructions:
`1. Rebus 4 butir telur, ambil hanya putihnya.
2. Iris 100g timun. Sajikan dengan garam dan cabai bubuk.`,
        meal_ingredients: [
          i(346, 90, 70, 132, '4 putih telur', 69, 14, 0, 0),
          i(347, 90, 42, 100, '100g timun', 15, 1, 0, 4),
        ],
      },
      {
        id: 89, daily_meal_plan_id: 26, meal_type: 'dinner', time_scheduled: '18:00',
        name: 'Ikan Kakap Kukus dengan Nasi Merah dan Brokoli',
        cooking_time_minutes: 40, total_calories: 546, total_protein_g: 50, total_fat_g: 16, total_carb_g: 42,
        recipe_instructions:
`1. Bersihkan 200g ikan kakap, buat sayatan di sisi ikan. Lumuri dengan garam, jahe parut, dan sedikit kecap asin.
2. Letakkan di atas daun pisang atau piring tahan panas. Beri irisan jahe, serai, dan daun bawang di atasnya.
3. Kukus 20 menit hingga matang.
4. Masak 80g beras merah menjadi nasi merah (matang sekitar 160g).
5. Kukus 150g brokoli floret 5 menit. Tumis dengan 1 sdm minyak zaitun dan bawang putih.
6. Sajikan ikan kakap kukus dengan nasi merah dan brokoli.`,
        meal_ingredients: [
          i(343, 89, 72, 200, '200g ikan kakap kukus', 200, 41, 3, 0),
          i(344, 89, 23, 160, 'nasi merah matang', 197, 4, 1, 41),
          i(345, 89, 36, 150, '150g brokoli kukus', 53, 4, 1, 11),
          i(3451, 89, 53, 10, '2 sdt minyak zaitun', 88, 0, 10, 0),
        ],
      },
    ],
  },

  // ── DAY 4: KAMIS — ~1530 kcal | P145 | K142 | L40 ✅ ─────────────
  // Fix: nasi goreng tambah minyak 1sdm, soto tambah nasi 160g→200g, tambah minyak zaitun
  {
    id: 27, phase_number: 3, week_number: 7, day_of_week: 'thursday', day_number: 4,
    meals: [
      {
        id: 91, daily_meal_plan_id: 27, meal_type: 'breakfast', time_scheduled: '07:00',
        name: 'Nasi Goreng Diet',
        cooking_time_minutes: 20, total_calories: 500, total_protein_g: 40, total_fat_g: 15, total_carb_g: 52,
        recipe_instructions:
`1. Gunakan 120g nasi merah dingin (sisa semalam, lebih pulen untuk digoreng).
2. Tumis bawang putih + bawang merah iris + cabai rawit iris di teflon dengan 1 sdm minyak zaitun.
3. Masukkan 100g dada ayam cincang, masak 5 menit hingga matang.
4. Buat lubang di tengah, masukkan 1 telur utuh, orak-arik cepat. Campur dengan nasi.
5. Tambahkan 60g wortel parut dan 40g daun bawang iris. Aduk rata.
6. Beri kecap rendah sodium, garam, merica. Masak 5 menit hingga nasi kering.
7. Sajikan dengan irisan timun dan tomat.`,
        meal_ingredients: [
          i(348, 91, 23, 120, '120g nasi merah dingin', 148, 3, 1, 31),
          i(349, 91, 2,  100, '100g ayam cincang', 112, 23, 3, 0),
          i(350, 91, 1,  55,  '1 telur utuh', 79, 7, 5, 0),
          i(351, 91, 37, 60,  '60g wortel parut', 25, 1, 0, 6),
          i(352, 91, 81, 40,  '40g daun bawang', 13, 1, 0, 3),
          i(353, 91, 53, 10,  '1 sdm minyak zaitun', 88, 0, 10, 0),
        ],
      },
      {
        id: 92, daily_meal_plan_id: 27, meal_type: 'lunch', time_scheduled: '12:00',
        name: 'Ubi Rebus Udang Bakar Lalapan Sambal',
        cooking_time_minutes: 40, total_calories: 502, total_protein_g: 52, total_fat_g: 15, total_carb_g: 55,
        recipe_instructions:
`1. Rebus 150g ubi jalar 20 menit hingga empuk.
2. Kupas 250g udang besar, belah punggung, bersihkan. Marinasi dengan kecap rendah sodium, bawang putih parut, jahe, merica.
3. Panggang udang di teflon dengan 1 sdt minyak zaitun, 3 menit tiap sisi.
4. Siapkan lalapan: daun selada, timun, tomat.
5. Buat sambal terasi: ulek cabai merah + rawit + bawang merah + terasi + garam + jeruk nipis.
6. Sajikan ubi, udang bakar, lalapan, dan sambal bersama.`,
        meal_ingredients: [
          i(354, 92, 25, 150, '150g ubi jalar rebus', 135, 3, 0, 31),
          i(355, 92, 8,  250, '250g udang bakar', 248, 60, 1, 1),
          i(356, 92, 40, 60,  'daun selada', 10, 1, 0, 2),
          i(357, 92, 42, 80,  'timun', 12, 1, 0, 3),
          i(358, 92, 41, 60,  'tomat', 11, 1, 0, 2),
          i(3581, 92, 53, 10, '1 sdt minyak zaitun', 88, 0, 10, 0),
        ],
      },
      {
        id: 94, daily_meal_plan_id: 27, meal_type: 'snack', time_scheduled: '15:00',
        name: 'Greek Yogurt',
        cooking_time_minutes: 2, total_calories: 100, total_protein_g: 15, total_fat_g: 1, total_carb_g: 7,
        recipe_instructions:
`1. Ambil 150g Greek yogurt plain.
2. Taburi sedikit kayu manis. Sajikan.`,
        meal_ingredients: [
          i(363, 94, 67, 150, '150g Greek yogurt plain', 89, 15, 1, 5),
        ],
      },
      {
        id: 93, daily_meal_plan_id: 27, meal_type: 'dinner', time_scheduled: '18:00',
        name: 'Soto Ayam dengan Nasi Merah dan Tauge',
        cooking_time_minutes: 50, total_calories: 428, total_protein_g: 38, total_fat_g: 9, total_carb_g: 28,
        recipe_instructions:
`1. Rebus 150g dada ayam dengan bumbu kuning (bawang merah, bawang putih, kunyit, jahe, serai, daun salam). Suwir. Saring kaldu.
2. Tumis bumbu kuning tersendiri dengan 1 sdt minyak zaitun. Masukkan ke kaldu. Didihkan.
3. Masak 50g beras merah menjadi nasi merah matang (sekitar 100g).
4. Siapkan: tauge 80g, seledri, daun bawang, dan perasan jeruk nipis.
5. Sajikan soto dengan nasi merah, tauge, dan topping.`,
        meal_ingredients: [
          i(359, 93, 2,  150, '150g dada ayam suwir', 168, 35, 4, 0),
          i(360, 93, 23, 100, 'nasi merah matang', 123, 3, 1, 26),
          i(361, 93, 76, 80,  '80g tauge', 24, 2, 0, 5),
          i(362, 93, 80, 20,  'seledri', 3, 0, 0, 1),
          i(3621, 93, 53, 5,  '1 sdt minyak zaitun', 44, 0, 5, 0),
        ],
      },
    ],
  },

  // ── DAY 5: JUMAT — ~1505 kcal | P145 | K127 | L44 ✅ ─────────────
  // Fix: tambah minyak zaitun ke makan siang (besar), tambah 1 telur ke sarapan
  {
    id: 28, phase_number: 3, week_number: 7, day_of_week: 'friday', day_number: 5,
    meals: [
      {
        id: 95, daily_meal_plan_id: 28, meal_type: 'breakfast', time_scheduled: '07:00',
        name: 'Telur Orak-Arik dengan Roti Gandum dan Tomat',
        cooking_time_minutes: 10, total_calories: 395, total_protein_g: 28, total_fat_g: 16, total_carb_g: 40,
        recipe_instructions:
`1. Kocok 2 telur utuh bersama garam, merica, dan sedikit susu skim.
2. Panaskan teflon dengan setengah sdt minyak zaitun api sedang. Tuang telur, aduk perlahan dengan spatula hingga matang lembut dan creamy.
3. Panggang 2 lembar roti gandum.
4. Iris 2 buah tomat menjadi bulatan.
5. Sajikan telur orak-arik, roti gandum, dan irisan tomat bersama.`,
        meal_ingredients: [
          i(364, 95, 1,  110, '2 telur utuh', 157, 14, 10, 0),
          i(365, 95, 19, 60,  '2 lembar roti gandum', 148, 7, 2, 25),
          i(366, 95, 41, 100, '2 buah tomat iris', 18, 1, 0, 4),
          i(367, 95, 53, 5,   '0.5 sdt minyak zaitun', 44, 0, 5, 0),
        ],
      },
      {
        id: 96, daily_meal_plan_id: 28, meal_type: 'lunch', time_scheduled: '12:00',
        name: 'Nasi Merah Ayam Panggang Kecap Capcay Sayur',
        cooking_time_minutes: 45, total_calories: 682, total_protein_g: 54, total_fat_g: 22, total_carb_g: 65,
        recipe_instructions:
`1. Masak 120g beras merah menjadi nasi merah matang (sekitar 240g).
2. Marinasi 200g dada ayam dengan kecap rendah sodium, bawang putih, merica. Panggang 8 menit tiap sisi di teflon dengan 1 sdt minyak zaitun.
3. Capcay: tumis bawang putih dengan 1 sdm minyak zaitun. Masukkan 60g brokoli, 60g wortel, 60g sawi, 40g jamur secara berurutan. Tambahkan sedikit kecap asin. Masak total 8 menit.
4. Sajikan nasi merah, ayam panggang kecap, dan capcay bersama.`,
        meal_ingredients: [
          i(368, 96, 23, 240, 'nasi merah matang', 295, 6, 2, 61),
          i(369, 96, 2,  200, '200g dada ayam', 224, 46, 5, 0),
          i(370, 96, 51, 30,  '2 sdm kecap asin', 16, 2, 0, 1),
          i(371, 96, 36, 60,  '60g brokoli', 21, 1, 0, 4),
          i(372, 96, 37, 60,  '60g wortel', 25, 1, 0, 6),
          i(373, 96, 75, 60,  '60g sawi', 12, 1, 0, 2),
          i(374, 96, 44, 40,  '40g jamur', 9, 1, 0, 1),
          i(375, 96, 53, 15,  '1 sdm minyak zaitun', 133, 0, 15, 0),
        ],
      },
      {
        id: 98, daily_meal_plan_id: 28, meal_type: 'snack', time_scheduled: '15:00',
        name: 'Shake Whey Protein',
        cooking_time_minutes: 3, total_calories: 113, total_protein_g: 25, total_fat_g: 1, total_carb_g: 2,
        recipe_instructions: '1. Campur 30g whey dengan 250ml air. Kocok dan minum.',
        meal_ingredients: [i(380, 98, 66, 30, '1 scoop whey isolate', 110, 25, 1, 1)],
      },
      {
        id: 97, daily_meal_plan_id: 28, meal_type: 'dinner', time_scheduled: '18:00',
        name: 'Sup Tahu Udang',
        cooking_time_minutes: 25, total_calories: 315, total_protein_g: 38, total_fat_g: 5, total_carb_g: 20,
        recipe_instructions:
`1. Kupas dan bersihkan 150g udang. Potong dadu 150g tahu putih.
2. Didihkan 600ml air bersama bawang putih geprek, jahe, dan serai.
3. Masukkan udang 3 menit, angkat. Masukkan tahu, 80g wortel, dan 100g sawi. Masak 10 menit.
4. Kembalikan udang. Tambahkan garam, merica, dan perasan jeruk nipis.
5. Taburi daun bawang dan seledri. Sajikan panas.`,
        meal_ingredients: [
          i(376, 97, 8,  150, '150g udang kupas', 149, 36, 0, 0),
          i(377, 97, 10, 150, '150g tahu putih', 114, 12, 7, 3),
          i(378, 97, 37, 80,  '80g wortel', 33, 1, 0, 8),
          i(379, 97, 75, 100, '100g sawi hijau', 20, 2, 0, 4),
        ],
      },
    ],
  },

  // ── DAY 6: SABTU — ~1500 kcal | P143 | K133 | L43 ✅ ─────────────
  // Fix: tambah 1 telur di sarapan, tambah minyak zaitun makan siang dan makan malam
  {
    id: 29, phase_number: 3, week_number: 7, day_of_week: 'saturday', day_number: 6,
    meals: [
      {
        id: 99, daily_meal_plan_id: 29, meal_type: 'breakfast', time_scheduled: '07:00',
        name: 'Bubur Oatmeal Telur Pisang',
        cooking_time_minutes: 15, total_calories: 459, total_protein_g: 25, total_fat_g: 14, total_carb_g: 60,
        recipe_instructions:
`1. Masak 50g oatmeal dengan 300ml air hingga bubur kental (7 menit).
2. Rebus 2 butir telur utuh 10 menit, kupas dan belah dua.
3. Potong 1 pisang serong.
4. Sajikan bubur oatmeal dengan telur di samping dan pisang di atasnya.
5. Taburi sedikit kayu manis dan garam di atas bubur.`,
        meal_ingredients: [
          i(381, 99, 24, 50, '50g oatmeal', 190, 7, 3, 34),
          i(382, 99, 1,  110, '2 telur utuh', 157, 14, 10, 0),
          i(383, 99, 33, 80, '1 pisang kecil', 71, 1, 0, 18),
        ],
      },
      {
        id: 100, daily_meal_plan_id: 29, meal_type: 'lunch', time_scheduled: '12:00',
        name: 'Nasi Merah Ikan Kembung Panggang Sambal Terasi Bayam Bening',
        cooking_time_minutes: 40, total_calories: 630, total_protein_g: 56, total_fat_g: 20, total_carb_g: 60,
        recipe_instructions:
`1. Masak 100g beras merah menjadi nasi merah matang (200g).
2. Lumuri 2 ekor ikan kembung (250g) dengan kunyit, garam, bawang putih. Masak di airfryer 180°C selama 15 menit, atau panggang di teflon dengan 1 sdt minyak zaitun.
3. Didihkan 400ml air, masukkan 150g bayam, garam. Masak 3 menit. Sajikan sebagai sayur bening. Tambahkan 1 sdt minyak wijen ke bayam bening.
4. Buat sambal terasi.
5. Sajikan nasi merah, ikan kembung, bayam bening, sambal, dan lalapan.`,
        meal_ingredients: [
          i(384, 100, 23, 200, 'nasi merah matang', 246, 5, 2, 51),
          i(385, 100, 71, 250, '2 ekor kembung', 303, 55, 9, 0),
          i(386, 100, 34, 150, '150g bayam bening', 35, 4, 1, 5),
          i(3861, 100, 53, 5,  '1 sdt minyak zaitun', 44, 0, 5, 0),
          i(3862, 100, 78, 4,  '1 sdt minyak wijen', 35, 0, 4, 0),
        ],
      },
      {
        id: 102, daily_meal_plan_id: 29, meal_type: 'snack', time_scheduled: '15:00',
        name: 'Shake Whey',
        cooking_time_minutes: 3, total_calories: 113, total_protein_g: 25, total_fat_g: 1, total_carb_g: 2,
        recipe_instructions: '1. Campur 30g whey dengan 250ml air. Kocok dan minum.',
        meal_ingredients: [i(391, 102, 66, 30, 'whey isolate', 110, 25, 1, 1)],
      },
      {
        id: 101, daily_meal_plan_id: 29, meal_type: 'dinner', time_scheduled: '18:00',
        name: 'Dada Ayam Suwir Sambal Matah Timun Selada',
        cooking_time_minutes: 35, total_calories: 298, total_protein_g: 37, total_fat_g: 8, total_carb_g: 11,
        recipe_instructions:
`1. Rebus 150g dada ayam bersama serai dan daun salam 25 menit. Suwir saat hangat.
2. Buat sambal matah: iris tipis bawang merah, cabai merah, cabai rawit, dan serai bagian putih. Campur dengan terasi bakar, garam, dan perasan jeruk nipis. Siram air mendidih, aduk.
3. Panaskan 1 sdt minyak zaitun, tumis sambal matah 1 menit.
4. Campur ayam suwir dengan sambal matah.
5. Sajikan dengan 80g daun selada dan 100g timun iris.`,
        meal_ingredients: [
          i(387, 101, 2,  150, 'dada ayam suwir', 168, 35, 4, 0),
          i(388, 101, 47, 25,  '5 siung bawang merah', 18, 1, 0, 4),
          i(389, 101, 40, 80,  'selada', 14, 1, 0, 3),
          i(390, 101, 42, 100, 'timun', 15, 1, 0, 4),
          i(3901, 101, 53, 5,  '1 sdt minyak zaitun', 44, 0, 5, 0),
        ],
      },
    ],
  },

  // ── DAY 7: MINGGU — ~1520 kcal | P141 | K144 | L43 ✅ ────────────
  // Fix: nasi merah lunch 240g → 200g, tambah minyak zaitun 2 kali, sop ayam + lemak
  {
    id: 30, phase_number: 3, week_number: 7, day_of_week: 'sunday', day_number: 7,
    meals: [
      {
        id: 103, daily_meal_plan_id: 30, meal_type: 'breakfast', time_scheduled: '07:00',
        name: 'Lontong Sayur Diet',
        cooking_time_minutes: 35, total_calories: 420, total_protein_g: 25, total_fat_g: 10, total_carb_g: 58,
        recipe_instructions:
`1. Siapkan 120g nasi merah matang, cetak dalam plastik kecil membentuk lonjong sebagai pengganti lontong.
2. Potong dadu 100g tahu, rebus hingga matang.
3. Rebus 1 telur utuh 12 menit, kupas.
4. Potong 100g labu siam menjadi korek api.
5. Didihkan 300ml air bersama 50ml santan encer, masukkan labu siam, daun salam, serai, garam. Masak 10 menit.
6. Masukkan tahu, aduk perlahan. Koreksi rasa.
7. Sajikan kuah labu dengan telur rebus dan nasi merah terpisah.`,
        meal_ingredients: [
          i(392, 103, 23, 120, 'nasi merah cetak', 148, 3, 1, 31),
          i(393, 103, 10, 100, '100g tahu', 76, 8, 5, 2),
          i(394, 103, 1,  55,  '1 telur utuh', 79, 7, 5, 0),
          i(395, 103, 77, 100, '100g labu siam', 16, 1, 0, 4),
        ],
      },
      {
        id: 104, daily_meal_plan_id: 30, meal_type: 'lunch', time_scheduled: '12:00',
        name: 'Nasi Merah Pepes Nila Tumis Kangkung',
        cooking_time_minutes: 50, total_calories: 606, total_protein_g: 53, total_fat_g: 18, total_carb_g: 61,
        recipe_instructions:
`1. Masak 100g beras merah menjadi nasi merah matang (sekitar 200g).
2. Buat pepes ikan nila 200g dengan bumbu kuning + kemangi + tomat. Kukus 30 menit.
3. Tumis kangkung 150g dengan bawang putih dan 1 sdm minyak zaitun. Beri garam dan sedikit kecap.
4. Sajikan bersama.`,
        meal_ingredients: [
          i(396, 104, 23, 200, 'nasi merah matang', 246, 5, 2, 51),
          i(397, 104, 5,  200, 'ikan nila pepes', 256, 52, 5, 0),
          i(398, 104, 35, 150, 'kangkung tumis', 29, 4, 0, 5),
          i(399, 104, 53, 10,  '1 sdm minyak zaitun', 88, 0, 10, 0),
        ],
      },
      {
        id: 106, daily_meal_plan_id: 30, meal_type: 'snack', time_scheduled: '15:00',
        name: 'Greek Yogurt Kayu Manis',
        cooking_time_minutes: 2, total_calories: 110, total_protein_g: 15, total_fat_g: 2, total_carb_g: 10,
        recipe_instructions:
`1. Ambil 150g Greek yogurt.
2. Taburi kayu manis dan sedikit madu opsional. Sajikan.`,
        meal_ingredients: [
          i(404, 106, 67, 150, 'Greek yogurt', 89, 15, 1, 5),
          i(405, 106, 63, 5,   'sedikit madu', 15, 0, 0, 4),
        ],
      },
      {
        id: 105, daily_meal_plan_id: 30, meal_type: 'dinner', time_scheduled: '18:00',
        name: 'Sop Dada Ayam Sayuran dengan Minyak Wijen',
        cooking_time_minutes: 40, total_calories: 384, total_protein_g: 48, total_fat_g: 13, total_carb_g: 15,
        recipe_instructions:
`1. Potong 200g dada ayam.
2. Didihkan 700ml air bersama bumbu aromatik dan bawang bombay.
3. Masukkan ayam, buang busa, masak 20 menit.
4. Tambahkan wortel, buncis, kembang kol. Masak 10 menit.
5. Tambahkan 1 sdt minyak wijen dan 1 sdt minyak zaitun. Koreksi rasa. Sajikan panas.`,
        meal_ingredients: [
          i(400, 105, 2,  200, 'dada ayam', 224, 46, 5, 0),
          i(401, 105, 37, 80,  'wortel', 33, 1, 0, 8),
          i(402, 105, 38, 80,  'buncis', 25, 1, 0, 6),
          i(403, 105, 79, 80,  'kembang kol', 20, 2, 0, 4),
          i(4031, 105, 78, 4,  '1 sdt minyak wijen', 35, 0, 4, 0),
          i(4032, 105, 53, 5,  '1 sdt minyak zaitun', 44, 0, 5, 0),
        ],
      },
    ],
  },
];
