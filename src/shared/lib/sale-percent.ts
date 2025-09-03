import { Book, CartItem } from '@prisma/client';
import { CartItemDTO } from '../services/dto/cart.dto';

//!ПЕРЕДЕЛАТЬ - УБРАТЬ
export const beforeDiscountPrice = (price: number, sale: number) => {
  return Math.ceil(price / (1 - sale / 100));
};

export const salePercent = (oldPrice: number | null, price: number) => {
  return oldPrice !== null && oldPrice > price
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;
};
