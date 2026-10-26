import { getNewsPage } from '@/lib/news/repo';

// JSON для кнопки «Показать ещё» на /news. Индексировать не нужно — для поисковиков есть /news/page/N
export async function GET(request: Request) {
  const raw = new URL(request.url).searchParams.get('page') ?? '';
  const page = /^\d{1,4}$/.test(raw) ? Number(raw) : 0;
  if (page < 1) return Response.json({ items: [] }, { status: 400 });
  const { items, totalPages } = await getNewsPage(page);
  return Response.json({ items, page, totalPages }, { headers: { 'X-Robots-Tag': 'noindex' } });
}
