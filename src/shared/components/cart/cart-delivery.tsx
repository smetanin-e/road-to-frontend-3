'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui';
import { Truck } from 'lucide-react';
import { useDeliveryStore } from '@/shared/store/delivery-method-store';
import { DeliveryMethod } from '../delivery-method';
import { DeliveryStatus } from '@prisma/client';

interface Props {
  className?: string;
}
export const CartDelivery: React.FC<Props> = () => {
  const { deliveryMethod, setDeliveryMethod } = useDeliveryStore();

  const handleChange = (value: string) => {
    if (
      value === DeliveryStatus.EXPRESS ||
      value === DeliveryStatus.STANDART ||
      value === DeliveryStatus.PICKUP
    ) {
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
        <DeliveryMethod value={deliveryMethod} onChange={handleChange} />
      </CardContent>
    </Card>
  );
};
