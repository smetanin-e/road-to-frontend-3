import { setAccessTokenCookie, setRefreshTokenCookie } from '@/shared/lib';

import { loginFormSchema } from '@/shared/schemas';
import { loginUser, generateAccessToken } from '@/shared/services';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = loginFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Невалидные данные' }, { status: 400 });
    }

    const { email, password } = parsed.data;

    const { user, refreshToken } = await loginUser(email, password);
    const accessToken = generateAccessToken({
      userId: user.id,
      role: user.role,
    });
    const refreshTokenMaxAge = 60 * 60 * 24 * 7;
    const accessTokenMaxAge = 60 * 15; // 15 минут

    const response = NextResponse.json({ accessToken });

    setRefreshTokenCookie(response, refreshToken, refreshTokenMaxAge);
    setAccessTokenCookie(response, accessToken, accessTokenMaxAge);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    console.error('Не удалось войти в аккаунт:', error);
    return NextResponse.json({ error: 'Ошибка' }, { status: 401 });
  }
}
