'use client';

import { useCallback, useId, useState, type KeyboardEvent } from 'react';
import styled from 'styled-components';
import { motion, useReducedMotion, type PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MediaImage from '@/components/news/MediaImage';
import SectionShell from './SectionShell';
import type { GallerySection } from '@/lib/news/types';

const Root = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};

  &:focus-visible {
    outline: none;

    .viewport {
      outline: 2px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 4px;
    }
  }
`;

const Viewport = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.navy};
  aspect-ratio: 16 / 9;
  touch-action: pan-y;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    aspect-ratio: 4 / 3;
  }
`;

const Track = styled(motion.div)`
  display: flex;
  height: 100%;
  cursor: grab;

  &:active { cursor: grabbing; }
`;

const Slide = styled.figure`
  position: relative;
  flex: 0 0 100%;
  height: 100%;
  margin: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
    user-select: none;
  }
`;

const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const CaptionText = styled.p`
  flex: 1;
  min-height: 1.6em;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.textLight};

  b {
    color: var(--accent, ${({ theme }) => theme.colors.primary});
    font-weight: 500;
    margin-right: 0.8em;
  }
`;

const Controls = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Arrow = styled.button`
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid rgba(217, 177, 95, 0.4);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled), &:focus-visible {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }

  &:focus-visible { outline: 2px solid ${({ theme }) => theme.colors.primaryLight}; outline-offset: 2px; }
  &:disabled { opacity: 0.3; cursor: default; }
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: ${({ theme }) => theme.spacing.md};

  button {
    width: 22px;
    height: 3px;
    padding: 0;
    border-radius: 2px;
    background: ${({ theme }) => theme.colors.navyLight};
    transition: background ${({ theme }) => theme.transitions.fast};

    &[aria-current='true'] { background: var(--accent, ${({ theme }) => theme.colors.primary}); }
    &:focus-visible { outline: 2px solid ${({ theme }) => theme.colors.primaryLight}; outline-offset: 3px; }
  }
`;

export default function GalleryBlock({ section }: { section: GallerySection }) {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const labelId = useId();
  const count = section.items.length;

  const go = useCallback((next: number) => setIndex(Math.max(0, Math.min(count - 1, next))), [count]);

  if (!count) return null;

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 60;
    if (info.offset.x < -threshold || info.velocity.x < -400) go(index + 1);
    else if (info.offset.x > threshold || info.velocity.x > 400) go(index - 1);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1); }
    if (e.key === 'Home') { e.preventDefault(); go(0); }
    if (e.key === 'End') { e.preventDefault(); go(count - 1); }
  };

  const current = section.items[index];

  return (
    <SectionShell settings={section.settings}>
      <Root
        role='region'
        aria-roledescription='карусель'
        aria-labelledby={labelId}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <span id={labelId} hidden>Галерея, {count} фото. Листайте стрелками</span>
        <Viewport className='viewport'>
          <Track
            drag={count > 1 ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={onDragEnd}
            animate={{ x: `${-index * 100}%` }}
            transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 32 }}
          >
            {section.items.map((item, i) => (
              <Slide
                key={item.id}
                role='group'
                aria-roledescription='слайд'
                aria-label={`${i + 1} из ${count}`}
                aria-hidden={i !== index}
              >
                <MediaImage media={item.image} sizes='(max-width: 1240px) 100vw, 1200px' priority={false}/>
              </Slide>
            ))}
          </Track>
        </Viewport>

        <Bar>
          <CaptionText aria-live='polite'>
            <b>{String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</b>
            {current.caption}
          </CaptionText>
          {count > 1 && (
            <Controls>
              <Arrow type='button' onClick={() => go(index - 1)} disabled={index === 0} aria-label='Предыдущее фото'>
                <ChevronLeft size={20}/>
              </Arrow>
              <Arrow type='button' onClick={() => go(index + 1)} disabled={index === count - 1} aria-label='Следующее фото'>
                <ChevronRight size={20}/>
              </Arrow>
            </Controls>
          )}
        </Bar>

        {count > 1 && (
          <Dots>
            {section.items.map((item, i) => (
              <button key={item.id} type='button' aria-label={`Фото ${i + 1}`} aria-current={i === index} onClick={() => go(i)}/>
            ))}
          </Dots>
        )}
      </Root>
    </SectionShell>
  );
}
