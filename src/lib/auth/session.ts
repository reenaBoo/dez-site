import { SignJWT, jwtVerify } from 'jose';

// Этот модуль без Node-зависимостей — используется и в proxy.ts, и в серверном коде

export const SESSION_COOKIE = 'npp_admin';
export const SESSION_TTL_SECONDS = 60 * 60 * 12;

function secretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('SESSION_SECRET не задан или короче 32 символов (см. .env.example)');
  }
  return new TextEncoder().encode(secret);
}

export interface SessionPayload {
  sub: string;
}

export async function createSessionToken(login: string): Promise<string> {
  return new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(login)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .setAudience('npp-admin')
    .sign(secretKey());
}

export async function verifySessionToken(token: string | undefined): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey(), { audience: 'npp-admin', algorithms: ['HS256'] });
    if (!payload.sub || payload.sub !== process.env.ADMIN_LOGIN) return null;
    return { sub: payload.sub };
  } catch {
    return null;
  }
}
