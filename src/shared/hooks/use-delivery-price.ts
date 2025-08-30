import { DeliveryMethodType } from '../store/delivery-method-store';

export const useDeliveryPrice = (
  totalAmount: number,
  freeDeliveryThreshold: number,
  deliveryMethod: DeliveryMethodType,
) => {
  const deliveryPrices: Record<DeliveryMethodType, number> = {
    express: totalAmount > freeDeliveryThreshold ? 250 : 500,
    standard: totalAmount > freeDeliveryThreshold ? 0 : 200,
    pickup: 0,
  };

  return deliveryPrices[deliveryMethod];
};
