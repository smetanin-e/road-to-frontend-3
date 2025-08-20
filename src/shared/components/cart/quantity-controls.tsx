import React from 'react';

import { Heart, Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/ui';

interface Props {
  className?: string;
  loading: boolean;
  id: number;
  quantity: number;
  updateItemsQuantity: (id: number, quantity: number) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
}

export const QuantityControls: React.FC<Props> = ({
  loading,
  id,
  quantity,
  updateItemsQuantity,
  removeCartItem,
}) => {
  return (
    <div className='flex items-center gap-2'>
      {/* Quantity Controls */}
      <div className='flex items-center border rounded'>
        <Button
          variant='ghost'
          size='sm'
          className='h-8 w-8 p-0'
          onClick={() => updateItemsQuantity(id, quantity - 1)}
          disabled={quantity === 1 || loading}
        >
          <Minus className='h-3 w-3' />
        </Button>
        <span className='px-3 py-1 text-sm font-medium min-w-[2rem] text-center'>{quantity}</span>
        <Button
          variant='ghost'
          size='sm'
          className='h-8 w-8 p-0'
          onClick={() => updateItemsQuantity(id, quantity + 1)}
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
        onClick={() => removeCartItem(id)}
      >
        <Trash2 className='h-4 w-4' />
      </Button>
      <Button variant='ghost' size='sm' className='text-muted-foreground hover:text-red-500'>
        <Heart className='h-4 w-4' />
      </Button>
    </div>
  );
};
