import { FREE_DELIVERY_THRESHOLD } from '../constants';
import { DeliveryMethodType } from '../store/delivery-method-store';

export const useDeliveryPrice = (totalAmount: number, deliveryMethod: DeliveryMethodType) => {
  const deliveryPrices: Record<DeliveryMethodType, number> = {
    express: totalAmount > FREE_DELIVERY_THRESHOLD ? 250 : 500,
    standard: totalAmount > FREE_DELIVERY_THRESHOLD ? 0 : 200,
    pickup: 0,
  };

  return deliveryPrices[deliveryMethod];
};
