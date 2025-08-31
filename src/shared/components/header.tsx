'use client';
import React from 'react';

import { Heart, ShoppingCart } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';

import { Container, HeaderMenu, Login, ProfileButton, SearchInput } from '@/shared/components';
import { Badge } from '@/shared/components/ui';

import { useUserStore } from '@/shared/store/user';
import { useCartStore } from '../store/cart';

interface Props {
  className?: string;
  hasSearch?: boolean;
  hasMenu?: boolean;
}

export const Header: React.FC<Props> = ({ hasSearch = true, hasMenu = true }) => {
  const user = useUserStore((state) => state.user);

  const { getCartItems, totalQuantity } = useCartStore();

  React.useEffect(() => {
    getCartItems();
  }, [getCartItems]);

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

          {hasSearch && <SearchInput />}
          <div className='flex gap-9 items-end'>
            <Link href={'/cart'}>
              <div className='flex flex-col items-center gap-1 group transition-all duration-200 hover:bg-gradient-to-br hover:from-red-50 hover:to-pink-50 rounded-xl p-3 -m-3 hover:shadow-lg'>
                <div className='relative'>
                  {totalQuantity > 0 && (
                    <Badge className='rounded-full absolute top-0 right-0 translate-x-[90%] translate-y-[-50%] transition-transform duration-300 group-hover:translate-y-[-70%]'>
                      {totalQuantity}
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

            {user === null ? (
              <Login />
            ) : (
              <ProfileButton name={`${user.firstName} ${user.lastName}`} />
            )}
          </div>
        </div>
        {/* навигация */}
        {hasMenu && <HeaderMenu />}
      </Container>
    </header>
  );
};
