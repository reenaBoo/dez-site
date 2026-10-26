import type { CardSize } from './types';

// Раскладка bento-сетки: размер карточки → занимаемые ячейки, плотная упаковка
// «первое подходящее место» и последующее заполнение дыр растягиванием соседей.
// Считается на сервере для 4 и 2 колонок и отдаётся в CSS как явные grid-column/grid-row.

export interface Placement {
  col: number; // 1-based
  row: number;
  colSpan: number;
  rowSpan: number;
}

const SPANS: Record<number, Record<CardSize, [number, number]>> = {
  4: { s: [1, 2], m: [1, 2], tall: [1, 3], wide: [2, 2], l: [2, 3] },
  2: { s: [1, 2], m: [1, 2], tall: [1, 3], wide: [2, 2], l: [2, 3] },
};

function spanFor(size: CardSize, cols: number): [number, number] {
  const [c, r] = (SPANS[cols] ?? SPANS[4])[size];
  return [Math.min(c, cols), r];
}

export function layoutBento(sizes: CardSize[], cols: number): Placement[] {
  const grid: (number | null)[][] = [];
  const ensureRow = (r: number) => {
    while (grid.length <= r) grid.push(Array(cols).fill(null));
  };
  const fits = (r: number, c: number, w: number, h: number) => {
    if (c + w > cols) return false;
    for (let y = r; y < r + h; y++) {
      ensureRow(y);
      for (let x = c; x < c + w; x++) if (grid[y][x] !== null) return false;
    }
    return true;
  };
  const occupy = (i: number, p: Placement) => {
    for (let y = p.row - 1; y < p.row - 1 + p.rowSpan; y++) {
      ensureRow(y);
      for (let x = p.col - 1; x < p.col - 1 + p.colSpan; x++) grid[y][x] = i;
    }
  };

  const placements: Placement[] = sizes.map((size, i) => {
    const [w, h] = spanFor(size, cols);
    for (let r = 0; ; r++) {
      for (let c = 0; c < cols; c++) {
        if (fits(r, c, w, h)) {
          const p = { col: c + 1, row: r + 1, colSpan: w, rowSpan: h };
          occupy(i, p);
          return p;
        }
      }
    }
  });

  // Заполнение дыр: растягиваем карточку сверху вниз или слева вправо, пока есть пустые ячейки
  const height = grid.length;
  let changed = true;
  while (changed) {
    changed = false;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < cols; x++) {
        if (grid[y][x] !== null) continue;
        const above = y > 0 ? grid[y - 1][x] : null;
        if (above !== null) {
          const p = placements[above];
          const canGrowDown = p.row - 1 + p.rowSpan === y
            && Array.from({ length: p.colSpan }, (_, k) => grid[y][p.col - 1 + k]).every((v) => v === null);
          if (canGrowDown) {
            p.rowSpan += 1;
            for (let k = 0; k < p.colSpan; k++) grid[y][p.col - 1 + k] = above;
            changed = true;
            continue;
          }
        }
        const left = x > 0 ? grid[y][x - 1] : null;
        if (left !== null) {
          const p = placements[left];
          const canGrowRight = p.col - 1 + p.colSpan === x
            && Array.from({ length: p.rowSpan }, (_, k) => grid[p.row - 1 + k]?.[x]).every((v) => v === null);
          if (canGrowRight) {
            p.colSpan += 1;
            for (let k = 0; k < p.rowSpan; k++) grid[p.row - 1 + k][x] = left;
            changed = true;
          }
        }
      }
    }
  }

  return placements;
}

// Закреплённая статья — самая крупная карточка в начале
export function effectiveSizes(cards: { cardSize: CardSize; isFeatured: boolean }[], firstPage: boolean): CardSize[] {
  return cards.map((card, i) => (firstPage && i === 0 && card.isFeatured ? 'l' : card.cardSize));
}
