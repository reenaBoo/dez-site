'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import ArticleView from '@/components/news/ArticleView';
import { PREVIEW_KEY } from './editor/ArticleEditor';
import { collectToc, computeReadingTime, sanitizeDoc } from '@/lib/news/content';
import type { Article, ArticleCard, Section } from '@/lib/news/types';

const Ribbon = styled.div`
  position: fixed;
  left: 50%;
  bottom: 16px;
  transform: translateX(-50%);
  z-index: 1200;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.55rem 0.9rem;
  border: 1px solid rgba(217, 177, 95, 0.6);
  border-radius: 999px;
  background: rgba(10, 10, 12, 0.92);
  backdrop-filter: blur(8px);
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.6875rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ theme }) => theme.shadows.glow};

  a { color: ${({ theme }) => theme.colors.heading}; text-decoration: underline; }
`;

// Несохранённая версия из редактора (localStorage) поверх сохранённой в БД
function mergeDraft(article: Article, raw: string | null): Article {
  if (!raw) return article;
  try {
    const draft = JSON.parse(raw) as Partial<Article> & { publishedAt?: string | null; content?: Section[] };
    const content = (draft.content ?? article.content).map((s) =>
      s.type === 'text' || s.type === 'textImage' ? { ...s, doc: sanitizeDoc(s.doc) } : s);
    return {
      ...article,
      ...draft,
      content,
      publishedAt: draft.publishedAt ? new Date(draft.publishedAt) : article.publishedAt ?? new Date(),
      readingTime: computeReadingTime(content),
      updatedAt: article.updatedAt,
    } as Article;
  } catch {
    return article;
  }
}

export default function PreviewClient({ article, related }: { article: Article; related: ArticleCard[] }) {
  const [current, setCurrent] = useState<Article>({ ...article, publishedAt: article.publishedAt ?? new Date(article.updatedAt) });

  useEffect(() => {
    let raw: string | null = null;
    try { raw = localStorage.getItem(PREVIEW_KEY(article.id)); } catch { /* недоступно */ }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- черновик есть только в localStorage браузера
    if (raw) setCurrent(mergeDraft(article, raw));
  }, [article]);

  const crumbs = [
    { name: 'Главная', path: '/' },
    { name: 'Новости', path: '/news' },
    { name: current.title, path: `/admin/preview/${article.id}` },
  ];

  return (
    <>
      <ArticleView article={current} related={related} crumbs={crumbs} toc={collectToc(current.content)}/>
      <Ribbon>
        Предпросмотр · {article.status === 'published' ? 'опубликована' : 'черновик'}
        <Link href={`/admin/articles/${article.id}`}>к редактору</Link>
      </Ribbon>
    </>
  );
}
