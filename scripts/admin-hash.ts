// Генерация argon2-хэша пароля администратора:
//   npm run admin:hash -- 'мой-пароль'
// Выводит готовую строку для .env: `$` экранированы, иначе Next раскроет их как переменные
import { hash } from '@node-rs/argon2';

const password = process.argv[2];
if (!password || password.length < 10) {
  console.error('Укажите пароль не короче 10 символов: npm run admin:hash -- \'пароль\'');
  process.exit(1);
}

hash(password, { memoryCost: 19456, timeCost: 2, parallelism: 1 }).then((result) => {
  console.log(`ADMIN_PASSWORD_HASH=${result.replaceAll('$', '\\$')}`);
});
