'use client';

import { ViewTransition, useLayoutEffect, useMemo, useState, useTransition } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
import Container from '@/components/layout/Container';
import Breadcrumbs from './Breadcrumbs';
import NewsCard from './NewsCard';
import { consumeScrollRestore, hasScrollRestore } from './navigation';
import { NEWS_PER_PAGE, type ArticleCard } from '@/lib/news/types';
import { effectiveSizes, layoutBento, type Placement } from '@/lib/news/bento';
import type { Crumb } from '@/lib/seo/jsonld';

const Page = styled.div`
  padding: 130px 0 ${({ theme }) => theme.spacing.xxxl};
`;

const Head = styled.header`
  margin: ${({ theme }) => theme.spacing.xl} 0 ${({ theme }) => theme.spacing.xxl};
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.8fr);
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: end;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

const Label = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h1`
  font-size: clamp(2rem, 4.2vw, 3.4rem);
  font-weight: ${({ theme }) => theme.fontWeight.extrabold};

  span { color: ${({ theme }) => theme.colors.primary}; }
`;

const Intro = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSize.lg};
  line-height: 1.7;

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.base};
  }
`;

// Позиции карточек заданы явно для 4 и 2 колонок; на телефоне — обычный поток
const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-auto-rows: 188px;

  > * {
    grid-column: var(--c4);
    grid-row: var(--r4);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-auto-rows: 180px;

    > * {
      grid-column: var(--c2);
      grid-row: var(--r2);
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;

    > * {
      grid-column: auto;
      grid-row: auto;
    }
  }
`;

const Empty = styled.p`
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.textLight};
`;

const Footer = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const MoreButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: 0.95rem 1.8rem;
  border: 1px solid rgba(217, 177, 95, 0.5);
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 0.2em;
  text-transform: uppercase;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover:not(:disabled), &:focus-visible {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }

  &:focus-visible { outline: 2px solid ${({ theme }) => theme.colors.primaryLight}; outline-offset: 3px; }
  &:disabled { opacity: 0.5; cursor: progress; }
`;

const Pages = styled.ol`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;
  list-style: none;

  a, span {
    display: grid;
    place-items: center;
    min-width: 40px;
    height: 40px;
    padding: 0 10px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.text};
    transition: all ${({ theme }) => theme.transitions.fast};
  }

  a:hover, a:focus-visible {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }

  [aria-current='page'] {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
    background: ${({ theme }) => theme.colors.primary};
  }
`;

export const pageHref = (page: number) => (page <= 1 ? '/news' : `/news/page/${page}`);

interface NewsGridProps {
  initialItems: ArticleCard[];
  page: number;
  totalPages: number;
  crumbs: Crumb[];
}

function placementVars(p4: Placement, p2: Placement) {
  return {
    '--c4': `${p4.col} / span ${p4.colSpan}`,
    '--r4': `${p4.row} / span ${p4.rowSpan}`,
    '--c2': `${p2.col} / span ${p2.colSpan}`,
    '--r2': `${p2.row} / span ${p2.rowSpan}`,
  } as React.CSSProperties;
}

export default function NewsGrid({ initialItems, page, totalPages, crumbs }: NewsGridProps) {
  const [items, setItems] = useState(initialItems);
  const [loadedUntil, setLoadedUntil] = useState(page);
  const [pending, startTransition] = useTransition();
  const [returning] = useState(hasScrollRestore);

  // Возврат из статьи: восстанавливаем скролл до отрисовки, чтобы морф попал в карточку
  useLayoutEffect(() => {
    const y = consumeScrollRestore();
    if (y !== null) window.scrollTo({ top: y, behavior: 'instant' });
  }, []);

  const sizes = useMemo(() => effectiveSizes(items, page === 1), [items, page]);
  const layout4 = useMemo(() => layoutBento(sizes, 4), [sizes]);
  const layout2 = useMemo(() => layoutBento(sizes, 2), [sizes]);

  // «Показать ещё» подгружает следующую страницу без перехода; ссылки пагинации ниже
  // остаются настоящими — поисковики ходят по ним
  const loadMore = () => {
    const next = loadedUntil + 1;
    startTransition(async () => {
      const res = await fetch(`/news/feed?page=${next}`);
      if (!res.ok) return;
      const data: { items: ArticleCard[] } = await res.json();
      const revived = data.items.map((item) => ({ ...item, publishedAt: item.publishedAt ? new Date(item.publishedAt) : null }));
      setItems((prev) => [...prev, ...revived.filter((n) => !prev.some((p) => p.id === n.id))]);
      setLoadedUntil(next);
    });
  };

  return (
    <ViewTransition
      enter={{ 'news-back': 'news-grid-enter', default: 'none' }}
      exit={{ 'news-open': 'news-grid-exit', default: 'none' }}
      default='none'
    >
      <Page>
        <Container>
          <Breadcrumbs items={crumbs}/>
          <Head>
            <div>
              <Label>{page > 1 ? `Новости · страница ${page}` : 'Новости и статьи'}</Label>
              <Title>Полезное о <span>пест‑контроле</span></Title>
            </div>
            <Intro>
              <p>
                Статьи о дезинсекции, дератизации и дезинфекции для ресторанов, складов, офисов и производств
                в Москве и Московской области: требования проверок, признаки вредителей и новости компании.
                Нужна обработка — <Link href='/contacts'>вызовите специалиста</Link>.
              </p>
            </Intro>
          </Head>

          {items.length === 0 ? (
            <Empty>Статей пока нет — загляните позже.</Empty>
          ) : (
            <Grid>
              {items.map((card, i) => (
                <motion.div
                  key={card.id}
                  style={placementVars(layout4[i], layout2[i])}
                  layout='position'
                  // Первые карточки — сразу видимые (LCP), остальные появляются при прокрутке
                  initial={returning || i < 2 ? false : { opacity: 0, y: 32, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: (i % 6) * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NewsCard card={card} size={sizes[i]} index={(page - 1) * NEWS_PER_PAGE + i} priority={i < 2} headingLevel='h2'/>
                </motion.div>
              ))}
            </Grid>
          )}

          {totalPages > 1 && (
            <Footer aria-label='Страницы новостей'>
              {loadedUntil < totalPages && (
                <MoreButton type='button' onClick={loadMore} disabled={pending}>
                  {pending ? 'Загружаем…' : 'Показать ещё'} <ArrowDown size={14}/>
                </MoreButton>
              )}
              <Pages>
                {page > 1 && (
                  <li><Link href={pageHref(page - 1)} rel='prev' aria-label='Предыдущая страница'><ChevronLeft size={16}/></Link></li>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <li key={n}>
                    {n === page
                      ? <span aria-current='page'>{n}</span>
                      : <Link href={pageHref(n)}>{n}</Link>}
                  </li>
                ))}
                {page < totalPages && (
                  <li><Link href={pageHref(page + 1)} rel='next' aria-label='Следующая страница'><ChevronRight size={16}/></Link></li>
                )}
              </Pages>
            </Footer>
          )}
        </Container>
      </Page>
    </ViewTransition>
  );
}
