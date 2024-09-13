import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  full_name: z.string(),
  date_of_birth: z.string().datetime().nullable(),
  email_address: z.string().email().nullable(),
  external_accounts: z.array(z.string()).nullable(),
  image_url: z.string(),
});
