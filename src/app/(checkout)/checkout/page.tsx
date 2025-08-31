'use client';

import { CreditCard, Shield, Clock, AlertCircle } from 'lucide-react';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
} from '@/shared/components/ui';

import { DeliveryOptions, OrderSummary } from '@/shared/components';
import { useDeliveryStore } from '@/shared/store/delivery-method-store';
import { DeliveryAddress } from '@/shared/components/checkout/delivery-address';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useCartStore } from '@/shared/store/cart';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutFormSchema, CheckoutFormType } from '@/shared/schemas';
import { useDeliveryPrice } from '@/shared/hooks';
import { ContactInformationForm } from '@/shared/components/checkout/contact-information-form';
import { Comment } from '@/shared/components/checkout/comment';
import { OrderItems } from '@/shared/components/checkout/order-items';
import { Agreement } from '@/shared/components/checkout/agreement';

export interface CheckoutFormValues {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  deliveryType: 'standard' | 'express' | 'pickup';
  address?: string;
  comment?: string;
}

export default function Checkout() {
  const { deliveryMethod } = useDeliveryStore();
  const { totalAmount } = useCartStore();
  const deliveryPrice = useDeliveryPrice(totalAmount, deliveryMethod);
  const form = useForm<CheckoutFormType>({
    resolver: zodResolver(checkoutFormSchema),
  });

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
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-8'>Оформление заказа</h1>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
              {/* Left - Forms */}
              <div className='lg:col-span-2 space-y-6'>
                {/* Contact Information */}
                <ContactInformationForm />

                {/* Delivery Method */}
                <DeliveryOptions />

                {/* Delivery Address */}
                {form.watch('deliveryType') !== 'pickup' && <DeliveryAddress />}

                {/* Comment */}
                <Comment />
              </div>

              {/* Right - Order Summary */}
              <div className='space-y-6'>
                <div className='sticky top-8 space-y-6'>
                  {/* Order Items */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Ваш заказ</CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                      <OrderItems />

                      <Separator />

                      <OrderSummary />
                    </CardContent>
                  </Card>

                  {/* Security Info */}
                  <Card>
                    <CardContent className='p-4'>
                      <div className='space-y-3 text-sm'>
                        <div className='flex items-center gap-2 text-green-600'>
                          <Shield className='h-4 w-4' />
                          <span>Безопасная оплата SSL</span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Clock className='h-4 w-4' />
                          <span>Быстрое оформление</span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <AlertCircle className='h-4 w-4' />
                          <span>Возврат в течение 30 дней</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Agreement and Submit */}
                  <Card>
                    <CardContent className='p-4 space-y-4'>
                      <Agreement />

                      <Button className='w-full' size='lg' type='submit'>
                        <CreditCard className='mr-2 h-4 w-4' />
                        Оформить заказ на {deliveryPrice + totalAmount} ₽
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
