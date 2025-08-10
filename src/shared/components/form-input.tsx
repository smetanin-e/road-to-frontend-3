'use client';
import React from 'react';

import { Input } from '@/shared/ui';
import { CleareButton, ErrorText, RequiredSymbol } from '@/shared/components';
import { useFormContext } from 'react-hook-form';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<Props> = ({ className, name, label, required, ...props }) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickCleare = () => {
    setValue(name, name === 'phone' ? '+7' : '', { shouldValidate: true });
  };
  return (
    <div className={className}>
      {label && (
        <p className='font-medium mb-2'>
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className='relative'>
        <Input {...props} {...register(name)} />
        {value && <CleareButton onClick={onClickCleare} />}
      </div>

      {errorText && <ErrorText className='' text={errorText} />}
    </div>
  );
};
