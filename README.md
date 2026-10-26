# 🦟 НПП «БИОХИММАШ» - Сайт компании по дезинсекции

Современный веб-сайт для компании, специализирующейся на профессиональной дезинсекции, дератизации и дезинфекции.

🌐
Сайт: [нппбиохиммаш.рф](https://нппбиохиммаш.рф) / [xn--80abvauackga3exb.xn--p1ai](https://xn--80abvauackga3exb.xn--p1ai)

## 🛠 Технологии

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Styled Components
- **Email:** [Resend API](https://resend.com/)
- **Forms:** React Hook Form
- **Icons:** Lucide React
- **БД:** PostgreSQL + Drizzle ORM (локально — PGlite)
- **Редактор статей:** TipTap, dnd-kit; изображения — sharp

## 💻 Локальная разработка

### Требования:

- Node.js 20.x LTS
- npm 10.x

### Установка:

```bash
# Клонировать репозиторий
git clone https://github.com/reenaBoo/dez-site.git
cd dez-site

# Установить зависимости
npm install

# Создать .env.local по образцу (логин/пароль админки, секрет сессии)
cp .env.example .env.local

# Запустить dev сервер
npm run dev
```

Сайт будет доступен на [http://localhost:3000](http://localhost:3000), админка — на `/admin`.
Без `DATABASE_URL` используется встроенный PGlite в `./.data` (миграции и демо-статьи применяются автоматически).

Деплой на VPS, nginx, бэкапы — в [DEPLOY.md](DEPLOY.md).

### Доступные команды:

Собрать production билд

```
npm run build
```

Запустить production сервер

```
npm run start
```

## 📄 Лицензия

MIT License - см. [LICENSE](LICENSE)
