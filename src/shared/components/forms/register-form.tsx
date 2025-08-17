'use client';
import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { FormProvider, useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';
import { registerUser } from '@/shared/services';
import { registerFormSchema, RegisterFormType } from '@/shared/schemas';

import { FormInput } from '@/shared/components';
import { Button, Label } from '@/shared/components/ui';

interface Props {
  className?: string;
  onClose: () => void;
}

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
  const router = useRouter();
  const form = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '+7',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormType) => {
    try {
      await registerUser(data);
      onClose?.();
      // router.push('/private');
      toast.success('Вы успешно зарегистрированы!!!', { icon: '✅' });
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error [REGISTER_FORM]', error);
        return toast.error(error.message, { icon: '❌' });
      }
    }
  };
  return (
    <FormProvider {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='firstName'>Имя</Label>
            <FormInput name='firstName' id='firstName' type='text' placeholder='Имя' required />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='lastName'>Фамилия</Label>
            <FormInput name='lastName' id='lastName' type='text' placeholder='Иванов' required />
          </div>
        </div>
        {/* <PhoneInput /> */}
        <div className='space-y-2'>
          <Label htmlFor='phone'>Телефон</Label>
          <FormInput name='phone' id='phone' type='tel' required />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='email'>Адрес электронной почты</Label>
          <FormInput name='email' id='email' type='email' placeholder='ivan@example.com' required />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='password'>Пароль</Label>
          <FormInput
            name='password'
            id='password'
            type='password'
            placeholder='Введите пароль'
            required
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='confirmPassword'>Повторите пароль</Label>
          <FormInput
            name='confirmPassword'
            id='confirmPassword'
            type='password'
            placeholder='Повторите пароль'
            required
          />
        </div>
        <Button className='w-full' type='submit'>
          Зарегистрироваться
        </Button>
      </form>
    </FormProvider>
  );
};
