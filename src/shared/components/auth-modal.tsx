import React from 'react';
import { LoginForm, RegisterForm } from '@/shared/components';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Button,
} from '@/shared/components/ui';
interface Props {
  className?: string;
  open: boolean;
  onClose: () => void;
  type: string;
  onSwitchType: () => void;
}

export const AuthModal: React.FC<Props> = ({ open, onClose, type, onSwitchType }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader className='space-y-1'>
          <DialogTitle className='text-2xl font-bold text-center'>
            {type === 'login' ? 'Создать аккаунт' : 'Добро пожаловать'}
          </DialogTitle>
          <DialogDescription className='text-center'>
            {type === 'login'
              ? 'Заполните форму для регистрации'
              : 'Введите email и пароль для входа в аккаунт'}
          </DialogDescription>
        </DialogHeader>
        <div>
          {type === 'login' ? <LoginForm onClose={onClose} /> : <RegisterForm onClose={onClose} />}
        </div>
        <DialogFooter className='flex flex-col space-y-4'>
          <div className='flex items-center gap-2 text-sm text-center text-muted-foreground'>
            <p>{type === 'login' ? 'Еще нет аккаунта?' : 'Уже есть аккаунт?'}</p>

            <Button variant={'link'} size={'sm'} onClick={onSwitchType}>
              {type !== 'login' ? 'Войти' : 'Регистрация'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
