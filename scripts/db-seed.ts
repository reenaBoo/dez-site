// Наполняет БД из DATABASE_URL демо-статьями (только если статей ещё нет):
//   npm run db:seed
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../src/db/schema';
import { seedIfEmpty } from '../src/db/seed';
import type { Db } from '../src/db';

const url = process.env.DATABASE_URL;
if (!url) {
  console.error('DATABASE_URL не задан. Локально сид применяется автоматически при первом запуске.');
  process.exit(1);
}

const pool = new Pool({ connectionString: url });
seedIfEmpty(drizzle(pool, { schema }) as Db)
  .then((created) => console.log(created ? 'Демо-статьи добавлены' : 'Статьи уже есть — сид пропущен'))
  .finally(() => pool.end());
