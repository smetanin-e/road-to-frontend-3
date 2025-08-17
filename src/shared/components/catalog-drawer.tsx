'use client';

import {
  Badge,
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui';
import { BookOpenText } from 'lucide-react';

import { CatalogItem } from './catalog-item';
import { useCategoriesStore } from '@/store/categories';
import { useEffect } from 'react';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
  subcategories?: Subcategory[];
}

interface Subcategory {
  id: string;
  name: string;
  count: number;
}

interface CategoriesSheetProps {
  trigger?: React.ReactNode;
  onCategorySelect?: (categoryId: number, subcategoryId?: number) => void;
  children: React.ReactNode;
}

export function CatalogDrawer({
  children,
  onCategorySelect = (categoryId, subcategoryId) => {
    console.log('Selected:', categoryId, subcategoryId);
  },
}: CategoriesSheetProps) {
  const { categories, getAllCategories } = useCategoriesStore();

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent side='left' className='w-80 sm:w-96 gap-0'>
        <SheetHeader className='text-left'>
          <SheetTitle className='flex items-center gap-2 text-2xl '>
            <BookOpenText className='h-6 w-6' />
            Каталог
          </SheetTitle>
          <SheetDescription>Выберите категорию для поиска книг</SheetDescription>
        </SheetHeader>

        <div className='mt-0 px-4 space-y-1 max-h-[calc(100vh-120px)] overflow-y-auto'>
          {categories.map((category) => (
            <CatalogItem
              key={category.id}
              category={category}
              onCategorySelect={onCategorySelect}
            />
          ))}
        </div>

        <div className='absolute bottom-4 left-4 right-4 pt-4 border-t bg-background'>
          <p className='text-xs text-gray-500 text-center'>
            Всего категорий: {categories.length} • Всего книг:{' '}
            {categories.reduce(
              (sum, category) => sum + (category.subcategories ? category.subcategories.length : 0),
              0,
            )}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
