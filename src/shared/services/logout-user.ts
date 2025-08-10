import axios from 'axios';
import { axiosInstance } from './instance';

export async function logout() {
  try {
    const { data } = await axiosInstance.post('auth/logout');

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Ошибка выхода');
    }
    throw error;
  }
}
