import ContactsPage from '@/components/pages/ContactsPage';
import { pageMetadata } from '@/lib/seo/metadata';
import { JsonLd, breadcrumbLd } from '@/lib/seo/jsonld';

export const metadata = pageMetadata({
  title: 'Контакты — вызвать специалиста',
  description: 'Телефон +7 (495) 956-48-55, ежедневно 8:00–22:00. Email, Telegram и адрес офиса НПП «Биохиммаш» в Жуковском. Выезд по Москве и МО.',
  path: '/contacts',
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Главная', path: '/' }, { name: 'Контакты', path: '/contacts' }])}/>
      <ContactsPage/>
    </>
  );
}
