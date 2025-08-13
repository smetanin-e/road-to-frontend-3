import { Tag } from '@prisma/client';
import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';

export const getTags = async (): Promise<Tag[]> => {
  return (await axiosInstance.get<Tag[]>(ApiRoutes.TAGS)).data;
};
