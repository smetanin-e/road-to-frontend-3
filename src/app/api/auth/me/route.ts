import { getRefreshTokenFromCookies } from '@/shared/lib';
import { generateAccessToken, validateRefreshToken } from '@/shared/services';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
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

    const response = NextResponse.json({ success: true, accessToken });
    response.cookies.set('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',

      sameSite: 'strict',
      maxAge: 60 * 15, // 15 минут
      path: '/',
    });

    if (!user) {
      throw new Error('Пользователь не авторизован');
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error('Ошибка при обновлении access token:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 401 });
  }
}
