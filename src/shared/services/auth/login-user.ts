import { LoginFormType } from '@/shared/schemas';
import axios from 'axios';
import { axiosInstance, getMe } from '@/shared/services';
import { useUserStore } from '@/shared/store/user';

export async function signIn(data: LoginFormType) {
  try {
    const res = await axiosInstance.post<LoginFormType>('auth/login', data, {
      headers: { 'Content-Type': 'application/json' },
    });

    const user = await getMe();
    useUserStore.getState().setUser(user);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Ошибка входа');
    }
    throw error;
  }
}
