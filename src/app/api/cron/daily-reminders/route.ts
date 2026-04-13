import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import webpush from 'web-push';

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT ?? 'mailto:hello@maleup.app',
  process.env.VAPID_PUBLIC_KEY ?? '',
  process.env.VAPID_PRIVATE_KEY ?? ''
);

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
  return createClient(url, key);
}

export async function GET() {
  try {
    const supabase = getAdminClient();
    const { data: subscriptions } = await supabase.from('push_subscriptions').select('user_id, subscription_json');

    await Promise.all(
      (subscriptions ?? []).map((item) =>
        webpush.sendNotification(
          item.subscription_json as unknown as webpush.PushSubscription,
          JSON.stringify({
            title: 'MaleUp Reminder',
            body: 'Saatnya cek meal plan, workout, dan progress Anda hari ini.',
            url: '/dashboard'
          })
        )
      )
    );

    return NextResponse.json({ success: true, sent: subscriptions?.length ?? 0 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
