// Применяет миграции из src/db/migrations к PostgreSQL из DATABASE_URL (сервер):
//   npm run db:migrate
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';

const url = process.env.DATABASE_URL;
if (!url) {
  console.error('DATABASE_URL не задан. Локально миграции PGlite применяются автоматически при запуске.');
  process.exit(1);
}

const pool = new Pool({ connectionString: url });
migrate(drizzle(pool), { migrationsFolder: 'src/db/migrations' })
  .then(() => console.log('Миграции применены'))
  .finally(() => pool.end());
