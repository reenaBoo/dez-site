'use client';

import type { MediaRef } from '@/lib/news/types';

const ACCEPT = ['image/jpeg', 'image/png', 'image/webp'];
export const ACCEPT_ATTR = ACCEPT.join(',');

export async function uploadImage(file: File, alt = ''): Promise<MediaRef> {
  if (!ACCEPT.includes(file.type)) throw new Error('Допустимы только JPG, PNG и WebP');
  if (file.size > 12 * 1024 * 1024) throw new Error('Файл больше 12 МБ');

  const body = new FormData();
  body.append('file', file);
  body.append('alt', alt);
  const res = await fetch('/api/admin/upload', { method: 'POST', body });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? 'Не удалось загрузить изображение');
  return data.media as MediaRef;
}

export async function fetchLibrary(): Promise<MediaRef[]> {
  const res = await fetch('/api/admin/media');
  if (!res.ok) throw new Error('Не удалось загрузить библиотеку');
  return (await res.json()).media as MediaRef[];
}

export function imagesFromClipboard(event: ClipboardEvent | React.ClipboardEvent): File[] {
  return Array.from(event.clipboardData?.items ?? [])
    .filter((item) => item.kind === 'file' && ACCEPT.includes(item.type))
    .map((item) => item.getAsFile())
    .filter((f): f is File => f !== null);
}
