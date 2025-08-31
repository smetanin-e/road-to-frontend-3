import { create } from 'zustand';

export type AuthModalType = 'login' | 'register' | 'logout';

interface AuthModalState {
  type: AuthModalType;
  open: boolean;
  returnUrl: string | null;
  onOpen: (type?: AuthModalType) => void;
  onClose: () => void;
  onSwitchType: () => void;
}

export const useAuthModalStore = create<AuthModalState>()((set, get) => ({
  open: false,
  type: 'login',
  returnUrl: null,
  onOpen: (type = 'login', returnUrl = window.location.pathname) =>
    set({ open: true, type, returnUrl }),
  onClose: () => set({ open: false }),
  onSwitchType: () => set({ type: get().type === 'login' ? 'register' : 'login' }),
}));
