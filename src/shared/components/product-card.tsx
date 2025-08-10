import Image from 'next/image';
import { Heart, ShoppingCart } from 'lucide-react';
import { Badge, Button, Card, CardContent } from '@/shared/ui';
interface Props {
  className?: string;
  title?: string;
}
export const ProductCard: React.FC<Props> = ({ title }) => {
  return (
    <Card className='w-full max-w-[280px] h-full p-0  overflow-hidden group hover:shadow-lg transition-shadow duration-300'>
      <CardContent className='p-0 flex flex-col h-full '>
        <div className='relative'>
          <Image
            src='https://cv8.litres.ru/pub/c/elektronnaya-kniga/cover_415/4989181-mihail-krechmar-mohnatyy-bog.webp'
            alt='Мастер и Маргарита'
            width={200}
            height={320}
            className='w-full h-80 object-cover'
          />
          <Badge className='absolute top-3 left-3 bg-red-500 hover:bg-red-600 text-white'>
            -25%
          </Badge>
          <Button
            size='icon'
            variant='ghost'
            className='absolute top-3 right-3 bg-white/80 hover:bg-white hover:text-red-500 transition-colors'
          >
            <Heart className='h-4 w-4' />
            <span className='sr-only'>Добавить в избранное</span>
          </Button>
        </div>

        <div className='p-4 space-y-3 flex flex-col flex-grow'>
          <div className='space-y-1'>
            <h3 className='font-semibold text-lg leading-tight line-clamp-2'>
              {title ? title : 'Мастер и Маргарита'}
            </h3>
            <p className='text-sm text-muted-foreground'>Михаил Булгаков</p>
          </div>

          <div className='flex items-center gap-2 mt-auto'>
            <span className='text-2xl font-bold text-primary'>750 ₽</span>
            <span className='text-sm text-muted-foreground line-through'>1000 ₽</span>
          </div>

          <Button className='w-full ' size='lg'>
            <ShoppingCart className='mr-2 h-4 w-4' />
            Добавить в корзину
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
