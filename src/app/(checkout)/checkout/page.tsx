'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  ChevronRight,
  User,
  MapPin,
  Truck,
  CreditCard,
  Shield,
  Clock,
  Gift,
  Check,
  Phone,
  Mail,
  Home,
  MessageSquare,
  AlertCircle,
} from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Separator } from '@/shared/components/ui/separator';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Textarea } from '@/shared/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import {
  CheckoutForm,
  ContactInformationForm,
  DeliveryOptions,
  Comment,
} from '@/shared/components';
import { useCartStore } from '@/shared/store/cart';
import { useDeliverytore } from '@/shared/store/delivery-method';
import { DeliveryAddress } from '@/shared/components/checkout/delivery-address';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface OrderItem {
  id: string;
  title: string;
  author: string;
  price: number;
  quantity: number;
  image: string;
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

export default function Checkout() {
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

  const { deliveryMethod } = useDeliverytore();
  const { totalAmount } = useCartStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    apartment: '',
    postalCode: '',
    deliveryMethod: deliveryMethod,
    deliveryTime: '',
    paymentMethod: 'card',
    comment: '',
    saveData: false,
    subscribe: false,
    isGift: false,
    recipientName: '',
    giftMessage: '',
  });

  const orderItems: OrderItem[] = [
    {
      id: '1',
      title: 'Мастер и Маргарита',
      author: 'Михаил Булгаков',
      price: 750,
      quantity: 1,
      image: '/placeholder.svg?height=80&width=60',
    },
    {
      id: '2',
      title: 'Белая гвардия',
      author: 'Михаил Булгаков',
      price: 650,
      quantity: 2,
      image: '/placeholder.svg?height=80&width=60',
    },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryPrice =
    formData.deliveryMethod === 'express' ? 500 : formData.deliveryMethod === 'pickup' ? 0 : 200;
  const total = subtotal + deliveryPrice;

  const steps = [
    { id: 1, title: 'Контактные данные', icon: User },
    { id: 2, title: 'Доставка', icon: Truck },
    { id: 3, title: 'Оплата', icon: CreditCard },
    { id: 4, title: 'Подтверждение', icon: Check },
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Здесь будет логика отправки заказа
    alert('Заказ оформлен!');
  };

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-8'>Оформление заказа</h1>

        {/* Progress Steps */}
        <div className='mb-8'>
          <div className='flex items-center justify-between'>
            {steps.map((step, index) => (
              <div key={step.id} className='flex items-center'>
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.id
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'border-muted-foreground text-muted-foreground'
                  }`}
                >
                  <step.icon className='h-5 w-5' />
                </div>
                <div className='ml-3 hidden sm:block'>
                  <p
                    className={`text-sm font-medium ${
                      currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 sm:w-24 h-0.5 mx-4 ${
                      currentStep > step.id ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

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
                      {orderItems.map((item) => (
                        <div key={item.id} className='flex gap-3'>
                          <Image
                            src={item.image || '/placeholder.svg'}
                            alt={item.title}
                            width={60}
                            height={80}
                            className='rounded border flex-shrink-0'
                          />
                          <div className='flex-1 min-w-0'>
                            <h4 className='font-medium text-sm line-clamp-2'>{item.title}</h4>
                            <p className='text-xs text-muted-foreground'>{item.author}</p>
                            <div className='flex items-center justify-between mt-1'>
                              <span className='text-sm'>{item.quantity} шт.</span>
                              <span className='font-medium'>{item.price * item.quantity} ₽</span>
                            </div>
                          </div>
                        </div>
                      ))}

                      <Separator />

                      <div className='space-y-2'>
                        <div className='flex justify-between'>
                          <span>Товары</span>
                          <span>{subtotal} ₽</span>
                        </div>
                        <div className='flex justify-between'>
                          <span>Доставка</span>
                          <span>{deliveryPrice === 0 ? 'Бесплатно' : `${deliveryPrice} ₽`}</span>
                        </div>
                      </div>

                      <Separator />

                      <div className='flex justify-between text-lg font-bold'>
                        <span>Итого</span>
                        <span>{total} ₽</span>
                      </div>
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
                      <div className='flex items-start space-x-2'>
                        <Checkbox id='agreement' />
                        <Label htmlFor='agreement' className='text-sm leading-relaxed'>
                          Я согласен с{' '}
                          <a href='#' className='text-primary hover:underline'>
                            условиями использования
                          </a>{' '}
                          и{' '}
                          <a href='#' className='text-primary hover:underline'>
                            политикой конфиденциальности
                          </a>
                        </Label>
                      </div>

                      <div className='flex items-center space-x-2'>
                        <Checkbox
                          id='subscribe'
                          checked={formData.subscribe}
                          onCheckedChange={(checked) =>
                            handleInputChange('subscribe', checked as boolean)
                          }
                        />
                        <Label htmlFor='subscribe' className='text-sm'>
                          Подписаться на новости и акции
                        </Label>
                      </div>

                      <Button className='w-full' size='lg' type='submit'>
                        <CreditCard className='mr-2 h-4 w-4' />
                        Оформить заказ на {total} ₽
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </form>{' '}
        </FormProvider>
      </div>
    </div>
  );
}
