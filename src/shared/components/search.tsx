import React from 'react';
import { Button, Input } from '@/shared/components/ui';
import { Book } from '@prisma/client';
import { useClickAway, useDebounce } from 'react-use';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/shared/lib';
import { Api } from '../services';
import Image from 'next/image';
import { BookDTO } from '../services/dto/products.dto';

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [focused, setFocused] = React.useState(false);
  const [products, setProducts] = React.useState<BookDTO[]>([]);
  const ref = React.useRef(null);

  useClickAway(ref, () => {
    setFocused(false);
  });

  useDebounce(
    async () => {
      try {
        const response = await Api.search.search(searchQuery);
        setProducts(response);
      } catch (error) {
        console.log(error);
      }
    },
    250,
    [searchQuery],
  );

  const onClickItem = () => {
    setFocused(false);
    setSearchQuery('');
    setProducts([]);
  };

  return (
    <>
      {focused && <div className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30' />}
      <div
        ref={ref}
        className={cn('flex-1 flex justify-center items-center max-w-[600px] z-31 ', className)}
      >
        {' '}
        <div className='relative w-full'>
          <Input
            type='text'
            placeholder='Поиск'
            onFocus={() => setFocused(true)}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='min-w-[300px] pr-11 bg-background'
          />
          {searchQuery && (
            <Button
              onClick={onClickItem}
              variant='ghost'
              className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 hover:bg-transparent '
            >
              ✕
            </Button>
          )}

          {products.length > 0 && (
            <div
              className={cn(
                'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
                focused && 'visible opacity-100 top-12',
              )}
            >
              {products.map((product) => (
                <Link
                  onClick={onClickItem}
                  key={product.id}
                  className='flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10'
                  href={`/product/${product.id}`}
                >
                  <Image
                    className='rounded-sm'
                    src={product.images[0].url}
                    alt={product.title}
                    width={32}
                    height={32}
                    priority
                  />
                  <span>{product.title}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* {focused && <div className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30' />}

      <div
        ref={ref}
        className={cn('flex rounded-2xl flex-1 justify-between relative h-11 z-30', className)}
      >
        <Search className='absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400' />
        <Input
          type='text'
          placeholder='Поиск...'
          onFocus={() => setFocused(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {products.length > 0 && (
          <div
            className={cn(
              'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
              focused && 'visible opacity-100 top-12',
            )}
          >
            {products.map((product) => (
              <Link
                onClick={onClickItem}
                key={product.id}
                className='flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10'
                href={`/product/${product.id}`}
              >
                <img className='rounded-sm h-8 w-8' src={product.imageUrl} alt={product.name} />
                <span>{product.title}</span>
              </Link>
            ))}
          </div>
        )}
      </div> */}
    </>
  );
};
