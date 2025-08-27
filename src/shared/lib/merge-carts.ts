import { prisma } from './prisma-client';
import { updateCartDetails } from './update-cart-details';

//Функция принимает токен корзины из куки и id пользователя
export const mergeCarts = async (guestsCartToken: string, userId: string) => {
  //Находим гостевую корзину
  const guestCart = await prisma.cart.findFirst({
    where: { token: guestsCartToken },
    include: { cartItems: true },
  });

  // Если гостевой корзины нет — ничего не делаем
  if (!guestCart) {
    return;
  }

  // Проверяем, есть ли уже корзина у пользователя
  const userCart = await prisma.cart.findFirst({
    where: { userId },
    include: { cartItems: true },
  });

  // Если корзины нет, просто привязываем гостевую корзину к пользователю
  if (!userCart) {
    await prisma.cart.update({
      where: { token: guestsCartToken },
      data: { userId },
    });
    return;
  }

  // 4. Объединяем товары
  for (const guestsCartItem of guestCart.cartItems) {
    const existingItem = userCart.cartItems.find((item) => item.id === guestsCartItem.id);
    if (existingItem) {
      // Если товар уже есть в корзине пользователя → обновляем количество
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + guestsCartItem.quantity },
      });
    } else {
      // Если товара нет → переносим из гостевой корзины
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          bookId: guestsCartItem.bookId,
          quantity: guestsCartItem.quantity,
        },
      });
      //пересчитываем количество и общую стоимость товаров
      await updateCartDetails(userCart.token);
    }
  }

  // Удаляем гостевую корзину и её товары
  await prisma.cart.delete({
    where: { id: guestCart.id },
  });

  return userCart.id;
};
