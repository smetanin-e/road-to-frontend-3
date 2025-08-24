import React from 'react';
import { Calendar, BookOpen, Package } from 'lucide-react';
import { BookSpec } from '@prisma/client';

interface Props {
  className?: string;
  specs: BookSpec[];
}

export const QuickInfo: React.FC<Props> = ({ specs }) => {
  if (!specs) {
    return null;
  }

  const year = specs.find((spec) => spec.name === 'Год издания');

  const pages = specs.find((spec) => spec.name === 'Количество страниц');

  const bookbinding = specs.find((spec) => spec.name === 'Переплет');

  return (
    <div className='flex flex-wrap gap-4 text-sm text-muted-foreground mb-6'>
      {year?.value && (
        <div className='flex items-center gap-1'>
          <Calendar className='h-4 w-4' />
          <span>{year.value} год</span>
        </div>
      )}

      {pages?.value && (
        <div className='flex items-center gap-1'>
          <BookOpen className='h-4 w-4' />
          <span>{pages.value} страниц</span>
        </div>
      )}

      {bookbinding?.value && (
        <div className='flex items-center gap-1'>
          <Package className='h-4 w-4' />
          <span>{bookbinding.value} переплет</span>
        </div>
      )}
    </div>
  );
};
