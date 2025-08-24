'use client';
import Link from 'next/link';
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useCategoriesStore } from '@/shared/store/categories';

interface Props {
  className?: string;
  categoryId: number;
  subcategoryId: number;
}

export const BookBreadcrumbs: React.FC<Props> = ({ categoryId, subcategoryId }) => {
  const { categories } = useCategoriesStore();
  const category = categories.find((category) => category?.id === categoryId);
  const subcategory = category?.subcategories?.find(
    (subcategory) => subcategory.id === subcategoryId,
  );

  return (
    <div className='border-b'>
      <div className='container mx-auto px-4 py-3'>
        <nav className='flex items-center space-x-2 text-sm text-muted-foreground'>
          <Link href='/' className='hover:text-foreground transition-colors'>
            Главная
          </Link>
          <ChevronRight className='h-4 w-4' />

          <Link
            href={`/products/${category?.slug}`}
            className='hover:text-foreground transition-colors'
          >
            {category?.name}
          </Link>
          <ChevronRight className='h-4 w-4' />
          <Link
            href={`/products/${subcategory?.slug}`}
            className='hover:text-foreground transition-colors'
          >
            {subcategory?.name}
          </Link>
        </nav>
      </div>
    </div>
  );
};
