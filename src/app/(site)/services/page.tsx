import ServicesPage from '@/components/pages/ServicesPage';
import { pageMetadata } from '@/lib/seo/metadata';
import { JsonLd, breadcrumbLd, servicesLd } from '@/lib/seo/jsonld';
import LatestArticles from '@/components/news/LatestArticles';
import { getLatestCards } from '@/lib/news/repo';

export const revalidate = 3600;

export const metadata = pageMetadata({
  title: 'Дезинсекция, дератизация, дезинфекция',
  description: 'Услуги для организаций в Москве и МО: уничтожение насекомых и грызунов, дезинфекция, фитосанитарная обработка. Плановые и срочные выезды, договор.',
  path: '/services',
});

export default async function Page() {
  const latest = await getLatestCards(3);
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Главная', path: '/' }, { name: 'Услуги', path: '/services' }])}/>
      <JsonLd data={servicesLd()}/>
      <ServicesPage/>
      <LatestArticles items={latest}/>
    </>
  );
}
