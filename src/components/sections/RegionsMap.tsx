'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Container from '@/components/layout/Container';
import { RUSSIA_REGIONS, MAP_WIDTH, MAP_HEIGHT, type RegionShape } from './geo/russia';
import { RU_REGION_NAMES } from './geo/names';
import { ACTIVE_REGION_IDS } from './geo/config';

const GUTTER = 300;
const LABEL_GAP = 56;

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xxl} 0;
  }
`;

const SectionLabel = styled(motion.div)`
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
  margin-bottom: ${({ theme }) => theme.spacing.md};

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Subtitle = styled(motion.p)`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSize.lg};
  max-width: 640px;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.base};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }
`;

const Panel = styled(motion.div)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background:
    linear-gradient(180deg, rgba(217, 177, 95, 0.025) 0%, transparent 22%),
    ${({ theme }) => theme.colors.background};
  overflow: hidden;
`;

const PanelBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.6875rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textLight};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const BarItem = styled.div<{ $accent?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme, $accent }) => ($accent ? theme.colors.primary : theme.colors.textLight)};
  white-space: nowrap;

  &:nth-child(2) {
    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      display: none;
    }
  }
`;

const PulseDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  box-shadow: 0 0 8px rgba(217, 177, 95, 0.9);
  animation: mapPulse 2.4s ease-in-out infinite;

  @keyframes mapPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.35; }
  }
`;

const MapWrap = styled.div`
  position: relative;
  padding: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

const MapSvg = styled.svg`
  display: block;
  width: 100%;
  height: auto;

  .region {
    fill: ${({ theme }) => theme.colors.mapFill};
    stroke: ${({ theme }) => theme.colors.mapStroke};
    stroke-width: 0.6;
    transition: fill ${({ theme }) => theme.transitions.fast};
    cursor: pointer;
  }

  .region:hover {
    fill: ${({ theme }) => theme.colors.mapFillHover};
  }

  .region.active {
    fill: url(#regions-gold);
    stroke: rgba(242, 212, 139, 0.55);
    stroke-width: 0.8;
    filter: url(#regions-glow);
  }

  .region.active:hover {
    fill: url(#regions-gold-bright);
  }

  .leader {
    fill: none;
    stroke: rgba(217, 177, 95, 0.45);
    stroke-width: 1;
  }

  .anchor {
    fill: #F2D48B;
  }

  .label-name {
    fill: ${({ theme }) => theme.colors.heading};
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 14px;
    font-weight: 700;
  }

  .label-sub {
    fill: rgba(217, 177, 95, 0.8);
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 8px;
    letter-spacing: 0.16em;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  z-index: 5;
  pointer-events: none;
  background: rgba(10, 10, 12, 0.94);
  border: 1px solid rgba(217, 177, 95, 0.5);
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: 6px 12px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.heading};
  white-space: nowrap;
  transform: translate(14px, -30px);
`;

const PanelFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.md};
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Chip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  border: 1px solid rgba(217, 177, 95, 0.35);
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: 7px 14px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.6875rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.heading};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }

  span {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
  }
`;

const FootNote = styled.p`
  max-width: 320px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.6;
