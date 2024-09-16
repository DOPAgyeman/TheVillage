import { createInsertSchema } from 'drizzle-zod';
import moment from 'moment';
import { z } from 'zod';

import { users } from '@/db/schema';

const calculateMinAge = moment().subtract(13, 'years').toDate();
console.log(calculateMinAge);

export const insertUserSchema = createInsertSchema(users, {
  id: z.string().default(''),
  first_name: z
    .string({
      required_error: 'Please enter your first name',
    })
    .min(1, { message: 'Please enter your first name' }),
  last_name: z
    .string({
      required_error: 'Please enter your last name',
    })
    .min(1, { message: 'Please enter your last name' }),
  full_name: z.string().default(''),
  date_of_birth: z
    .date({
      required_error: 'Please enter your date of birth',
    })
    .max(calculateMinAge, { message: 'You must be at least 13 years old' }),
  email_address: z
    .string({
      required_error: 'Please enter your email address',
    })
    .min(1, { message: 'Please enter your email address' })
    .email({ message: 'Please provide a valid email address' }),
  external_accounts: z.array(z.string()).default([]),
  image_url: z.string().default(''),
});

export type insertUserType = z.infer<typeof insertUserSchema>;
