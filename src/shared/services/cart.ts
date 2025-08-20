import { ApiRoutes } from './constants';
import { CartDTO, CreateCartItemValue } from './dto/cart.dto';
import { axiosInstance } from './instance';

export const getCart = async (): Promise<CartDTO> => {
  const { data } = await axiosInstance.get<CartDTO>(ApiRoutes.CART);
  return data;
};

export const updateItemsQuantity = async (itemId: number, quantity: number): Promise<CartDTO> => {
  const { data } = await axiosInstance.patch<CartDTO>('/cart/' + itemId, { quantity });
  return data;
};

export const addToCart = async (value: CreateCartItemValue): Promise<CartDTO> => {
  const { data } = await axiosInstance.post<CartDTO>('/cart', value);
  return data;
};

export const removeCartItem = async (itemId: number): Promise<CartDTO> => {
  const { data } = await axiosInstance.delete<CartDTO>('/cart/' + itemId);
  return data;
};

export const clearCart = async (): Promise<CartDTO> => {
  const { data } = await axiosInstance.delete<CartDTO>('/cart');
  return data;
};
