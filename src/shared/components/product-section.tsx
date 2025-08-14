'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Container, ProductCard } from '@/shared/components';
import { Button } from '@/shared/ui';
import { TagDTO } from '../services/dto/book-cards.dto';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui';

interface Props {
  className?: string;
  data: TagDTO;
}

export const ProductSection: React.FC<Props> = ({ data }) => {
  return (
    <div className='mt-8 pb-15 '>
      <Container>
        {/* Шапка */}
        <div className='mb-8 flex justify-between items-end'>
          <h2 className='text-4xl'>{data.name}</h2>

          <Button variant='ghost' className='group relative flex hover:bg-transparent'>
            <span className='pr-6'>Все {data.name.toLowerCase()} </span>
            <ArrowRight
              size={20}
              className='absolute right-2 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
            />
          </Button>
        </div>

        {/* контент */}
        <Carousel
          opts={{
            align: 'start',
          }}
          className='w-full'
        >
          <CarouselContent className='ml-0 flex gap-4 items-stretch'>
            {data.books.map((book, index) => (
              <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/4 px-0'>
                <div className='h-full'>
                  <ProductCard book={book} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </Container>
    </div>
  );
};
