'use client';
import { useState } from 'react';
import {
  Badge,
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  SheetClose,
} from '@/shared/components/ui';
import { ChevronDown, ChevronRight, BookOpenCheck, LibraryBig } from 'lucide-react';

import { CatalogDTO } from '../services/dto/catalog.dto';
import Link from 'next/link';

interface CategoryItemProps {
  category: CatalogDTO;
  onCategorySelect: (categoryId: number, subcategoryId?: number) => void;
}

export function CatalogItem({ category, onCategorySelect }: CategoryItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='border-b border-gray-100 last:border-b-0'>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className='flex items-center justify-between py-3 px-1'>
          <SheetClose asChild>
            <Link href={`/products/${category.slug}`}>
              <Button
                variant='ghost'
                onClick={() => onCategorySelect(category.id)}
                // ! ИСПРАВИТЬ СИНИЙ ЦВЕТ ПРИ НАВЕДЕНИИ
                className=' flex items-center gap-3 flex-1 text-left hover:text-blue-600 hover:bg-transparent transition-colors'
              >
                {/* {category.icon} */}
                <LibraryBig />
                <span className='font-medium'>{category.name}</span>
              </Button>
            </Link>
          </SheetClose>

          <Badge variant='secondary' className='ml-auto mr-2'>
            {/* {category.count} */}
            10
          </Badge>

          {category.subcategories && (
            <CollapsibleTrigger asChild>
              <Button variant='ghost' size='sm' className='p-1 h-auto'>
                {isOpen ? (
                  <ChevronDown className='h-4 w-4' />
                ) : (
                  <ChevronRight className='h-4 w-4' />
                )}
              </Button>
            </CollapsibleTrigger>
          )}
        </div>

        {category.subcategories && (
          <CollapsibleContent className='pb-2'>
            <div className='ml-7 space-y-2'>
              {category.subcategories &&
                category.subcategories.map((subcategory) => (
                  <div key={subcategory.id} className='flex items-center justify-between'>
                    {' '}
                    <SheetClose asChild>
                      <Link href={`/products/${subcategory.slug}`}>
                        {' '}
                        <Button
                          variant='ghost'
                          onClick={() => onCategorySelect(category.id, subcategory.id)}
                          // ! ИСПРАВИТЬ СИНИЙ ЦВЕТ ПРИ НАВЕДЕНИИ
                          className='flex items-center justify-between w-full py-2 px-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors'
                        >
                          <div className='flex items-center gap-5'>
                            <BookOpenCheck />
                            <span>{subcategory.name}</span>
                          </div>
                        </Button>
                      </Link>
                    </SheetClose>
                    <Badge variant='outline' className='text-xs'>
                      {/* {subcategory.count} */}5
                    </Badge>
                  </div>
                ))}
            </div>
          </CollapsibleContent>
        )}
      </Collapsible>
    </div>
  );
}
