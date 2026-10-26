'use client';

import { useId, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SectionShell, { Column } from './SectionShell';
import type { FaqSection } from '@/lib/news/types';

const Title = styled.h2`
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: ${({ theme }) => theme.fontWeight.extrabold};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Item = styled.div<{ $open: boolean }>`
  background:
    linear-gradient(165deg, rgba(217, 177, 95, 0.04) 0%, transparent 30%),
    ${({ theme }) => theme.colors.navy};
  border: 1px solid ${({ theme, $open }) => ($open ? 'rgba(217, 177, 95, 0.55)' : theme.colors.border)};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme, $open }) => ($open ? theme.shadows.glow : 'none')};
  transition: border-color ${({ theme }) => theme.transitions.normal}, box-shadow ${({ theme }) => theme.transitions.normal};

  &:hover {
    border-color: rgba(217, 177, 95, 0.4);
  }
`;

const Question = styled.button<{ $open: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  background: transparent;
  text-align: left;
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  line-height: 1.45;

  svg {
    flex-shrink: 0;
    color: var(--accent, ${({ theme }) => theme.colors.primary});
    transition: transform ${({ theme }) => theme.transitions.normal};
    transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primaryLight};
    outline-offset: -2px;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
    font-size: ${({ theme }) => theme.fontSize.base};
  }
`;

const Answer = styled(motion.div)`
  overflow: hidden;

  p {
    padding: 0 ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.8;
    white-space: pre-line;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      padding: 0 ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
    }
  }
`;

// Ответы всегда в DOM (свёрнуты по высоте) — поисковики видят весь текст FAQ
export default function FaqBlock({ section }: { section: FaqSection }) {
  const [open, setOpen] = useState<string | null>(section.items[0]?.id ?? null);
  const baseId = useId();
  const items = section.items.filter((i) => i.question.trim());
  if (!items.length) return null;

  return (
    <SectionShell settings={section.settings}>
      <Column $width='narrow'>
        {section.title && <Title>{section.title}</Title>}
        <List>
          {items.map((item) => {
            const isOpen = open === item.id;
            const panelId = `${baseId}-${item.id}`;
            return (
              <Item key={item.id} $open={isOpen}>
                <h3>
                  <Question
                    type='button'
                    $open={isOpen}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : item.id)}
                  >
                    {item.question}
                    <ChevronDown size={22}/>
                  </Question>
                </h3>
                <Answer
                  id={panelId}
                  role='region'
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  aria-hidden={!isOpen}
                >
                  <p>{item.answer}</p>
                </Answer>
              </Item>
            );
          })}
        </List>
      </Column>
    </SectionShell>
  );
}
