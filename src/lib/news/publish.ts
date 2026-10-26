import { revalidatePath } from 'next/cache';
import { after } from 'next/server';
import { SITE_URL, absoluteUrl } from '@/lib/site';

// Сбрасывает кэш всех страниц, где может фигурировать статья, и (в проде)
// отправляет изменённые адреса в IndexNow (Яндекс, Bing)
export function onArticleChanged(slugs: string[]) {
  revalidatePath('/news', 'layout');
  revalidatePath('/');
  revalidatePath('/services');
  revalidatePath('/sitemap.xml');

  const urls = [...new Set(slugs)].map((slug) => absoluteUrl(`/news/${slug}`));
  urls.push(absoluteUrl('/news'));
  after(() => submitIndexNow(urls));
}

export async function submitIndexNow(urls: string[]) {
  const key = process.env.INDEXNOW_KEY;
  if (!key || process.env.NODE_ENV !== 'production' || !urls.length) return;

  const body = {
    host: new URL(SITE_URL).host,
    key,
    keyLocation: `${SITE_URL}/indexnow-key.txt`,
    urlList: urls,
  };
  // Яндекс и Bing делятся URL с остальными участниками протокола, но шлём в оба напрямую
  await Promise.allSettled(['https://yandex.com/indexnow', 'https://api.indexnow.org/indexnow'].map((endpoint) =>
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8000),
    }).then((res) => {
      if (!res.ok && res.status !== 202) console.warn(`[indexnow] ${endpoint}: ${res.status}`);
    })));
}
