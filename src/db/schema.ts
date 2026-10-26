import { boolean, index, integer, jsonb, pgEnum, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import type { CardSize, MediaRef, MediaVariant, Section, ServiceSlug } from '@/lib/news/types';

export const articleStatus = pgEnum('article_status', ['draft', 'published']);

export const articles = pgTable('articles', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  excerpt: text('excerpt').notNull().default(''),
  coverImage: jsonb('cover_image').$type<MediaRef | null>(),
  cardSize: text('card_size').$type<CardSize>().notNull().default('m'),
  content: jsonb('content').$type<Section[]>().notNull().default([]),
  accentColor: text('accent_color'),
  showAtmosphere: boolean('show_atmosphere').notNull().default(true),
  status: articleStatus('status').notNull().default('draft'),
  // Может быть в будущем — тогда статья станет видна после этой даты (отложенная публикация)
  publishedAt: timestamp('published_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  isFeatured: boolean('is_featured').notNull().default(false),
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  ogImage: text('og_image'),
  readingTime: integer('reading_time').notNull().default(1),
  relatedServices: jsonb('related_services').$type<ServiceSlug[]>().notNull().default([]),
}, (t) => [
  index('articles_status_published_idx').on(t.status, t.publishedAt),
  index('articles_featured_idx').on(t.isFeatured),
]);

// Старые slug'и статей: при смене адреса старый URL отдаёт 301 на новый
export const articleSlugHistory = pgTable('article_slug_history', {
  slug: text('slug').primaryKey(),
  articleId: integer('article_id').notNull().references(() => articles.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const media = pgTable('media', {
  id: serial('id').primaryKey(),
  url: text('url').notNull(),
  variants: jsonb('variants').$type<MediaVariant[]>().notNull().default([]),
  alt: text('alt').notNull().default(''),
  width: integer('width').notNull(),
  height: integer('height').notNull(),
  size: integer('size').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export type ArticleRow = typeof articles.$inferSelect;
export type NewArticleRow = typeof articles.$inferInsert;
export type MediaRow = typeof media.$inferSelect;
