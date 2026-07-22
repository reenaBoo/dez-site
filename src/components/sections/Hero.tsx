'use client';

import { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import Container from '@/components/layout/Container';
import { useScrollToSection } from '@/hooks/useScrollToSection';

const HeroSection = styled.section`
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 120px 0 80px;
`;

const MediaLayer = styled(motion.div)`
  position: absolute;
  inset: -6%;
  z-index: 0;

  video, img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 68% center;
  }
`;

const Shade = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(to right, rgba(10, 10, 12, 0.95) 0%, rgba(10, 10, 12, 0.76) 45%, rgba(10, 10, 12, 0.55) 100%),
    linear-gradient(to top, rgba(10, 10, 12, 1) 0%, transparent 26%),
    linear-gradient(to bottom, rgba(10, 10, 12, 0.75) 0%, transparent 24%);
`;

const LightCone = styled.div`
  position: absolute;
  inset: -10% -10% 0;
  z-index: 2;
  pointer-events: none;
  background: linear-gradient(
    112deg,
    transparent 42%,
    rgba(235, 210, 150, 0.05) 52%,
    rgba(235, 210, 150, 0.11) 58%,
    rgba(235, 210, 150, 0.05) 64%,
    transparent 74%
  );
  mask-image: linear-gradient(to bottom, black 0%, transparent 88%);
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.xxl};
  width: 100%;
`;

const MainCol = styled.div`
  max-width: 760px;
`;

const Eyebrow = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.6875rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 10px rgba(217, 177, 95, 0.9);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.5625rem;
    letter-spacing: 0.14em;
  }
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.6rem, 6vw, 5rem);
  font-weight: ${({ theme }) => theme.fontWeight.extrabold};
  line-height: 1.04;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  span {
    color: ${({ theme }) => theme.colors.primary};
    text-shadow: 0 0 40px rgba(217, 177, 95, 0.35);
  }
`;

const Subtitle = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.text};
  max-width: 520px;
  line-height: 1.7;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.base};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }
`;

const CTARow = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 30px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  background: rgba(217, 177, 95, 0.08);
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const GhostButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 30px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const Rail = styled(motion.aside)`
  display: none;
  flex-direction: column;
  border-left: 1px solid rgba(217, 177, 95, 0.18);

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    display: flex;
  }
`;

const RailItem = styled.a`
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid rgba(217, 177, 95, 0.08);
  min-width: 220px;
  cursor: pointer;
  transition: background ${({ theme }) => theme.transitions.fast};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(217, 177, 95, 0.05);
  }

  small {
    display: block;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.5625rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.textLight};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  strong {
    font-size: ${({ theme }) => theme.fontSize.base};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.heading};
  }
`;

const tickerMove = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

const Ticker = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  border-top: 1px solid rgba(217, 177, 95, 0.14);
  background: rgba(10, 10, 12, 0.5);
  backdrop-filter: blur(6px);
  overflow: hidden;
  padding: 14px 0;
`;

const TickerTrack = styled.div`
  display: inline-flex;
  white-space: nowrap;
  animation: ${tickerMove} 42s linear infinite;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.625rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textLight};

  span {
    padding: 0 ${({ theme }) => theme.spacing.lg};
  }

  i {
    font-style: normal;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const TICKER_ITEMS = [
  'Работаем с 2002 года',
  'Безопасные препараты',
  'Гарантия результата',
  'Оперативный выезд специалиста',
  'Нормы СанПиН',
  'Полное документальное сопровождение',
];

const RAIL_ITEMS = [
  { num: '01 / Дезинсекция', label: 'Насекомые' },
  { num: '02 / Дератизация', label: 'Грызуны' },
  { num: '03 / Дезинфекция', label: 'Обеззараживание' },
  { num: '04 / Фитосанитария', label: 'Территории' },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollToSection } = useScrollToSection();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const tickerLine = (
    <>
      {TICKER_ITEMS.map((item) => (
        <span key={item}>
          {item} <i>•</i>
        </span>
      ))}
    </>
  );

  return (
    <HeroSection ref={sectionRef}>
      <MediaLayer style={{ y: mediaY, scale: mediaScale }}>
        {/* Слот под Seedance-клип: положите файл в public/videos/hero-loop.mp4 —
            видео подхватится, пока его нет, показывается постер */}
        <video autoPlay muted loop playsInline poster='/images/hero-bg.jpg'>
          <source src='/videos/hero-loop.mp4' type='video/mp4'/>
        </video>
      </MediaLayer>
      <Shade/>
      <LightCone/>

      <Container>
        <HeroContent>
          <MainCol>
            <Eyebrow
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              ООО «НПП „Биохиммаш“» · Москва · с 2002 года
            </Eyebrow>

            <Title
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Профессиональная <span>дезинсекция</span>{' '}и&nbsp;санитарная безопасность
            </Title>

            <Subtitle
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              Дезинсекция, дератизация, дезинфекция и фитосанитарная обработка
              для бизнеса в Москве, Московской области и ЦФО.
              Строго по нормам СанПиН, с полным документальным сопровождением.
            </Subtitle>

            <CTARow
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <PrimaryButton href='tel:+74959564855'>Оперативный выезд</PrimaryButton>
              <GhostButton onClick={() => scrollToSection('geography')}>
                География работ
              </GhostButton>
            </CTARow>
          </MainCol>

          <Rail
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            {RAIL_ITEMS.map((item) => (
              <RailItem
                key={item.num}
                href='/#services'
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('services');
                }}
              >
                <small>{item.num}</small>
                <strong>{item.label}</strong>
              </RailItem>
            ))}
          </Rail>
        </HeroContent>
      </Container>

      <Ticker>
        <TickerTrack>
          {tickerLine}
          {tickerLine}
        </TickerTrack>
      </Ticker>
    </HeroSection>
  );
}
