'use client';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Comment, ContactInformationForm, DeliveryAddress } from '@/shared/components/checkout';
import { Button } from '@/shared/components/ui';
import { DeliveryOptions } from '../delivery-options';

interface Props {
  className?: string;
}
export interface CheckoutFormValues {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  deliveryType: 'standard' | 'express' | 'pickup';
  address?: string;
  comment?: string;
}

export const CheckoutForm: React.FC<Props> = () => {
  const form = useForm<CheckoutFormValues>();

  const onSubmit = async (data: CheckoutFormValues) => {
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

        {/* Delivery Method */}
        <DeliveryOptions form={form} />

        {/* Delivery Address */}
        {form.watch('deliveryType') !== 'pickup' && <DeliveryAddress form={form} />}

        {/* Comment */}
        <Comment form={form} />

        <Button type='submit'>отправить</Button>
      </form>
    </FormProvider>
  );
};
