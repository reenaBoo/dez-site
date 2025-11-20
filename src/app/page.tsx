// src/app/page.tsx
import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import ContactForm from '@/components/sections/ContactForm'

export const metadata: Metadata = {
  title: 'Главная — Дезинсекция в Москве',
  description: 'Профессиональная дезинсекция. Гарантия результата.',
}

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <ContactForm />
    </>
  )
}
