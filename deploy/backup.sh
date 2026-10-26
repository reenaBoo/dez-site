#!/usr/bin/env bash
# Ежедневный бэкап БД и медиа. cron (от root):
#   15 3 * * * /var/www/biohimmash/app/deploy/backup.sh >> /var/log/biohimmash/backup.log 2>&1
set -euo pipefail

BACKUP_DIR=/var/backups/biohimmash
MEDIA_DIR=/var/www/biohimmash/media
DB_NAME=biohimmash
KEEP_DAYS=14
STAMP=$(date +%Y-%m-%d_%H%M)

mkdir -p "$BACKUP_DIR"

# База: сжатый дамп в формате custom (восстановление: pg_restore -d biohimmash файл.dump)
sudo -u postgres pg_dump -Fc "$DB_NAME" > "$BACKUP_DIR/db_$STAMP.dump"

# Медиа: архив с жёсткими ссылками на неизменённые файлы предыдущего бэкапа (экономия места)
LATEST="$BACKUP_DIR/media_latest"
rsync -a --delete --link-dest="$LATEST" "$MEDIA_DIR/" "$BACKUP_DIR/media_$STAMP/"
ln -sfn "$BACKUP_DIR/media_$STAMP" "$LATEST"

# Ротация
find "$BACKUP_DIR" -maxdepth 1 -name 'db_*.dump' -mtime +$KEEP_DAYS -delete
find "$BACKUP_DIR" -maxdepth 1 -type d -name 'media_20*' -mtime +$KEEP_DAYS -exec rm -rf {} +

echo "[$STAMP] backup ok"
