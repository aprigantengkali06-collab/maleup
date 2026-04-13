// src/app/page.tsx
import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

export default async function HomePage() {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect('/login');
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('id, name')
      .eq('id', user.id)
      .maybeSingle();

    if (profile?.name) {
      redirect('/dashboard');
    } else {
      redirect('/onboarding');
    }
  } catch (error) {
    // Redirect error harus diteruskan, bukan ditangkap
    if (isRedirectError(error)) throw error;
    redirect('/login');
  }
}
