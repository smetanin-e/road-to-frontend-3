'use client';
import React from 'react';
import { ProductCard } from '@/shared/components';
import { Button } from '@/shared/components/ui';
import { useProductList } from '@/shared/hooks';

interface Props {
  className?: string;
  slug: string;
}

export const ProductList: React.FC<Props> = ({ slug }) => {
  const { loading, books, hasMore, loadBooks } = useProductList(slug);

  return (
    <>
      <div className='flex gap-15 flex-wrap'>
        {books.map((book, index) => (
          <div key={index} className='w-[278px]'>
            <div className='h-full'>
              <ProductCard book={book} />
            </div>
          </div>
        ))}
      </div>

      <div className='mt-8 flex justify-center'>
        {loading ? (
          <span className='text-gray-500'>Загрузка...</span>
        ) : (
          hasMore && (
            <Button variant={'ghost'} onClick={() => loadBooks()}>
              Показать ещё
            </Button>
          )
        )}
      </div>
    </>
  );
};
