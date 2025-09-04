import { DeliveryStatus } from '@prisma/client';

export type CreateOrderType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string | undefined;
  comment?: string | undefined;
  deliveryType: DeliveryStatus;
  deliveryPrice: number;
  itemsAmount: number;
  totalAmount: number;
};
