'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Minus,
  Plus,
  Trash2,
  Heart,
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
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      title: 'Мастер и Маргарита',
      author: 'Михаил Булгаков',
      price: 750,
      originalPrice: 1000,
      quantity: 1,
      image: '/placeholder.svg?height=120&width=80',
      inStock: true,
    },
    {
      id: '2',
      title: 'Белая гвардия',
      author: 'Михаил Булгаков',
      price: 650,
      originalPrice: 800,
      quantity: 2,
      image: '/placeholder.svg?height=120&width=80',
      inStock: true,
    },
    {
      id: '3',
      title: 'Собачье сердце',
      author: 'Михаил Булгаков',
      price: 550,
      originalPrice: 550,
      quantity: 1,
      image: '/placeholder.svg?height=120&width=80',
      inStock: false,
    },
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('standard');

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)),
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const originalTotal = cartItems.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0,
  );
  const savings = originalTotal - subtotal;
  const deliveryPrice = deliveryMethod === 'express' ? 500 : deliveryMethod === 'pickup' ? 0 : 200;
  const freeDeliveryThreshold = 2000;
  const progressToFreeDelivery = Math.min((subtotal / freeDeliveryThreshold) * 100, 100);
  const total = subtotal + deliveryPrice;

  return (
    <div className='min-h-screen bg-background'>
      {/* Breadcrumbs */}
      <div className='border-b'>
        <div className='container mx-auto px-4 py-3'>
          <nav className='flex items-center space-x-2 text-sm text-muted-foreground'>
            <a href='/' className='hover:text-foreground transition-colors'>
              Главная
            </a>
            <ChevronRight className='h-4 w-4' />
            <span className='text-foreground'>Корзина</span>
          </nav>
        </div>
      </div>

      <div className='container mx-auto px-4 py-8'>
        <div className='flex items-center justify-between mb-8'>
          <h1 className='text-3xl font-bold'>Корзина</h1>
          <Badge variant='secondary' className='text-lg px-3 py-1'>
            {cartItems.length}{' '}
            {cartItems.length === 1 ? 'товар' : cartItems.length < 5 ? 'товара' : 'товаров'}
          </Badge>
        </div>

        {cartItems.length === 0 ? (
          <Card className='text-center py-12'>
            <CardContent>
              <ShoppingCart className='h-16 w-16 mx-auto text-muted-foreground mb-4' />
              <h2 className='text-xl font-semibold mb-2'>Ваша корзина пуста</h2>
              <p className='text-muted-foreground mb-6'>
                Добавьте товары, чтобы продолжить покупки
              </p>
              <Button asChild>
                <a href='/books'>Перейти к покупкам</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Left - Cart Items */}
            <div className='lg:col-span-2 space-y-6'>
              {/* Progress to Free Delivery */}
              {subtotal < freeDeliveryThreshold && (
                <Card>
                  <CardContent className='p-4'>
                    <div className='flex items-center gap-2 mb-2'>
                      <Truck className='h-4 w-4 text-green-600' />
                      <span className='text-sm font-medium'>
                        До бесплатной доставки осталось {freeDeliveryThreshold - subtotal} ₽
                      </span>
                    </div>
                    <Progress value={progressToFreeDelivery} className='h-2' />
                  </CardContent>
                </Card>
              )}

              {/* Cart Items */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center justify-between'>
                    <span>Товары в корзине</span>
                    <Button variant='ghost' size='sm' className='text-muted-foreground'>
                      Очистить корзину
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  {cartItems.map((item, index) => (
                    <div key={item.id}>
                      <div className='flex gap-4'>
                        <div className='relative'>
                          <Image
                            src={item.image || '/placeholder.svg'}
                            alt={item.title}
                            width={80}
                            height={120}
                            className='rounded border'
                          />
                          {!item.inStock && (
                            <div className='absolute inset-0 bg-black/50 rounded flex items-center justify-center'>
                              <span className='text-white text-xs font-medium'>Нет в наличии</span>
                            </div>
                          )}
                        </div>

                        <div className='flex-1 space-y-2'>
                          <div>
                            <h3 className='font-semibold'>{item.title}</h3>
                            <p className='text-sm text-muted-foreground'>{item.author}</p>
                            {!item.inStock && (
                              <Badge variant='destructive' className='mt-1'>
                                Нет в наличии
                              </Badge>
                            )}
                          </div>

                          <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                              <span className='font-bold text-lg'>{item.price} ₽</span>
                              {item.originalPrice > item.price && (
                                <span className='text-sm text-muted-foreground line-through'>
                                  {item.originalPrice} ₽
                                </span>
                              )}
                            </div>

                            <div className='flex items-center gap-2'>
                              {/* Quantity Controls */}
                              <div className='flex items-center border rounded'>
                                <Button
                                  variant='ghost'
                                  size='sm'
                                  className='h-8 w-8 p-0'
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={!item.inStock}
                                >
                                  <Minus className='h-3 w-3' />
                                </Button>
                                <span className='px-3 py-1 text-sm font-medium min-w-[2rem] text-center'>
                                  {item.quantity}
                                </span>
                                <Button
                                  variant='ghost'
                                  size='sm'
                                  className='h-8 w-8 p-0'
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  disabled={!item.inStock}
                                >
                                  <Plus className='h-3 w-3' />
                                </Button>
                              </div>

                              {/* Actions */}
                              <Button
                                variant='ghost'
                                size='sm'
                                className='text-muted-foreground hover:text-red-500'
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className='h-4 w-4' />
                              </Button>
                              <Button
                                variant='ghost'
                                size='sm'
                                className='text-muted-foreground hover:text-red-500'
                              >
                                <Heart className='h-4 w-4' />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {index < cartItems.length - 1 && <Separator className='mt-4' />}
                    </div>
                  ))}
                </CardContent>
              </Card>

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
                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                      <Truck className='h-5 w-5' />
                      Способ доставки
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
                      <div className='space-y-3'>
                        <div className='flex items-center space-x-2 p-3 border rounded-lg'>
                          <RadioGroupItem value='standard' id='standard' />
                          <Label htmlFor='standard' className='flex-1 cursor-pointer'>
                            <div className='flex justify-between items-center'>
                              <div>
                                <p className='font-medium'>Стандартная доставка</p>
                                <p className='text-sm text-muted-foreground'>3-5 рабочих дней</p>
                              </div>
                              <span className='font-medium'>200 ₽</span>
                            </div>
                          </Label>
                        </div>

                        <div className='flex items-center space-x-2 p-3 border rounded-lg'>
                          <RadioGroupItem value='express' id='express' />
                          <Label htmlFor='express' className='flex-1 cursor-pointer'>
                            <div className='flex justify-between items-center'>
                              <div>
                                <p className='font-medium'>Экспресс доставка</p>
                                <p className='text-sm text-muted-foreground'>1-2 рабочих дня</p>
                              </div>
                              <span className='font-medium'>500 ₽</span>
                            </div>
                          </Label>
                        </div>

                        <div className='flex items-center space-x-2 p-3 border rounded-lg'>
                          <RadioGroupItem value='pickup' id='pickup' />
                          <Label htmlFor='pickup' className='flex-1 cursor-pointer'>
                            <div className='flex justify-between items-center'>
                              <div>
                                <p className='font-medium'>Самовывоз</p>
                                <p className='text-sm text-muted-foreground'>Готов сегодня</p>
                              </div>
                              <span className='font-medium text-green-600'>Бесплатно</span>
                            </div>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Order Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Итого</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='space-y-2'>
                      <div className='flex justify-between'>
                        <span>
                          Товары ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} шт.)
                        </span>
                        <span>{subtotal} ₽</span>
                      </div>
                      {savings > 0 && (
                        <div className='flex justify-between text-green-600'>
                          <span>Скидка</span>
                          <span>-{savings} ₽</span>
                        </div>
                      )}
                      <div className='flex justify-between'>
                        <span>Доставка</span>
                        <span>{deliveryPrice === 0 ? 'Бесплатно' : `${deliveryPrice} ₽`}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className='flex justify-between text-lg font-bold'>
                      <span>К оплате</span>
                      <span>{total} ₽</span>
                    </div>

                    <Button className='w-full' size='lg'>
                      <CreditCard className='mr-2 h-4 w-4' />
                      Перейти к оформлению
                    </Button>

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
