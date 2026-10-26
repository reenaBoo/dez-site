import { readFile, stat } from 'node:fs/promises';
import { resolveMediaPath } from '@/lib/media/storage';

// Отдача загруженных изображений. На сервере /media/ отдаёт nginx напрямую из MEDIA_DIR,
// этот обработчик нужен для локальной разработки и как запасной вариант
export async function GET(_request: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  const file = resolveMediaPath(path);
  if (!file || !file.endsWith('.webp')) return new Response('Not found', { status: 404 });

  try {
    const info = await stat(file);
    if (!info.isFile()) return new Response('Not found', { status: 404 });
    const body = await readFile(file);
    return new Response(body, {
      headers: {
        'Content-Type': 'image/webp',
        'Content-Length': String(body.byteLength),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return new Response('Not found', { status: 404 });
  }
}
