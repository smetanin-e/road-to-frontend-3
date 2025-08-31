'use client';
import React from 'react';
import { useAuthModalStore } from '../../store/auth-modal';
import { AuthModal } from './auth-modal';

interface Props {
  className?: string;
}

export const AuthModalProvider: React.FC<Props> = () => {
  const { open, onClose, type, onSwitchType } = useAuthModalStore();
  return <AuthModal open={open} onClose={onClose} type={type} onSwitchType={onSwitchType} />;
};
