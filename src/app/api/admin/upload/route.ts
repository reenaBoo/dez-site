import { getSession } from '@/lib/auth/server';
import { MAX_UPLOAD_BYTES, MediaError, processImage } from '@/lib/media/storage';
import { adminCreateMedia } from '@/lib/news/repo';

// Загрузка изображения из админки. proxy.ts уже требует сессию — проверяем ещё раз,
// плюс Origin (защита от CSRF: cookie SameSite=Strict + совпадение источника)
export async function POST(request: Request) {
  if (!(await getSession())) return Response.json({ error: 'Требуется вход' }, { status: 401 });

  const origin = request.headers.get('origin');
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host');
  if (!origin || !host || new URL(origin).host !== host) {
    return Response.json({ error: 'Недопустимый источник запроса' }, { status: 403 });
  }

  const length = Number(request.headers.get('content-length') ?? 0);
  if (length > MAX_UPLOAD_BYTES + 64 * 1024) return Response.json({ error: 'Файл больше 12 МБ' }, { status: 413 });

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: 'Некорректный запрос' }, { status: 400 });
  }
  const file = form.get('file');
  const alt = String(form.get('alt') ?? '').slice(0, 300);
  if (!(file instanceof File)) return Response.json({ error: 'Файл не передан' }, { status: 400 });

  try {
    const processed = await processImage(Buffer.from(await file.arrayBuffer()));
    const row = await adminCreateMedia({ ...processed, alt });
    return Response.json({
      media: { id: row.id, url: row.url, width: row.width, height: row.height, alt: row.alt, variants: row.variants },
    });
  } catch (error) {
    if (error instanceof MediaError) return Response.json({ error: error.message }, { status: 422 });
    console.error('[admin] upload failed', error);
    return Response.json({ error: 'Не удалось обработать изображение' }, { status: 500 });
  }
}
