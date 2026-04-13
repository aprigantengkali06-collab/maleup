insert into kegel_plans (
  phase_number, sets, reps, hold_seconds, relax_seconds, times_per_day, include_reverse_kegel, description
) values
(1, 3, 10, 5, 5, 2, false, 'Tarik otot dasar panggul seperti menahan pipis. Tahan 5 detik, lepas 5 detik. Jangan menahan napas, jangan ikut mengencangkan bokong, paha, atau perut.'),
(2, 3, 15, 7, 5, 2, false, 'Kontraksikan pelvic floor dengan halus selama 7 detik. Fokus pada kualitas kontraksi dan postur duduk/berdiri yang netral.'),
(3, 3, 20, 10, 5, 2, true, 'Setelah setiap set kegel, lakukan reverse kegel ringan dengan membuka pelvic floor sambil menarik napas perut. Jangan mengejan berlebihan.'),
(4, 3, 25, 10, 5, 2, true, 'Gunakan napas diafragma agar kontraksi lebih terkendali. Kombinasikan kontraksi dan reverse kegel untuk koordinasi otot yang lebih baik.'),
(5, 2, 20, 10, 5, 1, true, 'Fase maintenance: cukup 1 sesi per hari. Fokus pada kontraksi yang jelas, relaksasi penuh, dan kebiasaan napas yang baik.')
on conflict (phase_number) do update set
  sets = excluded.sets,
  reps = excluded.reps,
  hold_seconds = excluded.hold_seconds,
  relax_seconds = excluded.relax_seconds,
  times_per_day = excluded.times_per_day,
  include_reverse_kegel = excluded.include_reverse_kegel,
  description = excluded.description;
