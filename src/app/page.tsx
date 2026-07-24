import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Prices from '@/components/sections/Prices';
import About from '@/components/sections/About';
import Clients from '@/components/sections/Clients';
import Contacts from '@/components/sections/Contacts';
import RegionsMap from '@/components/sections/RegionsMap';
import ScrollHandler from '@/components/ScrollHandler';

export const metadata: Metadata = {
  title: 'Дезинсекция для организаций в Москве | НПП БИОХИММАШ',
  description: 'Дезинсекция для кафе, складов, офисов и производств в Москве и МО. Плановые и аварийные выезды, договор, акты, документы для проверок. Быстрый расчёт.',
  openGraph: {
    title: 'Дезинсекция для организаций в Москве | НПП БИОХИММАШ',
    description: 'Дезинсекция для кафе, складов, офисов и производств в Москве и МО. Плановые и аварийные выезды, договор, акты, документы для проверок. Быстрый расчёт.',
  },
};

export default function Home() {
  return (
    <>
      <ScrollHandler/>
      <Hero/>
      <About/>
      <Services/>
      <RegionsMap/>
      <Clients/>
      <Prices/>
      <Contacts/>
    </>
  );
}
