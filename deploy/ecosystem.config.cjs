// PM2: pm2 start deploy/ecosystem.config.cjs && pm2 save && pm2 startup
// Переменные окружения берутся из /var/www/biohimmash/app/.env (см. .env.example)
module.exports = {
  apps: [{
    name: 'biohimmash',
    cwd: '/var/www/biohimmash/app',
    script: 'node_modules/next/dist/bin/next',
    args: 'start -p 3000 -H 127.0.0.1',
    // Один процесс: лимит попыток входа и кэш живут в памяти процесса
    instances: 1,
    exec_mode: 'fork',
    max_memory_restart: '700M',
    env: { NODE_ENV: 'production' },
    out_file: '/var/log/biohimmash/out.log',
    error_file: '/var/log/biohimmash/error.log',
    time: true,
  }],
};
