import { notFound, permanentRedirect } from 'next/navigation';
import type { Metadata } from 'next';
import NewsGrid from '@/components/news/NewsGrid';
import { NEWS_PER_PAGE, getNewsPage, getPublishedSlugs } from '@/lib/news/repo';
import { pageMetadata } from '@/lib/seo/metadata';
import { JsonLd, breadcrumbLd } from '@/lib/seo/jsonld';

export const revalidate = 3600;

type Props = { params: Promise<{ page: string }> };

export async function generateStaticParams() {
  const total = (await getPublishedSlugs()).length;
  const pages = Math.ceil(total / NEWS_PER_PAGE);
  return Array.from({ length: Math.max(0, pages - 1) }, (_, i) => ({ page: String(i + 2) }));
}

function parsePage(raw: string): number | null {
  return /^\d{1,4}$/.test(raw) ? Number(raw) : null;
}

// Каждая страница пагинации — со своим canonical (на себя), без noindex
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = parsePage((await params).page);
  if (!page) return {};
  return pageMetadata({
    title: `Новости и статьи — страница ${page}`,
    description: `Статьи о дезинсекции, дератизации и дезинфекции для бизнеса в Москве и МО — страница ${page}.`,
    path: `/news/page/${page}`,
  });
}

export default async function NewsPaginatedPage({ params }: Props) {
  const page = parsePage((await params).page);
  if (page === 1) permanentRedirect('/news');
  if (!page) notFound();

  const { items, totalPages } = await getNewsPage(page);
  if (!items.length) notFound();

  const crumbs = [
    { name: 'Главная', path: '/' },
    { name: 'Новости', path: '/news' },
    { name: `Страница ${page}`, path: `/news/page/${page}` },
  ];
  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)}/>
      <NewsGrid initialItems={items} page={page} totalPages={totalPages} crumbs={crumbs}/>
    </>
  );
}
