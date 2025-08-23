'use client';
import Image from 'next/image';
import { Heart, ShoppingCart } from 'lucide-react';
import { Badge, Button, Card, CardContent } from '@/shared/components/ui';
import { BookDTO } from '../services/dto/products.dto';
import { useCartStore } from '../store/cart';
import React from 'react';
import { Spinner } from '@/shared/components/';
import { beforeSalePrice } from '@/shared/lib';
interface Props {
  className?: string;
  book: BookDTO;
}
export const ProductCard: React.FC<Props> = ({ book }) => {
  const { items, addCartItem } = useCartStore();
  const itemInCart = items.some((item) => item.bookId === book.id);
  const [loading, setLoading] = React.useState(false);

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      await addCartItem({ bookId: book.id });
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className='w-full max-w-[280px] h-full p-0  overflow-hidden group hover:shadow-lg transition-shadow duration-300'>
      <CardContent className='p-0 flex flex-col h-full '>
        <div className='relative'>
          <Image
            src={book.images[0].url}
            alt='Мастер и Маргарита'
            width={200}
            height={320}
            className='w-full h-80 object-cover'
          />
          {book.sale && (
            <Badge className='absolute top-3 left-3 bg-red-500 hover:bg-red-600 text-white'>
              {book.sale} %
            </Badge>
          )}

          <Button
            size='icon'
            variant='ghost'
            className='absolute top-3 right-3 bg-white/80 hover:bg-white hover:text-red-500 transition-colors'
          >
            <Heart className='h-4 w-4' />
            <span className='sr-only'>Добавить в избранное</span>
          </Button>
        </div>

        <div className='p-4 space-y-3 flex flex-col flex-grow'>
          <div className='space-y-1'>
            <h3
              onClick={() => alert(book.id)}
              className='font-semibold text-lg leading-tight line-clamp-2'
            >
              {book.title}
            </h3>
            <p className='text-sm text-muted-foreground'>{book.author.name}</p>
          </div>

          <div className='flex items-center gap-2 mt-auto'>
            <span className='text-2xl font-bold text-primary'>{book.price} ₽</span>
            {book.sale && (
              <span className='text-sm text-muted-foreground line-through'>
                {beforeSalePrice(book.price, book.sale)} ₽
              </span>
            )}
          </div>
          {itemInCart ? (
            <Button variant={'destructive'} className='w-full ' size='lg'>
              <ShoppingCart className='mr-2 h-4 w-4' />
              Оформить
            </Button>
          ) : (
            <Button disabled={loading} onClick={handleAddToCart} className='w-full ' size='lg'>
              {loading ? (
                <Spinner className='mr-2 h-4 w-4' />
              ) : (
                <div className='flex gap-2 items-center justify-center'>
                  <ShoppingCart className='mr-2 h-4 w-4' /> <span>Добавить в корзину</span>
                </div>
              )}
            </Button>
          )}
          {/*  */}
        </div>
      </CardContent>
    </Card>
  );
};
