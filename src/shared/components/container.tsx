import React from 'react';
import { cn } from '@/shared/lib';

interface Props {
  className?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
  return <div className={cn('mx-auto max-w-[1536px] px-4', className)}>{children}</div>;
};
