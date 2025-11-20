'use client'

import type { Metadata } from 'next'
import Prices from '@/components/sections/Prices'

export const metadata: Metadata = {
  title: 'Цены на услуги дезинсекции',
  description: 'Стоимость услуг по уничтожению насекомых и грызунов',
}

export default function PricesPage() {
  return <Prices />
}
