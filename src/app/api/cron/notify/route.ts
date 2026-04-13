import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import webpush from 'web-push';

webpush.setVapidDetails(
  'mailto:hello@maleup.app',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function GET(req: NextRequest) {
  // Verify Vercel Cron authorization
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = await createClient();
  const { data: subscriptions, error } = await supabase.from('push_subscriptions').select('*');
  if (error || !subscriptions) return NextResponse.json({ sent: 0 });

  const hour = new Date().getHours();
  let notifData: { title: string; body: string; url: string } | null = null;

  if (hour === 6) notifData = { title: '🌅 Selamat Pagi!', body: 'Sarapan sehat yuk! Cek menu hari ini.', url: '/meals' };
  else if (hour === 12) notifData = { title: '🍽️ Makan Siang', body: 'Sudah makan siang? Jangan skip protein!', url: '/meals' };
  else if (hour === 17) notifData = { title: '🏋️ Workout Time!', body: 'Saatnya latihan! Konsistensi adalah kunci.', url: '/workout' };

  if (!notifData) return NextResponse.json({ sent: 0, reason: 'No scheduled notification for this hour' });

  let sent = 0;
  await Promise.allSettled(
    subscriptions.map(async (sub) => {
      try {
        const subscription = sub.subscription_json as webpush.PushSubscription;
        await webpush.sendNotification(subscription, JSON.stringify(notifData));
        sent++;
      } catch {}
    })
  );

  return NextResponse.json({ sent, total: subscriptions.length });
}
