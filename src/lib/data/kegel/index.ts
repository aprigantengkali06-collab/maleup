// /src/lib/data/kegel/index.ts
// Barrel export untuk kegel data – semua fase

export {
  phase1Kegel,
  phase2Kegel,
  phase3Kegel,
  phase4Kegel,
  phase5Kegel,
  allKegelData,
  getKegelByPhase,
  toKegelPlan,
  calcSessionDurationSeconds,
  calcSessionDurationMinutes,
} from './allPhases';

export type { KegelPlanExtended } from './allPhases';
