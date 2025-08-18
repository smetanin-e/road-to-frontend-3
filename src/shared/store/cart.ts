import { create } from 'zustand';
import { CreateCartItemValue } from '../services/dto/cart.dto';
import { Api } from '../services';
import { getCartDetails } from '../lib';

export type CartItemState = {
  id: number;
  quantity: number;
  bookId: number;
  title: string;
  imageUrl: string;
  author: string;
  price: number;
  totalPrice: number;
  sale?: number | null;
};

interface CartState {
  loading: boolean;
  error: boolean;
  items: CartItemState[];
  totalAmount: number;
  totalQuantity: number;

  /* Запрос на получение товаров из корзины */
  getCartItems: () => Promise<void>;

  /* Запрос на обновление количества товаров */
  updateItemsQuantity: (id: number, quantity: number) => Promise<void>;

  /* Запрос на добавление товара в корзину */
  addCartItem: (values: CreateCartItemValue) => Promise<void>;

  /* Запрос на удаление товара из корзины */
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>()((set) => ({
  loading: true,
  error: false,
  items: [],
  totalAmount: 0,
  totalQuantity: 0,

  getCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.getCart();
      if (data != null && data.hasOwnProperty('cartItems')) {
        set(getCartDetails(data));
      }
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  updateItemsQuantity: async (id: number, quantity: number) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.updateItemsQuantity(id, quantity);
      set(getCartDetails(data));
    } catch (e) {
      console.error(e);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  addCartItem: async (value: CreateCartItemValue) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.addToCart(value);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  removeCartItem: async () => {},
}));
