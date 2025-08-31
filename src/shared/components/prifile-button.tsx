'use client';

import React from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui';
import { stringToColor } from '@/shared/lib';

import { useAuthModalStore } from '../store/auth-modal';
interface Props {
  className?: string;
  name: string;
}

export const ProfileButton: React.FC<Props> = ({ name }) => {
  const { onOpen } = useAuthModalStore();

  //!ОПТИМИЗИРОВАТЬ
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const bgColor = stringToColor(name);

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <div className='flex flex-col items-center gap-1 group transition-all duration-200 hover:bg-gradient-to-br hover:from-ring hover:to--chart-1 rounded-xl p-3 -m-3 hover:shadow-lg cursor-pointer'>
            <div>
              <Avatar className='h-11 w-11'>
                <AvatarImage src='Картинка' />
                <AvatarFallback style={{ backgroundColor: bgColor }} className='text-white'>
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>

            <span>Профиль</span>
          </div>
        </PopoverTrigger>
        <PopoverContent align='end' className='px-6'>
          <span onClick={() => onOpen('logout')} className='cursor-pointer text-right block'>
            Выход
          </span>
        </PopoverContent>
      </Popover>
    </div>
  );
};
