import { NextRequest, NextResponse } from 'next/server';
import { loginUser, generateAccessToken } from '@/shared/services';
import { loginFormSchema } from '@/shared/schemas';
import { mergeCarts, prisma, setAccessTokenCookie, setRefreshTokenCookie } from '@/shared/lib';

export async function POST(req: NextRequest) {
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

    const userCart = await prisma.cart.findFirst({
      where: { userId: user.id },
    });

    const token = req.cookies.get('cartToken')?.value;

    if (!userCart) {
      if (token) {
        await prisma.cart.update({
          where: { token },
          data: { userId: user.id },
        });

        response.cookies.delete('cartToken');
      } else {
        await prisma.cart.create({
          data: {
            token: crypto.randomUUID(),
            userId: user.id,
          },
        });
      }
    } else {
      if (token) {
        //объединить козины
        await mergeCarts(token, user.id);
        response.cookies.delete('cartToken');
      }
    }

    return response;
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    console.error('Не удалось войти в аккаунт:', error);
    return NextResponse.json({ error: 'Ошибка' }, { status: 401 });
  }
}
