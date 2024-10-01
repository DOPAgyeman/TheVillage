import { z } from 'zod';

import { insertUserSchema } from '@/db/queries/schemas/insert-schemas';

const passwordRegex = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

export const signUpUserSchema = insertUserSchema.extend({
  password: z
    .string({ required_error: 'Please enter your chosen password' })
    .min(8, { message: 'Your password must be at least 8 characters long' })
    .regex(passwordRegex, {
      message:
        'Please ensure your password has a combination of letters, numbers, and special characters',
    }),
  code: z.string().max(6, { message: 'Please enter a 6-digit code' }),
});

export type signUpUserType = z.infer<typeof signUpUserSchema>;
