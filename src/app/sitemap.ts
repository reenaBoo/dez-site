import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site';
import { NEWS_PER_PAGE, getPublishedSlugs } from '@/lib/news/repo';

// Пересобирается при публикации (revalidatePath) и не реже раза в час — для отложенных статей
export const revalidate = 3600;

const STATIC_PAGES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/prices', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/industries', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/news', priority: 0.8, changeFrequency: 'daily' },
  { path: '/contacts', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getPublishedSlugs();
  const newsPages = Math.ceil(articles.length / NEWS_PER_PAGE);

  return [
    ...STATIC_PAGES.map((page) => ({
      url: absoluteUrl(page.path),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      ...(page.path === '/news' && articles[0] && { lastModified: articles[0].updatedAt }),
    })),
    ...Array.from({ length: Math.max(0, newsPages - 1) }, (_, i) => ({
      url: absoluteUrl(`/news/page/${i + 2}`),
      changeFrequency: 'weekly' as const,
      priority: 0.4,
    })),
    ...articles.map((article) => ({
      url: absoluteUrl(`/news/${article.slug}`),
      lastModified: article.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
