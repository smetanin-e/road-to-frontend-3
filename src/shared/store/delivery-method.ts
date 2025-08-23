import { create } from 'zustand';

export type DeliveryMethod = 'express' | 'standard' | 'pickup';

interface State {
  deliveryMethod: DeliveryMethod;
  setDeliveryMethod: (method: DeliveryMethod) => void;
}

export const useDeliverytore = create<State>()((set) => ({
  deliveryMethod: 'standard',
  setDeliveryMethod: (method) => {
    set({ deliveryMethod: method });
  },
}));
