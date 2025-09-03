'use client';
import React from 'react';
import Image from 'next/image';
import { Badge } from '@/shared/components/ui';
import { BookImage } from '@prisma/client';
import { cn } from '@/shared/lib';
interface Props {
  className?: string;
  images: BookImage[];
  sale: number;
}

export const BookImagesContainer: React.FC<Props> = ({ images, sale }) => {
  const [mainImage, setMainImage] = React.useState(images[0].url);
  return (
    <div className='lg:col-span-4'>
      <div className='sticky top-8'>
        <div className='relative mb-4'>
          <Image
            src={mainImage ?? '/default-book.png'}
            alt='Мастер и Маргарита'
            width={400}
            height={600}
            className='w-full rounded-lg shadow-lg'
          />
          {sale ? (
            <Badge className='absolute top-4 left-4 bg-red-500 text-white'>{`-${sale}%`}</Badge>
          ) : null}
        </div>

        {/* Thumbnail Gallery */}
        <div className='flex gap-2 overflow-x-auto'>
          {images.map((image) => (
            <Image
              key={image.order}
              src={image.url}
              alt={`Изображение ${image.url}`}
              width={60}
              height={80}
              onClick={() => setMainImage(image.url)}
              className={cn(
                'flex-shrink-0 rounded border-2 border-transparent cursor-pointer transition-colors',
                mainImage === image.url && 'border-primary',
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
