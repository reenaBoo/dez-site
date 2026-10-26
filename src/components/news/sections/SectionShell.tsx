'use client';

import type { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { motion, type MotionProps } from 'framer-motion';
import type { SectionSettings } from '@/lib/news/types';

const SPACING = { s: '2rem', m: '4rem', l: '6.5rem' } as const;

const Shell = styled(motion.section)<{ $bg: SectionSettings['background']; $spacing: SectionSettings['spacing'] }>`
  position: relative;
  padding: ${({ $spacing }) => SPACING[$spacing]} 0;

  ${({ $bg, theme }) => $bg === 'alt' && css`background: ${theme.colors.backgroundAlt};`}
  ${({ $bg, theme }) => $bg === 'card' && css`
    background:
      linear-gradient(165deg, rgba(217, 177, 95, 0.05) 0%, transparent 40%),
      ${theme.colors.navy};
    border-top: 1px solid ${theme.colors.border};
    border-bottom: 1px solid ${theme.colors.border};
  `}
  ${({ $bg }) => $bg === 'gold' && css`
    background:
      radial-gradient(60% 120% at 15% 0%, color-mix(in srgb, var(--accent) 16%, transparent) 0%, transparent 70%),
      linear-gradient(180deg, rgba(217, 177, 95, 0.05), rgba(217, 177, 95, 0.015));
    border-top: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
    border-bottom: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
  `}

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ $spacing }) => `calc(${SPACING[$spacing]} * 0.65)`} 0;
  }
`;

// При «уменьшить движение» MotionConfig (Providers) отключает смещения и масштаб —
// остаётся только появление по прозрачности. Ветвить здесь нельзя: разойдётся SSR и гидрация
function animationProps(kind: SectionSettings['animation']): MotionProps {
  if (kind === 'none') return {};
  const viewport = { once: true, amount: 0.15 };
  switch (kind) {
    case 'slide':
      return { initial: { opacity: 0, x: -48 }, whileInView: { opacity: 1, x: 0 }, viewport, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } };
    case 'reveal':
      return {
        initial: { opacity: 0.2, clipPath: 'inset(0% 0% 100% 0%)' },
        whileInView: { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' },
        viewport,
        transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] },
      };
    default:
      return { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport, transition: { duration: 0.6, ease: 'easeOut' } };
  }
}

interface SectionShellProps {
  settings: SectionSettings;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

export default function SectionShell({ settings, children, className, ariaLabel }: SectionShellProps) {
  return (
    <Shell
      $bg={settings.background}
      $spacing={settings.spacing}
      className={className}
      aria-label={ariaLabel}
      {...animationProps(settings.animation)}
    >
      {children}
    </Shell>
  );
}

// Колонки разной ширины внутри секции
export const Column = styled.div<{ $width?: 'narrow' | 'wide' | 'full' }>`
  width: 100%;
  max-width: ${({ $width = 'narrow' }) => ($width === 'narrow' ? '760px' : $width === 'wide' ? '1080px' : 'none')};
  margin: 0 auto;
  padding: 0 ${({ theme, $width }) => ($width === 'full' ? 0 : theme.spacing.lg)};
`;
