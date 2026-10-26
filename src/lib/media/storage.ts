import { join, normalize, sep } from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import sharp, { type Metadata } from 'sharp';
import type { MediaVariant } from '@/lib/news/types';

// Папка с загрузками — вне репозитория. На сервере её отдаёт nginx по /media/,
// локально — route handler app/media/[...path]
export const MEDIA_DIR = process.env.MEDIA_DIR ?? join(process.cwd(), '.data/media');
export const MEDIA_URL_PREFIX = '/media';

export const MAX_UPLOAD_BYTES = 12 * 1024 * 1024;
const ALLOWED_FORMATS = new Set(['jpeg', 'png', 'webp']);
const VARIANT_WIDTHS = [480, 960, 1600, 2400];
const MAX_PIXELS = 40_000_000;

export class MediaError extends Error {}

export interface ProcessedImage {
  url: string;
  width: number;
  height: number;
  size: number;
  variants: MediaVariant[];
}

// Безопасный путь внутри MEDIA_DIR: без `..`, абсолютных путей и пустых сегментов
export function resolveMediaPath(parts: string[]): string | null {
  if (parts.some((p) => !p || p === '.' || p === '..' || p.includes('\0') || /[\\/]/.test(p))) return null;
  // turbopackIgnore: путь к загрузкам вычисляется в рантайме, трассировать его при сборке не нужно
  const full = normalize(join(/* turbopackIgnore: true */ MEDIA_DIR, ...parts));
  return full.startsWith(normalize(MEDIA_DIR) + sep) ? full : null;
}

/**
 * Проверяет и нарезает изображение: формат определяется по содержимому (не по имени),
 * ориентация берётся из EXIF и применяется, затем все метаданные (EXIF, GPS) удаляются —
 * sharp не переносит их в результат без явного withMetadata().
 * `baseName` — для детерминированных имён (сид); по умолчанию случайный UUID.
 */
export async function processImage(input: Buffer, baseName?: string): Promise<ProcessedImage> {
  if (input.byteLength > MAX_UPLOAD_BYTES) throw new MediaError('Файл больше 12 МБ');

  let meta: Metadata;
  try {
    meta = await sharp(input, { limitInputPixels: MAX_PIXELS }).metadata();
  } catch {
    throw new MediaError('Файл не является изображением');
  }
  if (!meta.format || !ALLOWED_FORMATS.has(meta.format)) throw new MediaError('Допустимы только JPG, PNG и WebP');
  if (!meta.width || !meta.height) throw new MediaError('Не удалось определить размер изображения');

  // С учётом поворота по EXIF ширина и высота могут поменяться местами
  const rotated = (meta.orientation ?? 1) >= 5;
  const srcWidth = rotated ? meta.height : meta.width;
  const srcHeight = rotated ? meta.width : meta.height;

  const now = new Date();
  const folder = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}`;
  const name = baseName ?? randomUUID();
  const dir = baseName
    ? join(/* turbopackIgnore: true */ MEDIA_DIR, 'seed')
    : join(/* turbopackIgnore: true */ MEDIA_DIR, ...folder.split('/'));
  const urlDir = baseName ? `${MEDIA_URL_PREFIX}/seed` : `${MEDIA_URL_PREFIX}/${folder}`;
  await mkdir(dir, { recursive: true });

  const widths = VARIANT_WIDTHS.filter((w) => w < srcWidth);
  widths.push(Math.min(srcWidth, VARIANT_WIDTHS[VARIANT_WIDTHS.length - 1]));
  const uniqueWidths = [...new Set(widths)].sort((a, b) => a - b);

  const variants: MediaVariant[] = [];
  let largestSize = 0;
  for (const width of uniqueWidths) {
    const file = `${name}-${width}.webp`;
    const buffer = await sharp(input, { limitInputPixels: MAX_PIXELS })
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();
    await writeFile(join(dir, file), buffer);
    variants.push({ width, url: `${urlDir}/${file}` });
    largestSize = buffer.byteLength;
  }

  const largest = variants[variants.length - 1];
  return {
    url: largest.url,
    width: largest.width,
    height: Math.round((srcHeight * largest.width) / srcWidth),
    size: largestSize,
    variants,
  };
}
