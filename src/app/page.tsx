import { ProductSection } from '@/shared/components';
import { Api } from '@/shared/services';

import React from 'react';

export default async function Home() {
  const booksByTags = await Api.cards.getCards();
  console.log(booksByTags);

  return (
    <div className='min-h-screen bg-background'>
      {booksByTags.map((tag) => (
        <ProductSection key={tag.id} data={tag} />
      ))}

      <p></p>
    </div>
  );
}
