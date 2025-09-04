import { DeliveryStatus } from '@prisma/client';
import { create } from 'zustand';

interface State {
  deliveryMethod: DeliveryStatus;
  setDeliveryMethod: (method: DeliveryStatus) => void;

  deliveryPrice: number;
  setDeliveryPrice: (price: number) => void;
}

export const useDeliveryStore = create<State>()((set) => ({
  deliveryMethod: DeliveryStatus.STANDART,
  setDeliveryMethod: (method) => {
    set({ deliveryMethod: method });
  },
  deliveryPrice: 0,
  setDeliveryPrice: (price) => {
    set({ deliveryPrice: price });
  },
}));
