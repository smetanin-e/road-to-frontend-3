import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/shared/lib';

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get('refresh_token')?.value;
    if (refreshToken) {
      await prisma.session.deleteMany({
        where: { refreshToken },
      });
    }
    const response = NextResponse.json({ message: 'Вы вышли из аккаунта' });

    response.cookies.set('access_token', '', {
      httpOnly: true,
      path: '/',
      maxAge: 0,
    });

    response.cookies.set('refresh_token', '', {
      httpOnly: true,
      path: '/',
      maxAge: 0,
    });

    response.cookies.delete('cartToken');

    return response;
  } catch (error) {
    console.error('Ошибка при выходе:', error);
    return NextResponse.json({ error: 'Ошибка при выходе:' }, { status: 500 });
  }
}
