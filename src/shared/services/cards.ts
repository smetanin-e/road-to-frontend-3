import { ApiRoutes } from './constants';
import { TagDTO } from './dto/book-cards.dto';
import { axiosInstance } from './instance';

export const getCards = async (): Promise<TagDTO[]> => {
  const { data } = await axiosInstance.get<TagDTO[]>(ApiRoutes.CARDS);
  return data;
};
