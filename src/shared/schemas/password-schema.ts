import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, { message: 'Пароль должен содержать минимум 8 символов' });

//.regex(/[A-Za-z]/, { message: "Пароль должен содержать хотя бы одну букву" })
// .regex(/\d/, { message: "Пароль должен содержать хотя бы одну цифру" }),
