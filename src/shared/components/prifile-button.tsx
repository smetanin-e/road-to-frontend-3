'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui';
import { stringToColor } from '@/shared/lib';
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
  console.log(bgColor);

  return (
    <div className='flex flex-col items-center gap-1 group transition-all duration-200 hover:bg-gradient-to-br hover:from-red-50 hover:to-pink-50 rounded-xl p-3 -m-3 hover:shadow-lg cursor-pointer'>
      <div>
        <Avatar className='h-11 w-11'>
          <AvatarImage src='https://sun9-24.userapi.com/s/v1/ig2/V0PU4jagvNRiolcU_nMDwKGykjwaLl_VJ_dS6am0YAsENQCkOMYsfxKuV477alwMKuOA39Ne1g06yREDc0kv1Kk-.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,1080x1440,1280x1707,1440x1920,1920x2560&from=bu&cs=1920x0' />
          <AvatarFallback style={{ backgroundColor: bgColor }} className='text-white'>
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>

      <span>Профиль</span>
    </div>
  );
};
