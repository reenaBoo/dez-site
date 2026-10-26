import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

// Демо-обложки в фирменном стиле: тёмный фон, золотое свечение, сетка и силуэт насекомого
// из public/images. Только для сида — реальные фото загружаются через админку.

export type CoverMotif = 'bug' | 'centipede' | 'mosquito' | 'radar' | 'grid';

interface CoverOptions {
  motif: CoverMotif;
  width?: number;
  height?: number;
  glowX?: number;
  glowY?: number;
  tilt?: number;
}

const INSECTS: Record<'bug' | 'centipede' | 'mosquito', { file: string; vbW: number; vbH: number }> = {
  bug: { file: 'bug.svg', vbW: 107.52, vbH: 112.13 },
  centipede: { file: 'centipede.svg', vbW: 190.88, vbH: 86.43 },
  mosquito: { file: 'mosquito.svg', vbW: 123.5, vbH: 78.11 },
};

async function insectMarkup(name: keyof typeof INSECTS): Promise<string> {
  const raw = await readFile(join(process.cwd(), 'public/images', INSECTS[name].file), 'utf8');
  // Убираем собственную заливку силуэта — цвет задаёт градиент обложки
  return raw.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').replace(/\sstyle="[^"]*"/g, '');
}

export async function renderCover({ motif, width = 1800, height = 1100, glowX = 0.7, glowY = 0.35, tilt = -12 }: CoverOptions): Promise<Buffer> {
  const gridStep = 64;
  const gridLines: string[] = [];
  for (let x = gridStep; x < width; x += gridStep) gridLines.push(`<line x1="${x}" y1="0" x2="${x}" y2="${height}"/>`);
  for (let y = gridStep; y < height; y += gridStep) gridLines.push(`<line x1="0" y1="${y}" x2="${width}" y2="${y}"/>`);

  const cx = width * glowX;
  const cy = height * glowY;
  let figure = '';

  if (motif === 'radar' || motif === 'grid') {
    const rings = [0.12, 0.22, 0.34, 0.48, 0.64].map((r, i) =>
      `<circle cx="${cx}" cy="${cy}" r="${r * width}" fill="none" stroke="#D9B15F" stroke-opacity="${0.5 - i * 0.08}" stroke-width="${i === 0 ? 3 : 1.5}"/>`);
    const sweep = `<path d="M ${cx} ${cy} L ${cx + width * 0.64} ${cy - height * 0.18} A ${width * 0.64} ${width * 0.64} 0 0 1 ${cx + width * 0.6} ${cy + height * 0.28} Z" fill="url(#sweep)" opacity="0.55"/>`;
    const dots = [[0.18, -0.08], [-0.26, 0.12], [0.34, 0.2], [-0.1, -0.3], [0.05, 0.36]].map(([dx, dy]) =>
      `<circle cx="${cx + dx * width}" cy="${cy + dy * height}" r="7" fill="#F2D48B" filter="url(#glow)"/>`).join('');
    figure = motif === 'radar' ? rings.join('') + sweep + dots : rings.slice(0, 3).join('') + dots;
  } else {
    const insect = INSECTS[motif];
    const scale = (Math.min(width, height) * (motif === 'centipede' ? 0.8 : 0.52)) / Math.max(insect.vbW, insect.vbH);
    const w = insect.vbW * scale;
    const h = insect.vbH * scale;
    figure = `<g transform="translate(${cx - w / 2} ${cy - h / 2}) rotate(${tilt} ${w / 2} ${h / 2}) scale(${scale})" fill="url(#gold)" filter="url(#glow)" opacity="0.92">${await insectMarkup(motif)}</g>`;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#16161C"/><stop offset="1" stop-color="#08080A"/>
      </linearGradient>
      <radialGradient id="halo" cx="${glowX}" cy="${glowY}" r="0.6">
        <stop offset="0" stop-color="#D9B15F" stop-opacity="0.32"/><stop offset="0.5" stop-color="#A87F35" stop-opacity="0.08"/><stop offset="1" stop-color="#000" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#F7E0A4"/><stop offset="0.55" stop-color="#D9B15F"/><stop offset="1" stop-color="#8E6A2B"/>
      </linearGradient>
      <linearGradient id="sweep" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#D9B15F" stop-opacity="0.5"/><stop offset="1" stop-color="#D9B15F" stop-opacity="0"/>
      </linearGradient>
      <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="14" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <radialGradient id="vignette" cx="0.5" cy="0.5" r="0.75">
        <stop offset="0.6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.65"/>
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bg)"/>
    <g stroke="#D9B15F" stroke-opacity="0.07" stroke-width="1">${gridLines.join('')}</g>
    <rect width="100%" height="100%" fill="url(#halo)"/>
    ${figure}
    <rect width="100%" height="100%" fill="url(#vignette)"/>
  </svg>`;

  return sharp(Buffer.from(svg)).jpeg({ quality: 90 }).toBuffer();
}
