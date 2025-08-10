'use client';

import React from 'react';
import { useUserStore } from '@/store/user';

export function UserWatcher() {
  const { user } = useUserStore();

  React.useEffect(() => {
    console.log('Пользователь изменился в layout:', user);
    // Тут можно выполнять логику при изменении user
  }, [user]);

  return null; // визуально ничего не рендерит
}
