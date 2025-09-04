'use client';
import React from 'react';
import { Label, RadioGroup, RadioGroupItem } from '@/shared/components/ui';
import { useCartStore } from '../store/cart';
import { DeliveryStatus } from '@prisma/client';
import { DELIVERY_PRICE, FREE_DELIVERY_THRESHOLD } from '../constants';

interface Props {
  className?: string;
  value: string;
  onChange: (value: DeliveryStatus) => void;
}

export const DeliveryMethod: React.FC<Props> = ({ value, onChange }) => {
  const { totalAmount } = useCartStore();

  const discount = totalAmount > FREE_DELIVERY_THRESHOLD;

  return (
    <RadioGroup value={value} onValueChange={onChange}>
      <div className='space-y-3'>
        <div className='flex items-center  space-x-2 p-3 border rounded-lg'>
          <RadioGroupItem value={DeliveryStatus.STANDART} id='standard' />
          <Label htmlFor='standard' className='flex-1 cursor-pointer'>
            <div className='w-full flex justify-between items-center'>
              <div>
                <p className='font-medium'>Стандартная доставка</p>
                <p className='text-sm text-muted-foreground'>3-5 рабочих дней</p>
              </div>
              {discount ? (
                <span className='font-medium text-green-600'>Бесплатно</span>
              ) : (
                <span className='font-medium'>200 ₽</span>
              )}
            </div>
          </Label>
        </div>

        <div className='flex items-center space-x-2 p-3 border rounded-lg'>
          <RadioGroupItem value={DeliveryStatus.EXPRESS} id='express' />
          <Label htmlFor='express' className='flex-1 cursor-pointer'>
            <div className='w-full flex justify-between items-center'>
              <div>
                <p className='font-medium'>Экспресс доставка</p>
                <p className='text-sm text-muted-foreground'>1-2 рабочих дня</p>
              </div>
              {discount ? (
                <span className='font-medium'>{DELIVERY_PRICE / 2} ₽</span>
              ) : (
                <span className='font-medium'>{DELIVERY_PRICE} ₽</span>
              )}
            </div>
          </Label>
        </div>

        <div className='flex items-center space-x-2 p-3 border rounded-lg'>
          <RadioGroupItem value={DeliveryStatus.PICKUP} id='pickup' />
          <Label htmlFor='pickup' className='flex-1 cursor-pointer '>
            <div className='w-full flex justify-between items-center'>
              <div>
                <p className='font-medium'>Самовывоз</p>
                <p className='text-sm text-muted-foreground'>ул. Книжная, 15 (готов сегодня)</p>
              </div>
              <span className='font-medium text-green-600'>Бесплатно</span>
            </div>
          </Label>
        </div>
      </div>
    </RadioGroup>
  );
};
