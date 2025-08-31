'use client';
import React from 'react';
import { Button } from './ui';
import { logout } from '../services';
import toast from 'react-hot-toast';

interface Props {
  className?: string;
  onClose: () => void;
}

export const Logout: React.FC<Props> = ({ onClose }) => {
  const signOut = async () => {
    await logout();
    onClose?.();
    toast.success('Вы вышли из аккаунта');
  };

  return (
    <div className='flex justify-center items-center space-x-4'>
      <Button variant={'outline'} onClick={signOut}>
        Выйти
      </Button>
      <Button onClick={onClose}>Отмена</Button>
    </div>
  );
};
