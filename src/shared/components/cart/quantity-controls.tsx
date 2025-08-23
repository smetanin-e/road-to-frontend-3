'use client';
import React from 'react';

import { Heart, Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/ui';
import { useCartStore } from '@/shared/store/cart';
import { Spinner } from '@/shared/components';

interface Props {
  className?: string;
  id: number;
  quantity: number;
  removeItem: (id: number) => Promise<void>;
}

export const QuantityControls: React.FC<Props> = ({ id, quantity, removeItem }) => {
  const { updateItemsQuantity } = useCartStore();
  const [loading, setLoading] = React.useState(false); //локальный state для отображения загрузки при обновлении количества товара

  const changeItemsQuantity = async (
    type: 'increment' | 'decrement',
    id: number,
    quantity: number,
  ) => {
    try {
      setLoading(true);
      const newQuantity = type === 'increment' ? quantity + 1 : quantity - 1;
      await updateItemsQuantity(id, newQuantity);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex items-center gap-2'>
      {/* Quantity Controls */}
      <div className='flex items-center border rounded'>
        <Button
          variant='ghost'
          size='sm'
          className='h-8 w-8 p-0'
          onClick={() => changeItemsQuantity('decrement', id, quantity)}
          disabled={quantity === 1 || loading}
        >
          <Minus className='h-3 w-3' />
        </Button>
        <span className='text-sm font-medium min-w-[2rem] flex justify-center'>
          {!loading ? quantity : <Spinner className='h-4 w-4' />}
        </span>
        <Button
          variant='ghost'
          size='sm'
          className='h-8 w-8 p-0'
          onClick={() => changeItemsQuantity('increment', id, quantity)}
          disabled={loading}
        >
          <Plus className='h-3 w-3' />
        </Button>
      </div>

      {/* Actions */}
      <Button
        variant='ghost'
        size='sm'
        className='text-muted-foreground hover:text-red-500'
        onClick={() => removeItem(id)}
      >
        <Trash2 className='h-4 w-4' />
      </Button>
      <Button variant='ghost' size='sm' className='text-muted-foreground hover:text-red-500'>
        <Heart className='h-4 w-4' />
      </Button>
    </div>
  );
};
