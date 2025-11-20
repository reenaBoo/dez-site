// src/app/layout.tsx
import type { Metadata } from 'next'
import { ThemeProvider } from 'styled-components'
import StyledComponentsRegistry from '@/lib/registry'
import { GlobalStyles } from '@/styles/GlobalStyles'
import { theme } from '@/styles/theme'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Providers from '@/components/Providers'

export const metadata: Metadata = {
  title: 'Дезинсекция в Москве — Профессиональное уничтожение насекомых',
  description: 'Профессиональная дезинсекция квартир и офисов. Уничтожение клопов, тараканов, клещей.',
  keywords: 'дезинсекция, уничтожение клопов, дератизация москва',
  openGraph: {
    title: 'Дезинсекция в Москве',
    description: 'Профессиональное уничтожение насекомых',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
    <body>
    <Providers>
      <Header />
      <main>{children}</main>
      <Footer />
    </Providers>
    </body>
    </html>
  )
}
