'use client';

import { useUserStore } from '@/store/user';
//import { User } from '@prisma/client';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export function StoreProvider({ children }: Props) {
  const { initUser, loading } = useUserStore();

  React.useEffect(() => {
    initUser();
  }, [initUser]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return <>{children}</>;
}
