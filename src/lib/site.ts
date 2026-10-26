// Единый источник данных о компании и домене: canonical, sitemap, OG, JSON-LD

// Главный домен — нппбиохиммаш.рф (в punycode, чтобы URL были валидны везде)
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://xn--80abvauackga3exb.xn--p1ai').replace(/\/$/, '');

export const SITE = {
  name: 'НПП «Биохиммаш»',
  legalName: 'ООО «НПП «БИОХИММАШ»',
  shortName: 'Биохиммаш',
  description: 'Дезинсекция, дератизация, дезинфекция и фитосанитарная обработка для организаций в Москве и Московской области. Договор, акты и документы для проверок.',
  foundingYear: 2002,
  phone: '+7 (495) 956-48-55',
  phoneHref: 'tel:+74959564855',
  phones: ['+74959564855', '+74953912102'],
  email: 'biohimmash@mail.ru',
  telegram: 'https://t.me/nppbiohimmash',
  address: {
    streetAddress: 'ул. Грищенко, 5, офис 30',
    addressLocality: 'Жуковский',
    addressRegion: 'Московская область',
    addressCountry: 'RU',
    full: 'Московская область, г. Жуковский, ул. Грищенко, 5, офис 30',
  },
  hours: { opens: '08:00', closes: '22:00', label: 'Ежедневно 8:00 — 22:00' },
  areaServed: ['Москва', 'Московская область'],
  logo: '/images/logo.png',
} as const;

export interface ServiceInfo {
  slug: 'dezinsekciya' | 'deratizaciya' | 'dezinfekciya' | 'fitosanitariya';
  name: string;
  description: string;
  href: string;
}

// Услуги — для JSON-LD Service, связанных услуг в статьях и перелинковки
export const SERVICES: ServiceInfo[] = [{
  slug: 'dezinsekciya',
  name: 'Дезинсекция',
  description: 'Уничтожение тараканов, клопов, муравьёв, блох и других насекомых на объектах бизнеса.',
  href: '/services',
}, {
  slug: 'deratizaciya',
  name: 'Дератизация',
  description: 'Уничтожение и контроль численности грызунов, плановая дератизация территорий и помещений.',
  href: '/services',
}, {
  slug: 'dezinfekciya',
  name: 'Дезинфекция',
  description: 'Обеззараживание помещений, оборудования и транспорта по требованиям СанПиН.',
  href: '/services',
}, {
  slug: 'fitosanitariya',
  name: 'Фитосанитарная обработка',
  description: 'Уничтожение борщевика и сорняков, обработка территорий с контролем результата.',
  href: '/services',
}];

export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
