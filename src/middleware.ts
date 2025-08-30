import { NextRequest, NextResponse } from 'next/server';

import { getUserFromAccessToken } from './shared/services';

export const runtime = 'nodejs';

export async function middleware(req: NextRequest) {
  console.log('🔥 Middleware is running! Pathname:', req.nextUrl.pathname);

  const { pathname } = req.nextUrl;
  const token = req.cookies.get('access_token')?.value;

  //!ЕСЛИ ТОКЕН НЕ ПРОВЕРИТЬ В БАЗЕ, ТО ВОЗНИКАЕТ ПРОБЛЕМА
  //!ЕСЛИ НЕТ ПОЛЬЗОВАТЕЛЯ, НО В КУКАХ ВРУЧНУЮ ДОБАВИТЬ ЛЮБОЙ 'access_token'
  //!ТОГДА СТРАНИЦА ОТКРОЕТСЯ

  if (!token) {
    return NextResponse.redirect(new URL('/blocked-checkout', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/checkout', '/checkout/', '/checkout/:path*'],
};
