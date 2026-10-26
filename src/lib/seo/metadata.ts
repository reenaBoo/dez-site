import type { Metadata } from 'next';
import { SITE } from '@/lib/site';

export const DEFAULT_OG_IMAGE = '/opengraph-image';

interface PageMetaInput {
  // Заголовок без суффикса бренда — его добавляет title.template из root layout
  title: string;
  description: string;
  path: string;
  // Абсолютный или относительный путь к OG-картинке; по умолчанию — общая картинка сайта
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  // Полный title без шаблона (для главной)
  absoluteTitle?: boolean;
}

export function pageMetadata({
  title, description, path, image, type = 'website', noindex, absoluteTitle,
}: PageMetaInput): Metadata {
  // Объект openGraph страницы заменяет родительский целиком, поэтому картинку
  // по умолчанию (app/opengraph-image.tsx) указываем явно
  const images = [{ url: image ?? DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: title }];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title,
      description,
      siteName: SITE.name,
      locale: 'ru_RU',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images.map((i) => i.url),
    },
    ...(noindex && { robots: { index: false, follow: false } }),
  };
}
