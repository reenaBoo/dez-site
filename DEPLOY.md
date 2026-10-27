# Деплой на VPS reg.ru

Сайт работает как Next.js-сервер (`next build` + `next start`) за nginx, с PostgreSQL на том же сервере.
Выкладка — вручную (GitHub Actions workflow не используется для этого сервера).

## 1. Сервер (один раз)

Ubuntu 22.04/24.04, 2 ГБ RAM и больше.

```bash
# Node.js 22 LTS, nginx, PostgreSQL, certbot
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs nginx postgresql certbot python3-certbot-nginx rsync
sudo npm i -g pm2

# Пользователь и папки
sudo useradd -m -s /bin/bash biohimmash
sudo mkdir -p /var/www/biohimmash/{app,media} /var/log/biohimmash
sudo chown -R biohimmash:biohimmash /var/www/biohimmash /var/log/biohimmash

# База
sudo -u postgres psql -c "CREATE USER biohimmash WITH PASSWORD 'СЛОЖНЫЙ_ПАРОЛЬ';"
sudo -u postgres psql -c "CREATE DATABASE biohimmash OWNER biohimmash;"
```

## 2. Переменные окружения

`/var/www/biohimmash/app/.env` — по образцу `.env.example`:

| Переменная | Значение |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://xn--80abvauackga3exb.xn--p1ai` |
| `DATABASE_URL` | `postgres://biohimmash:ПАРОЛЬ@127.0.0.1:5432/biohimmash` |
| `MEDIA_DIR` | `/var/www/biohimmash/media` |
| `ADMIN_LOGIN` | логин админа |
| `ADMIN_PASSWORD_HASH` | вывод `npm run admin:hash -- 'пароль'` (строка уже с экранированными `\$`) |
| `SESSION_SECRET` | `openssl rand -base64 48` |
| `INDEXNOW_KEY` | любая строка 8–128 символов `[a-zA-Z0-9-]`, отдаётся по `/indexnow-key.txt` |
| `YANDEX_VERIFICATION`, `GOOGLE_SITE_VERIFICATION` | значение `content` из meta-тега подтверждения |

`NEXT_PUBLIC_SITE_URL` подставляется при сборке — после его изменения нужен `npm run build`.

## 3. Выкладка / обновление

```bash
cd /var/www/biohimmash/app
git pull                      # или загрузить файлы вручную
npm ci
npm run db:migrate            # применить миграции из src/db/migrations
npm run db:seed               # только при первом запуске, если нужны демо-статьи
npm run build
pm2 startOrReload deploy/ecosystem.config.cjs && pm2 save
```

Первый запуск PM2 после перезагрузки сервера: `pm2 startup` (выполнить выведенную команду).
Вместо PM2 можно использовать systemd — `deploy/biohimmash.service`.

> Next обновлён до 16.4.3 (критическая уязвимость 16.4.0 закрыта); при обновлениях — `npm i next@latest eslint-config-next@latest`.

## 4. nginx и SSL

```bash
sudo cp deploy/nginx.conf /etc/nginx/sites-available/biohimmash.conf
sudo ln -s /etc/nginx/sites-available/biohimmash.conf /etc/nginx/sites-enabled/
sudo certbot --nginx -d xn--80abvauackga3exb.xn--p1ai -d www.xn--80abvauackga3exb.xn--p1ai \
  -d nppbiohimmash.ru -d www.nppbiohimmash.ru
sudo nginx -t && sudo systemctl reload nginx
```

Конфиг делает 301 с `nppbiohimmash.ru` и `www` на `нппбиохиммаш.рф`, отдаёт `/media/` с диска и
кэширует статику. DNS обоих доменов должен указывать на IP сервера.

## 5. Бэкапы

```bash
sudo cp deploy/backup.sh /usr/local/bin/biohimmash-backup && sudo chmod +x /usr/local/bin/biohimmash-backup
sudo crontab -e   # 15 3 * * * /usr/local/bin/biohimmash-backup >> /var/log/biohimmash/backup.log 2>&1
```

Дамп БД (`pg_dump -Fc`) и снимок папки медиа, хранение 14 дней в `/var/backups/biohimmash`.
Рекомендуется дополнительно копировать эту папку за пределы сервера (S3 reg.ru или другой хост).

Восстановление: `pg_restore --clean -d biohimmash db_ДАТА.dump` и `rsync -a media_ДАТА/ /var/www/biohimmash/media/`.

## 6. После запуска

- Яндекс.Вебмастер и Google Search Console: добавить сайт, подтвердить через meta-тег (переменные выше),
  отправить `https://нппбиохиммаш.рф/sitemap.xml`. В Вебмастере — подключить IndexNow и RSS `/news/rss.xml`.
- Яндекс.Метрика: создать JavaScript-цели `phone_click`, `email_click`, `telegram_click`,
  `article_cta`, `article_cta_phone`, `article_to_services`, `article_to_contacts`, `article_internal_link`.
- Проверить разметку: https://webmaster.yandex.ru/tools/microtest/ и https://search.google.com/test/rich-results.

## Локальная разработка

```bash
npm install
npm run dev     # без DATABASE_URL — встроенный PGlite в ./.data, миграции и демо-сид применяются сами
```

Админка: http://localhost:3000/admin, логин и пароль — в `.env.local` (создать по `.env.example`).
Не запускайте одновременно два процесса Next (dev и start) на одном каталоге PGlite — для второго
задайте `PGLITE_DIR=.data/pglite-prod`.
