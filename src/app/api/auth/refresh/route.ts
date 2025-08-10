import { getRefreshTokenFromCookies } from '@/shared/lib/get-refresh-token-from-cookies';
import { generateAccessToken } from '@/shared/services/token-service';
import { validateRefreshToken } from '@/shared/services/validate-refresh-token';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const token = getRefreshTokenFromCookies(req);
    if (!token) {
      return NextResponse.json({ error: 'Refresh token отсутствует' }, { status: 401 });
    }

    const user = await validateRefreshToken(token);
    const accessToken = generateAccessToken({
      userId: user.id,
      role: user.role,
    });

    const response = NextResponse.json({ success: true, accessToken, user });
    response.cookies.set('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',

      sameSite: 'strict',
      maxAge: 60 * 15, // 15 минут
      path: '/',
    });
    return response;
  } catch (error) {
    console.error('Ошибка при обновлении access token:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 401 });
  }
}
