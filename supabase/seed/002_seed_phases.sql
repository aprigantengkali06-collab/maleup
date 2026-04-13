-- ─── SUMBER KEBENARAN (updated) ──────────────────────────────────
-- Fase 1: ~800 kcal | P 150-160g | K <20g  | L <20g
-- Fase 2: 1000-1200  | P 130-140g | K 50-80g | L 25-35g
-- Fase 3: 1500-1700  | P 140-150g | K 120-150g| L 40-55g
-- Fase 4: 1500-1600  | P 140-150g | K 130-150g| L 40-50g
-- Fase 5: 2000-2200  | P 130-140g | K 200-250g| L 55-65g
insert into phases (
  phase_number, name, phase_type, week_start, week_end,
  daily_calories_min, daily_calories_max, protein_target_g, carb_target_g, fat_target_g,
  description, exercise_description, kegel_description
) values
(1, 'Reset & Adaptasi',         'foundation',   1,  2,  750,  850,  155, 20,  20,  'PSMF ketat untuk reset metabolik cepat. Fokus membangun ritme makan tinggi protein, menurunkan inflamasi, dan adaptasi pola tidur serta hidrasi.', 'Jalan cepat, full body ringan, dan mobilitas untuk adaptasi kebiasaan.', 'Belajar kontraksi dasar pelvic floor dengan ritme santai dan napas stabil.'),
(2, 'Fat Loss Terarah',         'fat_loss',     3,  6,  1000, 1200, 135, 65,  30,  'Defisit kalori makin terukur dengan pemantauan pinggang lebih konsisten.', 'Mulai HIIT ringan 1-2 kali per minggu plus latihan beban dasar.', 'Volume kegel dinaikkan untuk kontrol dan endurance lebih baik.'),
(3, 'Conditioning & Momentum',  'conditioning', 7,  12, 1500, 1700, 145, 135, 47,  'Menjaga momentum turun lemak sambil meningkatkan stamina dan recovery.', 'Strength 3x per minggu, HIIT terstruktur, dan zone-2 recovery.', 'Mulai reverse kegel untuk koordinasi dan relaksasi pelvic floor.'),
(4, 'Strength Rebuild',         'strength',     13, 18, 1500, 1600, 145, 140, 45,  'Defisit moderat sambil memprioritaskan kekuatan dan komposisi tubuh.', 'Upper/lower split lebih progresif dengan beban dan volume bertahap.', 'Kontraksi lebih lama dengan napas diafragma dan reverse kegel.'),
(5, 'Maintenance & Confidence', 'maintenance',  19, 24, 2000, 2200, 135, 225, 60,  'Transisi ke pola hidup jangka panjang yang stabil, kuat, dan sustainable.', 'Strength tetap jadi inti, langkah harian stabil, HIIT secukupnya.', 'Volume kegel lebih efisien untuk maintenance dan kualitas kontraksi.')
on conflict (phase_number) do update set
  name                 = excluded.name,
  phase_type           = excluded.phase_type,
  week_start           = excluded.week_start,
  week_end             = excluded.week_end,
  daily_calories_min   = excluded.daily_calories_min,
  daily_calories_max   = excluded.daily_calories_max,
  protein_target_g     = excluded.protein_target_g,
  carb_target_g        = excluded.carb_target_g,
  fat_target_g         = excluded.fat_target_g,
  description          = excluded.description,
  exercise_description = excluded.exercise_description,
  kegel_description    = excluded.kegel_description;
