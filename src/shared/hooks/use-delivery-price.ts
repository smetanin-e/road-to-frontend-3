import { DeliveryMethod } from '../store/delivery-method';

export const useDeliveryPrice = (
  totalAmount: number,
  freeDeliveryThreshold: number,
  deliveryMethod: DeliveryMethod,
) => {
  const deliveryPrices: Record<DeliveryMethod, number> = {
    express: totalAmount > freeDeliveryThreshold ? 250 : 500,
    standard: totalAmount > freeDeliveryThreshold ? 0 : 200,
    pickup: 0,
  };

  return deliveryPrices[deliveryMethod];
};
