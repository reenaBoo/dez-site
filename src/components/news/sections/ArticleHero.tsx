'use client';

import { ViewTransition } from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import Container from '@/components/layout/Container';
import Breadcrumbs from '@/components/news/Breadcrumbs';
import MediaImage from '@/components/news/MediaImage';
import { Kicker } from '@/components/news/ui';
import type { Crumb } from '@/lib/seo/jsonld';
import type { HeroSection, MediaRef } from '@/lib/news/types';
import { formatDate, isoDate, readingTimeLabel } from '@/lib/news/format';

const Root = styled.header<{ $variant: HeroSection['variant'] }>`
  position: relative;
  padding-top: 120px;

  ${({ $variant }) => $variant === 'fullscreen' && css`
    min-height: min(100svh, 980px);
    display: flex;
    align-items: flex-end;
    padding-top: 0;
  `}
`;

const FullBg = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgba(10, 10, 12, 0.55) 0%, rgba(10, 10, 12, 0.2) 35%, rgba(10, 10, 12, 0.92) 85%, #0A0A0C 100%),
      linear-gradient(90deg, rgba(10, 10, 12, 0.6) 0%, transparent 60%);
  }
`;

const Inner = styled.div<{ $variant: HeroSection['variant'] }>`
  position: relative;
  z-index: 1;
  width: 100%;

  ${({ $variant }) => $variant === 'fullscreen' && css`padding: 160px 0 4.5rem;`}
`;

const Split = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: ${({ theme }) => theme.spacing.xxl};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

const Title = styled.h1<{ $large?: boolean }>`
  margin: ${({ theme }) => theme.spacing.lg} 0 ${({ theme }) => theme.spacing.lg};
  font-size: ${({ $large }) => ($large ? 'clamp(2.4rem, 6vw, 4.8rem)' : 'clamp(2.1rem, 4.6vw, 3.8rem)')};
  font-weight: ${({ theme }) => theme.fontWeight.extrabold};
  line-height: 1.05;
  max-width: 18ch;
  text-wrap: balance;
`;

const Subtitle = styled.p`
  max-width: 640px;
  font-size: ${({ theme }) => theme.fontSize.lg};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.base};
  }
`;

const Frame = styled.div<{ $tall?: boolean }>`
  position: relative;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  aspect-ratio: ${({ $tall }) => ($tall ? '4 / 5' : '16 / 8')};
  background: ${({ theme }) => theme.colors.navy};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 0 1px rgba(217, 177, 95, 0.12);
    pointer-events: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    aspect-ratio: 4 / 3;
  }
`;

const WideImage = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const Meta = styled(Kicker)`
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

interface ArticleHeroProps {
  section: HeroSection;
  title: string;
  slug: string;
  fallbackImage: MediaRef | null;
  publishedAt: Date | null;
  updatedAt: Date;
  readingTime: number;
  crumbs: Crumb[];
}

export default function ArticleHero({ section, title, slug, fallbackImage, publishedAt, readingTime, crumbs }: ArticleHeroProps) {
  const image = section.image ?? fallbackImage;
  const variant = image ? section.variant : 'title-image';

  // При прямом заходе — входная анимация; при переходе из сетки поверх неё играет morph
  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  const picture = image && (
    <ViewTransition name={`news-cover-${slug}`} share='news-morph' default='none'>
      <MediaImage media={image} priority sizes={variant === 'split' ? '(max-width: 1024px) 100vw, 560px' : '100vw'}/>
    </ViewTransition>
  );

  const heading = (
    <ViewTransition name={`news-title-${slug}`} share='news-morph-title' default='none'>
      <Title $large={variant === 'fullscreen'}>{title}</Title>
    </ViewTransition>
  );

  const text = (
    <>
      <motion.div {...enter(0)}>
        <Breadcrumbs items={crumbs}/>
      </motion.div>
      {heading}
      <motion.div {...enter(0.12)}>
        {section.subtitle && <Subtitle>{section.subtitle}</Subtitle>}
        <Meta as='p'>
          <span>Статья</span>
          {publishedAt && <time dateTime={isoDate(publishedAt)}>{formatDate(publishedAt)}</time>}
          <span>{readingTimeLabel(readingTime)}</span>
        </Meta>
      </motion.div>
    </>
  );

  if (variant === 'fullscreen' && image) {
    return (
      <Root $variant='fullscreen'>
        <FullBg>{picture}</FullBg>
        <Inner $variant='fullscreen'>
          <Container>{text}</Container>
        </Inner>
      </Root>
    );
  }

  if (variant === 'split' && image) {
    return (
      <Root $variant='split'>
        <Container>
          <Split>
            <div>{text}</div>
            <motion.div {...enter(0.05)}>
              <Frame $tall>{picture}</Frame>
            </motion.div>
          </Split>
        </Container>
      </Root>
    );
  }

  return (
    <Root $variant='title-image'>
      <Container>
        {text}
        {image && (
          <WideImage>
            <Frame>{picture}</Frame>
          </WideImage>
        )}
      </Container>
    </Root>
  );
}
