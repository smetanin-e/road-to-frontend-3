import { Cart, CartItem } from '@prisma/client';
import { BookDTO } from './products.dto';

export type CartItemDTO = CartItem & { book: BookDTO };

export type CartDTO = Cart & {
  cartItems: CartItemDTO[];
};

export interface CreateCartItemValue {
  bookId: number;
}
