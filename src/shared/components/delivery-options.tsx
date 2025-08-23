'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Label,
  RadioGroup,
  RadioGroupItem,
} from '@/shared/components/ui';
import { Truck } from 'lucide-react';
import { useDeliverytore } from '../store/delivery-method';

interface Props {
  className?: string;
  totalAmount: number;
}

export const DeliveryOptions: React.FC<Props> = ({ totalAmount }) => {
  const { deliveryMethod, setDeliveryMethod } = useDeliverytore();

  const freeDeliveryThreshold = 2000;

  const handleChange = (value: string) => {
    if (value === 'express' || value === 'standard' || value === 'pickup') {
      setDeliveryMethod(value);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Truck className='h-5 w-5' />
          Способ доставки
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={deliveryMethod} onValueChange={handleChange}>
          <div className='space-y-3'>
            <div className='flex items-center  space-x-2 p-3 border rounded-lg'>
              <RadioGroupItem value='standard' id='standard' />
              <Label htmlFor='standard' className='flex-1 cursor-pointer'>
                <div className='w-full flex justify-between items-center'>
                  <div>
                    <p className='font-medium'>Стандартная доставка</p>
                    <p className='text-sm text-muted-foreground'>3-5 рабочих дней</p>
                  </div>
                  {totalAmount > freeDeliveryThreshold ? (
                    <span className='font-medium text-green-600'>Бесплатно</span>
                  ) : (
                    <span className='font-medium'>200 ₽</span>
                  )}
                </div>
              </Label>
            </div>

            <div className='flex items-center space-x-2 p-3 border rounded-lg'>
              <RadioGroupItem value='express' id='express' />
              <Label htmlFor='express' className='flex-1 cursor-pointer'>
                <div className='w-full flex justify-between items-center'>
                  <div>
                    <p className='font-medium'>Экспресс доставка</p>
                    <p className='text-sm text-muted-foreground'>1-2 рабочих дня</p>
                  </div>
                  {totalAmount > freeDeliveryThreshold ? (
                    <span className='font-medium'>250 ₽</span>
                  ) : (
                    <span className='font-medium'>500 ₽</span>
                  )}
                </div>
              </Label>
            </div>

            <div className='flex items-center space-x-2 p-3 border rounded-lg'>
              <RadioGroupItem value='pickup' id='pickup' />
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
      </CardContent>
    </Card>
  );
};
