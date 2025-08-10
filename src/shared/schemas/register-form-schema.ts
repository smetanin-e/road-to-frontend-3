import { z } from "zod";
import { loginFormSchema } from "./login-form-schema";
import { passwordSchema } from "./password-schema";
const phoneRegex = /^\+7\d{3}\d{3}\d{2}\d{2}$/;

export const registerFormSchema = z
  .object({
    ...loginFormSchema.shape,
    firstName: z
      .string()
      .min(2, { message: "Имя должно содержать не менее 2-х символов" }),
    lastName: z
      .string()
      .min(2, { message: "Фамилия должна содержать не менее 2-х символов" }),
    phone: z.string().regex(phoneRegex, {
      message: "Номер телефона должен соответствовать формату +79991234567",
    }),
    confirmPassword: passwordSchema,
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Пароли не совпадают",
      path: ["confirmPassword"],
    },
  );

export type RegisterFormType = z.infer<typeof registerFormSchema>;

//.regex(/[A-Za-z]/, { message: "Пароль должен содержать хотя бы одну букву" })
// .regex(/\d/, { message: "Пароль должен содержать хотя бы одну цифру" }),
