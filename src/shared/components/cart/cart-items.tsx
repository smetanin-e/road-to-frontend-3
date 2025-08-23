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
import { Check, TriangleAlert, X } from 'lucide-react';
import { useCartStore } from '@/shared/store/cart';

import { CartItem } from './cart-item';
interface Props {
  className?: string;
}

export const CartItems: React.FC<Props> = () => {
  const [open, setOpen] = React.useState(false);
  const { items, getCartItems, cleareCart } = useCartStore();
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
          <>
            <CartItem key={item.id} item={item} />
            {index < items.length - 1 && <Separator className='mt-4' />}
          </>
        ))}
      </CardContent>
    </Card>
  );
};
