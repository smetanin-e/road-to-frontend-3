import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui';
import { MapPin } from 'lucide-react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { AdressInput } from '@/shared/components';

interface Props {
  className?: string;
  form: UseFormReturn<any>;
}

export const DeliveryAddress: React.FC<Props> = ({ form }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <MapPin className='h-5 w-5' />
          Адрес доставки
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4 pb-3'>
        <Controller
          control={form.control}
          name='adress'
          rules={{ required: 'Поле обязательно для заполнения' }}
          render={({ field, fieldState }) => (
            <div className='relative'>
              <AdressInput onChange={field.onChange} />

              {fieldState.error && (
                <p className='absolute pt-1 text-[12px] text-destructive pl-2'>
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </CardContent>
    </Card>
  );
};
