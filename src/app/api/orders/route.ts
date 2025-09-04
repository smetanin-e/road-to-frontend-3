import { prisma } from '@/shared/lib';
import { getUserFromAccessToken } from '@/shared/services';
import { OrderStatus } from '@prisma/client';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const cookieStore = cookies();
    const token = (await cookieStore).get('access_token')?.value;
    console.log('TOOOOOOOOOOOOOKEN=', token);
    if (!token) {
      return NextResponse.json({ message: 'Токен не найден' }, { status: 500 }); //разобраться со статусами
    }

    const user = await getUserFromAccessToken(token);
    console.log('USSSSSSSSSSSSER=', user);
    if (!user) {
      return NextResponse.json({ message: 'Не удалось найти пользователя' }, { status: 500 }); //разобраться со статусами
    }
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

    const order = await prisma.order.create({
      data: {
        user: { connect: { id: user.id } },
        fullname: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address ? data.address : null,
        comment: data.comment ? data.comment : 'Нет комментария',
        deliveryType: data.deliveryType,
        deliveryPrice: data.deliveryPrice,
        itemsAmount: cart.totalAmount,
        totalAmount: cart.totalAmount + data.deliveryPrice,
        status: OrderStatus.PENDING,
        items: JSON.stringify(cart.cartItems),
      },
    });

    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        totalAmount: 0,
        totalQuantity: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error('[API_ORDERS] Server error', error);
  }
}
