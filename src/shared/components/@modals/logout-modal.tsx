import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui';
import { logout } from '@/shared/services';
import toast from 'react-hot-toast';

interface Props {
  className?: string;
  open: boolean;
  closePopup: () => void;
}

export const LogoutModal: React.FC<Props> = ({ open, closePopup }) => {
  const signOut = async () => {
    await logout();
    closePopup();
    toast.success('Вы вышли из аккаунта');
  };
  return (
    <Dialog open={open} onOpenChange={closePopup}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader className='space-y-1'>
          <DialogTitle className='text-2xl font-bold text-center'>Выход из аккаунта</DialogTitle>
          <DialogDescription className='text-center'>
            Вы уверены, что хотите выйти?
          </DialogDescription>
        </DialogHeader>
        <div className='flex items-center justify-center space-x-4'>
          <Button variant={'outline'} onClick={signOut}>
            Выйти
          </Button>
          <Button onClick={closePopup}>Отмена</Button>
        </div>
        <DialogFooter className='flex flex-col space-y-4'></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
