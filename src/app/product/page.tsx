import Image from 'next/image';
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  ChevronRight,
  Calendar,
  BookOpen,
  Package,
} from 'lucide-react';

import { Button } from '@/shared/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui';
import { Badge } from '@/shared/ui';
import { Separator } from '@/shared/ui';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui';
import { Progress } from '@/shared/ui';

export default function Product() {
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
            <a href='/books' className='hover:text-foreground transition-colors'>
              Книги
            </a>
            <ChevronRight className='h-4 w-4' />
            <a href='/books/fiction' className='hover:text-foreground transition-colors'>
              Художественная литература
            </a>
            <ChevronRight className='h-4 w-4' />
            <span className='text-foreground'>Мастер и Маргарита</span>
          </nav>
        </div>
      </div>

      <div className='container mx-auto px-4 py-8'>
        {/* Main Product Section */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12'>
          {/* Left - Images */}
          <div className='lg:col-span-4'>
            <div className='sticky top-8'>
              <div className='relative mb-4'>
                <Image
                  src='https://cv8.litres.ru/pub/c/elektronnaya-kniga/cover_415/4989181-mihail-krechmar-mohnatyy-bog.webp'
                  alt='Мастер и Маргарита'
                  width={400}
                  height={600}
                  className='w-full rounded-lg shadow-lg'
                />
                <Badge className='absolute top-4 left-4 bg-red-500 text-white'>-25%</Badge>
              </div>

              {/* Thumbnail Gallery */}
              <div className='flex gap-2 overflow-x-auto'>
                {[1, 2, 3, 4].map((i) => (
                  <Image
                    key={i}
                    src={`https://cv8.litres.ru/pub/c/elektronnaya-kniga/cover_415/4989181-mihail-krechmar-mohnatyy-bog.webp`}
                    alt={`Изображение ${i}`}
                    width={60}
                    height={80}
                    className='flex-shrink-0 rounded border-2 border-transparent hover:border-primary cursor-pointer transition-colors'
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Center - Description and Details */}
          <div className='lg:col-span-5'>
            <div className='space-y-6'>
              <div>
                <h1 className='text-3xl font-bold mb-2'>Мастер и Маргарита</h1>
                <p className='text-xl text-muted-foreground mb-4'>Михаил Булгаков</p>

                {/* Rating */}
                <div className='flex items-center gap-2 mb-4'>
                  <div className='flex items-center'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className='text-sm text-muted-foreground'>(4.2 из 5, 1,247 отзывов)</span>
                </div>

                {/* Quick Info */}
                <div className='flex flex-wrap gap-4 text-sm text-muted-foreground mb-6'>
                  <div className='flex items-center gap-1'>
                    <Calendar className='h-4 w-4' />
                    <span>2023 год</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <BookOpen className='h-4 w-4' />
                    <span>480 страниц</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <Package className='h-4 w-4' />
                    <span>Твердый переплет</span>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <Tabs defaultValue='description' className='w-full'>
                <TabsList className='grid w-full grid-cols-3'>
                  <TabsTrigger value='description'>Описание</TabsTrigger>
                  <TabsTrigger value='specs'>Характеристики</TabsTrigger>
                  <TabsTrigger value='author'>Об авторе</TabsTrigger>
                </TabsList>

                <TabsContent value='description' className='space-y-4'>
                  <p className='text-muted-foreground leading-relaxed'>
                    «Мастер и Маргарита» — роман Михаила Афанасьевича Булгакова, работа над которым
                    началась в конце 1920-х годов и продолжалась вплоть до смерти писателя. Роман
                    относится к незавершённым произведениям; редактирование и сведение воедино
                    черновых записей осуществляла после смерти писателя его вдова — Елена Сергеевна
                    Булгакова.
                  </p>
                  <p className='text-muted-foreground leading-relaxed'>
                    Роман сочетает в себе элементы сатиры на советскую действительность, философскую
                    притчу, фантастику и любовную историю. Произведение считается вершиной
                    творчества Булгакова и одним из лучших романов XX века.
                  </p>
                  <Button variant='outline' className='mt-4 bg-transparent'>
                    <BookOpen className='mr-2 h-4 w-4' />
                    Читать отрывок
                  </Button>
                </TabsContent>

                <TabsContent value='specs' className='space-y-4'>
                  <div className='grid grid-cols-2 gap-4 text-sm'>
                    <div>
                      <span className='font-medium'>Издательство:</span>
                      <p className='text-muted-foreground'>АСТ</p>
                    </div>
                    <div>
                      <span className='font-medium'>Серия:</span>
                      <p className='text-muted-foreground'>Классическая проза</p>
                    </div>
                    <div>
                      <span className='font-medium'>Год издания:</span>
                      <p className='text-muted-foreground'>2023</p>
                    </div>
                    <div>
                      <span className='font-medium'>Количество страниц:</span>
                      <p className='text-muted-foreground'>480</p>
                    </div>
                    <div>
                      <span className='font-medium'>Переплет:</span>
                      <p className='text-muted-foreground'>Твердый</p>
                    </div>
                    <div>
                      <span className='font-medium'>Формат:</span>
                      <p className='text-muted-foreground'>84x108/32</p>
                    </div>
                    <div>
                      <span className='font-medium'>ISBN:</span>
                      <p className='text-muted-foreground'>978-5-17-123456-7</p>
                    </div>
                    <div>
                      <span className='font-medium'>Вес:</span>
                      <p className='text-muted-foreground'>520 г</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value='author' className='space-y-4'>
                  <div className='flex items-start gap-4'>
                    <Avatar className='h-16 w-16'>
                      <AvatarImage src='/placeholder.svg?height=64&width=64' />
                      <AvatarFallback>МБ</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className='font-semibold text-lg'>Михаил Афанасьевич Булгаков</h3>
                      <p className='text-sm text-muted-foreground mb-2'>(1891-1940)</p>
                      <p className='text-muted-foreground leading-relaxed'>
                        Русский писатель, драматург, театральный режиссёр и актёр. Автор романов,
                        повестей, рассказов, очерков, фельетонов, пьес, инсценировок, киносценариев,
                        оперных либретто.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right - Purchase Block */}
          <div className='lg:col-span-3'>
            <div className='sticky top-8'>
              <Card>
                <CardContent className='p-6 space-y-6'>
                  {/* Price */}
                  <div className='space-y-2'>
                    <div className='flex items-center gap-2'>
                      <span className='text-3xl font-bold text-primary'>750 ₽</span>
                      <span className='text-lg text-muted-foreground line-through'>1000 ₽</span>
                    </div>
                    <Badge variant='secondary' className='text-green-600'>
                      Экономия 250 ₽
                    </Badge>
                  </div>

                  {/* Availability */}
                  <div className='space-y-2'>
                    <div className='flex items-center gap-2 text-green-600'>
                      <div className='h-2 w-2 bg-green-600 rounded-full'></div>
                      <span className='text-sm font-medium'>В наличии</span>
                    </div>
                    <p className='text-sm text-muted-foreground'>Осталось 5 экземпляров</p>
                  </div>

                  {/* Actions */}
                  <div className='space-y-3'>
                    <Button className='w-full' size='lg'>
                      <ShoppingCart className='mr-2 h-4 w-4' />
                      Добавить в корзину
                    </Button>

                    <div className='flex gap-2'>
                      <Button variant='outline' size='sm' className='flex-1 bg-transparent'>
                        <Heart className='mr-2 h-4 w-4' />В избранное
                      </Button>
                      <Button variant='outline' size='sm' className='flex-1 bg-transparent'>
                        <Share2 className='mr-2 h-4 w-4' />
                        Поделиться
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Delivery Info */}
                  <div className='space-y-3'>
                    <h4 className='font-medium'>Доставка и оплата</h4>
                    <div className='space-y-2 text-sm'>
                      <div className='flex items-center gap-2'>
                        <Truck className='h-4 w-4 text-muted-foreground' />
                        <span>Доставка от 200 ₽</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Shield className='h-4 w-4 text-muted-foreground' />
                        <span>Гарантия качества</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <RotateCcw className='h-4 w-4 text-muted-foreground' />
                        <span>Возврат 30 дней</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <Card className='mb-8'>
          <CardHeader>
            <CardTitle className='flex items-center justify-between'>
              <span>Отзывы покупателей</span>
              <Button variant='outline'>Написать отзыв</Button>
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            {/* Rating Summary */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-4'>
                <div className='flex items-center gap-4'>
                  <span className='text-4xl font-bold'>4.2</span>
                  <div>
                    <div className='flex items-center mb-1'>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className='text-sm text-muted-foreground'>1,247 отзывов</p>
                  </div>
                </div>
              </div>

              <div className='space-y-2'>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className='flex items-center gap-2'>
                    <span className='text-sm w-3'>{rating}</span>
                    <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                    <Progress
                      value={rating === 5 ? 60 : rating === 4 ? 30 : rating === 3 ? 8 : 2}
                      className='flex-1'
                    />
                    <span className='text-sm text-muted-foreground w-8'>
                      {rating === 5 ? '748' : rating === 4 ? '374' : rating === 3 ? '100' : '25'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Individual Reviews */}
            <div className='space-y-6'>
              {[
                {
                  name: 'Анна К.',
                  rating: 5,
                  date: '15 января 2024',
                  text: 'Потрясающее издание! Качественная печать, красивая обложка. Сам роман - шедевр, который стоит перечитывать. Рекомендую всем любителям классической литературы.',
                },
                {
                  name: 'Дмитрий М.',
                  rating: 4,
                  date: '8 января 2024',
                  text: 'Хорошее издание, но немного разочаровал размер шрифта - мог быть чуть крупнее. В остальном все отлично, доставка быстрая.',
                },
                {
                  name: 'Елена С.',
                  rating: 5,
                  date: '2 января 2024',
                  text: 'Купила в подарок, очень довольна выбором. Книга выглядит солидно, качество печати на высоте. Получатель подарка в восторге!',
                },
              ].map((review, index) => (
                <div key={index} className='border-b pb-4 last:border-b-0'>
                  <div className='flex items-start gap-3'>
                    <Avatar>
                      <AvatarFallback>
                        {review.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-1'>
                        <span className='font-medium'>{review.name}</span>
                        <div className='flex items-center'>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className='text-sm text-muted-foreground'>{review.date}</span>
                      </div>
                      <p className='text-muted-foreground'>{review.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button variant='outline' className='w-full bg-transparent'>
              Показать все отзывы
            </Button>
          </CardContent>
        </Card>

        {/* Similar Products */}
        <Card>
          <CardHeader>
            <CardTitle>Похожие товары</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              {[
                { title: 'Белая гвардия', author: 'М. Булгаков', price: '650 ₽' },
                { title: 'Собачье сердце', author: 'М. Булгаков', price: '550 ₽' },
                { title: 'Театральный роман', author: 'М. Булгаков', price: '700 ₽' },
                { title: 'Записки юного врача', author: 'М. Булгаков', price: '600 ₽' },
              ].map((book, index) => (
                <Card
                  key={index}
                  className='p-0 max-w-[150px] cursor-pointer hover:shadow-md transition-shadow'
                >
                  <CardContent className='p-0'>
                    <Image
                      src={`https://cv8.litres.ru/pub/c/elektronnaya-kniga/cover_415/4989181-mihail-krechmar-mohnatyy-bog.webp`}
                      alt={book.title}
                      width={110}
                      height={250}
                      className='w-full h-32 object-cover rounded mb-2'
                    />
                    <div className='px-2'>
                      <h4 className='font-medium text-sm mb-1 line-clamp-2'>{book.title}</h4>
                      <p className='text-xs text-muted-foreground mb-2'>{book.author}</p>
                      <p className='font-bold text-primary'>{book.price}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
