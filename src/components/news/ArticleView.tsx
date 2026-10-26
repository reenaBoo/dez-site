'use client';

import { ViewTransition, useEffect, type MouseEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { ArrowLeft, Bug, Rat, FlaskConical, Leaf, ArrowUpRight } from 'lucide-react';
import Container from '@/components/layout/Container';
import ArticleHero from './sections/ArticleHero';
import SectionRenderer from './SectionRenderer';
import NewsCard from './NewsCard';
import { Kicker } from './ui';
import { takeReturnPoint } from './navigation';
import type { Article, ArticleCard, HeroSection, Section, ServiceSlug } from '@/lib/news/types';
import type { Crumb } from '@/lib/seo/jsonld';
import type { TocItem } from '@/lib/news/content';
import { nodeText } from '@/lib/news/content';
import { createSection } from '@/lib/news/sections';
import { formatDate, isoDate } from '@/lib/news/format';
import { SERVICES } from '@/lib/site';

const Root = styled.article<{ $accent: string }>`
  --accent: ${({ $accent }) => $accent};
  position: relative;
  padding-bottom: ${({ theme }) => theme.spacing.xxxl};
`;

const Toc = styled.nav`
  max-width: 760px;
  margin: ${({ theme }) => theme.spacing.xxl} auto 0;
  padding: 0 ${({ theme }) => theme.spacing.lg};

  details {
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    background: ${({ theme }) => theme.colors.navy};
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  }

  summary {
    cursor: pointer;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: ${({ theme }) => theme.fontSize.xs};
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--accent);
    list-style: none;

    &::-webkit-details-marker { display: none; }
    &::after { content: ' +'; }
  }

  details[open] summary::after { content: ' −'; }

  ol {
    margin-top: ${({ theme }) => theme.spacing.md};
    padding-left: 1.4em;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};

    li::marker {
      font-family: ${({ theme }) => theme.fonts.mono};
      color: var(--accent);
    }
  }

  a {
    color: ${({ theme }) => theme.colors.text};
    transition: color ${({ theme }) => theme.transitions.fast};

    &:hover { color: ${({ theme }) => theme.colors.primaryLight}; }
  }
`;

const Footer = styled.footer`
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const Updated = styled.p`
  max-width: 760px;
  margin: 0 auto ${({ theme }) => theme.spacing.xxl};
  padding: 0 ${({ theme }) => theme.spacing.lg};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textLight};
`;

const BlockTitle = styled.h2`
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  font-weight: ${({ theme }) => theme.fontWeight.extrabold};
  margin: ${({ theme }) => theme.spacing.sm} 0 ${({ theme }) => theme.spacing.xl};

  span { color: var(--accent); }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xxxl};
`;

const ServiceLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.navy};
  color: ${({ theme }) => theme.colors.heading};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  transition: border-color ${({ theme }) => theme.transitions.normal}, box-shadow ${({ theme }) => theme.transitions.normal};

  .icon {
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    border: 1px solid rgba(217, 177, 95, 0.45);
    border-radius: ${({ theme }) => theme.borderRadius.md};
    color: var(--accent);
    flex-shrink: 0;
  }

  .arrow { margin-left: auto; color: var(--accent); }

  &:hover, &:focus-visible {
    border-color: rgba(217, 177, 95, 0.55);
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
`;

const RelatedGrid = styled.div`
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

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.xxl};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);

  svg { transition: transform ${({ theme }) => theme.transitions.normal}; }
  &:hover svg { transform: translateX(-4px); }
`;

const SERVICE_ICONS: Record<ServiceSlug, typeof Bug> = {
  dezinsekciya: Bug,
  deratizaciya: Rat,
  dezinfekciya: FlaskConical,
  fitosanitariya: Leaf,
};

// Выключение атмосферного слоя для конкретной статьи (слой живёт в layout)
function AtmosphereOff() {
  useEffect(() => {
    document.documentElement.dataset.atmosphere = 'off';
    return () => { delete document.documentElement.dataset.atmosphere; };
  }, []);
  return null;
}

function h2Count(section: Section): number {
  if (section.type !== 'text' && section.type !== 'textImage') return 0;
  return section.doc.content.filter((n) => n.type === 'heading' && n.attrs?.level === 2 && nodeText(n).trim()).length;
}

