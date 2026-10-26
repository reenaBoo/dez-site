'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { checkCredentials, endSession, isRateLimited, requireAdmin, startSession } from '@/lib/auth/server';
import {
  SlugTakenError, adminCreateArticle, adminDeleteArticle, adminDuplicateArticle, adminGetArticle,
  adminSetStatus, adminUpdateArticle,
} from '@/lib/news/repo';
import { articleInputSchema } from '@/lib/news/validation';
import { onArticleChanged } from '@/lib/news/publish';
import { createSection } from '@/lib/news/sections';
import { slugify } from '@/lib/news/slug';
import type { Article, ArticleStatus } from '@/lib/news/types';

// ─── Вход ────────────────────────────────────────────────────────────────

export interface LoginState {
  error?: string;
}

const loginSchema = z.object({
  login: z.string().trim().min(1).max(100),
  password: z.string().min(1).max(200),
  next: z.string().optional(),
});

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (await isRateLimited()) return { error: 'Слишком много попыток. Попробуйте через 15 минут.' };

  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: 'Введите логин и пароль' };

  const ok = await checkCredentials(parsed.data.login, parsed.data.password);
  if (!ok) return { error: 'Неверный логин или пароль' };

  await startSession(parsed.data.login);
  // Возвращаем только на страницы админки — без открытого редиректа
  const next = parsed.data.next && /^\/admin(\/[\w\-/]*)?$/.test(parsed.data.next) ? parsed.data.next : '/admin';
  redirect(next);
}

export async function logoutAction() {
  await endSession();
  redirect('/admin/login');
}

// ─── Статьи ──────────────────────────────────────────────────────────────

export type SaveResult =
  | { ok: true; article: Article }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

function zodFieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join('.');
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

export async function createArticleAction() {
  await requireAdmin();
  const stamp = new Date().toISOString().slice(0, 16).replace(/[-T:]/g, '');
  const article = await adminCreateArticle({
    title: 'Новая статья',
    slug: `novaya-statya-${stamp}`,
    excerpt: '',
    coverImage: null,
    cardSize: 'm',
    content: [createSection('hero'), createSection('text'), createSection('cta')],
    accentColor: null,
    showAtmosphere: true,
    publishedAt: null,
    isFeatured: false,
    seoTitle: null,
    seoDescription: null,
    relatedServices: [],
  }, 'draft');
  redirect(`/admin/articles/${article.id}`);
}

export async function saveArticleAction(id: number, input: unknown, status: ArticleStatus): Promise<SaveResult> {
  await requireAdmin();
  const parsed = articleInputSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: 'Проверьте поля, отмеченные красным', fieldErrors: zodFieldErrors(parsed.error) };
  }
  try {
    const { article, previousSlug } = await adminUpdateArticle(id, parsed.data, status);
    if (status === 'published' || previousSlug !== article.slug) onArticleChanged([article.slug, previousSlug]);
    else onArticleChanged([]);
    return { ok: true, article };
  } catch (error) {
    if (error instanceof SlugTakenError) return { ok: false, error: error.message, fieldErrors: { slug: error.message } };
    console.error('[admin] save failed', error);
    return { ok: false, error: 'Не удалось сохранить статью' };
  }
}

export async function setStatusAction(id: number, status: ArticleStatus) {
  await requireAdmin();
  const article = await adminSetStatus(id, status);
  onArticleChanged([article.slug]);
  return article;
}

export async function deleteArticleAction(id: number) {
  await requireAdmin();
  const article = await adminDeleteArticle(id);
  if (article) onArticleChanged([article.slug]);
}

export async function duplicateArticleAction(id: number) {
  await requireAdmin();
  const copy = await adminDuplicateArticle(id);
  redirect(`/admin/articles/${copy.id}`);
}

// Подсказка slug по заголовку — с проверкой занятости делается при сохранении
export async function suggestSlugAction(title: string) {
  await requireAdmin();
  return slugify(title);
}

export async function getArticleAction(id: number) {
  await requireAdmin();
  return adminGetArticle(id);
}
