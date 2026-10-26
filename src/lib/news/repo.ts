import { and, desc, eq, ilike, lte, ne, or, sql, count } from 'drizzle-orm';
import { getDb, schema } from '@/db';
import { NEWS_PER_PAGE, type Article, type ArticleCard, type ArticleStatus } from './types';
import type { ArticleInput } from './validation';
import { computeReadingTime } from './content';

const { articles, articleSlugHistory, media } = schema;

export { NEWS_PER_PAGE };

// Статья видна, если опубликована и дата публикации уже наступила (отложенная публикация)
const isVisible = () => and(eq(articles.status, 'published'), lte(articles.publishedAt, sql`now()`));

const cardColumns = {
  id: articles.id,
  title: articles.title,
  slug: articles.slug,
  excerpt: articles.excerpt,
  coverImage: articles.coverImage,
  cardSize: articles.cardSize,
  publishedAt: articles.publishedAt,
  isFeatured: articles.isFeatured,
  readingTime: articles.readingTime,
  accentColor: articles.accentColor,
};

// ─── Публичная часть ─────────────────────────────────────────────────────

export interface NewsPage {
  items: ArticleCard[];
  page: number;
  totalPages: number;
  total: number;
}

/**
 * Страница сетки. Закреплённая статья всегда первая на первой странице,
 * остальные — по дате; пагинация считается по общему «виртуальному» списку.
 */
export async function getNewsPage(page: number, perPage = NEWS_PER_PAGE): Promise<NewsPage> {
  const db = await getDb();
  const [{ total }] = await db.select({ total: count() }).from(articles).where(isVisible());
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  if (page < 1 || page > totalPages) return { items: [], page, totalPages, total };

  const [featured] = await db.select(cardColumns).from(articles)
    .where(and(isVisible(), eq(articles.isFeatured, true)))
    .orderBy(desc(articles.publishedAt)).limit(1);

  const start = (page - 1) * perPage;
  const restWhere = featured ? and(isVisible(), ne(articles.id, featured.id)) : isVisible();

  if (featured && start === 0) {
    const rest = await db.select(cardColumns).from(articles).where(restWhere)
      .orderBy(desc(articles.publishedAt)).limit(perPage - 1);
    return { items: [featured, ...rest], page, totalPages, total };
  }

  const items = await db.select(cardColumns).from(articles).where(restWhere)
    .orderBy(desc(articles.publishedAt))
    .offset(featured ? start - 1 : start)
    .limit(perPage);
  return { items, page, totalPages, total };
}

export async function getLatestCards(limit: number): Promise<ArticleCard[]> {
  const db = await getDb();
  return db.select(cardColumns).from(articles).where(isVisible()).orderBy(desc(articles.publishedAt)).limit(limit);
}

export async function getPublishedArticle(slug: string): Promise<Article | null> {
  const db = await getDb();
  const [row] = await db.select().from(articles).where(and(isVisible(), eq(articles.slug, slug))).limit(1);
  return row ?? null;
}

// Старый slug → актуальный (для 301 после переименования)
export async function getSlugRedirect(slug: string): Promise<string | null> {
  const db = await getDb();
  const [row] = await db.select({ slug: articles.slug }).from(articleSlugHistory)
    .innerJoin(articles, eq(articles.id, articleSlugHistory.articleId))
    .where(and(eq(articleSlugHistory.slug, slug), isVisible()))
    .limit(1);
  return row?.slug ?? null;
}

// «Читайте также»: сначала статьи с общими связанными услугами, затем свежие
export async function getRelatedCards(article: Article, limit = 3): Promise<ArticleCard[]> {
  const db = await getDb();
  const candidates = await db.select({ ...cardColumns, relatedServices: articles.relatedServices })
    .from(articles)
    .where(and(isVisible(), ne(articles.id, article.id)))
    .orderBy(desc(articles.publishedAt))
    .limit(24);
  const own = new Set(article.relatedServices);
  return candidates
    .map((c, index) => ({ c, score: c.relatedServices.filter((s) => own.has(s)).length, index }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit)
    .map(({ c }) => {
      const { relatedServices: _ignored, ...card } = c;
      return card;
    });
}

export async function getPublishedSlugs(): Promise<{ slug: string; updatedAt: Date; publishedAt: Date | null }[]> {
  const db = await getDb();
  return db.select({ slug: articles.slug, updatedAt: articles.updatedAt, publishedAt: articles.publishedAt })
    .from(articles).where(isVisible()).orderBy(desc(articles.publishedAt));
}

// ─── Админка ─────────────────────────────────────────────────────────────

export interface AdminListItem {
  id: number;
  title: string;
  slug: string;
  status: ArticleStatus;
  publishedAt: Date | null;
  updatedAt: Date;
  coverImage: Article['coverImage'];
  isFeatured: boolean;
  cardSize: Article['cardSize'];
}

export async function adminListArticles(filter: { q?: string; status?: ArticleStatus | 'scheduled' }): Promise<AdminListItem[]> {
  const db = await getDb();
  const conditions = [];
  if (filter.q) {
    const like = `%${filter.q.replace(/[%_\\]/g, (c) => `\\${c}`)}%`;
    conditions.push(or(ilike(articles.title, like), ilike(articles.slug, like)));
  }
  if (filter.status === 'draft') conditions.push(eq(articles.status, 'draft'));
  if (filter.status === 'published') conditions.push(isVisible());
  if (filter.status === 'scheduled') conditions.push(and(eq(articles.status, 'published'), sql`${articles.publishedAt} > now()`));

  return db.select({
    id: articles.id,
    title: articles.title,
    slug: articles.slug,
    status: articles.status,
    publishedAt: articles.publishedAt,
    updatedAt: articles.updatedAt,
    coverImage: articles.coverImage,
    isFeatured: articles.isFeatured,
    cardSize: articles.cardSize,
  }).from(articles)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(articles.updatedAt));
}

