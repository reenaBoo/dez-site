import { SITE, SERVICES, SITE_URL, absoluteUrl } from '@/lib/site';

type JsonLdValue = Record<string, unknown> | Record<string, unknown>[];

// Серверный компонент: <script type="application/ld+json">. `<` экранируется,
// чтобы данные из БД не могли закрыть тег script
export function JsonLd({ data }: { data: JsonLdValue }) {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

const ORG_ID = `${SITE_URL}/#organization`;

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE_URL,
    logo: absoluteUrl(SITE.logo),
    image: absoluteUrl(SITE.logo),
    description: SITE.description,
    foundingDate: String(SITE.foundingYear),
    telephone: SITE.phones,
    email: SITE.email,
    sameAs: [SITE.telegram],
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.streetAddress,
      addressLocality: SITE.address.addressLocality,
      addressRegion: SITE.address.addressRegion,
      addressCountry: SITE.address.addressCountry,
    },
    areaServed: SITE.areaServed.map((name) => ({ '@type': 'AdministrativeArea', name })),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: SITE.hours.opens,
      closes: SITE.hours.closes,
    },
    priceRange: '₽₽',
  };
}

export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE.name,
    inLanguage: 'ru-RU',
    publisher: { '@id': ORG_ID },
  };
}

export function servicesLd() {
  return SERVICES.map((service) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    serviceType: service.name,
    description: service.description,
    url: absoluteUrl(service.href),
    provider: { '@id': ORG_ID },
    areaServed: SITE.areaServed.map((name) => ({ '@type': 'AdministrativeArea', name })),
    audience: { '@type': 'BusinessAudience', name: 'Организации и бизнес' },
  }));
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function faqLd(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

interface ArticleLdInput {
  title: string;
  description: string;
  path: string;
  image: string;
  publishedAt: Date;
  updatedAt: Date;
}

export function newsArticleLd(input: ArticleLdInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: input.title.slice(0, 110),
    description: input.description,
    mainEntityOfPage: absoluteUrl(input.path),
    image: [absoluteUrl(input.image)],
    datePublished: input.publishedAt.toISOString(),
    dateModified: input.updatedAt.toISOString(),
    inLanguage: 'ru-RU',
    author: { '@type': 'Organization', '@id': ORG_ID, name: SITE.name, url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: absoluteUrl(SITE.logo) },
    },
  };
}
