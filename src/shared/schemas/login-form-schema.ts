import { z } from 'zod';
import { passwordSchema } from './password-schema';
import { emailSchema } from './email-schema';
export const loginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormType = z.infer<typeof loginFormSchema>;
