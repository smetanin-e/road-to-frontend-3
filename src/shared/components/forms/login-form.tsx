'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Button, Label } from '@/shared/ui';
import { FormInput } from '@/shared/components';
import { loginFormSchema, LoginFormType } from '@/shared/schemas';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { signIn } from '@/shared/services/login-user';

interface Props {
  className?: string;
  onClose: () => void;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
  const router = useRouter();
  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormType) => {
    try {
      await signIn(data);
      onClose?.();
      router.push('/');
      toast.success('Вы успешно вошли в аккаунт', { icon: '✅' });
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
        <div className='space-y-2'>
          <Label htmlFor='email'>Email</Label>
          <FormInput name='email' id='email' type='email' placeholder='m@example.com' required />
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

        <Button disabled={form.formState.isSubmitting} className='w-full' type='submit'>
          Войти
        </Button>
      </form>
    </FormProvider>
  );
};
//✅
//❌
