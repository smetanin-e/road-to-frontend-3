import { Category } from '@prisma/client';
import { ApiRoutes } from './constants';
import { axiosInstance } from './instance';

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await axiosInstance.get<Category[]>(ApiRoutes.CATEGORIES);
  return data;
};
