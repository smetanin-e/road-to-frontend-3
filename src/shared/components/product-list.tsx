'use client';
import React from 'react';
import { BookDTO } from '../services/dto/products.dto';
import { Api } from '../services';
import { ProductCard } from './product-card';
import { Button } from './ui';

interface Props {
  className?: string;
  slug: string;
}

export const ProductList: React.FC<Props> = ({ slug }) => {
  const [books, setBooks] = React.useState<BookDTO[]>([]);
  const [skip, setSkip] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);

  const take = 8;
  const didLoad = React.useRef(false);
  React.useEffect(() => {
    setBooks([]);
    setSkip(0);
    setHasMore(true);

    if (!didLoad.current) {
      loadBooks(0);
      didLoad.current = true;
    }
  }, [slug]);

  const loadBooks = async (customSkip?: number) => {
    if (loading) return;
    setLoading(true);
    const currentSkip = customSkip ?? skip;

    try {
      const { data } = await Api.products.getProductsBySlug(slug, { skip: currentSkip, take });
      setBooks((prev) => [...prev, ...data]);
      setSkip(currentSkip + take);

      if (data.length < take) {
        setHasMore(false);
      }
    } catch (error) {
      console.log('loadBooks ERROR', error);
    } finally {
      setLoading(false);
    }
  };

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
