import { z } from 'zod';
import { emailSchema } from './email-schema';
const phoneRegex = /^\+7\d{3}\d{3}\d{2}\d{2}$/;
export const personalUserSchema = z.object({
  firstName: z.string().min(2, { message: 'Имя должно содержать минимум 2 символа' }),
  lastName: z.string().min(2, { message: 'Фамилия должна содержать минимум 2 символа' }),
  phone: z.string().regex(phoneRegex, {
    message: 'Номер телефона должен соответствовать формату +79991234567',
  }),
  email: emailSchema,
});

//.regex(/[A-Za-z]/, { message: "Пароль должен содержать хотя бы одну букву" })
// .regex(/\d/, { message: "Пароль должен содержать хотя бы одну цифру" }),
