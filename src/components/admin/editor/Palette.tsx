'use client';

import styled from 'styled-components';
import { SECTION_META } from '@/lib/news/sections';
import type { SectionType } from '@/lib/news/types';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid rgba(217, 177, 95, 0.35);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.navy};
`;

const Tile = styled.button`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.6rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background};
  text-align: left;
  color: ${({ theme }) => theme.colors.heading};
  transition: all ${({ theme }) => theme.transitions.fast};

  svg { width: 100%; height: auto; border-radius: 3px; }
  strong { font-size: 0.8125rem; }
  span { font-size: 0.6875rem; line-height: 1.35; color: ${({ theme }) => theme.colors.textLight}; }

  &:hover, &:focus-visible {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 14px rgba(217, 177, 95, 0.2);
    outline: none;
  }
`;

// Схематичные миниатюры секций (золото — акцентный элемент, серое — текст/фото)
const G = '#D9B15F';
const T = '#3A3A44';
const P = '#2A2A33';

function Thumb({ type }: { type: SectionType }) {
  const line = (x: number, y: number, w: number, c = T) => <rect x={x} y={y} width={w} height={3} rx={1.5} fill={c}/>;
  const photo = (x: number, y: number, w: number, h: number) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={2} fill={P}/>
      <path d={`M${x + 4} ${y + h - 4} l${w * 0.3} ${-h * 0.45} l${w * 0.2} ${h * 0.25} l${w * 0.15} ${-h * 0.12} l${w * 0.25} ${h * 0.32}z`} fill='#4A4A55'/>
    </g>
  );
  const content: Record<SectionType, React.ReactNode> = {
    hero: <>{photo(0, 0, 120, 60)}{line(8, 34, 60, '#F3EFE4')}{line(8, 41, 46, '#F3EFE4')}{line(8, 50, 30, G)}</>,
    text: <>{line(20, 10, 50, '#F3EFE4')}{[20, 27, 34, 41, 48].map((y) => <g key={y}>{line(20, y, y === 48 ? 50 : 80)}</g>)}</>,
    image: <>{photo(10, 8, 100, 40)}{line(10, 52, 40, G)}</>,
    gallery: <>{photo(18, 8, 84, 40)}<path d='M8 28l5-4v8z M112 28l-5-4v8z' fill={G}/>{[50, 57, 64].map((x, i) => <rect key={x} x={x} y={53} width={5} height={2} fill={i === 0 ? G : T}/>)}</>,
    textImage: <>{line(8, 14, 44, '#F3EFE4')}{[22, 29, 36, 43].map((y) => <g key={y}>{line(8, y, 48)}</g>)}{photo(64, 8, 48, 44)}</>,
    imageGrid: <>{photo(8, 8, 56, 44)}{photo(68, 8, 44, 20)}{photo(68, 32, 44, 20)}</>,
    quote: <><text x={54} y={24} fill={G} fontSize={18} fontWeight={700}>“</text>{line(22, 30, 76, '#F3EFE4')}{line(30, 37, 60, '#F3EFE4')}{line(46, 47, 28, G)}</>,
    fact: <><text x={10} y={42} fill={G} fontSize={30} fontWeight={800}>42</text><rect x={58} y={20} width={2} height={24} fill={G}/>{line(66, 24, 46)}{line(66, 31, 40)}{line(66, 38, 30)}</>,
    video: <>{photo(14, 6, 92, 48)}<circle cx={60} cy={30} r={10} fill={G}/><path d='M57 25l8 5-8 5z' fill='#0A0A0C'/></>,
    cta: <><rect x={6} y={10} width={108} height={40} rx={3} fill='#121216' stroke={G} strokeOpacity={0.6}/>{line(14, 20, 50, '#F3EFE4')}{line(14, 28, 40)}<rect x={80} y={30} width={28} height={10} rx={2} fill={G}/></>,
    faq: <>{[8, 23, 38].map((y, i) => <g key={y}><rect x={10} y={y} width={100} height={12} rx={2} fill='#121216' stroke={i === 0 ? G : T}/>{line(16, y + 4.5, 56, '#F3EFE4')}<path d={`M102 ${y + 5}l3 3 3-3`} stroke={G} fill='none'/></g>)}</>,
    divider: <><rect x={10} y={29} width={100} height={1} fill={G} opacity={0.6}/><rect x={56} y={26} width={7} height={7} transform='rotate(45 59.5 29.5)' fill='none' stroke={G}/></>,
  };
  return (
    <svg viewBox='0 0 120 60' aria-hidden>
      <rect width='120' height='60' fill='#0D0D10'/>
      {content[type]}
    </svg>
  );
}

export default function Palette({ onPick }: { onPick: (type: SectionType) => void }) {
  return (
    <Grid role='listbox' aria-label='Тип секции'>
      {SECTION_META.map((meta) => (
        <Tile key={meta.type} type='button' role='option' aria-selected={false} onClick={() => onPick(meta.type)}>
          <Thumb type={meta.type}/>
          <strong>{meta.label}</strong>
          <span>{meta.description}</span>
        </Tile>
      ))}
    </Grid>
  );
}
