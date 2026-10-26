import { getSession } from '@/lib/auth/server';
import { renderOgImage } from '@/lib/og';

// Живое превью OG-картинки в SEO-панели редактора (в том числе для черновиков)
export async function GET(request: Request) {
  if (!(await getSession())) return new Response('Unauthorized', { status: 401 });
  const params = new URL(request.url).searchParams;
  const title = (params.get('title') ?? '').slice(0, 160) || 'Без заголовка';
  const accent = params.get('accent');
  return renderOgImage({
    kicker: 'Статья',
    title,
    accent: accent && /^#[0-9a-fA-F]{6}$/.test(accent) ? accent : undefined,
  });
}
