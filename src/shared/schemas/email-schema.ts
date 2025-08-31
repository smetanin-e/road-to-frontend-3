import z from 'zod';

export const emailSchema = z.email({ message: 'Введите корректный адрес электронной почты' });
