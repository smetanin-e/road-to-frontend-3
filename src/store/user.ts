import { getMe } from '@/shared/services/get-me';
import { refreshAccessToken } from '@/shared/services/refresh-access-token';

import { create } from 'zustand';

type User = {
  id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
} | null;

interface UserState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  initUser: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  initUser: async () => {
    try {
      const me = await getMe();
      if (me) {
        set({ user: me, loading: false });
      }
      await refreshAccessToken();
      const meAfterRefresh = await getMe();
      set({ user: meAfterRefresh, loading: false });
    } catch {
      set({ user: null, loading: false });
    }
  },
}));

// type User = {
//   id: string;
//   email: string;
//   role: string;
//   firstName: string;
//   lastName: string;
// } | null;

// interface UserState {
//   loading: boolean;
//   error: boolean;
//   user: User;
//   getUser: () => Promise<void>;
// }

// export const useUserStore = create<UserState>()((set) => ({
//   loading: true,
//   error: false,
//   user: null,

//   getUser: async () => {
//     try {
//       set({ loading: true, error: false });
//       //до исправления
//       let res = await fetch('api/auth/me', {
//         method: 'GET',
//         credentials: 'include',
//       });

//       if (res.status === 401) {
//         const refreshed = await refreshAccessToken();
//         if (!refreshed) {
//           set({ user: null, error: true });
//           return;
//         }

//         res = await fetch('api/auth/me', {
//           method: 'GET',
//           credentials: 'include',
//         });
//       }

//       if (!res.ok) {
//         set({ user: null, error: true });
//         return;
//       }

//       const data = await res.json();
//       set({ user: data, error: false });
//       return;
//     } catch (error) {
//       console.error(error);
//       set({ error: true });
//     } finally {
//       set({ loading: false });
//     }
//   },
// }));
