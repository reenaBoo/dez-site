import type { Metadata } from 'next'
import { Manrope, JetBrains_Mono } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Providers from '@/components/Providers'
import Atmosphere from '@/components/Atmosphere'
import YandexMetrika from '@/components/YandexMetrika'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
})

const jbMono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
  variable: '--font-jb-mono',
  display: 'swap',
})

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${manrope.variable} ${jbMono.variable}`}>
    <body>
    <link
      rel="preload"
      as="image"
      imageSrcSet="/images/hero-bg-mobile.jpg 800w, /images/hero-bg.jpg 1920w"
      imageSizes="100vw"
      fetchPriority="high"
    />
    <Providers>
      <Header/>
      <main>{children}</main>
      <Footer/>
      <Atmosphere/>
    </Providers>
    <YandexMetrika/>
    </body>
    </html>
  )
}
