'use client';

import styled, { keyframes } from 'styled-components';

export const sweep = keyframes`
  0% { transform: translateX(-140%) skewX(-14deg); }
  100% { transform: translateX(140%) skewX(-14deg); }
`;

// Моно-лейбл над заголовками — как в секциях главной
export const Kicker = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5em 0.9em;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent, ${({ theme }) => theme.colors.primary});

  > * + *::before {
    content: '·';
    margin-right: 0.9em;
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

export const Caption = styled.figcaption`
  margin-top: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.textLight};

  &::before {
    content: '— ';
    color: var(--accent, ${({ theme }) => theme.colors.primary});
  }
`;

// Блик на hover, как у карточек услуг
export const sweepHover = `
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(100deg, transparent 32%, rgba(242, 212, 139, 0.08) 50%, transparent 68%);
    transform: translateX(-140%) skewX(-14deg);
    pointer-events: none;
    z-index: 2;
  }
`;

export const GoldButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: 0.95rem 1.6rem;
  background: var(--accent, ${({ theme }) => theme.colors.primary});
  color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.sm};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  transition: box-shadow ${({ theme }) => theme.transitions.normal}, transform ${({ theme }) => theme.transitions.fast};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.glow};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primaryLight};
    outline-offset: 3px;
  }
`;
