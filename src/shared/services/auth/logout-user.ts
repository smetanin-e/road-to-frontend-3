import axios from 'axios';
import { axiosInstance } from '../instance';
import { useUserStore } from '@/shared/store/user';
import { useCartStore } from '@/shared/store/cart';

export async function logout() {
  try {
    const { data } = await axiosInstance.post('auth/logout');
    useUserStore.getState().setUser(null);
    useCartStore.getState().resetCart();

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Ошибка выхода');
    }
    throw error;
  }
}
