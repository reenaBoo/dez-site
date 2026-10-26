const dateFormatter = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Moscow' });
const shortFormatter = new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Europe/Moscow' });

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return '';
  return dateFormatter.format(new Date(date)).replace(' г.', '');
}

export function formatShortDate(date: Date | string | null | undefined): string {
  if (!date) return '';
  return shortFormatter.format(new Date(date));
}

export function readingTimeLabel(minutes: number): string {
  return `${minutes} мин чтения`;
}

export function isoDate(date: Date | string | null | undefined): string | undefined {
  return date ? new Date(date).toISOString() : undefined;
}
