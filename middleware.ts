import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  console.log('🔥 Middleware is running! Pathname:', req.nextUrl.pathname);

  return NextResponse.next();
}

export const config = {
  matcher: ['/checkout', '/checkout/', '/checkout/:path*'],
};
