'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { Phone, ArrowRight } from 'lucide-react';
import SectionShell from './SectionShell';
import { GoldButton, sweep, sweepHover } from '@/components/news/ui';
import { SITE } from '@/lib/site';
import { isInternalHref } from '@/lib/news/content';
import type { CtaSection } from '@/lib/news/types';

const Card = styled.div`
  position: relative;
  overflow: hidden;
  max-width: 1080px;
  margin: 0 auto;
  padding: clamp(2rem, 5vw, 3.5rem);
  border: 1px solid color-mix(in srgb, var(--accent, ${({ theme }) => theme.colors.primary}) 45%, transparent);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background:
    radial-gradient(70% 120% at 100% 0%, color-mix(in srgb, var(--accent, ${({ theme }) => theme.colors.primary}) 16%, transparent) 0%, transparent 60%),
    linear-gradient(165deg, rgba(217, 177, 95, 0.07) 0%, transparent 45%),
    ${({ theme }) => theme.colors.navy};
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) auto;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: center;

  ${sweepHover}

  &:hover::after {
    animation: ${sweep} 1.4s ease-out;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const Wrap = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h2`
  font-size: clamp(1.6rem, 3.4vw, 2.4rem);
  font-weight: ${({ theme }) => theme.fontWeight.extrabold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.lg};
  line-height: 1.7;
  max-width: 560px;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${({ theme }) => theme.spacing.md};
  position: relative;
  z-index: 3;
`;

const PhoneLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.heading};
  white-space: nowrap;

  svg { color: var(--accent, ${({ theme }) => theme.colors.primary}); }

  &:hover { color: ${({ theme }) => theme.colors.primaryLight}; }
`;

const Hours = styled.span`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.6875rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textLight};
`;

export default function CtaBlock({ section }: { section: CtaSection }) {
  const internal = isInternalHref(section.buttonHref);
  return (
    <SectionShell settings={section.settings} ariaLabel={section.title}>
      <Wrap>
        <Card>
          <div>
            <Title>{section.title}</Title>
            {section.text && <Text>{section.text}</Text>}
          </div>
          <Actions>
            {section.showPhone && (
              <>
                <PhoneLink href={SITE.phoneHref} data-goal='article_cta_phone'>
                  <Phone size={20}/>
                  {SITE.phone}
                </PhoneLink>
                <Hours>{SITE.hours.label}</Hours>
              </>
            )}
            {section.buttonLabel && (internal ? (
              <GoldButton as={Link} href={section.buttonHref} data-goal='article_cta'>
                {section.buttonLabel}
                <ArrowRight size={16}/>
              </GoldButton>
            ) : (
              <GoldButton href={section.buttonHref} data-goal='article_cta' target='_blank' rel='noopener noreferrer'>
                {section.buttonLabel}
                <ArrowRight size={16}/>
              </GoldButton>
            ))}
          </Actions>
        </Card>
      </Wrap>
    </SectionShell>
  );
}
