import React from 'react';
import {
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui';
import { ProductCard } from './product-card';

interface Props {
  className?: string;
}

export const ProductsContainer: React.FC<Props> = () => {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className='w-full'
    >
      <CarouselContent className='ml-0 flex gap-4 items-stretch'>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/4 px-0'>
            <div className='h-full'>
              <ProductCard />
            </div>
          </CarouselItem>
        ))}

        <CarouselItem className='md:basis-1/2 lg:basis-1/4 px-4'>
          <div>
            <ProductCard title={'sdfdsfd sdfsd f dsdfsdfsdfd dfdsf'} />
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
