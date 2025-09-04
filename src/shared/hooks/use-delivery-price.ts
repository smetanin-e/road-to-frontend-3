import { DeliveryStatus } from '@prisma/client';
import { FREE_DELIVERY_THRESHOLD } from '../constants';

export const useDeliveryPrice = (totalAmount: number, deliveryMethod: DeliveryStatus) => {
  const deliveryPrices: Record<DeliveryStatus, number> = {
    EXPRESS: totalAmount > FREE_DELIVERY_THRESHOLD ? 250 : 500,
    STANDART: totalAmount > FREE_DELIVERY_THRESHOLD ? 0 : 200,
    PICKUP: 0,
  };

  return deliveryPrices[deliveryMethod];
};
