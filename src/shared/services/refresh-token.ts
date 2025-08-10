import { axiosInstance } from './instance';

export async function refreshAccessToken___(): Promise<boolean> {
  try {
    const { data } = await axiosInstance.post('auth/refresh', {}, { withCredentials: true });
    return Boolean(data?.success);
  } catch (error) {
    console.error('Ошибка в refreshAccessToken:', error);
    return false;
  }
}
