import { ProductSection } from '@/shared/components';
import { prisma } from '@/shared/lib';

import React from 'react';

export default async function Home() {
  const books = await prisma.book.findMany({
    where: {
      tags: {
        some: { id: 1 },
      },
    },
    include: {
      author: true,
      images: true,
      tags: true,
    },
  });

  console.log(books);
  return (
    <div className='min-h-screen bg-background'>
      <ProductSection books={books} />
      {/* <ProductSection /> */}

      <p>content</p>
    </div>
  );
}
