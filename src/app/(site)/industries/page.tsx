import IndustriesPage from '@/components/pages/IndustriesPage';
import { pageMetadata } from '@/lib/seo/metadata';
import { JsonLd, breadcrumbLd } from '@/lib/seo/jsonld';

export const metadata = pageMetadata({
  title: 'Пест-контроль для бизнеса по отраслям',
  description: 'Дезинсекция и дератизация для ресторанов, пищевых производств, складов, офисов, ТСЖ и госучреждений в Москве и МО. Программы пест-контроля и отчётность.',
  path: '/industries',
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Главная', path: '/' }, { name: 'Отрасли', path: '/industries' }])}/>
      <IndustriesPage/>
    </>
  );
}
