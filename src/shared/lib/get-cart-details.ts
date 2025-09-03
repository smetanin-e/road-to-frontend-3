import { CartDTO } from '../services/dto/cart.dto';
import { CartItemState } from '../store/cart';

interface ReturnProps {
  items: CartItemState[];
  totalAmount: number;
  totalQuantity: number;
  totalSale: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  if (data.cartItems) {
    const items = data.cartItems.map((item) => ({
      id: Number(item.id),
      quantity: item.quantity,
      bookId: item.bookId!,
      title: item.book.title,
      imageUrl: item.book.images?.[0]?.url ?? '/default-book.png',
      author: item.book.author?.name ?? 'Неизвестный автор',
      price: item.book.price,
      oldPrice: item.book?.oldPrice,
      totalPrice: item.book.price * item.quantity,
    }));
    return {
      totalAmount: data.totalAmount,
      totalQuantity: data.totalQuantity,
      totalSale: data.totalSale,
      items,
    };
  }
  return { totalAmount: 0, totalQuantity: 0, totalSale: 0, items: [] };
};
