import NewsGrid from '@/components/news/NewsGrid';
import { getNewsPage } from '@/lib/news/repo';
import { pageMetadata } from '@/lib/seo/metadata';
import { JsonLd, breadcrumbLd } from '@/lib/seo/jsonld';

export const revalidate = 3600;

export const metadata = pageMetadata({
  title: 'Новости и статьи о дезинсекции и дератизации',
  description: 'Полезные статьи для бизнеса: подготовка к проверкам Роспотребнадзора, признаки клопов и тараканов, дератизация складов, новости НПП «Биохиммаш».',
  path: '/news',
});

const crumbs = [{ name: 'Главная', path: '/' }, { name: 'Новости', path: '/news' }];

export default async function NewsPage() {
  const { items, totalPages } = await getNewsPage(1);
  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)}/>
      <NewsGrid initialItems={items} page={1} totalPages={totalPages} crumbs={crumbs}/>
    </>
  );
}
