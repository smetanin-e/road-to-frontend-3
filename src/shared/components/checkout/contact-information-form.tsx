'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui';
import { Mail, Phone, User } from 'lucide-react';
import { FormInput } from '../form-input';

interface Props {
  className?: string;
}

export const ContactInformationForm: React.FC<Props> = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <User className='h-5 w-5' />
          Контактные данные
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <FormInput name='firstName' label='Имя' placeholder='Введите имя' required />

          <FormInput name='lastName' label='Фамилия' placeholder='Введите фамилию' required />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='relative'>
            <FormInput name='phone' label='Телефон' placeholder='+79991234567' required>
              <Phone className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
            </FormInput>
          </div>

          <div>
            <div className='relative'>
              <FormInput
                name='email'
                type='email'
                label='Почта'
                placeholder='example@mail.com'
                required
              >
                <Mail className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
              </FormInput>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
