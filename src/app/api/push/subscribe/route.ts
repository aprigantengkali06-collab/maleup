import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const { endpoint, keys, expirationTime } = await req.json();
    if (!endpoint || !keys) return NextResponse.json({ error: 'Missing subscription data' }, { status: 400 });

    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // Upsert subscription
    const { error } = await supabase.from('push_subscriptions').upsert({
      user_id: user.id,
      subscription_json: { endpoint, keys, expirationTime },
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
