import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import ContactForm from '@/components/sections/ContactForm';
import Prices from '@/components/sections/Prices';
import About from '@/components/sections/About';
import Clients from '@/components/sections/Clients';
import ScrollHandler from '@/components/ScrollHandler';

export const metadata: Metadata = {
  title: 'Главная — Дезинсекция в Москве', description: 'Профессиональная дезинсекция. Гарантия результата.',
};

export default function Home() {
  return (
    <>
      <ScrollHandler/>
      <Hero/>
      <About/>
      <Services/>
      <Clients/>
      <Prices/>
      <ContactForm/>
    </>
  );
}
