import { z } from "zod";
import { passwordSchema } from "./password-schema";
export const loginFormSchema = z.object({
  email: z.email(),
  password: passwordSchema, //.regex(/[A-Za-z]/, { message: "Пароль должен содержать хотя бы одну букву" })                                                                                         // .regex(/\d/, { message: "Пароль должен содержать хотя бы одну цифру" }),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;