`;

function pluralRegions(n: number): string {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return 'РЕГИОН';
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return 'РЕГИОНА';
  return 'РЕГИОНОВ';
}

interface LabelPlacement {
  region: RegionShape;
  y: number;
}

export default function RegionsMap() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [hoverName, setHoverName] = useState<string | null>(null);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setCompact(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const activeSet = useMemo(() => new Set(ACTIVE_REGION_IDS), []);

  const labels = useMemo<LabelPlacement[]>(() => {
    const active = ACTIVE_REGION_IDS
      .map((id) => RUSSIA_REGIONS.find((r) => r.id === id))
      .filter((r): r is RegionShape => Boolean(r))
      .sort((a, b) => a.cy - b.cy);

    const ys = active.map((r) => r.cy);
    for (let i = 1; i < ys.length; i++) {
      ys[i] = Math.max(ys[i], ys[i - 1] + LABEL_GAP);
    }
    const overflow = ys.length ? ys[ys.length - 1] - (MAP_HEIGHT - 36) : 0;
    if (overflow > 0) {
      for (let i = 0; i < ys.length; i++) ys[i] -= overflow;
    }
    if (ys.length && ys[0] < 48) {
      const shift = 48 - ys[0];
      for (let i = 0; i < ys.length; i++) ys[i] += shift;
    }

    return active.map((region, i) => ({ region, y: ys[i] }));
  }, []);

  const handleMove = useCallback((e: React.MouseEvent) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    const el = tooltipRef.current;
    if (!rect || !el) return;
    el.style.left = `${e.clientX - rect.left}px`;
    el.style.top = `${e.clientY - rect.top}px`;
  }, []);

  const handleLeave = useCallback(() => setHoverName(null), []);

  const regionPaths = useMemo(() => (
    <g transform={`translate(${GUTTER}, 0)`}>
      {RUSSIA_REGIONS.map((region) => (
        <path
          key={region.id}
          d={region.d}
          className={activeSet.has(region.id) ? 'region active' : 'region'}
          onMouseEnter={() => setHoverName(RU_REGION_NAMES[region.id] ?? region.id)}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
        />
      ))}
    </g>
  ), [activeSet, handleMove, handleLeave]);

  const viewBox = compact
    ? `${GUTTER} 0 ${MAP_WIDTH} ${MAP_HEIGHT}`
    : `0 0 ${GUTTER + MAP_WIDTH} ${MAP_HEIGHT}`;

  const reveal = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  };

  return (
    <Section id='geography'>
      <Container>
        <SectionLabel {...reveal} transition={{ duration: 0.5 }}>
          03 / География
        </SectionLabel>
        <Title {...reveal} transition={{ duration: 0.5, delay: 0.08 }}>
          Регионы <span>под нашим контролем</span>
        </Title>
        <Subtitle {...reveal} transition={{ duration: 0.5, delay: 0.16 }}>
          Базовые регионы обслуживания — Москва, Московская область и ЦФО.
          География расширяется под долгосрочные контракты.
        </Subtitle>

        <Panel {...reveal} transition={{ duration: 0.6, delay: 0.2 }}>
          <PanelBar>
            <BarItem $accent>
              <PulseDot/>
              Карта покрытия
            </BarItem>
            <BarItem>
              Активно · {labels.length} {pluralRegions(labels.length)}
            </BarItem>
            <BarItem>
              РФ / {RUSSIA_REGIONS.length} субъекта
            </BarItem>
          </PanelBar>

          <MapWrap ref={wrapRef}>
            <MapSvg viewBox={viewBox} role='img' aria-label='Карта регионов обслуживания'>
              <defs>
                <linearGradient id='regions-gold' x1='0' y1='0' x2='1' y2='1'>
                  <stop offset='0' stopColor='#EFD189'/>
                  <stop offset='1' stopColor='#B08A38'/>
                </linearGradient>
                <linearGradient id='regions-gold-bright' x1='0' y1='0' x2='1' y2='1'>
                  <stop offset='0' stopColor='#F7E0A4'/>
                  <stop offset='1' stopColor='#C79E47'/>
                </linearGradient>
                <filter id='regions-glow' x='-40%' y='-40%' width='180%' height='180%'>
                  <feDropShadow dx='0' dy='0' stdDeviation='6' floodColor='#D9B15F' floodOpacity='0.55'/>
                </filter>
              </defs>

              {regionPaths}

              {!compact && (
                <g>
                  {labels.map(({ region, y }) => (
                    <g key={region.id}>
                      <path
                        className='leader'
                        d={`M ${GUTTER - 44} ${y - 5} H ${GUTTER + region.cx - 26} L ${GUTTER + region.cx} ${region.cy}`}
                      />
                      <circle className='anchor' cx={GUTTER + region.cx} cy={region.cy} r='3'/>
                      <circle className='anchor' cx={GUTTER - 44} cy={y - 5} r='1.6'/>
                      <text textAnchor='end'>
                        <tspan className='label-name' x={GUTTER - 54} y={y}>
                          {RU_REGION_NAMES[region.id]}
                        </tspan>
                        <tspan className='label-sub' x={GUTTER - 54} y={y + 15}>
                          {`ЗОНА ОБСЛУЖИВАНИЯ · ${region.id}`}
                        </tspan>
                      </text>
                    </g>
                  ))}
                </g>
              )}
            </MapSvg>

            <Tooltip
              ref={tooltipRef}
              style={{ display: hoverName ? 'block' : 'none' }}
            >
              {hoverName}
            </Tooltip>
          </MapWrap>

          <PanelFooter>
            <Chips>
              {labels.map(({ region }) => (
                <Chip key={region.id}>
                  <span/>
                  {RU_REGION_NAMES[region.id]}
                </Chip>
              ))}
            </Chips>
            <FootNote>
              Наведите курсор на регион, чтобы увидеть его название.
              Выезд за пределы отмеченных регионов — по договорённости.
            </FootNote>
          </PanelFooter>
        </Panel>
      </Container>
    </Section>
  );
}
