import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Prices from '@/components/sections/Prices';
import About from '@/components/sections/About';
import Clients from '@/components/sections/Clients';
import Contacts from '@/components/sections/Contacts';
import RegionsMap from '@/components/sections/RegionsMap';
import ScrollHandler from '@/components/ScrollHandler';
import Sponsorship from '@/components/sections/Sponsorship';
import { pageMetadata } from '@/lib/seo/metadata';
import { JsonLd, servicesLd } from '@/lib/seo/jsonld';

export const metadata = pageMetadata({
  title: 'Дезинсекция для организаций в Москве и МО | НПП «Биохиммаш»',
  description: 'Дезинсекция, дератизация и дезинфекция для кафе, складов, офисов и производств в Москве и МО. Договор, акты, документы для проверок. Выезд ежедневно.',
  path: '/',
  absoluteTitle: true,
});

export default function Home() {
  return (
    <>
      <JsonLd data={servicesLd()}/>
      <ScrollHandler/>
      <Hero/>
      <About/>
      <Services/>
      <RegionsMap/>
      <Clients/>
      <Sponsorship/>
      <Prices/>
      <Contacts/>
    </>
  );
}
