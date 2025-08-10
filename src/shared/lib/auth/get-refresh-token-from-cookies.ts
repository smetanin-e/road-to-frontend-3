import { NextRequest } from 'next/server';
export function getRefreshTokenFromCookies(req: NextRequest) {
  return req.cookies.get('refresh_token')?.value;
}
