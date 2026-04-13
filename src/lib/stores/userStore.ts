'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Profile, OnboardingFormData } from '@/lib/types';
import { calculateBMI, calculateTDEE, determinePhase, getWeekNumber } from '@/lib/utils/formulas';
import { encrypt } from '@/lib/utils/encryption';
import { createClient } from '@/lib/supabase/client';

interface UserStore {
  profile: Profile | null;
  isLoading: boolean;
  isOnboarded: boolean;
  setProfile: (profile: Profile | null) => void;
  updateWeight: (weightKg: number) => void;
  advanceWeek: () => void;
  completeOnboarding: (userId: string, data: OnboardingFormData) => Promise<Profile>;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      profile: null,
      isLoading: false,
      isOnboarded: false,
      setProfile: (profile) => set({ profile, isOnboarded: Boolean(profile) }),
      updateWeight: (weightKg) =>
        set((state) => {
          if (!state.profile) return state;
          return {
            profile: {
              ...state.profile,
              current_weight_kg: weightKg,
              bmi: calculateBMI(state.profile.height_cm, weightKg)
            }
          };
        }),
      advanceWeek: () =>
        set((state) => {
          if (!state.profile) return state;
          const nextWeek = Math.min(24, state.profile.current_week + 1);
          return {
            profile: {
              ...state.profile,
              current_week: nextWeek,
              current_phase: determinePhase(nextWeek)
            }
          };
        }),
      completeOnboarding: async (userId, data) => {
        set({ isLoading: true });
        const bmi = calculateBMI(data.heightCm, data.currentWeightKg);
        const tdee = calculateTDEE(data.currentWeightKg, data.heightCm, data.age, data.activityLevel);
        const currentWeek = getWeekNumber(data.startDate);
        const currentPhase = determinePhase(currentWeek);
        const starting_penis_length = await encrypt(String(data.startLengthCm), userId);
        const starting_penis_girth = await encrypt(String(data.startGirthCm), userId);

        const profile: Profile = {
          id: userId,
          name: data.name,
          height_cm: data.heightCm,
          starting_weight_kg: data.startingWeightKg,
          current_weight_kg: data.currentWeightKg,
          target_weight_kg: data.targetWeightKg,
          starting_waist_cm: data.startingWaistCm,
          age: data.age,
          starting_penis_length,
          starting_penis_girth,
          current_phase: currentPhase,
          current_week: currentWeek,
          program_start_date: data.startDate,
          tdee,
          bmi
        };

        try {
          const supabase = createClient();
          await supabase.from('profiles').upsert(profile);
        } catch {
          // offline-first: profile tetap tersimpan di local persist
        }

        set({ profile, isOnboarded: true, isLoading: false });
        return profile;
      }
    }),
    {
      name: 'maleup-user-store'
    }
  )
);
