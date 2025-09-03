import { prisma } from '@/shared/lib';
import { getUserFromAccessToken } from '@/shared/services';
import { OrderStatus } from '@prisma/client';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const cookieStore = cookies();
    const token = (await cookieStore).get('access_token')?.value;
    if (!token) {
      throw new Error('user token found');
    }

    const user = await getUserFromAccessToken(token);
    if (!user) {
      throw new Error('user not found');
    }
    const cart = await prisma.cart.findFirst({
      where: { userId: user.id },
      include: { cartItems: true },
    });

    if (!cart) {
      throw new Error('cart not found');
    }
    if (cart?.totalAmount === 0) {
      throw new Error('cart is empty');
    }

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        fullname: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        deliveryType: data.deliveryType,
        deliveryPrice: 0,
        itemsAmount: cart.totalAmount,
        totalAmount: cart.totalAmount,
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
  } catch (error) {
    console.error('[API_ORDERS] Server error', error);
  }
}
