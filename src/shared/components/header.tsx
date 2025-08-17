'use client';
import React from 'react';

import toast from 'react-hot-toast';
import { Heart, ShoppingCart, Menu } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';

import { logout } from '@/shared/services';
import { CatalogDrawer, Container, HeaderMenu, Login, ProfileButton } from '@/shared/components';
import { Avatar, AvatarFallback, AvatarImage, Badge, Button, Input } from '@/shared/components/ui';

import { useUserStore } from '@/store/user';

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = () => {
  const user = useUserStore((state) => state.user);

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

          <div className='flex-1 flex justify-center items-center max-w-[600px]'>
            <div className='relative w-full'>
              <Input placeholder='Поиск' className='min-w-[300px] pr-11' />
              <Button
                variant='ghost'
                className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 hover:bg-transparent '
              >
                ✕
              </Button>
            </div>
          </div>
          <div className='flex gap-9 items-end'>
            <Link href={'/cart'}>
              <div className='flex flex-col items-center gap-1 group transition-all duration-200 hover:bg-gradient-to-br hover:from-red-50 hover:to-pink-50 rounded-xl p-3 -m-3 hover:shadow-lg'>
                <div className='relative'>
                  <Badge className='rounded-full absolute top-0 right-0 translate-x-[90%] translate-y-[-50%] transition-transform duration-300 group-hover:translate-y-[-70%]'>
                    99+
                  </Badge>
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
