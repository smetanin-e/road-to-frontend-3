import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User } from '@prisma/client';
import { prisma } from '@/shared/lib';

const JWT_SECRET = process.env.JWT_SECRET!;

export function generateAccessToken(payload: { userId: string; role: string }) {
  if (!JWT_SECRET) {
    throw new Error('❌ JWT_SECRET is undefined! Убедись, что он задан в .env');
  }
  const token = jwt.sign(
    {
      ...payload,
      iat: Math.floor(Date.now() / 1000),
      jti: crypto.randomUUID(),
    },
    JWT_SECRET,
    {
      expiresIn: '15m',
    },
  );

  return token;
}

export function generateRefreshToken() {
  return crypto.randomBytes(64).toString('hex').normalize();
}

type JwtPayload = {
  userId: string;
  role: 'USER' | 'ADMIN';
};

export async function getUserFromAccessToken(token: string): Promise<User | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error('[getUserFromAccessToken]', error);
    return null;
  }
}
