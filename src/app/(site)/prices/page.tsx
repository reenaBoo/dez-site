import Prices from '@/components/sections/Prices';
import { pageMetadata } from '@/lib/seo/metadata';
import { JsonLd, breadcrumbLd } from '@/lib/seo/jsonld';

export const metadata = pageMetadata({
  title: 'Цены на дезинсекцию и дератизацию',
  description: 'Стоимость пест-контроля для ресторанов и пищевых производств — от 8 000 ₽/мес, фитосанитарная обработка — от 10 000 ₽. Расчёт после осмотра объекта.',
  path: '/prices',
});

export default function PricesPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Главная', path: '/' }, { name: 'Цены', path: '/prices' }])}/>
      <Prices standalone/>
    </>
  );
}
