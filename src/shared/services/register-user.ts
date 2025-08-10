import { RegisterFormType } from '@/shared/schemas';
import axios from 'axios';
import { axiosInstance } from './instance';

export async function registerUser(data: RegisterFormType) {
  try {
    const res = await axiosInstance.post<RegisterFormType>('auth/register', data, {
      headers: { 'Content-Type': 'application/json' },
    });

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Ошибка регистрации');
    }
    throw error;
  }
}
