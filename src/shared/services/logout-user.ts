import axios from 'axios';
import { axiosInstance } from './instance';
import { useUserStore } from '@/store/user';

export async function logout() {
  try {
    const { data } = await axiosInstance.post('auth/logout');
    useUserStore.getState().setUser(null);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Ошибка выхода');
    }
    throw error;
  }
}
