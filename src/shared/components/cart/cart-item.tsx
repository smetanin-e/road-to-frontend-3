import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { CartItemState, useCartStore } from '@/shared/store/cart';
import { QuantityControls } from './quantity-controls';

import { beforeDiscountPrice, cn } from '@/shared/lib';
import { LoadingBounce } from '@/shared/components';

interface Props {
  className?: string;
  item: CartItemState;
}

export const CartItem: React.FC<Props> = ({ item }) => {
  const [loading, setLoading] = React.useState(false); //локальный state для отображения эффекта при удалении товара
  const { removeCartItem } = useCartStore();
  const removeItem = async (id: number) => {
    try {
      setLoading(true);
      await removeCartItem(id);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className='relative'>
      {loading && <LoadingBounce />}
      <div className={cn('flex gap-4', loading && 'opacity-30')}>
        <div className='relative'>
          <Image
            src={item.imageUrl}
            alt={item.title}
            width={80}
            height={120}
            className='rounded border'
          />
          {/* {!item.inStock && (
                            <div className='absolute inset-0 bg-black/50 rounded flex items-center justify-center'>
                              <span className='text-white text-xs font-medium'>Нет в наличии</span>
                            </div>
                          )} */}
        </div>

        <div className='flex-1 space-y-2'>
          <div>
            <Link href={`/product/${item.bookId}`}>
              <h3 className='font-semibold'>{item.title}</h3>
            </Link>

            <p className='text-sm text-muted-foreground'>{item.author}</p>
            {/* {!item.inStock && (
                    <Badge variant='destructive' className='mt-1'>
                      Нет в наличии
                    </Badge>
                  )} */}
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <span className='font-bold text-lg'>{item.price} ₽</span>
              {item.sale && (
                <span className='text-sm text-muted-foreground line-through'>
                  {beforeDiscountPrice(item.price, item.sale)} ₽
                </span>
              )}
            </div>

            <QuantityControls id={item.id} quantity={item.quantity} removeItem={removeItem} />
          </div>
        </div>
      </div>
    </div>
  );
};
