import AboutPage from '@/components/pages/AboutPage';
import { pageMetadata } from '@/lib/seo/metadata';
import { JsonLd, breadcrumbLd } from '@/lib/seo/jsonld';

export const metadata = pageMetadata({
  title: 'О компании — 20+ лет в дезинсекции',
  description: 'НПП «Биохиммаш» с 2002 года: дезинсекция, дератизация, дезинфекция для бизнеса в Москве и МО. Лицензия Роспотребнадзора, договор и документы для проверок.',
  path: '/about',
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Главная', path: '/' }, { name: 'О компании', path: '/about' }])}/>
      <AboutPage/>
    </>
  );
}
