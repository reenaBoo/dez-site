import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { verify } from '@node-rs/argon2';
import { timingSafeEqual } from 'node:crypto';
import { SESSION_COOKIE, SESSION_TTL_SECONDS, createSessionToken, verifySessionToken } from './session';

// ─── Ограничение попыток входа (один процесс Next — хватает памяти) ─────────
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const attempts = new Map<string, { count: number; first: number }>();

async function clientKey(): Promise<string> {
  const h = await headers();
  return h.get('x-real-ip') ?? h.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local';
}

export async function isRateLimited(): Promise<boolean> {
  const key = await clientKey();
  const entry = attempts.get(key);
  if (!entry) return false;
  if (Date.now() - entry.first > WINDOW_MS) {
    attempts.delete(key);
    return false;
  }
  return entry.count >= MAX_ATTEMPTS;
}

async function registerFailure() {
  const key = await clientKey();
  const entry = attempts.get(key);
  if (!entry || Date.now() - entry.first > WINDOW_MS) attempts.set(key, { count: 1, first: Date.now() });
  else entry.count++;
}

async function clearFailures() {
  attempts.delete(await clientKey());
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export async function checkCredentials(login: string, password: string): Promise<boolean> {
  const expectedLogin = process.env.ADMIN_LOGIN;
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!expectedLogin || !hash) throw new Error('ADMIN_LOGIN и ADMIN_PASSWORD_HASH не заданы (см. .env.example)');

  // Хэш проверяем всегда, даже при неверном логине, — чтобы время ответа не выдавало логин
  let passwordOk = false;
  try {
    passwordOk = await verify(hash, password);
  } catch {
    passwordOk = false;
  }
  const ok = safeEqual(login, expectedLogin) && passwordOk;
  if (ok) await clearFailures();
  else await registerFailure();
  return ok;
}

export async function startSession(login: string) {
  const token = await createSessionToken(login);
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function endSession() {
  (await cookies()).delete(SESSION_COOKIE);
}

export async function getSession() {
  return verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value);
}

// Вызывается в каждом server action и route handler админки — proxy.ts защищает
// только адреса страниц, а server action можно вызвать с любого пути
export async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect('/admin/login');
  return session;
}
