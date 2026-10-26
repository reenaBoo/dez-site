import { z } from 'zod';
import {
  CARD_SIZES, SECTION_ANIMATIONS, SECTION_BACKGROUNDS, SECTION_SPACINGS, SERVICE_SLUGS,
  type Section,
} from './types';
import { safeHref, sanitizeDoc } from './content';
import { SLUG_PATTERN } from './slug';

const str = (max: number) => z.string().trim().max(max);
const optStr = (max: number) => z.string().trim().max(max).optional();
const id = z.string().min(1).max(64);

const mediaVariant = z.object({ width: z.number().int().positive(), url: z.string().startsWith('/media/') });

// Изображения — только из нашего хранилища (/media/...) или статики сайта (/images/...)
export const mediaRefSchema = z.object({
  id: z.number().int().positive().optional(),
  url: z.string().regex(/^\/(media|images)\//),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  alt: str(300),
  variants: z.array(mediaVariant).max(8).optional(),
});

const settings = z.object({
  background: z.enum(SECTION_BACKGROUNDS),
  spacing: z.enum(SECTION_SPACINGS),
  animation: z.enum(SECTION_ANIMATIONS),
});

// Документ TipTap проверяется только по форме, а затем пересобирается sanitizeDoc
const richDoc = z.object({ type: z.literal('doc'), content: z.array(z.unknown()).max(2000) })
  .transform((doc) => sanitizeDoc(doc));

const captioned = z.object({ id, image: mediaRefSchema, caption: optStr(300) });

const href = z.string().trim().max(500).transform((v, ctx) => {
  const safe = safeHref(v);
  if (!safe) {
    ctx.addIssue({ code: 'custom', message: 'Недопустимая ссылка' });
    return z.NEVER;
  }
  return safe;
});

const base = { id, settings };

export const sectionSchema = z.discriminatedUnion('type', [
  z.object({ ...base, type: z.literal('hero'), variant: z.enum(['fullscreen', 'title-image', 'split']), image: mediaRefSchema.nullable().optional(), subtitle: optStr(400) }),
  z.object({ ...base, type: z.literal('text'), doc: richDoc, width: z.enum(['narrow', 'wide']) }),
  z.object({ ...base, type: z.literal('image'), image: mediaRefSchema.nullable(), caption: optStr(300), layout: z.enum(['column', 'wide', 'full']) }),
  z.object({ ...base, type: z.literal('gallery'), items: z.array(captioned).max(40) }),
  z.object({ ...base, type: z.literal('textImage'), doc: richDoc, image: mediaRefSchema.nullable(), imageSide: z.enum(['left', 'right']), sticky: z.boolean() }),
  z.object({ ...base, type: z.literal('imageGrid'), items: z.array(captioned).max(4), layout: z.enum(['equal', 'feature-left', 'feature-right', 'mosaic']) }),
  z.object({ ...base, type: z.literal('quote'), text: str(1000), author: optStr(200) }),
  z.object({ ...base, type: z.literal('fact'), value: z.number().finite(), decimals: z.number().int().min(0).max(3), prefix: optStr(20), suffix: optStr(40), label: str(300) }),
  z.object({ ...base, type: z.literal('video'), url: z.string().trim().max(500).url().or(z.literal('')), title: optStr(200), poster: mediaRefSchema.nullable().optional() }),
  z.object({ ...base, type: z.literal('cta'), title: str(200), text: str(600), buttonLabel: str(60), buttonHref: href, showPhone: z.boolean() }),
  z.object({ ...base, type: z.literal('faq'), title: optStr(200), items: z.array(z.object({ id, question: str(400), answer: str(3000) })).max(40) }),
  z.object({ ...base, type: z.literal('divider'), style: z.enum(['line', 'ornament', 'space']) }),
]);

// Адреса, занятые служебными маршрутами /news/*
const RESERVED_SLUGS = new Set(['page', 'feed', 'rss']);

const hexColor = z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Цвет в формате #RRGGBB');

export const articleInputSchema = z.object({
  title: str(200).min(1, 'Укажите заголовок'),
  slug: z.string().trim().max(100).regex(SLUG_PATTERN, 'Только латиница, цифры и дефисы')
    .refine((v) => !RESERVED_SLUGS.has(v), 'Этот адрес зарезервирован'),
  excerpt: str(500),
  coverImage: mediaRefSchema.nullable(),
  cardSize: z.enum(CARD_SIZES),
  content: z.array(sectionSchema).max(120),
  accentColor: hexColor.nullable(),
  showAtmosphere: z.boolean(),
  publishedAt: z.coerce.date().nullable(),
  isFeatured: z.boolean(),
  seoTitle: optStr(120).transform((v) => v || null),
  seoDescription: optStr(300).transform((v) => v || null),
  relatedServices: z.array(z.enum(SERVICE_SLUGS)).max(4),
});

export type ArticleInput = z.infer<typeof articleInputSchema>;

// Проверка на тип: схема и интерфейс Section не должны разъехаться
type _SectionCheck = z.infer<typeof sectionSchema> extends Section ? true : never;
export const _sectionTypesMatch: _SectionCheck = true;
