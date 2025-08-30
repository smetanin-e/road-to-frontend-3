'use client';
import React from 'react';

import { Button, Card, CardContent } from '@/shared/components/ui';

import { LogIn, ShoppingBag } from 'lucide-react';
import { useUserStore } from '@/shared/store/user';
import { useCartStore } from '@/shared/store/cart';
import Link from 'next/link';
import { useAuthModalStore } from '@/shared/store/auth-modal';
export default function CheckoutBlocked() {
  const { user, initUser } = useUserStore();
  const { items, getCartItems } = useCartStore();
  const { onOpen } = useAuthModalStore();

  React.useEffect(() => {
    initUser();
    getCartItems();
  }, []);

  return (
    <div className=' flex items-center justify-center p-25'>
      <Card className='w-full'>
        <CardContent className='p-8 text-center'>
          {!user ? (
            <div className='space-y-6'>
              <div className='space-y-2'>
                <LogIn className='h-20 w-20 text-gray-400 mx-auto' />
                <h2 className='text-xl font-semibold text-gray-900'>Вы еще не авторизированы</h2>
                <p className='text-gray-600'>Войдите в свой аккаунт, чтобы продолжить покупки</p>
              </div>
              <Button onClick={() => onOpen('login')} size='lg'>
                <LogIn className='h-4 w-4 mr-2' />
                Войти в аккаунт
              </Button>
            </div>
          ) : (
            <>
              {' '}
              {items.length === 0 ? (
                <div className='space-y-6'>
                  <div className='space-y-2'>
                    <ShoppingBag className='h-20 w-20 text-gray-400 mx-auto' />
                    <h2 className='text-xl font-semibold text-gray-900'>
                      У вас еще нет товаров в корзине для оформления
                    </h2>
                    <p className='text-gray-600'>Добавьте книги в корзину, чтобы оформить заказ</p>
                  </div>
                  <Link href={'/'}>
                    <Button size='lg'>
                      <ShoppingBag className='h-4 w-4 mr-2' />К покупкам
                    </Button>
                  </Link>
                </div>
              ) : null}
            </>
          )}

          {/* <Button
            variant='outline'
            size='sm'
            className='mt-4 bg-transparent'
            onClick={() => setIsNotAuthorized(!isNotAuthorized)}
          >
            Переключить состояние
          </Button> */}
        </CardContent>
      </Card>
    </div>
  );
}
