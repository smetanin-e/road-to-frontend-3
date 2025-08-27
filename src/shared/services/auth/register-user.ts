import { RegisterFormType } from '@/shared/schemas';
import axios from 'axios';
import { axiosInstance } from '../instance';
import { getMe } from './get-me';
import { useUserStore } from '@/shared/store/user';

export async function registerUser(data: RegisterFormType) {
  try {
    const res = await axiosInstance.post<RegisterFormType>('auth/register', data, {
      headers: { 'Content-Type': 'application/json' },
    });

    //Получаем пользователя и обновляем его в zustand,
    //чтобы при успешной регистрации обновить шапку
    const user = await getMe();
    useUserStore.getState().setUser(user);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Ошибка регистрации');
    }
    throw error;
  }
}
