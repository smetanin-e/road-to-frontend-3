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

const AUTH_CONTENT = {
  login: {
    title: 'Добро пожаловать',
    description: 'Введите email и пароль для входа в аккаунт',
    form: (onClose: () => void) => <LoginForm onClose={onClose} />,
    switchText: 'Еще нет аккаунта?',
    switchButton: 'Регистрация',
  },
  register: {
    title: 'Создать аккаунт',
    description: 'Заполните форму для регистрации',
    form: (onClose: () => void) => <RegisterForm onClose={onClose} />,
    switchText: 'Уже есть аккаунт?',
    switchButton: 'Войти',
  },
  logout: {
    title: 'Выход из аккаунта',
    description: 'Вы уверены, что хотите выйти?',
    form: () => null, // тут можно вставить <LogoutForm /> или кнопки
    switchText: '',
    switchButton: '',
  },
} as const;

const content = AUTH_CONTENT[type];

export const AuthModal: React.FC<Props> = ({ open, onClose, type, onSwitchType }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader className='space-y-1'>
          <DialogTitle className='text-2xl font-bold text-center'>
            {type === 'login' ? 'Создать аккаунт' : 'Добро пожаловать'}
          </DialogTitle>
          <DialogDescription className='text-center'>
            {type === 'register'
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
