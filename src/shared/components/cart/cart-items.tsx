'use client';
import React from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
} from '@/shared/components/ui/';
import { Check, Heart, Minus, Plus, Trash2, TriangleAlert, X } from 'lucide-react';
import { useCartStore } from '@/shared/store/cart';
import Image from 'next/image';
import Link from 'next/link';
import { QuantityControls } from './quantity-controls';
interface Props {
  className?: string;
}

export const CartItems: React.FC<Props> = () => {
  const [open, setOpen] = React.useState(false);
  const { loading, items, getCartItems, updateItemsQuantity, removeCartItem, cleareCart } =
    useCartStore();
  React.useEffect(() => {
    getCartItems();
  }, []);

  const handleCleareCart = () => {
    cleareCart();
    setOpen(false);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span>Товары в корзине</span>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger>
              <p className='text-muted-foreground text-sm cursor-pointer'>Очистить корзину</p>
            </PopoverTrigger>
            <PopoverContent>
              <div className='flex items-center gap-3 pb-2'>
                {' '}
                <TriangleAlert size={50} color='orange' />
                Все товары из корзины будут удалены!
              </div>
              <div className='flex gap-3 justify-center'>
                <Button onClick={handleCleareCart} variant='outline' size='sm'>
                  <Check />
                  Очистить
                </Button>
                <Button onClick={() => setOpen(false)} variant='outline' size='sm'>
                  <X />
                  Отмена
                </Button>
              </div>
            </PopoverContent>
          </Popover>
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
                        {Math.ceil(item.price / (1 - item.sale / 100))} ₽
                      </span>
                    )}
                  </div>

                  <QuantityControls
                    id={item.id}
                    quantity={item.quantity}
                    updateItemsQuantity={updateItemsQuantity}
                    removeCartItem={removeCartItem}
                    loading={loading}
                  />
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
