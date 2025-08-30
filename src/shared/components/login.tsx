'use client';
import React from 'react';
import { User } from 'lucide-react';
import { useAuthModalStore } from '../store/auth-modal';

interface Props {
  className?: string;
}

export const Login: React.FC<Props> = () => {
  const { onOpen } = useAuthModalStore();
  return (
    <div>
      <div
        onClick={() => onOpen('login')}
        className='flex flex-col items-center gap-1 group transition-all duration-200 hover:bg-gradient-to-br hover:from-red-50 hover:to-pink-50 rounded-xl p-3 -m-3 hover:shadow-lg cursor-pointer'
      >
        <User className='h-8 w-8' />
        <span>Вход</span>
      </div>
    </div>
  );
};
