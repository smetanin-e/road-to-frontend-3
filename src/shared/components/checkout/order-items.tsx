'use client';
import React from 'react';
import Image from 'next/image';
import { useCartStore } from '@/shared/store/cart';

interface Props {
  className?: string;
}

export const OrderItems: React.FC<Props> = () => {
  const { items } = useCartStore();
  return (
    <div className='max-h-[350px] overflow-y-auto pr-3'>
      <div className='flex flex-col space-y-3'>
        {' '}
        {items.map((item) => (
          <div key={item.id} className='flex gap-3'>
            <Image
              src={item.imageUrl || '/placeholder.svg'}
              alt={item.title}
              width={60}
              height={80}
              className='rounded border flex-shrink-0'
            />
            <div className='flex-1 min-w-0'>
              <h4 className='font-medium text-sm line-clamp-2'>{item.title}</h4>
              <p className='text-xs text-muted-foreground'>{item.author}</p>
              <div className='flex items-center justify-between mt-1'>
                <span className='text-sm'>{item.quantity} шт.</span>
                <span className='font-medium'>{item.price * item.quantity} ₽</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
