import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';
import { BookDTO } from './dto/products.dto';

export const search = async (query: string): Promise<BookDTO[]> => {
  return (await axiosInstance.get<BookDTO[]>(ApiRoutes.SEARCH_PRODUCTS, { params: { query } }))
    .data;
};
