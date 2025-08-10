import { prisma } from '../lib/prisma-client';

export async function validateRefreshToken(refreshToken: string) {
  const session = await prisma.session.findUnique({
    where: { refreshToken },
    //include: { user: true },
    select: {
      id: true,
      refreshToken: true,
      expiresAt: true,
      user: {
        select: {
          id: true,
          email: true,
          role: true,
          firstName: true,
          lastName: true,
          phone: true,
        },
      },
    },
  });

  if (!session) {
    throw new Error('Недействительный refresh token');
  }

  if (session.expiresAt.getTime() < Date.now()) {
    //удаляем просроченный токен
    await prisma.session.delete({ where: { refreshToken } });
    throw new Error('Refresh token истек');
  }

  return session.user;
}
