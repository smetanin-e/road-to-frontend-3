import { NextRequest } from 'next/server';
export function getRefreshTokenFromCookies(req: NextRequest) {
  console.log('Все куки:', req.cookies);
  const token = req.cookies.get('refresh_token')?.value;
  return token;
}
