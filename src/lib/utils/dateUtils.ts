import { differenceInCalendarDays, format, isToday as dateFnsIsToday, startOfWeek } from 'date-fns';
import { id } from 'date-fns/locale';
import { toZonedTime } from 'date-fns-tz';

export function formatDateIndo(date: Date | string) {
  return format(new Date(date), 'EEEE, d MMMM yyyy', { locale: id });
}

export function getGreeting() {
  const hour = toZonedTime(new Date(), 'Asia/Jakarta').getHours();
  if (hour < 11) return 'Selamat Pagi';
  if (hour < 15) return 'Selamat Siang';
  if (hour < 19) return 'Selamat Sore';
  return 'Selamat Malam';
}

export function isToday(date: Date | string) {
  return dateFnsIsToday(new Date(date));
}

export function getStartOfWeek(date: Date | string) {
  return startOfWeek(new Date(date), { weekStartsOn: 1 });
}

export function daysBetween(date1: Date | string, date2: Date | string) {
  return Math.abs(differenceInCalendarDays(new Date(date1), new Date(date2)));
}
