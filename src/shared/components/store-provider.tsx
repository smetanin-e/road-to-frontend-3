'use client';
import { useUserStore } from '@/shared/store/user';
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
    return null;
  }

  return <>{children}</>;
}
