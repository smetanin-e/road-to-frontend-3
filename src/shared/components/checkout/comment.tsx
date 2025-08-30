import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Textarea } from '@/shared/components/ui';
import { MessageSquare } from 'lucide-react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { CheckoutFormValues } from '../forms/checkout-form';

interface Props {
  className?: string;
  form: UseFormReturn<CheckoutFormValues>;
}

export const Comment: React.FC<Props> = ({ form }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <MessageSquare className='h-5 w-5' />
          Комментарий к заказу
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Controller
          control={form.control}
          name='comment'
          render={({ field }) => (
            <Textarea
              value={field.value}
              onChange={field.onChange}
              placeholder='Дополнительные пожелания к заказу...'
              rows={3}
            />
          )}
        />
      </CardContent>
    </Card>
  );
};
