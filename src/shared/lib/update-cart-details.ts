// Функция обновления цены и количества товаров в корзине

import { prisma } from './prisma-client';

export const updateCartDetails = async (token: string) => {
  const userCart = await prisma.cart.findFirst({
    where: { token },
    include: {
      cartItems: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          book: true,
        },
      },
    },
  });

  if (!userCart) {
    return;
  }

  const totalAmount = userCart.cartItems.reduce((acc, item) => {
    return acc + item.quantity * item.book!.price;
  }, 0);

  const totalQuantity = userCart.cartItems.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  return await prisma.cart.update({
    where: { id: userCart.id },
    data: {
      totalAmount,
      totalQuantity,
    },
    include: {
      cartItems: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          book: {
            select: {
              id: true,
              title: true,
              price: true,
              sale: true,
              images: {
                where: { order: 0 },
                select: { url: true },
              },
              author: {
                select: { name: true },
              },
            },
          },
        },
      },
    },
  });
};
