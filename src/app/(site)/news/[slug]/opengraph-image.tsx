import { renderOgImage, OG_SIZE } from '@/lib/og';
import { getPublishedArticle } from '@/lib/news/repo';
import { formatDate } from '@/lib/news/format';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Статья НПП «Биохиммаш»';

// Автоматическая OG-картинка статьи в фирменном стиле
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);
  return renderOgImage({
    kicker: article?.publishedAt ? `Статья · ${formatDate(article.publishedAt)}` : 'Статья',
    title: article?.title ?? 'НПП «Биохиммаш»',
    accent: article?.accentColor ?? undefined,
  });
}
