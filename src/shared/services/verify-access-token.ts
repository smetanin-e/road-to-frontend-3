import jwt from 'jsonwebtoken';

export function verifyAccessToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
  } catch {
    return null;
  }
}
