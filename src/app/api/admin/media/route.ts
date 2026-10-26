import { getSession } from '@/lib/auth/server';
import { adminListMedia } from '@/lib/news/repo';

// Библиотека загруженных изображений для выбора в редакторе
export async function GET() {
  if (!(await getSession())) return Response.json({ error: 'Требуется вход' }, { status: 401 });
  const rows = await adminListMedia(120);
  return Response.json({
    media: rows.map((r) => ({ id: r.id, url: r.url, width: r.width, height: r.height, alt: r.alt, variants: r.variants })),
  });
}
