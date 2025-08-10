'use client';
import React from 'react';
import { Container, ProductsContainer } from '@/shared/components';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/shared/ui';

interface Props {
  className?: string;
}

export const ProductSection: React.FC<Props> = () => {
  return (
    <div className='mt-10 '>
      <Container>
        {/* Шапка */}
        <div className='mb-4 flex justify-between items-end'>
          <h2 className='text-4xl'>Новинки</h2>

          <Button variant='ghost' className='group relative flex hover:bg-transparent'>
            <span className='pr-6'>Все новинки </span>
            <ArrowRight
              size={20}
              className='absolute right-2 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
            />
          </Button>
        </div>

        {/* контент */}
        <ProductsContainer />
      </Container>
    </div>
  );
};
