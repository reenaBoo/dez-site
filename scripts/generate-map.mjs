// Генерация статичных SVG-путей регионов РФ для секции «География».
// Запуск (пакеты не в package.json, ставятся разово):
//   npm i --no-save @amcharts/amcharts5-geodata d3-geo
//   node scripts/generate-map.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { geoMercator, geoPath } from 'd3-geo';

const WIDTH = 1000;
const HEIGHT = 580;
const PADDING = 8;

const geojson = JSON.parse(
  readFileSync('./node_modules/@amcharts/amcharts5-geodata/json/russiaCrimeaLow.json', 'utf8'),
);

// rotate по долготе, чтобы Чукотка не рвалась на антимеридиане
const projection = geoMercator()
  .rotate([-105, 0])
  .fitExtent(
    [[PADDING, PADDING], [WIDTH - PADDING, HEIGHT - PADDING]],
    geojson,
  );

const path = geoPath(projection);
const round = (d) => d.replace(/(\d+\.\d+)/g, (m) => Number(m).toFixed(1));

const regions = geojson.features.map((f) => {
  const [cx, cy] = path.centroid(f);
  return {
    id: f.properties.id,
    name: f.properties.name,
    d: round(path(f)),
    cx: Number(cx.toFixed(1)),
    cy: Number(cy.toFixed(1)),
  };
});

const out = `// Файл сгенерирован scripts/generate-map.mjs — не редактировать вручную.
// Проекция: Mercator, rotate [-105, 0], viewBox 0 0 ${WIDTH} ${HEIGHT}.

export const MAP_WIDTH = ${WIDTH};
export const MAP_HEIGHT = ${HEIGHT};

export interface RegionShape {
  id: string;
  name: string;
  d: string;
  cx: number;
  cy: number;
}

export const RUSSIA_REGIONS: RegionShape[] = ${JSON.stringify(regions, null, 1)};
`;

mkdirSync('./src/components/sections/geo', { recursive: true });
writeFileSync('./src/components/sections/geo/russia.ts', out);
console.log(`written ${regions.length} regions -> src/components/sections/geo/russia.ts`);
