import ServicesPage from '@/components/pages/ServicesPage';
import { pageMetadata } from '@/lib/seo/metadata';
import { JsonLd, breadcrumbLd } from '@/lib/seo/jsonld';

export const metadata = pageMetadata({
  title: 'Дезинсекция, дератизация, дезинфекция',
  description: 'Услуги для организаций в Москве и МО: уничтожение насекомых и грызунов, дезинфекция, фитосанитарная обработка. Плановые и срочные выезды, договор.',
  path: '/services',
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Главная', path: '/' }, { name: 'Услуги', path: '/services' }])}/>
      <ServicesPage/>
    </>
  );
}
