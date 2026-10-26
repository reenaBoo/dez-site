import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Atmosphere from '@/components/Atmosphere'
import YandexMetrika from '@/components/YandexMetrika'
import { JsonLd, organizationLd, websiteLd } from '@/lib/seo/jsonld'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[organizationLd(), websiteLd()]}/>
      <Header/>
      <main>{children}</main>
      <Footer/>
      <Atmosphere/>
      <YandexMetrika/>
    </>
  )
}
