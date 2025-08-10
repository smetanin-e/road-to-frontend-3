import { setRefreshTokenCookie } from '@/shared/lib/set-refresh-token-cookie';
import { registerFormSchema } from '@/shared/schemas';
import { createUser } from '@/shared/services/auth-services';
import { generateAccessToken } from '@/shared/services/token-service';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = registerFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: 'Невалидные данные' }, { status: 400 });
    }

    const { user, refreshToken } = await createUser(result.data);
    const accessToken = generateAccessToken({
      userId: user.id,
      role: user.role,
    });
    const maxAge = 60 * 60 * 24 * 7;

    const response = NextResponse.json({ accessToken });
    setRefreshTokenCookie(response, refreshToken, maxAge);

    return response;
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    return NextResponse.json({ error: 'Что-то пошло не так' }, { status: 500 });
  }
}
