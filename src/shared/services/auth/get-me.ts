import { getMeClient, getMeServer } from '@/shared/services';

export const getMe = async () => {
  if (typeof window === 'undefined') {
    return getMeServer();
  }
  return getMeClient();
};
