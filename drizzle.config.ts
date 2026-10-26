import { defineConfig } from 'drizzle-kit';

// Миграции генерируются в src/db/migrations и лежат в репозитории:
//   npm run db:generate — после изменения схемы
//   npm run db:migrate  — применить к БД из DATABASE_URL (на сервере)
// Локально без DATABASE_URL используется встроенный PGlite, миграции применяются автоматически
export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? 'postgres://localhost:5432/biohimmash',
  },
});
