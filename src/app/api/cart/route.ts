import { findOrCreateCart, findUserCartToken, prisma, updateCartDetails } from '@/shared/lib';
import { CreateCartItemValue } from '@/shared/services/dto/cart.dto';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get('refresh_token')?.value; //берем из куки refreshToken
    const userCartToken = await findUserCartToken(refreshToken); // получаем токен, если есть
    const token = userCartToken || req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({});
    }

    const userCart = await prisma.cart.findFirst({
      where: { token },
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
                oldPrice: true,
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

    const resp = NextResponse.json(userCart);
    if (!userCartToken) {
      resp.cookies.set('cartToken', token);
    }

    return resp;
  } catch (error) {
    console.log('[CART_GET] Server error', error);
    return NextResponse.json({ message: 'Не удалось получить корзину' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get('refresh_token')?.value; //берем из куки refreshToken
    const userCartToken = await findUserCartToken(refreshToken); // получаем токен, если есть
    let token = userCartToken || req.cookies.get('cartToken')?.value;

    //если его нет, создаем
    if (!token) {
      token = crypto.randomUUID();
    }
    const userCart = await findOrCreateCart(token);
    const data = (await req.json()) as CreateCartItemValue;

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        bookId: data.bookId,
      },
    });

    //проверяем был ли ранее товар добавлен в корзину, чтобы избежать дубликатов
    if (!findCartItem) {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          bookId: data.bookId,
        },
      });
    } else {
      await prisma.cartItem.update({
        where: { id: findCartItem.id },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    }

    const updateUserCart = await updateCartDetails(token);
    const resp = NextResponse.json(updateUserCart);

    resp.cookies.set('cartToken', token);

    return resp;
  } catch (error) {
    console.log('[CART_POST] Server error', error);
    return NextResponse.json({ message: 'Не удалось создать корзину' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get('refresh_token')?.value; //берем из куки refreshToken
    const userCartToken = await findUserCartToken(refreshToken); // получаем токен, если есть

    const token = userCartToken || req.cookies.get('cartToken')?.value;
    if (!token) {
      return NextResponse.json('Cart token not found');
    }

    const cart = await prisma.cart.findFirst({
      where: { token },
    });

    if (!cart) {
      return NextResponse.json('Cart not found');
    }

    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    const updateCart = updateCartDetails(token);
    return NextResponse.json(updateCart);
  } catch (error) {
    console.error('[CART_DELETE] Server error', error);
    return NextResponse.json({ message: 'Ошибка при очистке корзины' }, { status: 500 });
  }
}
