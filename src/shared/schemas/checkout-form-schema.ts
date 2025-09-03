import z from 'zod';
import { personalUserSchema } from './personal-user-schema';

export const checkoutFormSchema = z.object({
  ...personalUserSchema.shape,
  deliveryType: z.enum<readonly ['STANDART', 'EXPRESS', 'PICKUP']>(
    ['STANDART', 'EXPRESS', 'PICKUP'],
    { message: 'Нужно выбрать способ доставки' },
  ),
  address: z.string().optional(),
  comment: z.string().optional(),
  agreement: z.literal(true, { message: 'Нужно согласие' }),
});

export type CheckoutFormType = z.infer<typeof checkoutFormSchema>;