interface ArticleViewProps {
  article: Article;
  related: ArticleCard[];
  crumbs: Crumb[];
  toc: TocItem[];
}

export default function ArticleView({ article, related, crumbs, toc }: ArticleViewProps) {
  const router = useRouter();
  const hero = (article.content.find((s) => s.type === 'hero') as HeroSection | undefined)
    ?? (createSection('hero') as HeroSection);
  const body = article.content.filter((s) => s.type !== 'hero');

  // Сколько H2 было до каждой секции — для сквозных якорей оглавления
  const offsets = body.reduce<number[]>((acc, section, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + h2Count(body[i - 1]));
    return acc;
  }, []);
  const rendered = body.map((section, i) => (
    <SectionRenderer key={section.id} section={section} h2Offset={offsets[i]}/>
  ));

  const wasUpdated = article.publishedAt && article.updatedAt.getTime() - article.publishedAt.getTime() > 24 * 3600 * 1000;
  const services = SERVICES.filter((s) => article.relatedServices.includes(s.slug));

  // Если пришли из сетки — возвращаемся на ту же её страницу и позицию скролла
  const onBack = (e: MouseEvent) => {
    const path = takeReturnPoint();
    if (!path) return;
    e.preventDefault();
    router.push(path, { scroll: false, transitionTypes: ['news-back'] });
  };

  return (
    <ViewTransition
      enter={{ 'news-open': 'news-article-enter', 'news-back': 'news-article-enter', default: 'none' }}
      exit={{ 'news-open': 'news-article-exit', 'news-back': 'news-article-exit', default: 'none' }}
      default='none'
    >
      <Root $accent={article.accentColor ?? '#D9B15F'}>
        {!article.showAtmosphere && <AtmosphereOff/>}
        <ArticleHero
          section={hero}
          title={article.title}
          slug={article.slug}
          fallbackImage={article.coverImage}
          publishedAt={article.publishedAt}
          updatedAt={article.updatedAt}
          readingTime={article.readingTime}
          crumbs={crumbs}
        />

        {toc.length >= 3 && (
          <Toc aria-label='Содержание статьи'>
            <details>
              <summary>Содержание</summary>
              <ol>
                {toc.map((item) => <li key={item.id}><a href={`#${item.id}`}>{item.text}</a></li>)}
              </ol>
            </details>
          </Toc>
        )}

        <div>{rendered}</div>

        <Footer>
          {wasUpdated && (
            <Updated>
              Обновлено: <time dateTime={isoDate(article.updatedAt)}>{formatDate(article.updatedAt)}</time>
            </Updated>
          )}

          <Container>
            {services.length > 0 && (
              <section aria-labelledby='article-services'>
                <Kicker>Услуги по теме</Kicker>
                <BlockTitle id='article-services'>Чем мы <span>поможем</span></BlockTitle>
                <ServicesGrid>
                  {services.map((service) => {
                    const Icon = SERVICE_ICONS[service.slug];
                    return (
                      <ServiceLink key={service.slug} href={service.href} data-goal='article_to_services'>
                        <span className='icon'><Icon size={22}/></span>
                        {service.name}
                        <ArrowUpRight size={18} className='arrow'/>
                      </ServiceLink>
                    );
                  })}
                  <ServiceLink href='/contacts' data-goal='article_to_contacts'>
                    <span className='icon'><ArrowUpRight size={22}/></span>
                    Вызвать специалиста
                  </ServiceLink>
                </ServicesGrid>
              </section>
            )}

            {related.length > 0 && (
              <section aria-labelledby='article-related'>
                <Kicker>Читайте также</Kicker>
                <BlockTitle id='article-related'>Полезные <span>статьи</span></BlockTitle>
                <RelatedGrid>
                  {related.map((card, i) => <NewsCard key={card.id} card={card} size='m' index={i}/>)}
                </RelatedGrid>
              </section>
            )}

            <BackLink href='/news' onClick={onBack} transitionTypes={['news-back']}>
              <ArrowLeft size={16}/> Все статьи
            </BackLink>
          </Container>
        </Footer>
      </Root>
    </ViewTransition>
  );
}
