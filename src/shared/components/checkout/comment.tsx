import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Textarea } from '@/shared/components/ui';
import { MessageSquare } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

interface Props {
  className?: string;
}

export const Comment: React.FC<Props> = () => {
  const { control } = useFormContext();
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
          control={control}
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
