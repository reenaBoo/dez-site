import { getNewsPage } from '@/lib/news/repo';
import { SITE, SITE_URL, absoluteUrl } from '@/lib/site';

export const revalidate = 3600;

const escape = (value: string) => value
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// RSS 2.0 для Яндекса и агрегаторов: последние 30 статей
export async function GET() {
  const { items } = await getNewsPage(1, 30);
  const sorted = [...items].sort((a, b) => (b.publishedAt?.getTime() ?? 0) - (a.publishedAt?.getTime() ?? 0));

  const entries = sorted.map((item) => {
    const url = absoluteUrl(`/news/${item.slug}`);
    const cover = item.coverImage ? `\n      <enclosure url="${escape(absoluteUrl(item.coverImage.url))}" type="image/webp" length="0"/>` : '';
    return `    <item>
      <title>${escape(item.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escape(item.excerpt)}</description>
      <pubDate>${(item.publishedAt ?? new Date()).toUTCString()}</pubDate>${cover}
    </item>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(`Новости и статьи — ${SITE.name}`)}</title>
    <link>${SITE_URL}/news</link>
    <description>${escape('Полезные статьи о дезинсекции, дератизации и дезинфекции для бизнеса и новости компании.')}</description>
    <language>ru</language>
    <atom:link href="${SITE_URL}/news/rss.xml" rel="self" type="application/rss+xml"/>
${entries}
  </channel>
</rss>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
