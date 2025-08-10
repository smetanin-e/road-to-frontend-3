//import { User } from '@prisma/client';
//import { axiosInstance } from './instance';
import { getMeServer } from './get-me-server';
import { getMeClient } from './get-me-client';

// export const getMe = async () => {
//   const { data } = await axiosInstance.get<User>('auth/me');

//   return data;
// };
export const getMe = async () => {
  if (typeof window === 'undefined') {
    return getMeServer();
  }
  return getMeClient();
};
