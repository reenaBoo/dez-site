import { join } from 'node:path';
import { mkdirSync } from 'node:fs';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

export type Db = NodePgDatabase<typeof schema>;

const MIGRATIONS_FOLDER = join(process.cwd(), 'src/db/migrations');

// Без DATABASE_URL работаем на встроенном PGlite (Postgres в WASM) в ./.data/pglite —
// для локального просмотра не нужен установленный PostgreSQL. Схема и миграции общие.
async function createDb(): Promise<Db> {
  const url = process.env.DATABASE_URL;

  if (url) {
    const { drizzle } = await import('drizzle-orm/node-postgres');
    const { Pool } = await import('pg');
    const pool = new Pool({ connectionString: url, max: 10 });
    return drizzle(pool, { schema });
  }

  const { PGlite } = await import('@electric-sql/pglite');
  const { drizzle } = await import('drizzle-orm/pglite');
  const { migrate } = await import('drizzle-orm/pglite/migrator');
  // Воркеры `next build` работают параллельно и не могут делить один каталог PGlite,
  // поэтому при сборке без DATABASE_URL база поднимается в памяти с сид-данными
  const isBuild = process.env.NEXT_PHASE === 'phase-production-build';
  const dataDir = process.env.PGLITE_DIR ?? join(process.cwd(), '.data/pglite');
  if (!isBuild) mkdirSync(dataDir, { recursive: true });
  const client = isBuild ? new PGlite() : new PGlite(dataDir);
  const db = drizzle(client, { schema });
  await migrate(db, { migrationsFolder: MIGRATIONS_FOLDER });

  // PGlite и node-postgres реализуют один и тот же query builder Drizzle
  const typed = db as unknown as Db;
  const { seedIfEmpty } = await import('./seed');
  await seedIfEmpty(typed);
  return typed;
}

// Один экземпляр на процесс (и на HMR в dev — через globalThis)
const globalForDb = globalThis as unknown as { __db?: Promise<Db> };

export function getDb(): Promise<Db> {
  globalForDb.__db ??= createDb().catch((error) => {
    globalForDb.__db = undefined;
    throw error;
  });
  return globalForDb.__db;
}

export { schema };
