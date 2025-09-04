import { CreateOrderType } from '@/@types/create-order-type';
import { Order } from '@prisma/client';
import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';

export const createOrder = async (value: CreateOrderType): Promise<Order> => {
  const { data } = await axiosInstance.post<Order>(ApiRoutes.ORDERS, value);
  return data;
};
