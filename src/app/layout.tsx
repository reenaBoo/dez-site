import type { Metadata, Viewport } from 'next'
import { Manrope, JetBrains_Mono } from 'next/font/google'
import Providers from '@/components/Providers'
import { SITE, SITE_URL } from '@/lib/site'

// Variable-шрифты: один файл на набор символов вместо файла на каждое начертание —
// меньше запросов и нет перерисовки заголовков при догрузке отдельных весов (LCP)
const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
  display: 'swap',
})

const jbMono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-jb-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Дезинсекция для организаций в Москве и МО | НПП «Биохиммаш»',
    template: '%s | НПП «Биохиммаш»',
  },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: 'ru_RU',
  },
  twitter: { card: 'summary_large_image' },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    yandex: process.env.YANDEX_VERIFICATION || undefined,
  },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0C',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${manrope.variable} ${jbMono.variable}`} data-scroll-behavior="smooth">
    <body>
    <Providers>
      {children}
    </Providers>
    </body>
    </html>
  )
}
