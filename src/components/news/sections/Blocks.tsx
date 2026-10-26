'use client';

import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { Quote as QuoteIcon } from 'lucide-react';
import MediaImage from '@/components/news/MediaImage';
import RichText from '@/components/news/RichText';
import { Caption } from '@/components/news/ui';
import SectionShell, { Column } from './SectionShell';
import type {
  DividerSection, ImageGridSection, ImageSection, QuoteSection, TextImageSection, TextSection,
} from '@/lib/news/types';

// ─── Текст ───────────────────────────────────────────────────────────────

export function TextBlock({ section, h2Offset }: { section: TextSection; h2Offset: number }) {
  return (
    <SectionShell settings={section.settings}>
      <Column $width={section.width}>
        <RichText doc={section.doc} h2Offset={h2Offset}/>
      </Column>
    </SectionShell>
  );
}

// ─── Изображение ─────────────────────────────────────────────────────────

const Figure = styled.figure<{ $layout: ImageSection['layout'] }>`
  margin: 0 auto;
  width: 100%;
  max-width: ${({ $layout }) => ($layout === 'column' ? '760px' : $layout === 'wide' ? '1200px' : 'none')};
  padding: 0 ${({ theme, $layout }) => ($layout === 'full' ? 0 : theme.spacing.lg)};

  .frame {
    position: relative;
    overflow: hidden;
    border-radius: ${({ theme, $layout }) => ($layout === 'full' ? 0 : theme.borderRadius.lg)};
    border: ${({ theme, $layout }) => ($layout === 'full' ? 'none' : `1px solid ${theme.colors.border}`)};
    background: ${({ theme }) => theme.colors.navy};
  }

  img {
    width: 100%;
    height: auto;
    ${({ $layout }) => $layout === 'full' && css`
      max-height: 86vh;
      object-fit: cover;
    `}
  }

  figcaption {
    padding: 0 ${({ theme, $layout }) => ($layout === 'full' ? theme.spacing.lg : 0)};
    max-width: ${({ $layout }) => ($layout === 'full' ? '1200px' : 'none')};
    margin-left: auto;
    margin-right: auto;
  }
`;

function ZoomIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className='frame'
      initial={{ opacity: 0, scale: 1.04 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const IMAGE_SIZES: Record<ImageSection['layout'], string> = {
  column: '(max-width: 800px) 100vw, 760px',
  wide: '(max-width: 1240px) 100vw, 1200px',
  full: '100vw',
};

export function ImageBlock({ section }: { section: ImageSection }) {
  if (!section.image) return null;
  return (
    <SectionShell settings={section.settings}>
      <Figure $layout={section.layout}>
        <ZoomIn>
          <MediaImage media={section.image} sizes={IMAGE_SIZES[section.layout]}/>
        </ZoomIn>
        {section.caption && <Caption>{section.caption}</Caption>}
      </Figure>
    </SectionShell>
  );
}

// ─── Текст + изображение ─────────────────────────────────────────────────

const TwoCols = styled.div<{ $side: 'left' | 'right'; $sticky: boolean }>`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(2rem, 5vw, 4.5rem);
  align-items: ${({ $sticky }) => ($sticky ? 'start' : 'center')};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};

  .media {
    order: ${({ $side }) => ($side === 'left' ? -1 : 1)};
    ${({ $sticky }) => $sticky && css`
      position: sticky;
      top: 110px;
    `}
  }

  .media .frame {
    overflow: hidden;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    border: 1px solid ${({ theme }) => theme.colors.border};
  }

  .media img {
    width: 100%;
    height: auto;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;

    .media {
      order: -1;
      position: static;
    }
  }
`;

export function TextImageBlock({ section, h2Offset }: { section: TextImageSection; h2Offset: number }) {
  return (
    <SectionShell settings={section.settings}>
      <TwoCols $side={section.imageSide} $sticky={section.sticky}>
        <RichText doc={section.doc} h2Offset={h2Offset}/>
        {section.image && (
          <figure className='media'>
            <ZoomIn>
              <MediaImage media={section.image} sizes='(max-width: 768px) 100vw, 560px'/>
            </ZoomIn>
          </figure>
        )}
      </TwoCols>
    </SectionShell>
  );
}

// ─── Сетка изображений ───────────────────────────────────────────────────

const Grid = styled.div<{ $layout: ImageGridSection['layout']; $count: number }>`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  grid-template-columns: repeat(${({ $count }) => Math.min($count, 4)}, minmax(0, 1fr));

  ${({ $layout, $count }) => ($layout === 'feature-left' || $layout === 'feature-right') && $count >= 3 && css`
    grid-template-columns: ${$layout === 'feature-left' ? '1.6fr 1fr' : '1fr 1.6fr'};
    grid-template-rows: repeat(${$count - 1}, minmax(0, 1fr));

    > :first-child {
      grid-row: 1 / -1;
      ${$layout === 'feature-right' && 'grid-column: 2;'}
    }
  `}

  ${({ $layout, $count }) => $layout === 'mosaic' && $count >= 3 && css`
    grid-template-columns: repeat(3, minmax(0, 1fr));
    > :first-child { grid-column: span 2; }
    ${$count === 4 && css`> :last-child { grid-column: span 2; }`}
  `}

  figure {
    position: relative;
    overflow: hidden;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    border: 1px solid ${({ theme }) => theme.colors.border};
    min-height: 220px;
    background: ${({ theme }) => theme.colors.navy};
  }

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
  }

  figure:hover img {
    transform: scale(1.04);
  }

  figcaption {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
    padding: 2.5rem 1rem 0.9rem;
    background: linear-gradient(180deg, transparent, rgba(10, 10, 12, 0.88));
    color: ${({ theme }) => theme.colors.heading};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: none;

    > :first-child {
      grid-column: 1 / -1;
      grid-row: auto;
    }

    > * { grid-column: auto; }
  }
`;

export function ImageGridBlock({ section }: { section: ImageGridSection }) {
  if (!section.items.length) return null;
  return (
    <SectionShell settings={section.settings}>
      <Grid $layout={section.layout} $count={section.items.length}>
        {section.items.map((item, i) => (
          <motion.figure
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
          >
            <MediaImage media={item.image} sizes='(max-width: 768px) 100vw, 600px'/>
            {item.caption && <Caption>{item.caption}</Caption>}
          </motion.figure>
        ))}
      </Grid>
    </SectionShell>
  );
}

// ─── Цитата ──────────────────────────────────────────────────────────────

const Blockquote = styled.figure`
  position: relative;
  max-width: 980px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  text-align: center;

  svg {
    color: var(--accent, ${({ theme }) => theme.colors.primary});
    margin: 0 auto ${({ theme }) => theme.spacing.lg};
    opacity: 0.8;
  }

  blockquote {
    font-size: clamp(1.5rem, 3.4vw, 2.5rem);
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    line-height: 1.3;
    letter-spacing: -0.01em;
    color: ${({ theme }) => theme.colors.heading};
    text-wrap: balance;

    &::before { content: '«'; color: var(--accent, ${({ theme }) => theme.colors.primary}); }
    &::after { content: '»'; color: var(--accent, ${({ theme }) => theme.colors.primary}); }
  }

  figcaption {
    margin-top: ${({ theme }) => theme.spacing.lg};
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: ${({ theme }) => theme.fontSize.xs};
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent, ${({ theme }) => theme.colors.primary});
  }
`;

export function QuoteBlock({ section }: { section: QuoteSection }) {
  if (!section.text.trim()) return null;
  return (
    <SectionShell settings={section.settings}>
      <Blockquote>
        <QuoteIcon size={36} aria-hidden/>
        <blockquote>{section.text}</blockquote>
        {section.author && <figcaption>{section.author}</figcaption>}
      </Blockquote>
    </SectionShell>
  );
}

// ─── Разделитель ─────────────────────────────────────────────────────────

const Rule = styled.div<{ $style: DividerSection['style'] }>`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  &::before, &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${({ $style }) => ($style === 'space' ? 'transparent' : 'linear-gradient(90deg, transparent, rgba(217, 177, 95, 0.45), transparent)')};
  }

  span {
    display: ${({ $style }) => ($style === 'ornament' ? 'block' : 'none')};
    width: 9px;
    height: 9px;
    transform: rotate(45deg);
    border: 1px solid var(--accent, ${({ theme }) => theme.colors.primary});
    box-shadow: 0 0 12px rgba(217, 177, 95, 0.5);
  }
`;

export function DividerBlock({ section }: { section: DividerSection }) {
  return (
    <SectionShell settings={section.settings}>
      <Rule $style={section.style} role='separator'><span/></Rule>
    </SectionShell>
  );
}
