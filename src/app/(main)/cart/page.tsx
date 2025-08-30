'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  ShoppingCart,
  Truck,
  Shield,
  Gift,
  ChevronRight,
  Tag,
  Clock,
  MapPin,
  CreditCard,
  Percent,
} from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Separator } from '@/shared/components/ui/separator';
import { Input } from '@/shared/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group';
import { Label } from '@/shared/components/ui/label';
import { Progress } from '@/shared/components/ui/progress';
import { CartDelivery, CartItems } from '@/shared/components';
import Link from 'next/link';
import { useCartStore } from '@/shared/store/cart';
import React from 'react';
import { beforeDiscountPrice } from '@/shared/lib';
import { useDeliveryPrice } from '@/shared/hooks';
import { useDeliveryStore } from '@/shared/store/delivery-method-store';

interface CartItem {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice: number;
  quantity: number;
  image: string;
  inStock: boolean;
}

export default function Cart() {
  const { items, totalQuantity, totalAmount, getCartItems } = useCartStore();
  const { deliveryMethod } = useDeliveryStore();

  React.useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  const [promoCode, setPromoCode] = useState('');

  const totalPriceWithoutDiscount = items.reduce(
    (sum, item) =>
      sum +
      (item.sale
        ? beforeDiscountPrice(item.price, item.sale) * item.quantity
        : item.price * item.quantity),
    0,
  );

  const savings = totalPriceWithoutDiscount - totalAmount;

  const freeDeliveryThreshold = 2000;
  const progressToFreeDelivery = Math.min((totalAmount / freeDeliveryThreshold) * 100, 100);
  //const total = totalAmount + deliveryPrice;

  const deliveryPrice = useDeliveryPrice(totalAmount, freeDeliveryThreshold, deliveryMethod);
  const total = totalAmount + deliveryPrice;
  return (
    <div className='min-h-screen bg-background'>
      {/* Breadcrumbs */}
      <div className='border-b'>
        <div className='container mx-auto px-4 py-3'>
          <nav className='flex items-center space-x-2 text-sm text-muted-foreground'>
            <Link href='/' className='hover:text-foreground transition-colors'>
              Главная
            </Link>
            <ChevronRight className='h-4 w-4' />
            <span className='text-foreground'>Корзина</span>
          </nav>
        </div>
      </div>

      <div className='container mx-auto px-4 py-8'>
        <div className='flex items-center justify-between mb-8'>
          <h1 className='text-3xl font-bold'>Корзина</h1>
          {items.length > 0 && (
            <Badge variant='secondary' className='text-lg px-3 py-1'>
              {totalQuantity}{' '}
              {totalQuantity === 1 ? 'товар' : totalQuantity < 5 ? 'товара' : 'товаров'}
            </Badge>
          )}
        </div>

        {items.length === 0 ? (
          <Card className='text-center py-12'>
            <CardContent>
              <ShoppingCart className='h-16 w-16 mx-auto text-muted-foreground mb-4' />
              <h2 className='text-xl font-semibold mb-2'>Ваша корзина пуста</h2>
              <p className='text-muted-foreground mb-6'>
                Добавьте товары, чтобы продолжить покупки
              </p>
              <Button asChild>
                <Link href='/'>Перейти к покупкам</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Left - Cart Items */}
            <div className='lg:col-span-2 space-y-6'>
              {/* Progress to Free Delivery */}
              {totalAmount < freeDeliveryThreshold && (
                <Card>
                  <CardContent className='p-4'>
                    <div className='flex items-center gap-2 mb-2'>
                      <Truck className='h-4 w-4 text-green-600' />
                      <span className='text-sm font-medium'>
                        До бесплатной доставки осталось {freeDeliveryThreshold - totalAmount} ₽
                      </span>
                    </div>
                    <Progress value={progressToFreeDelivery} className='h-2' />
                  </CardContent>
                </Card>
              )}

              {/* Cart Items */}

              <CartItems />

              {/* Promo Code */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Tag className='h-5 w-5' />
                    Промокод
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex gap-2'>
                    <Input
                      placeholder='Введите промокод'
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant='outline'>Применить</Button>
                  </div>
                  <div className='mt-3 space-y-1'>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='h-auto p-0 text-xs text-muted-foreground'
                    >
                      BOOK20 - скидка 20% на книги
                    </Button>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='h-auto p-0 text-xs text-muted-foreground'
                    >
                      FREESHIP - бесплатная доставка
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recommended Products */}
              <Card>
                <CardHeader>
                  <CardTitle>Рекомендуем также</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    {[
                      { title: 'Театральный роман', author: 'М. Булгаков', price: '700 ₽' },
                      { title: 'Записки юного врача', author: 'М. Булгаков', price: '600 ₽' },
                      { title: 'Дни Турбиных', author: 'М. Булгаков', price: '550 ₽' },
                      { title: 'Роковые яйца', author: 'М. Булгаков', price: '500 ₽' },
                    ].map((book, index) => (
                      <Card
                        key={index}
                        className='cursor-pointer hover:shadow-md transition-shadow'
                      >
                        <CardContent className='p-3'>
                          <Image
                            src={`/placeholder.svg?height=120&width=80&query=${book.title} book cover`}
                            alt={book.title}
                            width={80}
                            height={120}
                            className='w-full h-20 object-cover rounded mb-2'
                          />
                          <h4 className='font-medium text-xs mb-1 line-clamp-2'>{book.title}</h4>
                          <p className='text-xs text-muted-foreground mb-1'>{book.author}</p>
                          <p className='font-bold text-sm text-primary'>{book.price}</p>
                          <Button size='sm' className='w-full mt-2 text-xs'>
                            Добавить
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right - Order Summary */}
            <div className='space-y-6'>
              <div className='sticky top-8 space-y-6'>
                {/* Delivery Options */}
                <CartDelivery />

                {/* Order Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Итого</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='space-y-2'>
                      <div className='flex justify-between'>
                        <span>Товары ({totalQuantity} шт.)</span>
                        <span>{totalAmount} ₽</span>
                      </div>
                      {savings > 0 && (
                        <div className='flex justify-between text-green-600'>
                          <span>Скидка</span>
                          <span>-{savings} ₽</span>
                        </div>
                      )}
                      <div className='flex justify-between'>
                        <span>Доставка</span>
                        {deliveryPrice === 0 ? (
                          <span className='font-medium text-green-600'>Бесплатно</span>
                        ) : (
                          <span>{deliveryPrice} ₽</span>
                        )}
                      </div>
                    </div>

                    <Separator />

                    <div className='flex justify-between text-lg font-bold'>
                      <span>К оплате</span>
                      <span>{total} ₽</span>
                    </div>
                    <Link href={'/checkout'}>
                      <Button className='w-full' size='lg'>
                        <CreditCard className='mr-2 h-4 w-4' />
                        Перейти к оформлению
                      </Button>
                    </Link>

                    <div className='space-y-2 text-sm text-muted-foreground'>
                      <div className='flex items-center gap-2'>
                        <Shield className='h-4 w-4' />
                        <span>Безопасная оплата</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Clock className='h-4 w-4' />
                        <span>Быстрое оформление</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Gift className='h-4 w-4' />
                        <span>Подарочная упаковка</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Methods */}
                <Card>
                  <CardHeader>
                    <CardTitle className='text-base'>Способы оплаты</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='grid grid-cols-3 gap-2'>
                      <div className='border rounded p-2 text-center'>
                        <CreditCard className='h-6 w-6 mx-auto mb-1' />
                        <span className='text-xs'>Карта</span>
                      </div>
                      <div className='border rounded p-2 text-center'>
                        <MapPin className='h-6 w-6 mx-auto mb-1' />
                        <span className='text-xs'>СБП</span>
                      </div>
                      <div className='border rounded p-2 text-center'>
                        <Percent className='h-6 w-6 mx-auto mb-1' />
                        <span className='text-xs'>Рассрочка</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
