import React from 'react';
import { LoginForm, Logout, RegisterForm } from '@/shared/components';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Button,
} from '@/shared/components/ui';
import { AuthModalType } from '@/shared/store/auth-modal';
interface Props {
  className?: string;
  open: boolean;
  onClose: () => void;
  type: AuthModalType;
  onSwitchType: () => void;
}

//!ОПТИМИЗТРОВАТЬ - СДЕЛАТЬ FEATURES И ВЫНЕСТИ В КОНСТАНТЫ
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
    form: (onClose: () => void) => <Logout onClose={onClose} />,
    switchText: '',
    switchButton: '',
  },
} as const;

export const AuthModal: React.FC<Props> = ({ open, onClose, type, onSwitchType }) => {
  const { title, description, form, switchText, switchButton } = AUTH_CONTENT[type];
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader className='space-y-1'>
          <DialogTitle className='text-2xl font-bold text-center'>{title}</DialogTitle>
          <DialogDescription className='text-center'>{description}</DialogDescription>
        </DialogHeader>
        <div>{form(onClose)}</div>
        {type !== 'logout' && (
          <DialogFooter className='flex flex-col space-y-4'>
            <div className='flex items-center gap-2 text-sm text-center text-muted-foreground'>
              <p>{switchText}</p>

              <Button variant={'link'} size={'sm'} onClick={onSwitchType}>
                {switchButton}
              </Button>
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
