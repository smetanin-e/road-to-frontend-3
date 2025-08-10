'use client';
import { User } from 'lucide-react';
import React from 'react';
import { AuthModal } from './auth-modal';

interface Props {
  className?: string;
}

export const Login: React.FC<Props> = () => {
  const [open, setOpen] = React.useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const [type, setType] = React.useState<'login' | 'register'>('login');
  const onSwitchType = () => {
    setType(type === 'login' ? 'register' : 'login');
  };
  const onClickSignIn = () => {
    setType('login');
    setOpen(true);
  };
  return (
    <div>
      <div
        onClick={onClickSignIn}
        className='flex flex-col items-center gap-1 group transition-all duration-200 hover:bg-gradient-to-br hover:from-red-50 hover:to-pink-50 rounded-xl p-3 -m-3 hover:shadow-lg cursor-pointer'
      >
        <User className='h-8 w-8' />
        <span>Аккаунт</span>
      </div>
      <AuthModal open={open} onClose={onClose} type={type} onSwitchType={onSwitchType} />
    </div>
  );
};
