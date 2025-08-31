import { z } from 'zod';
import { passwordSchema } from './password-schema';
import { personalUserSchema } from './personal-user-schema';

export const registerFormSchema = z
  .object({
    ...personalUserSchema.shape,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: 'Пароли не совпадают',
      path: ['confirmPassword'],
    },
  );

export type RegisterFormType = z.infer<typeof registerFormSchema>;
