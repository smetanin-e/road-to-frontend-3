import { CartDTO } from '../services/dto/cart.dto';
import { CartItemState } from '../store/cart';

interface ReturnProps {
  items: CartItemState[];
  totalAmount: number;
  totalQuantity: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.cartItems.map((item) => ({
    id: Number(item.id),
    quantity: item.quantity,
    title: item.book.title,
    imageUrl: item.book.images?.[0]?.url ?? '/default-book.png',
    author: item.book.author?.name ?? 'Неизвестный автор',
    price: item.book.price,
    totalPrice: item.book.price * item.quantity,
    sale: item.book.sale,
  }));
  return { totalAmount: data.totalAmount, totalQuantity: data.totalQuantity, items };
};
