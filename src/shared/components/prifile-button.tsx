'use client';

import React from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui';
import { stringToColor } from '@/shared/lib';
import toast from 'react-hot-toast';
import { logout } from '../services';
interface Props {
  className?: string;
  name: string;
}

export const ProfileButton: React.FC<Props> = ({ name }) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const bgColor = stringToColor(name);

  const signOut = async () => {
    await logout();
    toast.success('Вы вышли из аккаунта');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='flex flex-col items-center gap-1 group transition-all duration-200 hover:bg-gradient-to-br hover:from-red-50 hover:to-pink-50 rounded-xl p-3 -m-3 hover:shadow-lg cursor-pointer'>
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
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={signOut}> Выход</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
