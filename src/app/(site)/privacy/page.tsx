import PrivacyPage from '@/components/pages/PrivacyPage';
import { pageMetadata } from '@/lib/seo/metadata';
import { JsonLd, breadcrumbLd } from '@/lib/seo/jsonld';

export const metadata = pageMetadata({
  title: 'Политика конфиденциальности',
  description: 'Политика обработки персональных данных пользователей сайта НПП «Биохиммаш».',
  path: '/privacy',
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Главная', path: '/' }, { name: 'Политика конфиденциальности', path: '/privacy' }])}/>
      <PrivacyPage/>
    </>
  );
}
