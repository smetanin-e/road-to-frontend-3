'use client';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ContactInformationForm, DeliveryAddress } from '@/shared/components/checkout';
import { Button } from '@/shared/components/ui';

interface Props {
  className?: string;
}

export const CheckoutForm: React.FC<Props> = () => {
  const form = useForm();

  const onSubmit = async (data: any) => {
    try {
      console.log(data);

      toast.success('Ваш заказ принят', { icon: '✅' });
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error [CHECKOUT_FORM]', error);
        return toast.error(error.message, { icon: '❌' });
      }
    }
  };
  return (
    <FormProvider {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
        {/* Contact Information */}
        <ContactInformationForm />

        {/* Delivery Address */}
        <DeliveryAddress form={form} />

        <Button type='submit'>отправить</Button>
      </form>
    </FormProvider>
  );
};
