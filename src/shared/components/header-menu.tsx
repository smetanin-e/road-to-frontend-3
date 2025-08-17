'use client';
import React from 'react';
import { CatalogDrawer } from '@/shared/components';
import { Button } from '@/shared/components/ui';
import { useTagsStore } from '@/store/tags';
import Link from 'next/link';
import { Menu } from 'lucide-react';
interface Props {
  className?: string;
}

export const HeaderMenu: React.FC<Props> = () => {
  const { loading, tags, getTags } = useTagsStore();
  React.useEffect(() => {
    getTags();
  }, []);

  return (
    <nav className='flex items-center gap-8 text-s pt-4'>
      <CatalogDrawer>
        <Button variant='outline' className='gap-2 bg-transparent'>
          <Menu className='h-6 w-6' />
          Категории
        </Button>
      </CatalogDrawer>
      {loading ? (
        <div>Загрузка...</div>
      ) : (
        tags.map((tag) => (
          <Link
            href={`/products/${tag.slug}`}
            key={tag.id}
            className='cursor-pointer hover:text-teal-600'
          >
            {tag.name}
          </Link>
        ))
      )}
    </nav>
  );
};
