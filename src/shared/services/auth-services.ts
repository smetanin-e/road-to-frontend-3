'use server';
import { Prisma } from '@prisma/client';
import { generateSalt, hashPassword, verifyPassword } from '../lib/passwordHasher';
import { prisma } from '../lib/prisma-client';
import { generateRefreshToken } from './token-service';

const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7;

export async function createUser(data: Prisma.UserCreateInput) {
  try {
    const salt = generateSalt();
    const hashedPassword = await hashPassword(data.password, salt);

    const findUser = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (findUser) {
      throw new Error('Пользователь с таким Email уже существует');
    }

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        salt,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
      },
    });

    const refreshToken = generateRefreshToken();
    const expiresAt = new Date(Date.now() + 1000 * SESSION_EXPIRATION_SECONDS);

    await prisma.session.create({
      data: {
        userId: user.id,
        refreshToken,
        expiresAt,
      },
    });

    return { user, refreshToken };
  } catch (error) {
    console.log('Error [CREATE_USER]', error);
    throw error;
  }
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('Пользователь не найден');
  }

  const isValidPassword = await verifyPassword(password, user.password, user.salt!);

  if (!isValidPassword) {
    {
      throw new Error('Неверный пароль');
    }
  }

  //удаляем старые сессии
  await prisma.session.deleteMany({
    where: { userId: user.id },
  });

  const refreshToken = generateRefreshToken();
  const expiresAt = new Date(Date.now() + 1000 * SESSION_EXPIRATION_SECONDS);

  await prisma.session.create({
    data: {
      userId: user.id,
      refreshToken,
      expiresAt,
    },
  });
  return { user, refreshToken };
}
