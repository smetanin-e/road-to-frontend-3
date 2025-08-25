// Функция принимает refreshToken из куки. По нему ищем сессию прользователя
// находим корзину по id пользователя из сессии
// из корзины берем токен и возврахаем его

import { prisma } from './prisma-client';

export const findUserCartToken = async (refreshToken: string | undefined) => {
  if (!refreshToken) {
    return undefined;
  }
  const session = await prisma.session.findFirst({ where: { refreshToken } });
  if (!session) {
    return undefined;
  }

  const userCart = await prisma.cart.findFirst({ where: { userId: session.userId } });
  if (!userCart) {
    return undefined;
  }

  const token = userCart.token;
  if (!token) {
    return undefined;
  }

  return token;
};
