import { User } from '@prisma/client';
import { axiosInstance } from './instance';

export async function refreshAccessToken(): Promise<User | false> {
  try {
    const res = await axiosInstance.post('auth/refresh', null, {
      withCredentials: true,
    });

    if (!res.data?.success || !res.data.user) {
      throw new Error('Не удалось обновить токен или нет пользователя');
    }

    return res.data.user;
  } catch (error) {
    console.error('Ошибка в refreshAccessToken:', error);
    return false;
  }
}
