'use client';

import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import SectionShell from './SectionShell';
import type { FactSection } from '@/lib/news/types';

const Root = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: clamp(1.5rem, 5vw, 4rem);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const Value = styled.p`
  font-size: clamp(3.6rem, 11vw, 8rem);
  font-weight: ${({ theme }) => theme.fontWeight.extrabold};
  line-height: 0.95;
  letter-spacing: -0.04em;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primaryLight} 0%, var(--accent, ${({ theme }) => theme.colors.primary}) 55%, ${({ theme }) => theme.colors.primaryDark} 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 0 24px rgba(217, 177, 95, 0.25));

  small {
    font-size: 0.42em;
    letter-spacing: -0.01em;
  }
`;

const Label = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xl};
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.text};
  max-width: 520px;
  padding-left: ${({ theme }) => theme.spacing.lg};
  border-left: 2px solid var(--accent, ${({ theme }) => theme.colors.primary});

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    border-left: none;
    padding-left: 0;
    margin: 0 auto;
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;

const format = (value: number, decimals: number) =>
  value.toLocaleString('ru-RU', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

export default function FactBlock({ section }: { section: FactSection }) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const started = useRef(false);

  // В HTML с сервера сразу итоговое число (для поисковиков и без JS).
  // На клиенте до появления в зоне видимости сбрасываем в 0 и затем «досчитываем»
  useEffect(() => {
    if (reduced || started.current || !numberRef.current) return;
    if (!inView) {
      numberRef.current.textContent = format(0, section.decimals);
      return;
    }
    started.current = true;
    const controls = animate(0, section.value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (numberRef.current) numberRef.current.textContent = format(v, section.decimals);
      },
    });
    return () => controls.stop();
  }, [inView, reduced, section.value, section.decimals]);

  return (
    <SectionShell settings={section.settings}>
      <Root ref={rootRef}>
        <Value>
          {section.prefix && <small>{section.prefix}</small>}
          <span ref={numberRef}>{format(section.value, section.decimals)}</span>
          {section.suffix && <small>{section.suffix}</small>}
        </Value>
        {section.label && <Label>{section.label}</Label>}
      </Root>
    </SectionShell>
  );
}