export async function adminGetArticle(id: number): Promise<Article | null> {
  const db = await getDb();
  const [row] = await db.select().from(articles).where(eq(articles.id, id)).limit(1);
  return row ?? null;
}

export class SlugTakenError extends Error {}

async function ensureSlugFree(slug: string, exceptId?: number) {
  const db = await getDb();
  const [taken] = await db.select({ id: articles.id }).from(articles)
    .where(exceptId ? and(eq(articles.slug, slug), ne(articles.id, exceptId)) : eq(articles.slug, slug)).limit(1);
  const [historic] = await db.select({ articleId: articleSlugHistory.articleId }).from(articleSlugHistory)
    .where(eq(articleSlugHistory.slug, slug)).limit(1);
  if (taken || (historic && historic.articleId !== exceptId)) throw new SlugTakenError(`Адрес «${slug}» уже занят`);
}

function toRow(input: ArticleInput) {
  return {
    ...input,
    readingTime: computeReadingTime(input.content),
  };
}

export async function adminCreateArticle(input: ArticleInput, status: ArticleStatus): Promise<Article> {
  const db = await getDb();
  await ensureSlugFree(input.slug);
  const publishedAt = status === 'published' ? input.publishedAt ?? new Date() : input.publishedAt;
  const [row] = await db.insert(articles).values({ ...toRow(input), status, publishedAt }).returning();
  return row;
}

export async function adminUpdateArticle(id: number, input: ArticleInput, status: ArticleStatus): Promise<{ article: Article; previousSlug: string }> {
  const db = await getDb();
  const current = await adminGetArticle(id);
  if (!current) throw new Error('Статья не найдена');
  await ensureSlugFree(input.slug, id);

  const publishedAt = status === 'published' ? input.publishedAt ?? current.publishedAt ?? new Date() : input.publishedAt;
  const [row] = await db.update(articles)
    .set({ ...toRow(input), status, publishedAt, updatedAt: new Date() })
    .where(eq(articles.id, id)).returning();

  // Старый адрес опубликованной статьи сохраняем для 301; если вернули прежний slug — убираем его из истории
  if (current.slug !== input.slug && current.status === 'published') {
    await db.insert(articleSlugHistory).values({ slug: current.slug, articleId: id }).onConflictDoNothing();
  }
  await db.delete(articleSlugHistory).where(eq(articleSlugHistory.slug, input.slug));
  return { article: row, previousSlug: current.slug };
}

export async function adminSetStatus(id: number, status: ArticleStatus): Promise<Article> {
  const db = await getDb();
  const current = await adminGetArticle(id);
  if (!current) throw new Error('Статья не найдена');
  const [row] = await db.update(articles).set({
    status,
    publishedAt: status === 'published' ? current.publishedAt ?? new Date() : current.publishedAt,
    updatedAt: new Date(),
  }).where(eq(articles.id, id)).returning();
  return row;
}

export async function adminDeleteArticle(id: number): Promise<Article | null> {
  const db = await getDb();
  const [row] = await db.delete(articles).where(eq(articles.id, id)).returning();
  return row ?? null;
}

export async function adminDuplicateArticle(id: number): Promise<Article> {
  const db = await getDb();
  const source = await adminGetArticle(id);
  if (!source) throw new Error('Статья не найдена');
  let slug = `${source.slug}-kopiya`;
  for (let i = 2; ; i++) {
    const [taken] = await db.select({ id: articles.id }).from(articles).where(eq(articles.slug, slug)).limit(1);
    if (!taken) break;
    slug = `${source.slug}-kopiya-${i}`;
  }
  const { id: _id, createdAt: _c, updatedAt: _u, ...rest } = source;
  const [row] = await db.insert(articles).values({
    ...rest,
    title: `${source.title} (копия)`,
    slug,
    status: 'draft',
    publishedAt: null,
    isFeatured: false,
  }).returning();
  return row;
}

export async function adminCreateMedia(data: typeof media.$inferInsert) {
  const db = await getDb();
  const [row] = await db.insert(media).values(data).returning();
  return row;
}

export async function adminListMedia(limit = 60) {
  const db = await getDb();
  return db.select().from(media).orderBy(desc(media.createdAt)).limit(limit);
}
