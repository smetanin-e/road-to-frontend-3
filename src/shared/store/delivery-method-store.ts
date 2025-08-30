import { create } from 'zustand';

export type DeliveryMethodType = 'express' | 'standard' | 'pickup';

interface State {
  deliveryMethod: DeliveryMethodType;
  setDeliveryMethod: (method: DeliveryMethodType) => void;

  deliveryPrice: number;
  setDeliveryPrice: (price: number) => void;
}

export const useDeliveryStore = create<State>()((set) => ({
  deliveryMethod: 'standard',
  setDeliveryMethod: (method) => {
    set({ deliveryMethod: method });
  },
  deliveryPrice: 0,
  setDeliveryPrice: (price) => {
    set({ deliveryPrice: price });
  },
}));
