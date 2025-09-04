'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui';
import { Truck } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

import { useDeliveryStore } from '../store/delivery-method-store';
import { DeliveryMethod } from './delivery-method';
import { DeliveryStatus } from '@prisma/client';

interface Props {
  className?: string;
}

export const DeliveryOptions: React.FC<Props> = () => {
  const { deliveryMethod, setDeliveryMethod } = useDeliveryStore();

  const { control } = useFormContext();
  const handleChange = (value: DeliveryStatus) => {
    setDeliveryMethod(value);
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
        <Controller
          name='deliveryType'
          control={control}
          defaultValue={deliveryMethod} // можно задать дефолт
          render={({ field }) => (
            <DeliveryMethod
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
                handleChange(value);
              }}
            />
          )}
        />
      </CardContent>
    </Card>
  );
};
