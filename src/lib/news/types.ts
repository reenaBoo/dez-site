// Общие типы раздела новостей: используются сайтом, админкой и валидацией

export const CARD_SIZES = ['s', 'm', 'l', 'wide', 'tall'] as const;
export type CardSize = typeof CARD_SIZES[number];

export const CARD_SIZE_LABELS: Record<CardSize, string> = {
  s: 'S — маленькая',
  m: 'M — средняя',
  l: 'L — крупная',
  wide: 'Wide — широкая',
  tall: 'Tall — высокая',
};

export const ARTICLE_STATUSES = ['draft', 'published'] as const;
export type ArticleStatus = typeof ARTICLE_STATUSES[number];

export const SERVICE_SLUGS = ['dezinsekciya', 'deratizaciya', 'dezinfekciya', 'fitosanitariya'] as const;
export type ServiceSlug = typeof SERVICE_SLUGS[number];

// Ссылка на загруженное изображение. Варианты — заранее нарезанные sharp'ом ширины
export interface MediaVariant {
  width: number;
  url: string;
}

export interface MediaRef {
  id?: number;
  url: string;
  width: number;
  height: number;
  alt: string;
  variants?: MediaVariant[];
}

// Текст из TipTap хранится как JSON (ProseMirror). HTML в базу не попадает
export interface RichMark {
  type: 'bold' | 'italic' | 'link';
  attrs?: { href?: string; target?: string | null };
}

export interface RichNode {
  type: string;
  attrs?: Record<string, unknown>;
  content?: RichNode[];
  marks?: RichMark[];
  text?: string;
}

export interface RichDoc {
  type: 'doc';
  content: RichNode[];
}

// ─── Секции ───────────────────────────────────────────────────────────────

export const SECTION_BACKGROUNDS = ['none', 'alt', 'card', 'gold'] as const;
export const SECTION_SPACINGS = ['s', 'm', 'l'] as const;
export const SECTION_ANIMATIONS = ['none', 'fade', 'slide', 'reveal'] as const;

export interface SectionSettings {
  background: typeof SECTION_BACKGROUNDS[number];
  spacing: typeof SECTION_SPACINGS[number];
  animation: typeof SECTION_ANIMATIONS[number];
}

interface SectionBase<T extends string> {
  id: string;
  type: T;
  settings: SectionSettings;
}

export interface HeroSection extends SectionBase<'hero'> {
  variant: 'fullscreen' | 'title-image' | 'split';
  image?: MediaRef | null;
  subtitle?: string;
}

export interface TextSection extends SectionBase<'text'> {
  doc: RichDoc;
  width: 'narrow' | 'wide';
}

export interface ImageSection extends SectionBase<'image'> {
  image: MediaRef | null;
  caption?: string;
  layout: 'column' | 'wide' | 'full';
}

export interface CaptionedImage {
  id: string;
  image: MediaRef;
  caption?: string;
}

export interface GallerySection extends SectionBase<'gallery'> {
  items: CaptionedImage[];
}

export interface TextImageSection extends SectionBase<'textImage'> {
  doc: RichDoc;
  image: MediaRef | null;
  imageSide: 'left' | 'right';
  sticky: boolean;
}

export interface ImageGridSection extends SectionBase<'imageGrid'> {
  items: CaptionedImage[];
  layout: 'equal' | 'feature-left' | 'feature-right' | 'mosaic';
}

export interface QuoteSection extends SectionBase<'quote'> {
  text: string;
  author?: string;
}

export interface FactSection extends SectionBase<'fact'> {
  value: number;
  decimals: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface VideoSection extends SectionBase<'video'> {
  url: string;
  title?: string;
  poster?: MediaRef | null;
}

export interface CtaSection extends SectionBase<'cta'> {
  title: string;
  text: string;
  buttonLabel: string;
  buttonHref: string;
  showPhone: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqSection extends SectionBase<'faq'> {
  title?: string;
  items: FaqItem[];
}

export interface DividerSection extends SectionBase<'divider'> {
  style: 'line' | 'ornament' | 'space';
}

export type Section =
  | HeroSection
  | TextSection
  | ImageSection
  | GallerySection
  | TextImageSection
  | ImageGridSection
  | QuoteSection
  | FactSection
  | VideoSection
  | CtaSection
  | FaqSection
  | DividerSection;

export type SectionType = Section['type'];

// ─── Статья ───────────────────────────────────────────────────────────────

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: MediaRef | null;
  cardSize: CardSize;
  content: Section[];
  accentColor: string | null;
  showAtmosphere: boolean;
  status: ArticleStatus;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  isFeatured: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  ogImage: string | null;
  readingTime: number;
  relatedServices: ServiceSlug[];
}

// Облегчённая версия для карточек сетки
export type ArticleCard = Pick<Article,
  'id' | 'title' | 'slug' | 'excerpt' | 'coverImage' | 'cardSize' | 'publishedAt' | 'isFeatured' | 'readingTime' | 'accentColor'>;
