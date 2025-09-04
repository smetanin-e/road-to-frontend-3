import React from 'react';
import { Separator } from '@/shared/components/ui';
import { useCartStore } from '../store/cart';
import { useDeliveryPrice } from '../hooks';
import { useDeliveryStore } from '../store/delivery-method-store';

interface Props {
  className?: string;
}

export const OrderSummary: React.FC<Props> = () => {
  const { deliveryMethod } = useDeliveryStore();
  const { totalQuantity, totalAmount, totalSale } = useCartStore();
  const deliveryPrice = useDeliveryPrice(totalAmount, deliveryMethod);

  return (
    <div>
      <div className='space-y-2'>
        <div className='flex justify-between'>
          <span>Товары ({totalQuantity} шт.)</span>
          <span>{totalAmount + totalSale} ₽</span>
        </div>
        {totalSale > 0 && (
          <div className='flex justify-between text-green-600'>
            <span>Скидка</span>
            <span>-{totalSale} ₽</span>
          </div>
        )}
        <div className='flex justify-between'>
          <span>Доставка</span>
          {deliveryPrice === 0 ? (
            <span className='font-medium text-green-600'>Бесплатно</span>
          ) : (
            <span>{deliveryPrice} ₽</span>
          )}
        </div>
      </div>
      <Separator />
      <div className='flex justify-between text-lg font-bold mt-2'>
        <span>К оплате</span>
        <span>{totalAmount + deliveryPrice} ₽</span>
      </div>
    </div>
  );
};
