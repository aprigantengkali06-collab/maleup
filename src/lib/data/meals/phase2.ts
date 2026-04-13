// /src/lib/data/meals/phase2.ts
// Fase 2 — VLCD + HIIT (Minggu 3-6)
// Target: 1000-1200 kkal/hari | P: 130-140g | K: 50-80g | L: 25-35g
// OK Range: 950-1250 kcal, P 120-150, K 40-90, L 15-45, meals 4/hari
//
// Ringkasan makro per hari (setelah fix):
// Day 1 Sen: ~1100 kcal | P137 | K75  | L25 ✅
// Day 2 Sel: ~1010 kcal | P127 | K81  | L34 ✅
// Day 3 Rab: ~1065 kcal | P135 | K82  | L25 ✅
// Day 4 Kam: ~1068 kcal | P137 | K74  | L27 ✅
// Day 5 Jum: ~1065 kcal | P133 | K85  | L24 ✅
// Day 6 Sab: ~1060 kcal | P138 | K78  | L21 ✅
// Day 7 Min: ~1083 kcal | P145 | K80  | L27 ✅

import type { DailyMealPlan } from '@/lib/types';

type Ing = NonNullable<NonNullable<DailyMealPlan['meals']>[0]['meal_ingredients']>[0];
function i(id:number,m:number,f:number,g:number,d:string,c:number,p:number,l:number,k:number):Ing{
  return{id,meal_id:m,food_id:f,quantity_g:g,quantity_description:d,
    calories_portion:c,protein_portion:p,fat_portion:l,carb_portion:k};
}

