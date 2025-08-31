import React from 'react';
import { Checkbox, Label } from '@/shared/components/ui';
import { Controller, useFormContext } from 'react-hook-form';

interface Props {
  className?: string;
}

export const Agreement: React.FC<Props> = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div className='flex flex-col items-start'>
      <div className='flex'>
        <Controller
          name='agreement'
          control={control}
          render={({ field }) => (
            <div className='flex gap-4'>
              <Checkbox
                id='agreement'
                checked={field.value || false}
                onCheckedChange={field.onChange}
              />
              <span className=' text-sm leading-relaxed'>
                Я согласен с{' '}
                <a href='#' className='text-primary hover:underline'>
                  условиями использования
                </a>{' '}
                и{' '}
                <a href='#' className='text-primary hover:underline'>
                  политикой конфиденциальности
                </a>
              </span>
            </div>
          )}
        />
      </div>

      {errors.agreement && (
        <p className='text-red-500 text-sm'>{errors.agreement.message as string}</p>
      )}
    </div>
  );
};
