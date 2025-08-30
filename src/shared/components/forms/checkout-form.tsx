'use client';
import React from 'react';
import { Comment, ContactInformationForm, DeliveryAddress } from '@/shared/components/checkout';
import { Button } from '@/shared/components/ui';
import { DeliveryOptions } from '../delivery-options';

interface Props {
  className?: string;
}

export const CheckoutForm: React.FC<Props> = () => {
  return (
    <>
      <Button type='submit'>отправить</Button>
    </>
  );
};
