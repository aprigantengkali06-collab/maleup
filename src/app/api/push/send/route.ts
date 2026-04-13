import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import webpush from 'web-push';

webpush.setVapidDetails(
  'mailto:hello@maleup.app',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { userId, title, body, url } = await req.json();
    if (!userId || !title) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

    const supabase = await createClient();
    const { data: subRecord, error } = await supabase
      .from('push_subscriptions')
      .select('subscription_json')
      .eq('user_id', userId)
      .maybeSingle();

    if (error || !subRecord) return NextResponse.json({ error: 'No subscription found' }, { status: 404 });

    const subscription = subRecord.subscription_json as webpush.PushSubscription;
    await webpush.sendNotification(subscription, JSON.stringify({ title, body, url: url ?? '/dashboard' }));

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? 'Failed to send notification' }, { status: 500 });
  }
}
