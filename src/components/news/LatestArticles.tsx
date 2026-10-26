'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Container from '@/components/layout/Container';
import NewsCard from './NewsCard';
import type { ArticleCard } from '@/lib/news/types';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
  background-color: ${({ theme }) => theme.colors.background};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xxl} 0;
  }
`;

const Head = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const Label = styled(motion.div)`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled(motion.h2)`
  font-size: clamp(2rem, 4.2vw, 3.4rem);
  font-weight: ${({ theme }) => theme.fontWeight.extrabold};

  span { color: ${({ theme }) => theme.colors.primary}; }
`;

const AllLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};

  svg { transition: transform ${({ theme }) => theme.transitions.normal}; }
  &:hover svg { transform: translateX(4px); }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

interface Props {
  items: ArticleCard[];
  label?: string;
}

// Блок «Полезные статьи» для главной и страницы услуг
export default function LatestArticles({ items, label = 'Новости и статьи' }: Props) {
  if (!items.length) return null;
  const reveal = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

  return (
    <Section aria-labelledby='latest-articles-title'>
      <Container>
        <Head>
          <div>
            <Label {...reveal} transition={{ duration: 0.5 }}>{label}</Label>
            <Title id='latest-articles-title' {...reveal} transition={{ duration: 0.5, delay: 0.08 }}>
              Полезные <span>статьи</span>
            </Title>
          </div>
          <AllLink href='/news'>Все статьи <ArrowRight size={16}/></AllLink>
        </Head>
        <Grid>
          {items.map((card, i) => (
            <motion.div key={card.id} {...reveal} transition={{ duration: 0.5, delay: i * 0.08 }}>
              <NewsCard card={card} size='m' index={i}/>
            </motion.div>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
