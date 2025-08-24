'use client';
import React from 'react';
import { Heart, Share2, ShoppingCart, Truck, Shield, RotateCcw } from 'lucide-react';

import { Badge, Button, Card, CardContent, Separator } from '@/shared/components/ui';
import { beforeDiscountPrice } from '@/shared/lib';
import { useCartStore } from '@/shared/store/cart';
import Link from 'next/link';
import { Spinner } from '../spinner';

interface Props {
  className?: string;
  price: number;
  sale?: number;
  bookId: number;
}

export const BookActions: React.FC<Props> = ({ price, sale, bookId }) => {
  const [loading, setLoading] = React.useState(false);
  const { items, addCartItem } = useCartStore();
  const itemInCart = items.some((item) => item.bookId === bookId);
  const priceWithoutDiscont = sale ? beforeDiscountPrice(price, sale) : 0;

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      await addCartItem({ bookId });
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className='lg:col-span-3'>
      <div className='sticky top-8'>
        <Card>
          <CardContent className='p-6 space-y-6'>
            {/* Price */}
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <span className='text-3xl font-bold text-primary'>{price} ₽</span>
                {priceWithoutDiscont ? (
                  <span className='text-lg text-muted-foreground line-through'>
                    {priceWithoutDiscont} ₽
                  </span>
                ) : null}
              </div>
              {priceWithoutDiscont ? (
                <Badge variant='secondary' className='text-green-600'>
                  Экономия {priceWithoutDiscont - price} ₽
                </Badge>
              ) : null}
            </div>

            {/* Availability */}
            <div className='space-y-2'>
              <div className='flex items-center gap-2 text-green-600'>
                <div className='h-2 w-2 bg-green-600 rounded-full'></div>
                <span className='text-sm font-medium'>В наличии</span>
              </div>
              <p className='text-sm text-muted-foreground'>Осталось 5 экземпляров</p>
            </div>

            {/* Actions */}
            <div className='space-y-3'>
              {itemInCart ? (
                <Link href='/cart' className='block'>
                  <Button variant={'destructive'} className='w-full ' size='lg'>
                    <ShoppingCart className='mr-2 h-4 w-4' />
                    Оформить
                  </Button>
                </Link>
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

              <div className='flex gap-2'>
                <Button variant='outline' size='sm' className='flex-1 bg-transparent'>
                  <Heart className='mr-2 h-4 w-4' />В избранное
                </Button>
                <Button variant='outline' size='sm' className='flex-1 bg-transparent'>
                  <Share2 className='mr-2 h-4 w-4' />
                  Поделиться
                </Button>
              </div>
            </div>

            <Separator />

            {/* Delivery Info */}
            <div className='space-y-3'>
              <h4 className='font-medium'>Доставка и оплата</h4>
              <div className='space-y-2 text-sm'>
                <div className='flex items-center gap-2'>
                  <Truck className='h-4 w-4 text-muted-foreground' />
                  <span>Доставка от 200 ₽</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Shield className='h-4 w-4 text-muted-foreground' />
                  <span>Гарантия качества</span>
                </div>
                <div className='flex items-center gap-2'>
                  <RotateCcw className='h-4 w-4 text-muted-foreground' />
                  <span>Возврат 30 дней</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
