import Image from 'next/image';
import { Star, BookOpen } from 'lucide-react';

import { Button } from '@/shared/components/ui';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Avatar,
  AvatarFallback,
  Progress,
} from '@/shared/components/ui';

import { prisma, salePercent } from '@/shared/lib';
import {
  AuthorInfo,
  BookActions,
  BookBreadcrumbs,
  BookImagesContainer,
  QuickInfo,
  Specs,
} from '@/shared/components';

export default async function Product({ params }: { params: Promise<{ id: number }> }) {
  const productId = (await params).id;

  const book = await prisma.book.findFirst({
    where: {
      id: Number(productId),
    },
    include: {
      author: true,
      images: true,
      specs: true,
    },
  });

  if (!book) {
    return null;
  }

  return (
    <div className='min-h-screen bg-background'>
      {/* Breadcrumbs */}

      <BookBreadcrumbs categoryId={book.categoryId} subcategoryId={book.subcategoryId} />

      <div className='container mx-auto px-4 py-8'>
        {/* Main Product Section */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12'>
          {/* Left - Images */}
          {/*//!СДЕЛАТЬ ПУСТУЮ КАРТИНКУ, ЕСЛИ НЕ БУДЕТ ИЗОБРАЖЕНИЙ  */}
          <BookImagesContainer
            images={book?.images}
            sale={salePercent(book.oldPrice, book.price)}
          />

          {/* Center - Description and Details */}
          <div className='lg:col-span-5'>
            <div className='space-y-6'>
              <div>
                <h1 className='text-3xl font-bold mb-2'>{book?.title}</h1>
                <p className='text-xl text-muted-foreground mb-4'>{book?.author.name}</p>

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
                <QuickInfo specs={book?.specs} />
              </div>

              {/* Tabs */}
              <Tabs defaultValue='description' className='w-full'>
                <TabsList className='grid w-full grid-cols-3'>
                  <TabsTrigger value='description'>Описание</TabsTrigger>
                  <TabsTrigger value='specs'>Характеристики</TabsTrigger>
                  <TabsTrigger value='author'>Об авторе</TabsTrigger>
                </TabsList>

                <TabsContent value='description' className='space-y-4'>
                  <p className='text-muted-foreground leading-relaxed'>{book.description}</p>

                  <Button variant='outline' className='mt-4 bg-transparent'>
                    <BookOpen className='mr-2 h-4 w-4' />
                    Читать отрывок
                  </Button>
                </TabsContent>

                <TabsContent value='specs' className='space-y-4'>
                  <Specs specs={book?.specs} />
                </TabsContent>

                <TabsContent value='author' className='space-y-4'>
                  <AuthorInfo author={book.author} />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right - Purchase Block */}
          <BookActions bookId={book.id} price={book?.price} oldPrice={book?.oldPrice} />
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
