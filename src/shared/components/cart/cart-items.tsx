'use client';
import React from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
} from '@/shared/components/ui/';
import { Heart, Minus, Plus, Trash2 } from 'lucide-react';
import { useCartStore } from '@/shared/store/cart';
import Image from 'next/image';
interface Props {
  className?: string;
}

export const CartItems: React.FC<Props> = () => {
  const { loading, items, getCartItems, updateItemsQuantity } = useCartStore();
  React.useEffect(() => {
    getCartItems();
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span>Товары в корзине</span>
          <Button variant='ghost' size='sm' className='text-muted-foreground'>
            Очистить корзину
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {items.map((item, index) => (
          <div key={item.id}>
            <div className='flex gap-4'>
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
                  <h3 className='font-semibold'>{item.title}</h3>
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
                        {Math.ceil(item.price / (1 - item.sale / 100))} ₽
                      </span>
                    )}
                  </div>

                  <div className='flex items-center gap-2'>
                    {/* Quantity Controls */}
                    <div className='flex items-center border rounded'>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='h-8 w-8 p-0'
                        onClick={() => updateItemsQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity === 1 || loading}
                      >
                        <Minus className='h-3 w-3' />
                      </Button>
                      <span className='px-3 py-1 text-sm font-medium min-w-[2rem] text-center'>
                        {item.quantity}
                      </span>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='h-8 w-8 p-0'
                        onClick={() => updateItemsQuantity(item.id, item.quantity + 1)}
                        disabled={loading}
                      >
                        <Plus className='h-3 w-3' />
                      </Button>
                    </div>

                    {/* Actions */}
                    <Button
                      variant='ghost'
                      size='sm'
                      className='text-muted-foreground hover:text-red-500'
                      //={() => removeItem(item.id)}
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='text-muted-foreground hover:text-red-500'
                    >
                      <Heart className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            {index < items.length - 1 && <Separator className='mt-4' />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
