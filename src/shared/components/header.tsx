'use client';
import React from 'react';

import toast from 'react-hot-toast';
import { Heart, ShoppingCart, Menu } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';

import { logout } from '@/shared/services';
import {
  CatalogDrawer,
  Container,
  HeaderMenu,
  Login,
  ProfileButton,
  SearchInput,
} from '@/shared/components';
import { Avatar, AvatarFallback, AvatarImage, Badge, Button, Input } from '@/shared/components/ui';

import { useUserStore } from '@/shared/store/user';
import { useCartStore } from '../store/cart';

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = () => {
  const user = useUserStore((state) => state.user);

  const { items, getCartItems } = useCartStore();

  React.useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  const signOut = async () => {
    await logout();
    toast.success('Вы вышли из аккаунта');
  };

  return (
    <header className='pt-8 pb-5 border-b'>
      <Container>
        <div className='flex gap-4 justify-between items-center'>
          <Link href='/'>
            <div className='flex items-center'>
              <Image
                className='shrink-0 w-[90px] h-[50px]'
                src={'/logo.png'}
                alt={'logo'}
                width={90}
                height={50}
              />
            </div>
          </Link>

          <SearchInput />
          <div className='flex gap-9 items-end'>
            <Link href={'/cart'}>
              <div className='flex flex-col items-center gap-1 group transition-all duration-200 hover:bg-gradient-to-br hover:from-red-50 hover:to-pink-50 rounded-xl p-3 -m-3 hover:shadow-lg'>
                <div className='relative'>
                  {items.length > 0 && (
                    <Badge className='rounded-full absolute top-0 right-0 translate-x-[90%] translate-y-[-50%] transition-transform duration-300 group-hover:translate-y-[-70%]'>
                      {items.length}
                    </Badge>
                  )}

                  <ShoppingCart className='h-8 w-8' />
                </div>
                <span>Корзина</span>
              </div>
            </Link>
            <Link href={'/'}>
              <div className='flex flex-col items-center gap-1 group transition-all duration-200 hover:bg-gradient-to-br hover:from-red-50 hover:to-pink-50 rounded-xl p-3 -m-3 hover:shadow-lg'>
                <div className='relative'>
                  <Badge className='rounded-full absolute top-0 right-0 translate-x-[90%] translate-y-[-50%] transition-transform duration-300 group-hover:translate-y-[-70%]'>
                    99+
                  </Badge>
                  <Heart className='h-8 w-8' />
                </div>
                <span>Избранное</span>
              </div>
            </Link>

            {/* <ProfileButton name='Евгений Сметани' /> */}

            {user === null ? <Login /> : <Button onClick={signOut}>выход</Button>}
          </div>
        </div>
        {/* навигация */}
        <HeaderMenu />
      </Container>
    </header>
  );
};
