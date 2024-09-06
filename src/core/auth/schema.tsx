import { z } from 'zod';

import { insertUserSchema } from '@/db/queries/schemas/insert-schemas';

export const signUpUserSchema = insertUserSchema.extend({
  password: z
    .string({ required_error: 'Please enter your chosen password' })
    .min(8, { message: 'Your password must be at least 8 characters long' }),
  code: z.string(),
});

export type signUpUserType = z.infer<typeof signUpUserSchema>;