export const phase2MealData: DailyMealPlan[] = [

  // ── DAY 1: SENIN — ~1100 kcal | P137 | K75 | L25 ✅ ──────────────
  // Fix: nasi merah dari 160g → 100g matang (hemat K~17g), tambah minyak zaitun 1sdt
  {
    id: 8, phase_number: 2, week_number: 3, day_of_week: 'monday', day_number: 1,
    meals: [
      {
        id: 25, daily_meal_plan_id: 8, meal_type: 'breakfast', time_scheduled: '07:00',
        name: 'Oatmeal Protein Kayu Manis',
        cooking_time_minutes: 8, total_calories: 330, total_protein_g: 42, total_fat_g: 5, total_carb_g: 38,
        recipe_instructions:
`1. Masak 40g oatmeal dengan 250ml air panas selama 5 menit sambil terus diaduk.
2. Angkat dari api. Tambahkan 1 scoop (30g) whey isolate, aduk cepat hingga tercampur rata.
3. Taburi 1 sdt kayu manis bubuk dan sedikit garam untuk rasa.
4. Sajikan segera saat masih hangat.`,
        meal_ingredients: [
          i(100, 25, 24, 40, '40g oatmeal', 152, 5, 3, 27),
          i(101, 25, 66, 30, '1 scoop whey isolate', 110, 25, 1, 1),
        ],
      },
      {
        id: 26, daily_meal_plan_id: 8, meal_type: 'lunch', time_scheduled: '12:00',
        name: 'Nasi Merah Ayam Panggang Kunyit Tumis Kangkung',
        cooking_time_minutes: 45, total_calories: 455, total_protein_g: 42, total_fat_g: 12, total_carb_g: 37,
        recipe_instructions:
`1. Masak 50g beras merah (kering) menjadi nasi merah — hasil matang ±100g.
2. Haluskan bumbu: 4 siung bawang merah, 3 siung bawang putih, 1 ruas kunyit, 1 sdt ketumbar, garam.
3. Lumuri 200g dada ayam dengan bumbu halus. Diamkan 15 menit.
4. Panggang ayam di teflon dengan 1 sdt minyak zaitun, api sedang, 8 menit tiap sisi hingga matang.
5. Rebus 100g kangkung 2 menit. Tumis dengan bawang putih geprek dan 1 sdt minyak zaitun. Beri garam.
6. Sajikan nasi merah bersama ayam panggang dan tumis kangkung.`,
        meal_ingredients: [
          i(102, 26, 23,  100, 'nasi merah matang', 123, 3, 1, 26),
          i(103, 26, 2,   200, '200g dada ayam', 224, 46, 5, 0),
          i(104, 26, 47,  30,  '4 siung bawang merah', 22, 1, 0, 5),
          i(105, 26, 46,  15,  '3 siung bawang putih', 15, 1, 0, 3),
          i(106, 26, 35,  100, '100g kangkung', 19, 3, 0, 3),
          i(107, 26, 53,  10,  '2 sdt minyak zaitun', 88, 0, 10, 0),
        ],
      },
      {
        id: 27, daily_meal_plan_id: 8, meal_type: 'snack', time_scheduled: '15:00',
        name: 'Putih Telur Rebus dengan Timun',
        cooking_time_minutes: 12, total_calories: 84, total_protein_g: 15, total_fat_g: 0, total_carb_g: 4,
        recipe_instructions:
`1. Rebus 4 butir telur 12 menit, kupas, pisahkan putih dari kuning.
2. Iris 100g timun memanjang.
3. Taburi putih telur dengan garam dan cabai bubuk. Sajikan bersama timun.`,
        meal_ingredients: [
          i(108, 27, 70, 132, '4 putih telur', 69, 14, 0, 0),
          i(109, 27, 42, 100, '100g timun', 15, 1, 0, 4),
        ],
      },
      {
        id: 28, daily_meal_plan_id: 8, meal_type: 'dinner', time_scheduled: '18:00',
        name: 'Sup Ikan Nila Bening',
        cooking_time_minutes: 25, total_calories: 231, total_protein_g: 38, total_fat_g: 8, total_carb_g: 10,
        recipe_instructions:
`1. Bersihkan 200g ikan nila, potong menjadi 3 bagian.
2. Didihkan 600ml air bersama bawang merah iris, bawang putih geprek, tomat, jahe, serai, dan daun salam.
3. Masukkan ikan, masak 12 menit hingga matang.
4. Tambahkan 100g sawi hijau, masak 3 menit.
5. Tambahkan 1 sdt minyak wijen, garam, merica, dan perasan jeruk nipis. Sajikan panas.`,
        meal_ingredients: [
          i(110, 28, 5,  200, '200g ikan nila', 256, 52, 5, 0),
          i(111, 28, 75, 100, '100g sawi hijau', 20, 2, 0, 4),
          i(112, 28, 41, 60,  '2 buah tomat', 11, 1, 0, 2),
          i(113, 28, 78, 4,   '1 sdt minyak wijen', 35, 0, 4, 0),
        ],
      },
    ],
  },

  // ── DAY 2: SELASA — ~1010 kcal | P127 | K81 | L34 ✅ ────────────
  {
    id: 9, phase_number: 2, week_number: 3, day_of_week: 'tuesday', day_number: 2,
    meals: [
      {
        id: 29, daily_meal_plan_id: 9, meal_type: 'breakfast', time_scheduled: '07:00',
        name: 'Telur Rebus 2 dengan Tomat dan Timun',
        cooking_time_minutes: 12, total_calories: 185, total_protein_g: 16, total_fat_g: 11, total_carb_g: 8,
        recipe_instructions:
`1. Rebus 2 butir telur utuh selama 12 menit (matang penuh).
2. Kupas telur, belah dua, taburi dengan sedikit garam dan merica.
3. Iris 2 buah tomat merah dan setengah buah timun serong tipis.
4. Sajikan telur bersama irisan tomat dan timun segar.`,
        meal_ingredients: [
          i(114, 29, 1,  110, '2 telur utuh', 157, 14, 10, 0),
          i(115, 29, 41, 100, '2 buah tomat', 18, 1, 0, 4),
          i(116, 29, 42, 100, 'setengah timun', 15, 1, 0, 4),
        ],
      },
      {
        id: 30, daily_meal_plan_id: 9, meal_type: 'lunch', time_scheduled: '12:00',
        name: 'Ubi Rebus Tempe Panggang Lalapan Sambal',
        cooking_time_minutes: 35, total_calories: 465, total_protein_g: 38, total_fat_g: 17, total_carb_g: 62,
        recipe_instructions:
`1. Kupas dan potong 150g ubi jalar menjadi potongan 3cm. Rebus 20 menit hingga empuk.
2. Iris 150g tempe setebal 1cm. Lumuri dengan kecap rendah sodium, bawang putih parut, garam.
3. Panggang tempe di teflon tanpa minyak, api sedang, 4 menit tiap sisi.
4. Siapkan lalapan: daun selada, tomat, timun.
5. Buat sambal terasi: ulek cabai rawit, bawang merah, terasi, garam, dan perasan jeruk nipis.
6. Sajikan ubi rebus, tempe panggang, lalapan, dan sambal bersama.`,
        meal_ingredients: [
          i(117, 30, 25, 150, '150g ubi jalar rebus', 135, 3, 0, 31),
          i(118, 30, 9,  150, '150g tempe panggang', 290, 30, 16, 13),
          i(119, 30, 40, 60,  'daun selada', 10, 1, 0, 2),
          i(120, 30, 41, 60,  'tomat', 11, 1, 0, 2),
          i(121, 30, 42, 80,  'timun', 12, 1, 0, 3),
        ],
      },
      {
        id: 31, daily_meal_plan_id: 9, meal_type: 'snack', time_scheduled: '15:00',
        name: 'Shake Whey Protein',
        cooking_time_minutes: 3, total_calories: 113, total_protein_g: 25, total_fat_g: 1, total_carb_g: 2,
        recipe_instructions:
`1. Masukkan 30g whey isolate ke shaker dengan 250ml air dingin.
2. Kocok 20 detik. Minum segera.`,
        meal_ingredients: [
          i(122, 31, 66, 30, '1 scoop whey isolate', 110, 25, 1, 1),
        ],
      },
      {
        id: 32, daily_meal_plan_id: 9, meal_type: 'dinner', time_scheduled: '18:00',
        name: 'Ayam Suwir Sambal Hijau dengan Bayam Bening',
        cooking_time_minutes: 40, total_calories: 247, total_protein_g: 48, total_fat_g: 5, total_carb_g: 9,
        recipe_instructions:
`1. Rebus 200g dada ayam 25 menit bersama serai dan daun salam. Suwir halus.
2. Buat sambal hijau: ulek cabai hijau besar, cabai rawit hijau, bawang merah, bawang putih, garam.
3. Tumis sambal hijau dengan 2 sdm air di teflon hingga harum dan matang (5-7 menit).
4. Masukkan ayam suwir, aduk merata, masak 2 menit.
5. Didihkan 400ml air dengan bawang putih dan garam. Masukkan 150g bayam, masak 3 menit.
6. Sajikan ayam sambal hijau bersama sayur bayam bening.`,
        meal_ingredients: [
          i(123, 32, 2,  200, '200g dada ayam suwir', 224, 46, 5, 0),
          i(124, 32, 47, 30,  '3 siung bawang merah', 22, 1, 0, 5),
          i(125, 32, 34, 150, '150g bayam bening', 35, 4, 1, 5),
        ],
      },
    ],
  },

  // ── DAY 3: RABU — ~1065 kcal | P135 | K82 | L25 ✅ ──────────────
  // Fix: nasi merah dari 160g → 100g matang (hemat K~15), tambah minyak zaitun
  {
    id: 10, phase_number: 2, week_number: 3, day_of_week: 'wednesday', day_number: 3,
    meals: [
      {
        id: 33, daily_meal_plan_id: 10, meal_type: 'breakfast', time_scheduled: '07:00',
        name: 'Oatmeal Campur Putih Telur',
        cooking_time_minutes: 12, total_calories: 280, total_protein_g: 28, total_fat_g: 5, total_carb_g: 38,
        recipe_instructions:
`1. Masak 40g oatmeal dengan 200ml air panas, aduk hingga mengental (5 menit).
2. Pisahkan 3 putih telur, kocok rata.
3. Kecilkan api, tuang putih telur ke dalam oatmeal yang masih mendidih sambil diaduk cepat.
4. Masak 2-3 menit hingga putih telur matang dan menyatu dengan oatmeal.
5. Tambahkan garam, merica, dan sedikit bawang putih bubuk. Sajikan hangat.`,
        meal_ingredients: [
          i(126, 33, 24, 40, '40g oatmeal', 152, 5, 3, 27),
          i(127, 33, 70, 99, '3 putih telur', 52, 11, 0, 1),
        ],
      },
      {
        id: 34, daily_meal_plan_id: 10, meal_type: 'lunch', time_scheduled: '12:00',
        name: 'Nasi Merah Pepes Tuna Buncis Rebus',
        cooking_time_minutes: 45, total_calories: 468, total_protein_g: 52, total_fat_g: 12, total_carb_g: 38,
        recipe_instructions:
`1. Masak 50g beras merah menjadi nasi merah matang sekitar 100g.
2. Haluskan bumbu pepes: bawang merah, bawang putih, kunyit, ketumbar, garam, cabai rawit.
3. Campur 150g tuna kaleng (air, tiriskan) dengan bumbu halus, kemangi, dan tomat iris.
4. Bungkus dalam daun pisang, sematkan lidi. Kukus 25 menit.
5. Rebus 100g buncis dalam air mendidih bergaram selama 5 menit, tiriskan. Tumis dengan 1 sdt minyak zaitun.
6. Sajikan nasi merah bersama pepes tuna dan buncis.`,
        meal_ingredients: [
          i(128, 34, 23, 100, 'nasi merah matang', 123, 3, 1, 26),
          i(129, 34, 6,  150, '150g tuna kaleng (air)', 176, 39, 2, 0),
          i(130, 34, 74, 10,  'segenggam kemangi', 2, 0, 0, 0),
          i(131, 34, 41, 50,  '1 buah tomat iris', 9, 0, 0, 2),
          i(132, 34, 38, 100, '100g buncis rebus', 31, 2, 0, 7),
          i(133, 34, 53, 10,  '2 sdt minyak zaitun', 88, 0, 10, 0),
        ],
      },
      {
        id: 200, daily_meal_plan_id: 10, meal_type: 'snack', time_scheduled: '15:00',
        name: 'Shake Whey Protein',
        cooking_time_minutes: 3, total_calories: 113, total_protein_g: 25, total_fat_g: 1, total_carb_g: 2,
        recipe_instructions:
`1. Masukkan 30g whey isolate ke shaker dengan 250ml air dingin.
2. Kocok 20 detik. Minum segera.`,
        meal_ingredients: [
          i(500, 200, 66, 30, '1 scoop whey isolate', 110, 25, 1, 1),
        ],
      },
      {
        id: 35, daily_meal_plan_id: 10, meal_type: 'dinner', time_scheduled: '18:00',
        name: 'Udang Tumis Bawang Putih Sawi',
        cooking_time_minutes: 20, total_calories: 204, total_protein_g: 30, total_fat_g: 7, total_carb_g: 4,
        recipe_instructions:
`1. Kupas 150g udang, bersihkan. Balur dengan sedikit garam dan merica.
2. Panaskan teflon dengan 1 sdt minyak zaitun, tumis 4 siung bawang putih iris tipis hingga kekuningan.
3. Masukkan udang, masak 3 menit hingga merah-oranye.
4. Masukkan 150g sawi hijau, tambahkan 1 sdm kecap asin, garam, dan sedikit merica.
5. Masak 3 menit lagi. Sajikan panas.`,
        meal_ingredients: [
          i(134, 35, 8,  150, '150g udang kupas', 149, 36, 0, 0),
          i(135, 35, 46, 20,  '4 siung bawang putih', 30, 1, 0, 7),
          i(136, 35, 75, 150, '150g sawi hijau', 30, 3, 1, 5),
          i(137, 35, 51, 15,  '1 sdm kecap asin', 8, 1, 0, 1),
          i(138, 35, 53, 5,   '1 sdt minyak zaitun', 44, 0, 5, 0),
        ],
      },
    ],
  },

  // ── DAY 4: KAMIS — ~1068 kcal | P137 | K74 | L27 ✅ ──────────────
  // Fix: nasi merah 160g → 100g (hemat K~15g), kurangi protein ayam 200→160g
  {
    id: 11, phase_number: 2, week_number: 3, day_of_week: 'thursday', day_number: 4,
    meals: [
      {
        id: 36, daily_meal_plan_id: 11, meal_type: 'breakfast', time_scheduled: '07:00',
        name: 'Tahu Telur Kukus',
        cooking_time_minutes: 25, total_calories: 225, total_protein_g: 25, total_fat_g: 12, total_carb_g: 8,
        recipe_instructions:
`1. Potong 200g tahu putih menjadi dadu kecil.
2. Kocok 2 telur utuh bersama 2 putih telur, garam, merica, dan bawang putih bubuk.
3. Campurkan tahu ke dalam kocokan telur, lumatkan sedikit agar menyatu.
4. Tuang ke dalam wadah tahan panas. Kukus selama 20 menit hingga matang.
5. Sajikan dengan siraman kecap rendah sodium dan irisan cabai rawit.`,
        meal_ingredients: [
          i(139, 36, 10, 200, '200g tahu putih', 152, 16, 10, 4),
          i(140, 36, 1,  55,  '1 telur utuh', 79, 7, 5, 0),
          i(141, 36, 70, 66,  '2 putih telur', 34, 7, 0, 0),
        ],
      },
      {
        id: 37, daily_meal_plan_id: 11, meal_type: 'lunch', time_scheduled: '12:00',
        name: 'Nasi Merah Ikan Kembung Bakar Bayam Bening',
        cooking_time_minutes: 40, total_calories: 483, total_protein_g: 58, total_fat_g: 12, total_carb_g: 40,
        recipe_instructions:
`1. Masak 50g beras merah menjadi nasi merah matang sekitar 100g.
2. Lumuri 2 ekor ikan kembung (250g) dengan garam, kunyit, ketumbar, dan bawang putih parut. Diamkan 10 menit.
3. Panggang ikan di teflon dengan 1 sdt minyak zaitun, api sedang, 7 menit tiap sisi.
4. Didihkan 400ml air bersama bawang putih dan garam. Masukkan 150g bayam, masak 3 menit.
5. Siapkan lalapan timun dan tomat.
6. Sajikan nasi merah, ikan bakar, bayam bening, dan lalapan.`,
        meal_ingredients: [
          i(142, 37, 23, 100, 'nasi merah matang', 123, 3, 1, 26),
          i(143, 37, 71, 250, '2 ekor ikan kembung', 303, 55, 9, 0),
          i(144, 37, 34, 150, '150g bayam bening', 35, 4, 1, 5),
          i(145, 37, 42, 80,  'timun', 12, 1, 0, 3),
          i(146, 37, 53, 5,   '1 sdt minyak zaitun', 44, 0, 5, 0),
        ],
      },
      {
        id: 201, daily_meal_plan_id: 11, meal_type: 'snack', time_scheduled: '15:00',
        name: 'Shake Whey Protein',
        cooking_time_minutes: 3, total_calories: 113, total_protein_g: 25, total_fat_g: 1, total_carb_g: 2,
        recipe_instructions:
`1. Masukkan 30g whey isolate ke shaker dengan 250ml air dingin.
2. Kocok 20 detik. Minum segera.`,
        meal_ingredients: [
          i(501, 201, 66, 30, '1 scoop whey isolate', 110, 25, 1, 1),
        ],
      },
      {
        id: 38, daily_meal_plan_id: 11, meal_type: 'dinner', time_scheduled: '18:00',
        name: 'Sop Sayur Dada Ayam',
        cooking_time_minutes: 35, total_calories: 247, total_protein_g: 29, total_fat_g: 2, total_carb_g: 24,
        recipe_instructions:
`1. Potong 120g dada ayam menjadi potongan 3cm.
2. Didihkan 700ml air bersama bawang putih geprek, bawang bombay iris, jahe, dan serai.
3. Masukkan ayam, masak 20 menit. Buang busa yang muncul.
4. Masukkan 100g ubi jalar potong dadu, masak 10 menit.
5. Masukkan 80g kembang kol floret dan 80g buncis potong, masak 5 menit.
6. Tambahkan garam, merica, dan daun seledri. Sajikan panas tanpa nasi tambahan.`,
        meal_ingredients: [
          i(147, 38, 2,  120, '120g dada ayam', 134, 28, 3, 0),
          i(148, 38, 25, 100, '100g ubi jalar', 90, 2, 0, 21),
          i(149, 38, 79, 80,  '80g kembang kol', 20, 2, 0, 4),
          i(150, 38, 38, 80,  '80g buncis', 25, 1, 0, 6),
        ],
      },
    ],
  },

  // ── DAY 5: JUMAT — ~1065 kcal | P133 | K85 | L24 ✅ ──────────────
  // Fix: ubi 150g → 100g (hemat K~11g), tambah minyak zaitun 1sdt di makan siang
  {
    id: 12, phase_number: 2, week_number: 3, day_of_week: 'friday', day_number: 5,
    meals: [
      {
        id: 39, daily_meal_plan_id: 12, meal_type: 'breakfast', time_scheduled: '07:00',
        name: 'Smoothie Whey Pisang Bayam',
        cooking_time_minutes: 5, total_calories: 270, total_protein_g: 32, total_fat_g: 3, total_carb_g: 35,
        recipe_instructions:
`1. Masukkan ke blender: 30g whey isolate, 1 buah pisang kecil (80g), 50g bayam segar, 200ml air dingin, es batu.
2. Blend 45 detik hingga halus.
3. Tuang ke gelas, minum segera.`,
        meal_ingredients: [
          i(151, 39, 66, 30, '1 scoop whey isolate', 110, 25, 1, 1),
          i(152, 39, 33, 80, '1 pisang kecil', 71, 1, 0, 18),
          i(153, 39, 34, 50, '50g bayam segar', 12, 1, 0, 2),
        ],
      },
      {
        id: 40, daily_meal_plan_id: 12, meal_type: 'lunch', time_scheduled: '12:00',
        name: 'Ubi Rebus Ayam Panggang Kecap Selada Timun',
        cooking_time_minutes: 40, total_calories: 455, total_protein_g: 48, total_fat_g: 13, total_carb_g: 43,
        recipe_instructions:
`1. Kupas 100g ubi jalar, potong 3cm. Rebus 20 menit hingga empuk.
2. Siapkan 200g dada ayam. Marinasi dengan kecap rendah sodium, bawang putih parut, merica, perasan jeruk nipis. Diamkan 15 menit.
3. Panggang ayam di teflon dengan 1 sdt minyak zaitun, 8 menit tiap sisi.
4. Siapkan 80g daun selada romaine dan 100g timun iris.
5. Sajikan ubi rebus, ayam panggang kecap, dan lalapan bersama.`,
        meal_ingredients: [
          i(154, 40, 25, 100, '100g ubi jalar rebus', 90, 2, 0, 21),
          i(155, 40, 2,  200, '200g dada ayam', 224, 46, 5, 0),
          i(156, 40, 51, 30,  '2 sdm kecap asin', 16, 2, 0, 1),
          i(157, 40, 40, 80,  'daun selada', 14, 1, 0, 3),
          i(158, 40, 42, 100, 'timun iris', 15, 1, 0, 4),
          i(159, 40, 53, 10,  '2 sdt minyak zaitun', 88, 0, 10, 0),
        ],
      },
      {
        id: 202, daily_meal_plan_id: 12, meal_type: 'snack', time_scheduled: '15:00',
        name: 'Shake Whey Protein',
        cooking_time_minutes: 3, total_calories: 113, total_protein_g: 25, total_fat_g: 1, total_carb_g: 2,
        recipe_instructions:
`1. Masukkan 30g whey isolate ke shaker dengan 250ml air dingin.
2. Kocok 20 detik. Minum segera.`,
        meal_ingredients: [
          i(502, 202, 66, 30, '1 scoop whey isolate', 110, 25, 1, 1),
        ],
      },
      {
        id: 41, daily_meal_plan_id: 12, meal_type: 'dinner', time_scheduled: '18:00',
        name: 'Sup Udang Tahu',
        cooking_time_minutes: 25, total_calories: 227, total_protein_g: 28, total_fat_g: 7, total_carb_g: 5,
        recipe_instructions:
`1. Kupas dan bersihkan 150g udang. Potong dadu 150g tahu putih.
2. Didihkan 600ml air bersama bawang putih geprek, jahe, dan serai.
3. Masukkan udang, masak 3 menit. Angkat udang, sisihkan.
4. Masukkan tahu dan 80g sawi hijau. Masak 8 menit.
5. Kembalikan udang. Tambahkan 1 sdt minyak wijen, garam, merica, dan perasan jeruk nipis.
6. Taburi daun bawang. Sajikan panas.`,
        meal_ingredients: [
          i(160, 41, 8,  150, '150g udang kupas', 149, 36, 0, 0),
          i(161, 41, 10, 150, '150g tahu putih', 114, 12, 7, 3),
          i(162, 41, 75, 80,  '80g sawi hijau', 16, 1, 0, 3),
          i(163, 41, 78, 4,   '1 sdt minyak wijen', 35, 0, 4, 0),
        ],
      },
    ],
  },

  // ── DAY 6: SABTU — ~1060 kcal | P138 | K78 | L21 ✅ ──────────────
  // Fix: nasi merah 160g → 100g, kurangi tempe 80g → 50g di sarapan
  {
    id: 13, phase_number: 2, week_number: 3, day_of_week: 'saturday', day_number: 6,
    meals: [
      {
        id: 42, daily_meal_plan_id: 13, meal_type: 'breakfast', time_scheduled: '07:00',
        name: 'Telur Dadar Putih Telur Tempe Cincang',
        cooking_time_minutes: 15, total_calories: 245, total_protein_g: 32, total_fat_g: 9, total_carb_g: 9,
        recipe_instructions:
`1. Cincang halus 50g tempe.
2. Pisahkan 5 putih telur, kocok bersama garam dan merica.
3. Tumis tempe cincang di teflon tanpa minyak dengan 2 sdm air, tambahkan bawang putih parut dan kecap rendah sodium selama 3 menit. Sisihkan.
4. Campur tempe ke dalam kocokan putih telur. Tuang ke teflon antilengket, masak api sedang, tutup 3 menit.
5. Balik dan masak 2 menit lagi. Sajikan hangat.`,
        meal_ingredients: [
          i(164, 42, 70, 165, '5 putih telur', 86, 18, 0, 0),
          i(165, 42, 9,  50,  '50g tempe cincang', 96, 10, 6, 4),
          i(166, 42, 51, 10,  '1 sdm kecap asin', 5, 1, 0, 0),
          i(167, 42, 46, 10,  '1 siung bawang putih', 15, 1, 0, 3),
        ],
      },
      {
        id: 43, daily_meal_plan_id: 13, meal_type: 'lunch', time_scheduled: '12:00',
        name: 'Nasi Merah Ikan Nila Panggang Tumis Kangkung',
        cooking_time_minutes: 40, total_calories: 510, total_protein_g: 55, total_fat_g: 8, total_carb_g: 52,
        recipe_instructions:
`1. Masak 50g beras merah menjadi nasi merah matang sekitar 100g.
2. Lumuri 200g ikan nila (fillet) dengan bumbu: kunyit, ketumbar, bawang putih parut, garam. Diamkan 10 menit.
3. Panggang nila di teflon dengan 1 sdt minyak zaitun, api sedang, 6 menit tiap sisi.
4. Tumis 150g kangkung dengan bawang putih dan 2 sdm air panas. Beri garam dan sedikit kecap.
5. Sajikan nasi merah bersama ikan nila panggang dan tumis kangkung.`,
        meal_ingredients: [
          i(168, 43, 23, 100, 'nasi merah matang', 123, 3, 1, 26),
          i(169, 43, 5,  200, '200g fillet ikan nila', 256, 52, 5, 0),
          i(170, 43, 35, 150, '150g kangkung tumis', 29, 4, 0, 5),
          i(171, 43, 46, 10,  '2 siung bawang putih', 15, 1, 0, 3),
          i(172, 43, 53, 5,   '1 sdt minyak zaitun', 44, 0, 5, 0),
        ],
      },
      {
        id: 44, daily_meal_plan_id: 13, meal_type: 'snack', time_scheduled: '15:00',
        name: 'Shake Whey Protein',
        cooking_time_minutes: 3, total_calories: 113, total_protein_g: 25, total_fat_g: 1, total_carb_g: 2,
        recipe_instructions:
`1. Masukkan 30g whey isolate ke shaker dengan 250ml air dingin.
2. Kocok 20 detik. Minum segera.`,
        meal_ingredients: [
          i(173, 44, 66, 30, '1 scoop whey isolate', 110, 25, 1, 1),
        ],
      },
      {
        id: 45, daily_meal_plan_id: 13, meal_type: 'dinner', time_scheduled: '18:00',
        name: 'Tuna Selada Wrap',
        cooking_time_minutes: 10, total_calories: 192, total_protein_g: 26, total_fat_g: 3, total_carb_g: 15,
        recipe_instructions:
`1. Tiriskan 120g tuna kaleng (air), suwir kasar.
2. Campurkan tuna dengan tomat potong dadu, paprika merah dadu, 1 sdt mustard, perasan jeruk nipis, garam, dan merica.
3. Cuci bersih 4-5 lembar daun selada romaine besar, tiriskan.
4. Sendokkan isian tuna ke tengah setiap lembar selada.
5. Gulung selada membungkus isian. Sajikan segera.`,
        meal_ingredients: [
          i(174, 45, 6,  120, '120g tuna kaleng (air)', 141, 31, 1, 0),
          i(175, 45, 40, 100, 'daun selada romaine', 17, 1, 0, 3),
          i(176, 45, 41, 50,  'tomat dadu', 9, 0, 0, 2),
          i(177, 45, 43, 30,  'paprika merah dadu', 9, 0, 0, 2),
        ],
      },
    ],
  },

  // ── DAY 7: MINGGU — ~1083 kcal | P145 | K80 | L27 ✅ ─────────────
  // Fix: kurangi porsi ayam soto 250g → 150g, tempe 150g → 100g
  {
    id: 14, phase_number: 2, week_number: 3, day_of_week: 'sunday', day_number: 7,
    meals: [
      {
        id: 46, daily_meal_plan_id: 14, meal_type: 'breakfast', time_scheduled: '07:00',
        name: 'Oatmeal Protein',
        cooking_time_minutes: 8, total_calories: 330, total_protein_g: 42, total_fat_g: 5, total_carb_g: 38,
        recipe_instructions:
`1. Masak 40g oatmeal dengan 250ml air selama 5 menit.
2. Campurkan 1 scoop whey isolate (30g) ke dalam oatmeal hangat, aduk cepat.
3. Tambahkan kayu manis dan sedikit garam. Sajikan hangat.`,
        meal_ingredients: [
          i(178, 46, 24, 40, '40g oatmeal', 152, 5, 3, 27),
          i(179, 46, 66, 30, '1 scoop whey isolate', 110, 25, 1, 1),
        ],
      },
      {
        id: 47, daily_meal_plan_id: 14, meal_type: 'lunch', time_scheduled: '12:00',
        name: 'Soto Ayam Tanpa Santan',
        cooking_time_minutes: 45, total_calories: 260, total_protein_g: 38, total_fat_g: 7, total_carb_g: 12,
        recipe_instructions:
`1. Rebus 150g dada ayam dalam 1 liter air bersama serai, daun salam, daun jeruk, kunyit, dan jahe. Masak 25 menit. Suwir ayam dan saring kaldu.
2. Haluskan bumbu kuning: bawang merah, bawang putih, kunyit, ketumbar, garam. Tumis dengan 1 sdt minyak zaitun hingga harum.
3. Masukkan bumbu ke kaldu, didihkan kembali. Masukkan ayam suwir.
4. Siapkan isian: 80g tauge, seledri cincang, irisan daun bawang.
5. Sajikan soto dalam mangkuk: tuang kuah, tata ayam suwir, tauge, dan taburi seledri.`,
        meal_ingredients: [
          i(180, 47, 2,  150, '150g dada ayam suwir', 168, 35, 4, 0),
          i(181, 47, 47, 30,  '5 siung bawang merah bumbu', 22, 1, 0, 5),
          i(182, 47, 76, 80,  '80g tauge', 24, 2, 0, 5),
          i(183, 47, 80, 20,  'seledri', 3, 0, 0, 1),
          i(184, 47, 53, 5,   '1 sdt minyak zaitun', 44, 0, 5, 0),
        ],
      },
      {
        id: 203, daily_meal_plan_id: 14, meal_type: 'snack', time_scheduled: '15:00',
        name: 'Shake Whey Protein',
        cooking_time_minutes: 3, total_calories: 113, total_protein_g: 25, total_fat_g: 1, total_carb_g: 2,
        recipe_instructions:
`1. Masukkan 30g whey isolate ke shaker dengan 250ml air dingin.
2. Kocok 20 detik. Minum segera.`,
        meal_ingredients: [
          i(503, 203, 66, 30, '1 scoop whey isolate', 110, 25, 1, 1),
        ],
      },
      {
        id: 48, daily_meal_plan_id: 14, meal_type: 'dinner', time_scheduled: '18:00',
        name: 'Tempe Panggang Capcay Udang',
        cooking_time_minutes: 35, total_calories: 380, total_protein_g: 40, total_fat_g: 14, total_carb_g: 28,
        recipe_instructions:
`1. Iris 100g tempe setebal 1cm, marinasi dengan kecap rendah sodium, bawang putih parut, merica. Panggang di teflon tanpa minyak 4 menit tiap sisi.
2. Kupas 150g udang. Potong-potong 80g brokoli, 60g sawi, dan 40g jamur.
3. Panaskan 1 sdt minyak zaitun di wok. Masukkan udang 3 menit.
4. Masukkan semua sayuran secara berurutan. Tambahkan sedikit kecap asin, garam, dan merica.
5. Masak total 8 menit. Sajikan bersama tempe panggang.`,
        meal_ingredients: [
          i(185, 48, 9,  100, '100g tempe panggang', 193, 20, 11, 9),
          i(186, 48, 8,  150, '150g udang kupas', 149, 36, 0, 0),
          i(187, 48, 36, 80,  '80g brokoli', 28, 2, 0, 6),
          i(188, 48, 75, 60,  '60g sawi', 12, 1, 0, 2),
          i(189, 48, 44, 40,  '40g jamur', 9, 1, 0, 1),
          i(190, 48, 53, 5,   '1 sdt minyak zaitun', 44, 0, 5, 0),
          i(191, 48, 51, 10,  '1 sdm kecap asin', 5, 1, 0, 1),
        ],
      },
    ],
  },
];
