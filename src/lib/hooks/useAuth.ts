/**
 * Hook untuk autentikasi pengguna via Supabase Auth.
 * Menyediakan: user session, login, register, dan logout.
 */

'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import type { Profile } from '@/lib/types';

// ─── Query Keys ────────────────────────────────────────────────────
export const authKeys = {
  session: ['auth', 'session'] as const,
  profile: (userId: string) => ['auth', 'profile', userId] as const,
};

// ─── Helpers ───────────────────────────────────────────────────────
function getSupabase() {
  return createClient();
}

// ─── useSession ────────────────────────────────────────────────────
export function useSession() {
  return useQuery({
    queryKey: authKeys.session,
    queryFn: async () => {
      const supabase = getSupabase();
      const { data, error } = await supabase.auth.getSession();
      if (error) throw new Error(error.message);
      return data.session;
    },
    staleTime: 1000 * 60 * 5, // 5 menit
  });
}

// ─── useProfile ────────────────────────────────────────────────────
export function useProfile(userId?: string) {
  return useQuery({
    queryKey: authKeys.profile(userId ?? ''),
    queryFn: async (): Promise<Profile> => {
      if (!userId) throw new Error('userId diperlukan');
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (error) throw new Error(error.message);
      return data as Profile;
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
}

// ─── useSignUp ─────────────────────────────────────────────────────
interface SignUpParams {
  email: string;
  password: string;
  profileData: Omit<Profile, 'id' | 'created_at' | 'updated_at'>;
}

export function useSignUp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, password, profileData }: SignUpParams) => {
      const supabase = getSupabase();

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (authError) throw new Error(authError.message);
      if (!authData.user) throw new Error('Registrasi gagal, user tidak ditemukan');

      const { error: profileError } = await supabase.from('profiles').insert({
        id: authData.user.id,
        ...profileData,
      });
      if (profileError) throw new Error(profileError.message);

      return authData.user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.session });
    },
  });
}

// ─── useSignIn ─────────────────────────────────────────────────────
interface SignInParams {
  email: string;
  password: string;
}

export function useSignIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, password }: SignInParams) => {
      const supabase = getSupabase();
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw new Error(error.message);
      return data.user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.session });
    },
  });
}

// ─── useSignOut ────────────────────────────────────────────────────
export function useSignOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const supabase = getSupabase();
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
}
