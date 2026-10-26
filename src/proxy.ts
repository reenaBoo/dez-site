import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth/session';

// Закрываем /admin и /api/admin. Проверка сессии дублируется в server actions (requireAdmin)
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLogin = pathname === '/admin/login';
  const session = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);

  if (pathname.startsWith('/api/admin')) {
    if (!session) return NextResponse.json({ error: 'Требуется вход' }, { status: 401 });
    return NextResponse.next();
  }

  if (!session && !isLogin) {
    const url = new URL('/admin/login', request.url);
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }
  if (session && isLogin) return NextResponse.redirect(new URL('/admin', request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
