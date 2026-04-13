/**
 * Hook untuk mengelola notifikasi in-app.
 * Menyediakan fungsi tampil notifikasi dengan toast dan push.
 */

'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import type { Profile } from '@/lib/types';

// ─── useRequestPermission ──────────────────────────────────────────
export function useRequestPermission() {
  return useMutation({
    mutationFn: async (): Promise<NotificationPermission> => {
      if (!('Notification' in window)) {
        throw new Error('Browser tidak mendukung notifikasi');
      }
      const permission = await Notification.requestPermission();
      return permission;
    },
  });
}

// ─── Helpers ───────────────────────────────────────────────────────
function getSecondsUntilTime(hourWIB: number, minuteWIB: number): number {
  // Waktu WIB = UTC+7
  const now = new Date();
  const nowWIB = new Date(now.getTime() + 7 * 60 * 60 * 1000);

  const targetWIB = new Date(nowWIB);
  targetWIB.setUTCHours(hourWIB, minuteWIB, 0, 0);

  let diff = targetWIB.getTime() - nowWIB.getTime();
  if (diff < 0) diff += 24 * 60 * 60 * 1000; // Besok
  return Math.floor(diff / 1000);
}

function scheduleLocalNotification(
  title: string,
  body: string,
  secondsFromNow: number,
  timers: NodeJS.Timeout[]
) {
  if (!('Notification' in window)) return;
  if (Notification.permission !== 'granted') return;
  if (secondsFromNow <= 0) return;

  const timer = setTimeout(() => {
    new Notification(title, {
      body,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-72x72.png',
    });
  }, secondsFromNow * 1000);

  timers.push(timer);
}

// ─── useScheduleNotifications ──────────────────────────────────────
export function useScheduleNotifications(profile: Profile | null) {
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const schedule = useCallback(() => {
    if (!profile) return;

    // Bersihkan jadwal sebelumnya
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    const timers = timersRef.current;

    // Sarapan 07:00 WIB
    scheduleLocalNotification(
      '🍳 Waktu Sarapan!',
      'Jangan skip sarapan. Cek menu sarapan hari ini di MaleUp.',
      getSecondsUntilTime(7, 0),
      timers
    );

    // Snack 15:00 WIB
    scheduleLocalNotification(
      '🥚 Snack Siang',
      'Waktu snack sehat. Jaga asupan protein-mu!',
      getSecondsUntilTime(15, 0),
      timers
    );

    // Makan malam 18:00 WIB
    scheduleLocalNotification(
      '🍽️ Makan Malam',
      'Siapkan makan malam sehat sesuai program fase-mu.',
      getSecondsUntilTime(18, 0),
      timers
    );

    // Kegel pagi 08:00 WIB
    scheduleLocalNotification(
      '💪 Kegel Pagi',
      'Jangan lupa sesi kegel pagi hari. 10 menit saja!',
      getSecondsUntilTime(8, 0),
      timers
    );

    // Kegel malam 21:00 WIB
    scheduleLocalNotification(
      '🌙 Kegel Malam',
      'Sesi kegel malam sebelum tidur. Konsistensi adalah kunci!',
      getSecondsUntilTime(21, 0),
      timers
    );

    // Workout reminder 06:30 WIB
    scheduleLocalNotification(
      '🏃 Workout Hari Ini',
      `Semangat ${profile.name}! Saatnya gerak. Cek rencana workout-mu.`,
      getSecondsUntilTime(6, 30),
      timers
    );
  }, [profile]);

  useEffect(() => {
    schedule();
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, [schedule]);

  return { scheduleNotifications: schedule };
}

// ─── usePushSubscription ───────────────────────────────────────────
export function usePushSubscription(userId: string | null) {
  return useMutation({
    mutationFn: async (): Promise<void> => {
      if (!userId) throw new Error('User belum login');
      if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        throw new Error('Push notification tidak didukung browser ini');
      }

      const registration = await navigator.serviceWorker.ready;

      const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!VAPID_PUBLIC_KEY) throw new Error('VAPID public key tidak ditemukan');

      // Convert VAPID key
      const urlBase64ToUint8Array = (base64String: string) => {
        const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding)
          .replace(/-/g, '+')
          .replace(/_/g, '/');
        const rawData = atob(base64);
        return Uint8Array.from(rawData, (c) => c.charCodeAt(0));
      };

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });

      // Simpan subscription ke Supabase
      const supabase = createClient();
      const { error } = await supabase.from('push_subscriptions').upsert(
        {
          user_id: userId,
          subscription_json: subscription.toJSON(),
        },
        { onConflict: 'user_id' }
      );

      if (error) throw new Error(error.message);
    },
  });
}
