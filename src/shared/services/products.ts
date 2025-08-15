import { ApiRoutes } from './constants';
import { ProductsBySlugDTO, TagDTO } from './dto/products.dto';
import { axiosInstance } from './instance';

export const getCards = async (skip = 0, take = 5): Promise<TagDTO[]> => {
  const { data } = await axiosInstance.get<TagDTO[]>(ApiRoutes.PRODUCTS, {
    params: { skip, take },
  });
  return data;
};

export const getProductsBySlug = async (
  slug: string,
  params?: { skip?: number; take?: number },
): Promise<ProductsBySlugDTO> => {
  const { data } = await axiosInstance.get<ProductsBySlugDTO>(`/products/${slug}`, {
    params,
  });
  return data;
};
