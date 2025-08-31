import React from 'react';
import { Separator } from '@/shared/components/ui';
import { useCartStore } from '../store/cart';
import { beforeDiscountPrice } from '@/shared/lib';
import { useDeliveryPrice } from '../hooks';
import { useDeliveryStore } from '../store/delivery-method-store';

interface Props {
  className?: string;
}

export const OrderSummary: React.FC<Props> = () => {
  const { deliveryMethod } = useDeliveryStore();
  const { items, totalQuantity, totalAmount } = useCartStore();
  const deliveryPrice = useDeliveryPrice(totalAmount, deliveryMethod);

  const totalPriceWithoutDiscount = items.reduce(
    (sum, item) =>
      sum +
      (item.sale
        ? beforeDiscountPrice(item.price, item.sale) * item.quantity
        : item.price * item.quantity),
    0,
  );

  const savings = totalPriceWithoutDiscount - totalAmount;
  return (
    <div>
      <div className='space-y-2'>
        <div className='flex justify-between'>
          <span>Товары ({totalQuantity} шт.)</span>
          <span>{totalPriceWithoutDiscount} ₽</span>
        </div>
        {savings > 0 && (
          <div className='flex justify-between text-green-600'>
            <span>Скидка</span>
            <span>-{savings} ₽</span>
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
        <span>{totalPriceWithoutDiscount - savings + deliveryPrice} ₽</span>
      </div>
    </div>
  );
};
