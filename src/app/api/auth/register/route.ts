import { NextRequest, NextResponse } from 'next/server';
import { createUser, generateAccessToken } from '@/shared/services';
import { registerFormSchema } from '@/shared/schemas';
import { mergeCarts, prisma, setAccessTokenCookie, setRefreshTokenCookie } from '@/shared/lib';

export async function POST(req: NextRequest) {
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
    const accessTokenMaxAge = 60 * 15; // 15 минут

    const response = NextResponse.json({ accessToken });
    setRefreshTokenCookie(response, refreshToken, maxAge);
    setAccessTokenCookie(response, accessToken, accessTokenMaxAge);

    // Обработка корзины
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
    console.error('Ошибка при регистрации:', error);
    return NextResponse.json({ error: 'Что-то пошло не так' }, { status: 500 });
  }
}
