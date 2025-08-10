import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { Menu, ShoppingCart, Heart, User } from 'lucide-react';

export default function Test() {
  return (
    <header className='w-full border-b shadow-sm'>
      <div className='flex items-center justify-between px-4 py-2'>
        {/* Логотип и поиск */}
        <div className='flex items-center gap-4'>
          <div className='flex flex-col items-center text-sm font-semibold text-gray-700'>
            <div className='bg-gradient-to-br from-gray-800 to-gray-500 text-white rounded px-2 py-1 text-xs'>
              BOOKS
            </div>
            <span className='text-xs text-gray-500 tracking-widest'>ONLINE</span>
          </div>
          <Input placeholder='Поиск' className='w-[400px]' />
        </div>

        {/* Иконки */}
        <div className='flex items-center gap-6 text-sm text-gray-700'>
          <div className='flex items-center gap-1'>
            <ShoppingCart className='h-5 w-5' />
            <span>Корзина</span>
          </div>

          <div className='relative flex items-center gap-1'>
            <Heart className='h-5 w-5' />
            <span>Избранное</span>
            <span className='absolute -top-2 -right-2 bg-teal-500 text-white text-xs rounded-full px-1'>
              1
            </span>
          </div>

          <div className='flex items-center gap-1'>
            <User className='h-5 w-5' />
            <span>Профиль</span>
          </div>
        </div>
      </div>

      {/* Навигация */}
      <nav className='flex items-center gap-8 px-4 py-2 text-sm text-gray-700 border-t'>
        <Button variant='ghost' className='flex items-center gap-2 text-teal-600 font-semibold'>
          <Menu className='h-4 w-4' />
          КАТЕГОРИИ
        </Button>
        <span className='cursor-pointer hover:text-teal-600'>Новинки</span>
        <span className='cursor-pointer hover:text-teal-600'>Бестселлеры</span>
        <span className='cursor-pointer hover:text-teal-600'>Специальное предложение</span>
      </nav>
    </header>
  );
}
