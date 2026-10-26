'use client';

import { ViewTransition, useRef, type MouseEvent } from 'react';
import Link from 'next/link';
import styled, { css } from 'styled-components';
import { ArrowUpRight } from 'lucide-react';
import MediaImage from './MediaImage';
import { Kicker, sweep, sweepHover } from './ui';
import type { ArticleCard, CardSize } from '@/lib/news/types';
import { formatDate, isoDate, readingTimeLabel } from '@/lib/news/format';
import { rememberGridPosition } from './navigation';

// Крупные карточки — текст поверх обложки, остальные — обложка сверху
const overlay = (size: CardSize) => size === 'l' || size === 'tall' || size === 'wide';

const Card = styled.article<{ $size: CardSize; $accent: string | null }>`
  --accent: ${({ $accent, theme }) => $accent ?? theme.colors.primary};
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: ${({ $size }) => (overlay($size) ? '420px' : $size === 's' ? '300px' : '360px')};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background:
    linear-gradient(165deg, rgba(217, 177, 95, 0.04) 0%, transparent 36%),
    ${({ theme }) => theme.colors.navy};
  transition: border-color ${({ theme }) => theme.transitions.normal}, box-shadow ${({ theme }) => theme.transitions.normal};
  isolation: isolate;

  &::before {
    content: attr(data-index);
    position: absolute;
    top: ${({ theme }) => theme.spacing.md};
    right: ${({ theme }) => theme.spacing.lg};
    z-index: 3;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 2.6rem;
    font-weight: 600;
    line-height: 1;
    color: rgba(243, 239, 228, 0.09);
    pointer-events: none;
  }

  ${sweepHover}

  &:hover, &:focus-within {
    border-color: color-mix(in srgb, var(--accent) 60%, transparent);
    box-shadow: 0 0 24px color-mix(in srgb, var(--accent) 35%, transparent);
  }

  &:hover::after {
    animation: ${sweep} 1.1s ease-out;
  }
`;

const CardLink = styled(Link)`
  position: absolute;
  inset: 0;
  z-index: 4;
  border-radius: inherit;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primaryLight};
    outline-offset: 3px;
  }
`;

const Cover = styled.div<{ $size: CardSize }>`
  position: ${({ $size }) => (overlay($size) ? 'absolute' : 'relative')};
  inset: ${({ $size }) => (overlay($size) ? 0 : 'auto')};
  /* Обычные карточки: обложка забирает всё место, оставшееся после текста */
  flex: 1 1 auto;
  min-height: ${({ $size }) => ($size === 's' ? '120px' : '150px')};
  overflow: hidden;
  z-index: 0;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.02) translate3d(var(--px, 0), var(--py, 0), 0);
    transition: transform 1.1s cubic-bezier(0.22, 1, 0.36, 1);
  }

  ${({ $size }) => overlay($size) && css`
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(10, 10, 12, 0.15) 0%, rgba(10, 10, 12, 0.35) 40%, rgba(10, 10, 12, 0.94) 100%);
    }
  `}

  ${Card}:hover & img {
    transform: scale(1.08) translate3d(var(--px, 0), var(--py, 0), 0);
  }

  @media (prefers-reduced-motion: reduce) {
    img, ${Card}:hover & img { transform: none; }
  }
`;

const Body = styled.div<{ $size: CardSize }>`
  position: ${({ $size }) => (overlay($size) ? 'absolute' : 'relative')};
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme, $size }) => ($size === 's' ? theme.spacing.lg : theme.spacing.xl)};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const Title = styled.h3<{ $size: CardSize }>`
  font-size: ${({ $size }) => ($size === 'l' ? 'clamp(1.6rem, 2.8vw, 2.4rem)' : $size === 's' ? '1.15rem' : 'clamp(1.25rem, 1.8vw, 1.55rem)')};
  font-weight: ${({ theme }) => theme.fontWeight.extrabold};
  line-height: 1.2;
  text-wrap: balance;
  transition: color ${({ theme }) => theme.transitions.fast};
  display: -webkit-box;
  -webkit-line-clamp: ${({ $size }) => ($size === 'l' ? 5 : 4)};
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-shrink: 0;

  ${Card}:hover & {
    color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

// Анонс у крупных карточек появляется при наведении (на тач-устройствах — всегда)
const Excerpt = styled.p<{ $size: CardSize }>`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: 1.65;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${({ $size }) => overlay($size) && css`
    @media (hover: hover) {
      max-height: 0;
      opacity: 0;
      transform: translateY(8px);
      transition: max-height 0.45s ease, opacity 0.35s ease, transform 0.45s ease;

      ${Card}:hover &, ${Card}:focus-within & {
        max-height: 6em;
        opacity: 1;
        transform: none;
      }
    }
  `}

  ${({ $size }) => !overlay($size) && css`-webkit-line-clamp: 2;`}
`;

const More = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.6875rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);

  svg { transition: transform ${({ theme }) => theme.transitions.normal}; }
  ${Card}:hover & svg { transform: translate(2px, -2px); }
`;

const COVER_SIZES: Record<CardSize, string> = {
  s: '(max-width: 768px) 100vw, 400px',
  m: '(max-width: 768px) 100vw, 400px',
  l: '(max-width: 768px) 100vw, 800px',
  wide: '(max-width: 768px) 100vw, 800px',
  tall: '(max-width: 768px) 100vw, 400px',
};

interface NewsCardProps {
  card: ArticleCard;
  size: CardSize;
  index: number;
  priority?: boolean;
  headingLevel?: 'h2' | 'h3';
}

export default function NewsCard({ card, size, index, priority, headingLevel = 'h3' }: NewsCardProps) {
  const ref = useRef<HTMLElement>(null);

  // Лёгкий параллакс обложки за курсором
  const onMouseMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--px', `${((e.clientX - rect.left) / rect.width - 0.5) * -10}px`);
    el.style.setProperty('--py', `${((e.clientY - rect.top) / rect.height - 0.5) * -10}px`);
  };
  const onMouseLeave = () => {
    ref.current?.style.removeProperty('--px');
    ref.current?.style.removeProperty('--py');
  };

  const href = `/news/${card.slug}`;

  return (
    <Card
      ref={ref}
      $size={size}
      $accent={card.accentColor}
      data-index={String(index + 1).padStart(2, '0')}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {card.coverImage && (
        <Cover $size={size}>
          <ViewTransition name={`news-cover-${card.slug}`} share='news-morph' default='none'>
            <MediaImage media={card.coverImage} sizes={COVER_SIZES[size]} priority={priority}/>
          </ViewTransition>
        </Cover>
      )}
      <Body $size={size}>
        <Kicker as='p'>
          {card.publishedAt && <time dateTime={isoDate(card.publishedAt)}>{formatDate(card.publishedAt)}</time>}
          <span>{readingTimeLabel(card.readingTime)}</span>
        </Kicker>
        <ViewTransition name={`news-title-${card.slug}`} share='news-morph-title' default='none'>
          <Title as={headingLevel} $size={size}>{card.title}</Title>
        </ViewTransition>
        {card.excerpt && size !== 's' && <Excerpt $size={size}>{card.excerpt}</Excerpt>}
        <More aria-hidden>Читать <ArrowUpRight size={14}/></More>
      </Body>
      <CardLink
        href={href}
        aria-label={card.title}
        transitionTypes={['news-open']}
        onClick={() => rememberGridPosition()}
      />
    </Card>
  );
}
