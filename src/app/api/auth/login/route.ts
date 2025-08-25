import { NextRequest, NextResponse } from 'next/server';
import { loginUser, generateAccessToken } from '@/shared/services';
import { loginFormSchema } from '@/shared/schemas';
import {
  findOrCreateCart,
  prisma,
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from '@/shared/lib';

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

    // const userCart = await prisma.cart.findFirst({
    //   where: { userId: user.id },
    // });

    //!РАЗОБРАТЬСЯ С ПРИВЯЗКОЙ КОРЗИНЫ К ПОЛЬЗОВАТЕЛЮ
    // if (!userCart) {
    //   const cartToken = req.cookies.get('cartToken')?.value;
    //   if (cartToken) {
    //     const cart = await findOrCreateCart(cartToken);

    //     await prisma.cart.update({
    //       where: { token: cart.token },
    //       data: { userId: user.id },
    //     });
    //   }
    // }

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
