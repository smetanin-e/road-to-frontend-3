import { PayOrderTemplate } from '@/shared/components/email-templates';
import { prisma, sendEmail } from '@/shared/lib';
import { getUserFromAccessToken } from '@/shared/services';
import { OrderStatus } from '@prisma/client';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const cookieStore = cookies();

    //Получаем токен из кукис
    const token = (await cookieStore).get('access_token')?.value;
    if (!token) {
      return NextResponse.json({ message: 'Токен не найден' }, { status: 500 }); //разобраться со статусами
    }
    //Получаем пользователя по токену
    const user = await getUserFromAccessToken(token);
    if (!user) {
      return NextResponse.json({ message: 'Не удалось найти пользователя' }, { status: 500 }); //разобраться со статусами
    }

    //Ищем корзину по id пользователя
    const cart = await prisma.cart.findFirst({
      where: { userId: user.id },
      include: {
        cartItems: { include: { book: { select: { price: true, title: true, images: true } } } },
      },
    });

    if (!cart) {
      return NextResponse.json({ message: 'Корзина не найдена' }, { status: 500 }); //разобраться со статусами
    }
    if (cart?.totalAmount === 0) {
      return NextResponse.json({ message: 'В корзине нет товаров' }, { status: 500 }); //разобраться со статусами
    }

    //Создаем заказ в базе данных
    const order = await prisma.order.create({
      data: {
        user: { connect: { id: user.id } },
        fullname: body.firstName + ' ' + body.lastName,
        email: body.email,
        phone: body.phone,
        address: body.address ? body.address : null,
        comment: body.comment ? body.comment : 'Нет комментария',
        deliveryType: body.deliveryType,
        deliveryPrice: body.deliveryPrice,
        itemsAmount: cart.totalAmount,
        totalAmount: cart.totalAmount + body.deliveryPrice,
        status: OrderStatus.PENDING,
        items: JSON.stringify(cart.cartItems),
      },
    });

    //Обновляем корзину
    //Сбрасываем сумму и количество
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        totalAmount: 0,
        totalQuantity: 0,
      },
    });

    //Удаляем товары
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    //
    const paymentUrl = 'https://ya.ru/';
    const template = PayOrderTemplate({
      orderId: order.id,
      totalAmount: cart.totalAmount + body.deliveryPrice,
      paymentUrl, //Вернуться на сайт
    });

    await sendEmail(body.email, 'Оплатите заказ № ' + order.id, template);

    return NextResponse.json(paymentUrl);
  } catch (error) {
    console.error('[API_ORDERS] Server error', error);
  }
}
