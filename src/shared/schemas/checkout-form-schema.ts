import z from 'zod';
import { personalUserSchema } from './personal-user-schema';

export const checkoutFormSchema = z
  .object({
    ...personalUserSchema.shape,
    deliveryType: z.enum<readonly ['STANDART', 'EXPRESS', 'PICKUP']>(
      ['STANDART', 'EXPRESS', 'PICKUP'],
      { message: 'Нужно выбрать способ доставки' },
    ),
    address: z.string().optional(), //.min(5, { message: 'Введите корректный адрес' }),
    comment: z.string().optional(),
    agreement: z.literal(true, { message: 'Нужно согласие' }),
  })
  .refine(
    (data) => {
      // если доставка не "самовывоз", то адрес обязателен
      if (data.deliveryType !== 'PICKUP') {
        return !!data.address && data.address.length > 5;
      }
      return true;
    },
    { message: 'Введите корректный адрес', path: ['address'] },
  );

export type CheckoutFormType = z.infer<typeof checkoutFormSchema>;
